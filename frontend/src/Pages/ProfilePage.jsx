import DetailsSection from "../components/Dashboard-Components/DetailsSection";
import StatsCards from "../components/Dashboard-Components/StatsCards";
import ProjectsAndRecommendation from "../components/Dashboard-Components/ProjectsAndRecommendation";
import InspirationCard from "../components/Dashboard-Components/InspirationCard";
import { useEffect, useState } from "react";
import { useStudent } from "../context/StudentContext";
import LoadingScreen from "./LoadingScreen";
import { useError } from "../context/ErrorContext";
import ErrorPage from "./ErrorPage";

export default function ProfilePage() {
  const { student, setStudent } = useStudent();
  const { error, showError, clearError } = useError();
  const [stats, setStats] = useState();
  const [activeProjects, setActiveProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      setIsLoading(true);
      clearError();
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/student/getDashBoardData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          showError(data?.message || "Unable to load your dashboard.");
          localStorage.removeItem("token");
          return;
        }
        localStorage.setItem("rollNumber", data.student.rollNumber);
        setStudent(data.student);
        console.log(student);
        setStats(data.stats);
        setActiveProjects(data.activeProject);
      } catch {
        showError("Unable to connect to the server. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-full" style={{ backgroundColor: "#F5F1FA" }}>
      <div className="p-6 flex flex-col gap-6">
        {/* Top Bar */}

        <DetailsSection student={student} />
        <StatsCards stats={stats} activeCount={activeProjects} />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
          <div className="xl:col-span-2">
            <ProjectsAndRecommendation activeProjects={activeProjects} />
          </div>
          <div className="xl:col-span-1">
            <InspirationCard />
          </div>
        </div>
      </div>
    </div>
  );
}
