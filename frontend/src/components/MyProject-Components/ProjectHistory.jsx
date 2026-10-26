import React, { useState } from "react";
import { CheckCircle2, MoreVertical, SlidersHorizontal, X, FolderKanban } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HistoryCard = ({ projectId, projectName, admin, techStack }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/project/deleteProject", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Number(projectId)),
    });

    if (response.ok) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  const handleManage = () => {
    navigate(`/projectworkspace/${projectId}`);
  };

  const initial = admin.studentName.trim().charAt(0).toUpperCase();

  const techArray = techStack.split(",").map((tech) => tech.trim());

  return (
    <>
      <div
        className="
          group
          relative
          w-full
          overflow-hidden
          rounded-[22px]
          border
          border-[#E8DFED]
          bg-white
          px-6
          py-7
          shadow-[0_3px_18px_rgba(91,31,115,0.04)]
          transition-all
          duration-300
          hover:-translate-y-[2px]
          hover:border-[#D8C5E2]
          hover:shadow-[0_12px_30px_rgba(91,31,115,0.08)]
        "
      >
        {/* Subtle background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#F3EAF8]
            opacity-70
            blur-3xl
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Main content */}

        <div
          className="
            relative
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-center
          "
        >
          {/* ==========================================
              PROJECT IDENTITY
          ========================================== */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-4
              lg:w-[28%]
            "
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#F0E6F6]
                text-[#633080]
              "
            >
              <FolderKanban size={21} />
            </div>

            <div className="min-w-0">
              <h4
                className="
                  truncate
                  text-base
                  font-bold
                  text-[#4B2560]
                "
              >
                {projectName}
              </h4>

              <div className="mt-1.5 flex items-center gap-2">
                <div
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#A56ABD]
                  "
                >
                  <span className="text-[10px] font-semibold text-white">{initial}</span>
                </div>

                <p className="text-xs font-medium text-gray-500">{admin.studentName}</p>
              </div>
            </div>
          </div>

          {/* ==========================================
              TECHNOLOGY STACK
          ========================================== */}

          <div className="lg:flex-1">
            <p
              className="
                mb-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-gray-400
              "
            >
              Technology Stack
            </p>

            <div className="flex flex-wrap gap-2">
              {techArray.map((tech, i) => (
                <span
                  key={i}
                  className="
                    rounded-full
                    border
                    border-[#E7DCEE]
                    bg-[#F9F6FB]
                    px-3
                    py-1.5
                    text-[10px]
                    font-medium
                    text-[#633080]
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ==========================================
              ACTIONS
          ========================================== */}

          <div
            className="
              flex
              items-center
              gap-2.5
              lg:w-[230px]
              lg:justify-end
            "
          >
            <button
              type="button"
              onClick={handleDelete}
              className="
                flex-1
                rounded-xl
                border
                border-[#DCCBE7]
                bg-white
                px-4
                py-2.5
                text-xs
                font-semibold
                text-[#633080]
                transition-all
                duration-200
                hover:border-[#C8ADD6]
                hover:bg-[#FAF7FC]
              "
            >
              Delete
            </button>

            <button
              type="button"
              onClick={handleManage}
              className="
                flex-1
                rounded-xl
                bg-[#633080]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-white
                shadow-[0_4px_12px_rgba(99,48,128,0.15)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#54256D]
                hover:shadow-[0_7px_18px_rgba(99,48,128,0.22)]
              "
            >
              Manage
            </button>
          </div>

          {/* ==========================================
              MORE MENU
          ========================================== */}

          <button
            type="button"
            className="
              absolute
              right-0
              top-0
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-gray-400
              transition
              hover:bg-[#F5EFF8]
              hover:text-[#633080]
              lg:static
            "
          >
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      {/* ==============================================
          SUCCESS TOAST
      ============================================== */}

      {showSuccess && (
        <div
          className="
            fixed
            right-6
            top-6
            z-50
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-green-100
            bg-white
            px-5
            py-4
            shadow-[0_12px_35px_rgba(0,0,0,0.10)]
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-green-100
            "
          >
            <CheckCircle2 size={21} className="text-green-600" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Project Deleted!</h4>

            <p className="text-xs text-gray-500">Your project has been deleted successfully.</p>
          </div>

          <button
            type="button"
            onClick={() => setShowSuccess(false)}
            className="
              ml-3
              text-gray-400
              hover:text-gray-700
            "
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  );
};

const ProjectHistory = ({ projects }) => {
  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2
            className="
              text-xl
              font-bold
              tracking-tight
              text-[#2F2038]
            "
          >
            Project History
          </h2>

          <p className="mt-1 text-xs text-gray-400">Your previously created projects</p>
        </div>
      </div>

      {/* Full-width project history */}

      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <HistoryCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};
export default ProjectHistory;
