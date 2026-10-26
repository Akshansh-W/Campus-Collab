import ExploreBanner from "../components/Explore-Components/ExploreBanner";
import ProjectCard from "../components/Explore-Components/ProjectCard";
import { useEffect, useRef, useState } from "react";
import { useError } from "../context/ErrorContext";
import LoadingScreen from "./LoadingScreen";
import ErrorPage from "./ErrorPage";

export default function ExplorePage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { error, showError } = useError();

  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  const fetchProjects = async (pageNumber) => {
    if (isLoading || !hasMore) {
      return;
    }

    try {
      setIsLoading(true);

      console.log("Fetching page:", pageNumber);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/project/getProjects?page=${pageNumber}&size=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message);
        return;
      }

      // Append the new projects
      setProjects((previousProjects) => [...previousProjects, ...data.content]);

      // Check if backend says this is the last page
      setHasMore(!data.last);
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial request
  useEffect(() => {
    fetchProjects(0);
  }, []);

  // Observe bottom of project list
  useEffect(() => {
    const sentinel = observerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!sentinel || !scrollContainer) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          setPage((previousPage) => previousPage + 1);
        }
      },
      {
        // IMPORTANT:
        // Watch your actual scrolling container
        root: scrollContainer,

        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore]);

  // Fetch next page
  useEffect(() => {
    if (page === 0) {
      return;
    }

    fetchProjects(page);
  }, [page]);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <div className="flex w-full h-full overflow-hidden">
      {/* THIS is the actual scrolling container */}
      <div ref={scrollContainerRef} className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto h-full" style={{ backgroundColor: "#FCF7FA" }}>
        <ExploreBanner />

        {/* Project cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>

        {/* Bottom sentinel */}
        <div ref={observerRef} className="flex justify-center py-8">
          {isLoading && <p className="text-gray-500">Loading more projects...</p>}

          {!hasMore && projects.length > 0 && <p className="text-gray-500">No more projects</p>}
        </div>
      </div>
    </div>
  );
}
