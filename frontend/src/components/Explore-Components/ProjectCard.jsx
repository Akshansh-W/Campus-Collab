import React from "react";
import { MoreVertical, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";

// ============================================================
// PROJECT COVER IMAGES
// ============================================================

const projectImages = [image1, image2, image3, image4, image5];

const ProjectCard = ({ id, projectName, adminName, techStack = [], status }) => {
  const initial = adminName?.trim().charAt(0).toUpperCase() || "?";
  const navigate = useNavigate();

  const imageIndex = Number(id) % projectImages.length;

  const projectImage = projectImages[imageIndex] || "/project-images/default-project.jpg";

  return (
    <div
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        border border-gray-200/80
        bg-white
        shadow-[0_2px_12px_rgba(0,0,0,0.04)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_30px_rgba(91,31,115,0.10)]
      "
    >
      {/* =====================================================
          PROJECT IMAGE
      ===================================================== */}

      <div className="relative h-44 overflow-hidden bg-[#F0EAF5]">
        <img
          src={projectImage}
          alt={`${projectName} project`}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-[1.03]
          "
        />

        {/* Soft overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
          "
        />

        {/* Status */}
        {status && (
          <div
            className="
              absolute
              right-3
              top-3
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/60
              bg-white/90
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-[#5B1F73]
              shadow-sm
              backdrop-blur-sm
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {status}
          </div>
        )}
      </div>

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="px-5 pb-5 pt-4">
        {/* Project title + menu */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              text-lg
              font-semibold
              tracking-tight
              text-[#3E234B]
              transition-colors
              group-hover:text-[#5B1F73]
            "
          >
            {projectName}
          </h3>

          <button
            type="button"
            className="
              shrink-0
              rounded-lg
              p-1.5
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-600
            "
          >
            <MoreVertical size={17} />
          </button>
        </div>

        {/* Project description */}
        <p
          className="
            mt-2
            line-clamp-2
            text-sm
            leading-5
            text-gray-500
          "
        >
          A modern collaborative project built for students to develop, manage and showcase their work.
        </p>

        {/* =================================================
            TECHNOLOGY STACK
        ================================================= */}

        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="
                rounded-full
                bg-[#F1EAF5]
                px-2.5
                py-1
                text-[11px]
                font-medium
                text-[#5B2A86]
                transition-colors
                group-hover:bg-[#EDE3F2]
              "
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-100" />

        {/* =================================================
            ADMIN + VIEW DETAILS
        ================================================= */}

        <div className="flex items-center justify-between gap-3">
          {/* Admin */}
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#A56ABD]
                text-sm
                font-semibold
                text-white
              "
            >
              {initial}
            </div>

            <div className="min-w-0">
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Project Admin
              </p>

              <p
                className="
                  truncate
                  text-xs
                  font-medium
                  text-[#4D285E]
                "
              >
                {adminName}
              </p>
            </div>
          </div>

          {/* View Details */}
          <button
            onClick={() => {
              console.log(id);
              navigate(`/indprojectpage/${id}`);
            }}
            type="button"
            className="
              group/button
              flex
              shrink-0
              items-center
              gap-1
              text-xs
              font-semibold
              text-[#633080]
              transition-colors
              hover:text-[#8B3FB0]
            "
          >
            View Details
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-200
                group-hover/button:translate-x-0.5
                group-hover/button:-translate-y-0.5
              "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
