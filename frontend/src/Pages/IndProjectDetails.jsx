import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useError } from "../context/ErrorContext";

export default function IndProjectDetails() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { showError } = useError();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_BASE_URL +
            `/project/findProject/${id}`,
          { method: "GET" }
        );

        const data = await response.json();

        if (response.ok) {
          setProject(data);
        } else {
          showError(data.message);
        }
      } catch (err) {
        showError("Something went wrong loading this project.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (isLoading || !project) {
    return <LoadingScreen />;
  }

  const techStack = project.techStack || [];

  const handleSubmit = (tech)=>{
    navigate("/rolesubmit", {
    state: {
      tech: tech,
      id: id
    }
  });
  }

  return (
    <div className="min-h-screen bg-[#F8F5FA] px-5 py-8 md:px-10 lg:px-16">

      {/* Main Container */}
      <div className="mx-auto max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#32145F] via-[#5E2491] to-[#8B35D9] px-7 py-10 text-white shadow-xl md:px-12 md:py-12">

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative z-10">

            {/* Top row */}
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              {/* Status */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                <span className="text-sm font-semibold tracking-wide">
                  {project.status || "ACTIVE"}
                </span>
              </div>

              {/* Project ID */}
              <div className="text-sm text-purple-200">
                Project #{id}
              </div>
            </div>

            {/* Project title */}
            <div className="mt-8 max-w-4xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-200">
                Project Opportunity
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {project.projectName}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-purple-100 md:text-lg">
                Explore the project details, required technologies and
                opportunities to collaborate with the project team.
              </p>
            </div>

            {/* Admin */}
            <div className="mt-9 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-lg font-bold backdrop-blur-sm">
                {project.adminName
                  ? project.adminName.charAt(0).toUpperCase()
                  : "A"}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-purple-200">
                  Project Admin
                </p>

                <p className="mt-1 text-base font-semibold">
                  {project.adminName || "Admin"}
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ================= TECH STACK ================= */}
        <section className="mt-7 rounded-2xl border border-purple-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                Technology
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Tech Stack
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-purple-200 bg-purple-50 px-5 py-2.5 text-sm font-semibold text-purple-700 transition hover:-translate-y-0.5 hover:bg-purple-100"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </section>


        {/* ================= CONTENT ================= */}
        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-3">

          {/* -------- Main Content -------- */}
          <main className="space-y-7 lg:col-span-2">

            {/* Overview */}
            <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                  📋
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                    About the project
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Overview
                  </h2>
                </div>
              </div>

              <p className="whitespace-pre-line text-[15px] leading-8 text-gray-600">
                {project.overview}
              </p>

            </section>


            {/* Requirements */}
            {project.requirements && (
              <section className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm md:p-9">

                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
                    🎯
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                      What you need
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900">
                      Requirements
                    </h2>
                  </div>
                </div>

                <p className="whitespace-pre-line text-[15px] leading-8 text-gray-600">
                  {project.requirements}
                </p>

              </section>
            )}

          </main>


          {/* -------- Sidebar -------- */}
          <aside className="space-y-7">

            {/* Project Information */}
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-gray-900">
                Project Information
              </h2>

              <div className="mt-6 divide-y divide-gray-100">

                {/* Status */}
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm text-gray-500">
                    Status
                  </span>

                  <span className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    {project.status || "ACTIVE"}
                  </span>
                </div>

                {/* Admin */}
                <div className="py-4">
                  <p className="text-sm text-gray-500">
                    Created by
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {project.adminName || "Admin"}
                  </p>
                </div>

                {/* Technologies */}
                <div className="py-4">
                  <p className="text-sm text-gray-500">
                    Technologies
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {techStack.length}{" "}
                    {techStack.length === 1 ? "technology" : "technologies"}
                  </p>
                </div>

              </div>
            </section>


            {/* Admin Card */}
            <section className="overflow-hidden rounded-2xl bg-linear-to-br from-[#F0E5FF] to-white p-6">

              <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                Project Admin
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-xl font-bold text-white shadow-md">
                  {project.admiName
                    ? project.admiName.charAt(0).toUpperCase()
                    : "A"}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {project.adminName || "Admin"}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Project Administrator
                  </p>
                </div>

              </div>
            </section>

          </aside>
        </div>


        {/* ================= APPLICATION ================= */}
        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">

          <div className="border-b border-gray-100 px-7 py-7 md:px-9">

            <p className="text-sm font-semibold uppercase tracking-wider text-purple-600">
              Get involved
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              Apply for this project
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Choose the technology you want to contribute to and submit
              your application.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-2 lg:grid-cols-3 md:p-9">

            {techStack.map((tech) => (
              <button
                onClick={()=>{handleSubmit(tech)}}
                key={tech}
                className="group flex items-center justify-between rounded-xl border border-purple-200 bg-purple-50 px-5 py-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-purple-500 hover:bg-purple-700 hover:shadow-lg"
              >

                <div>
                  <p className="text-xs font-medium text-purple-500 group-hover:text-purple-200">
                    Apply as
                  </p>

                  <p className="mt-1 font-bold text-purple-800 group-hover:text-white">
                    {tech} Developer
                  </p>
                </div>

                <span className="text-xl text-purple-600 transition-transform group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>

              </button>
            ))}

          </div>

        </section>


        {/* Bottom spacing */}
        <div className="h-10" />

      </div>
    </div>
  );
}
