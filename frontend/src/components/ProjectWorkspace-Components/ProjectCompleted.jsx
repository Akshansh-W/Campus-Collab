import React from "react";
import { useOutletContext } from "react-router-dom";
import { CheckCircle2, Users, CalendarCheck2, FolderCheck, Star, UserRound, Sparkles } from "lucide-react";

const ProjectCompleted = () => {
  const { project, requests, teamMembers, fetchData } = useOutletContext();

  const members = teamMembers || [];
  const projectRequests = requests || [];

  return (
    <div className="w-full h-full px-1 pb-6">
      {/* =====================================================
          COMPLETION HERO
      ====================================================== */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-purple-100
          bg-white
          shadow-sm
          p-7
          lg:p-8
        "
      >
        {/* Decorative circles */}
        <div
          className="
            absolute
            -top-20
            -right-16
            w-52
            h-52
            rounded-full
            bg-purple-100/50
            blur-2xl
          "
        />

        <div
          className="
            absolute
            -bottom-24
            -left-16
            w-48
            h-48
            rounded-full
            bg-fuchsia-100/40
            blur-2xl
          "
        />

        <div className="relative flex flex-col items-center text-center">
          {/* Completion icon */}
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-linear-to-br
              from-[#7B2CBF]
              to-[#A855D8]
              flex
              items-center
              justify-center
              shadow-lg
              shadow-purple-200
            "
          >
            <CheckCircle2 size={34} strokeWidth={2.2} className="text-white" />
          </div>

          {/* Small label */}
          <div className="mt-5 flex items-center gap-2">
            <Sparkles size={14} className="text-[#9B4DCA]" />

            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-[#8B3FC7]
              "
            >
              Project Completed
            </span>

            <Sparkles size={14} className="text-[#9B4DCA]" />
          </div>

          {/* Project name */}
          <h1
            className="
              mt-2
              text-2xl
              lg:text-3xl
              font-bold
              text-[#4B185F]
            "
          >
            {project?.projectName || "Project"}
          </h1>

          {/* Description */}
          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
            "
          >
            This project has successfully reached its completion. The workspace is now archived and no further project tasks or assignments are
            required.
          </p>

          {/* Status */}
          <div
            className="
              mt-5
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-green-50
              border
              border-green-100
              text-green-700
              text-xs
              font-semibold
            "
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {project?.status || "COMPLETED"}
          </div>
        </div>
      </div>

      {/* =====================================================
          PROJECT STATS
      ====================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {/* TEAM MEMBERS */}
        <div
          className="
            rounded-2xl
            bg-white
            border
            border-purple-100
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#F4E9FA]
                flex
                items-center
                justify-center
              "
            >
              <Users size={19} className="text-[#7B2CBF]" />
            </div>

            <span className="text-[10px] font-semibold text-gray-400">TEAM</span>
          </div>

          <p className="mt-4 text-2xl font-bold text-gray-900">{members.length}</p>

          <p className="mt-1 text-xs text-gray-500">Team Members</p>
        </div>

        {/* PROJECT STATUS */}
        <div
          className="
            rounded-2xl
            bg-white
            border
            border-purple-100
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-green-50
                flex
                items-center
                justify-center
              "
            >
              <FolderCheck size={19} className="text-green-600" />
            </div>

            <span className="text-[10px] font-semibold text-gray-400">STATUS</span>
          </div>

          <p className="mt-4 text-lg font-bold text-green-700">Completed</p>

          <p className="mt-1 text-xs text-gray-500">Project Lifecycle</p>
        </div>

        {/* ADMIN */}
        <div
          className="
            rounded-2xl
            bg-white
            border
            border-purple-100
            p-5
            shadow-sm
          "
        >
          <div className="flex items-center justify-between">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#F4E9FA]
                flex
                items-center
                justify-center
              "
            >
              <Star size={19} className="text-[#A855D8]" />
            </div>

            <span className="text-[10px] font-semibold text-gray-400">ADMIN</span>
          </div>

          <p className="mt-4 text-lg font-bold text-gray-900 truncate">{project?.adminName || "—"}</p>

          <p className="mt-1 text-xs text-gray-500">Project Administrator</p>
        </div>
      </div>

      {/* =====================================================
          TEAM SECTION
      ====================================================== */}
      <div
        className="
          mt-5
          rounded-3xl
          bg-white
          border
          border-purple-100
          shadow-sm
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#F4E9FA]
                flex
                items-center
                justify-center
              "
            >
              <Users size={19} className="text-[#7B2CBF]" />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#5B1F73]">Project Team</h2>

              <p className="text-xs text-gray-400 mt-0.5">Members who contributed to this project</p>
            </div>
          </div>
        </div>

        {/* Members */}
        <div className="p-5">
          {members.length === 0 ? (
            <div className="py-8 text-center">
              <UserRound size={25} className="mx-auto text-gray-300" />

              <p className="mt-2 text-sm text-gray-400">No team members found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {members.map((member, index) => {
                /*
                 * Keeping this flexible because your
                 * ProjectMemberResponse may have slightly
                 * different property names.
                 */
                const name = member?.studentName || member?.name || "Team Member";

                const role = member?.appliedRole || member?.role || "Member";

                const rating = member?.rating ?? null;

                return (
                  <div
                    key={member?.memberId || member?.studentRollNumber || index}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-4
                      rounded-2xl
                      bg-[#FBF9FD]
                      border
                      border-purple-50
                      hover:border-purple-100
                      hover:bg-[#F9F4FC]
                      transition
                    "
                  >
                    {/* Member */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="
                          w-10
                          h-10
                          shrink-0
                          rounded-xl
                          bg-[#EEDDF5]
                          flex
                          items-center
                          justify-center
                          text-sm
                          font-bold
                          text-[#6B21A8]
                        "
                      >
                        {name.trim().charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>

                        <span
                          className="
                            inline-flex
                            max-w-40
                            mt-1
                            px-2.5
                            py-1
                            rounded-full
                            bg-[#5B1F73]/10
                            border
                            border-[#5B1F73]/15
                            text-[10px]
                            font-semibold
                            text-[#5B1F73]
                            truncate
                          "
                        >
                          {role}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    {rating !== null && (
                      <div
                        className="
                          shrink-0
                          flex
                          items-center
                          gap-1
                          px-2.5
                          py-1.5
                          rounded-lg
                          bg-amber-50
                          border
                          border-amber-100
                        "
                      >
                        <Star size={12} className="text-amber-500 fill-amber-400" />

                        <span className="text-[11px] font-bold text-amber-700">{rating}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          FOOTER MESSAGE
      ====================================================== */}
      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          py-4
          text-xs
          text-gray-400
        "
      >
        <CheckCircle2 size={14} className="text-green-500" />

        <span>This project is now part of your completed project history.</span>
      </div>
    </div>
  );
};

export default ProjectCompleted;
