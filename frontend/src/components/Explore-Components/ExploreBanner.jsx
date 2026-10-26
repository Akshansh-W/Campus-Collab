import React, { useEffect, useState } from "react";
import { ArrowRight, Star, Users, Zap, ShieldCheck, Globe2 } from "lucide-react";

import projectBanner from "../../assets/projectBanner.png";

// ============================================================
// FALLBACK DATA
// This keeps the banner visible while the API is loading.
// ============================================================

const defaultProject = {
  id: null,
  name: "Global Data Migration",
  subtitle: "Cloud Architecture",
  description:
    "A complete modernization of legacy systems into a distributed multi-region cloud environment, improving performance, scalability, and reliability.",
  lead: "Alex Rivera",
  team: "Sarah J., Michael T., Elena R.",
  status: "ACTIVE",
  techStack: [],
};

// ============================================================
// COMPONENT
// ============================================================

export default function ExploreBanner() {
  const [project, setProject] = useState(defaultProject);

  useEffect(() => {
    const fetchBestProject = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/projectOfMonth/getLatest");

        if (!response.ok) {
          throw new Error("Failed to fetch best project");
        }

        const data = await response.json();

        if (data?.project) {
          const bestProject = data.project;

          setProject({
            id: bestProject.id,
            name: bestProject.projectName,
            subtitle: bestProject.status || "Featured Project",
            description: bestProject.overview,
            lead: bestProject.adminName,
            team: "",
            status: bestProject.status,
            techStack: bestProject.techStack || [],
          });
        }
      } catch (error) {
        console.error("Error fetching best project:", error);

        // Keep default project visible if API fails.
      }
    };

    fetchBestProject();
  }, []);

  // ==========================================================
  // DYNAMIC STATS
  // ==========================================================

  const stats = [
    {
      value: project.status || "ACTIVE",
      label: "Status",
      icon: ShieldCheck,
    },
    {
      value: project.techStack.length,
      label: "Technologies",
      icon: Zap,
    },
    {
      value: project.techStack.length,
      label: "Tech Stack",
      icon: Globe2,
    },
  ];

  return (
    <section
      className="
        relative
        w-full
        min-h-[420px]
        overflow-hidden
        rounded-[28px]
        border
        border-[#E9E1F0]
        bg-white
        shadow-[0_4px_25px_rgba(91,31,115,0.06)]
      "
    >
      {/* ======================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#EEE5FA]
          opacity-70
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          right-[25%]
          h-[300px]
          w-[300px]
          rounded-full
          bg-[#F4E8F8]
          opacity-60
          blur-3xl
        "
      />

      {/* ======================================================
          MAIN LAYOUT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          grid
          min-h-[390px]
          grid-cols-1
          lg:grid-cols-[1.2fr_0.8fr]
        "
      >
        {/* ====================================================
            LEFT CONTENT
        ==================================================== */}

        <div
          className="
            flex
            flex-col
            justify-center
            px-8
            py-10
            sm:px-10
            lg:px-12
          "
        >
          {/* Badge */}

          <div
            className="
              mb-5
              flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-[#F0E7F7]
              px-3.5
              py-1.5
              text-xs
              font-semibold
              text-[#633080]
            "
          >
            <Star size={13} fill="currentColor" />
            Project of the Month
          </div>

          {/* Heading */}

          <h1
            className="
              max-w-[650px]
              text-3xl
              font-bold
              leading-[1.1]
              tracking-tight
              text-[#2F2038]
              sm:text-4xl
              lg:text-[40px]
            "
          >
            {project.name}
          </h1>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-[600px]
              text-sm
              leading-6
              text-gray-500
              sm:text-[15px]
              line-clamp-4
              overflow-hidden
            "
          >
            {project.description}
          </p>

          {/* Lead + Team */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-x-8
              gap-y-4
            "
          >
            {/* Lead */}

            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E9DDF0]
                  text-[#633080]
                "
              >
                <Users size={17} />
              </div>

              <div>
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >
                  Project Lead
                </p>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-[#432651]
                  "
                >
                  {project.lead}
                </p>
              </div>
            </div>

            {/* Separator */}

            <div
              className="
                hidden
                h-9
                w-px
                bg-gray-200
                sm:block
              "
            />

            {/* Team */}

            <div>
              <p
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Technology
              </p>

              <p
                className="
                  mt-0.5
                  text-sm
                  font-medium
                  text-[#432651]
                "
              >
                {project.techStack.join(", ") || "Modern technology stack"}
              </p>
            </div>
          </div>

          {/* Button */}

          <div
            className="
              mt-7
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#633080]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[0_5px_15px_rgba(99,48,128,0.18)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#54256D]
              "
            >
              View Project
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ====================================================
            RIGHT VISUAL
        ==================================================== */}

        <div
          className="
            relative
            hidden
            min-h-[390px]
            overflow-hidden
            lg:flex
          "
        >
          {/* Banner image */}

          <img
            src={projectBanner}
            alt="Project architecture visualization"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />

          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-[#633080]/5
            "
          />

          {/* ==================================================
              STATS
          ================================================== */}

          <div
            className="
              absolute
              right-6
              top-1/2
              z-20
              flex
              -translate-y-1/2
              flex-col
              gap-3
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="
                    flex
                    w-[145px]
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/70
                    bg-white/80
                    px-3.5
                    py-3
                    shadow-[0_5px_20px_rgba(91,31,115,0.10)]
                    backdrop-blur-md
                  "
                >
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F0E6F6]
                      text-[#633080]
                    "
                  >
                    <Icon size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#4C2860]">{stat.value}</p>

                    <p className="text-[10px] text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
