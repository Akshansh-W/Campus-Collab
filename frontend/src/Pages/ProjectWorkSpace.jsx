import React, { useEffect, useState } from "react";
import { ChevronLeft, ClipboardCheck, Users, FileCheck2, Sparkles, ClipboardPlus, ClipboardList, CheckCircle2, Star } from "lucide-react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import workspace from "../assets/workspace.png";

export default function ProjectWorkspace() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [requests, setRequests] = useState([]);
  const [teamMembers, SetTeamMembers] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    const projectResponse = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/project/findProject/${projectId}`, {
      method: "Get",
    });

    const joinRequests = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/pjr/getAllRequests?projectId=${projectId}`, {
      method: "Get",
    });

    const teamResponse = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/pMember/getMembers?projectId=${projectId}`, {
      method: "Get",
    });

    if (projectResponse.ok) {
      const projectData = await projectResponse.json();
      setProject(projectData);
    }

    if (joinRequests.ok) {
      const requestData = await joinRequests.json();
      setRequests(requestData);
    }

    if (teamResponse.ok) {
      const members = await teamResponse.json();
      SetTeamMembers(members);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const TABS = [
    { path: "overview", label: "Overview", icon: ClipboardCheck },
    { path: "team", label: "Team", icon: Users },
    { path: "applications", label: "Applications", icon: FileCheck2 },

    ...(project?.status === "COMPLETED"
      ? [
          {
            path: "completed",
            label: "Project Completed",
            icon: CheckCircle2,
          },
        ]
      : [
          {
            path: "taskassignment",
            label: "Task Assignment",
            icon: ClipboardPlus,
          },
          {
            path: "taskmanagement",
            label: "Task Management",
            icon: ClipboardList,
          },
          {
            path: "rateteam",
            label: "Rate Team",
            icon: Star,
          },
        ]),
  ];

  const visibleTabs = project?.status === "COMPLETED"
    ? TABS.filter((tab) => ["overview", "team", "completed"].includes(tab.path))
    : TABS;

  if (loading) {
    return <LoadingScreen />;
  }

  const badge = project.projectName ? project.projectName.slice(0, 2).toUpperCase() : "";

  const adminInitial = project.adminName ? project.adminName.trim().charAt(0).toUpperCase() : "";

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F5F1FA" }}>
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* =====================================================
            BACK TO PROJECTS
        ====================================================== */}

        <button
          type="button"
          onClick={() => navigate("/project")}
          className="
            inline-flex
            items-center
            gap-1.5
            text-sm
            font-medium
            text-gray-600
            hover:text-purple-700
            transition-colors
          "
        >
          <ChevronLeft size={17} />
          Back to Projects
        </button>

        {/* =====================================================
            PROJECT HEADER
        ====================================================== */}

        <div
          className="
            relative
            mt-5
            min-h-75
            overflow-hidden
            rounded-3xl
          "
        >
          {/* -----------------------------------------------
              Background gradient
          ------------------------------------------------ */}

          <div
            className="
              absolute
              inset-0
              pointer-events-none
            "
            style={{
              background: "radial-gradient(circle at 75% 45%, rgba(214, 180, 255, 0.25), transparent 38%)",
            }}
          />

          {/* ================= DECORATIVE WORKSPACE IMAGE ================= */}
          <div
            className="
              absolute
              right-1
              -top-13.75
              w-125
              h-97.5
              pointer-events-none
              overflow-hidden
            "
          >
            {/* Image */}
            <img
              src={workspace}
              alt=""
              className="
              absolute
              inset-0
              w-full
              h-full
              object-contain
            "
            />
          </div>

          {/* -----------------------------------------------
              Project information
          ------------------------------------------------ */}

          <div
            className="
              relative
              z-30
              max-w-4xl
              pt-5
              pr-10
            "
          >
            {/* Project identity */}

            <div className="flex items-start gap-5">
              {/* Project badge */}

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shrink-0
                  shadow-md
                "
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
                }}
              >
                <span className="text-white text-xl font-bold">{badge}</span>
              </div>

              {/* Project content */}

              <div className="min-w-0">
                {/* Name + status */}

                <div className="flex items-center gap-3 flex-wrap">
                  <h1
                    className="
                      text-3xl
                      font-bold
                      tracking-tight
                      text-gray-900
                    "
                  >
                    {project.projectName}
                  </h1>

                  {/* Status */}

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-xs
                      font-semibold
                      rounded-full
                      px-3
                      py-1
                    "
                    style={{
                      backgroundColor: "#DCFCE7",
                      color: "#16A34A",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: "#16A34A",
                      }}
                    />

                    {project.status}
                  </span>
                </div>

                {/* Workspace label */}

                <div className="flex items-center gap-2 mt-2">
                  <Sparkles size={14} className="text-purple-500" />

                  <span
                    className="
                      text-xs
                      font-medium
                      text-purple-600
                    "
                  >
                    Project Workspace
                  </span>
                </div>

                {/* Project overview */}

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-500
                    max-w-3xl
                  "
                >
                  {project.overview}
                </p>

                {/* Project Admin */}

                <div className="flex items-center gap-2 mt-6">
                  <span
                    className="
                      text-xs
                      text-gray-400
                    "
                  >
                    Project Admin
                  </span>

                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      backgroundColor: "#A56ABD",
                    }}
                  >
                    <span
                      className="
                        text-white
                        text-xs
                        font-semibold
                      "
                    >
                      {adminInitial}
                    </span>
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-gray-700
                    "
                  >
                    {project.adminName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            TAB NAVIGATION
        ====================================================== */}

        <div
          className="
            flex
            items-center
            gap-1
            mt-4
            border-b
            border-gray-200
          "
        >
          {visibleTabs.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                px-5
                py-3.5
                border-b-2
                -mb-px
                transition-all
              "
              style={({ isActive }) => ({
                borderColor: isActive ? "#5B1F73" : "transparent",

                color: isActive ? "#5B1F73" : "#6B7280",

                backgroundColor: isActive ? "rgba(123, 44, 191, 0.04)" : "transparent",
              })}
            >
              <Icon size={17} />

              {label}
            </NavLink>
          ))}
        </div>

        {/* =====================================================
            ACTIVE TAB CONTENT
        ====================================================== */}

        <div className="mt-6 pb-10">
          <Outlet
            context={{
              project,
              requests,
              teamMembers,
              fetchData,
            }}
          />
        </div>
      </div>
    </div>
  );
}
