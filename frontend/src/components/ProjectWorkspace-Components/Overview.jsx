import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Info, Code2, Folder, Users, Eye, Clock, Activity, Sparkles, CheckCircle2, X, AlertCircle, ArrowRight } from "lucide-react";
import overview from "../../assets/overview.png";
import LoadingScreen from "../../Pages/LoadingScreen";

const Overview = () => {
  const { project } = useOutletContext();
  const techStack = project?.techStack || [];
  const [loading, setLoading] = useState();

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <div className="w-full h-full">
      {/* =========================================================
          MAIN OVERVIEW CARD
      ========================================================== */}
      <div className="w-full rounded-3xl bg-white border border-purple-100 shadow-sm overflow-hidden">
        {/* =========================================================
            PROJECT HERO
        ========================================================== */}
        <section className="p-7 lg:p-8">
          <div className="flex flex-col gap-7">
            {/* TOP HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              {/* LEFT */}
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F4E9FA] flex items-center justify-center">
                    <Info size={20} className="text-[#7B2CBF]" />
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#A179B0]">Project Overview</p>

                    <h2 className="text-xl font-bold text-[#4B185F]">{project?.projectName || "Project"}</h2>
                  </div>
                </div>

                <p className="max-w-3xl text-sm lg:text-[15px] leading-7 text-gray-600">{project?.overview}</p>
              </div>
            </div>

            {/* STATUS / WORKSPACE BADGES */}
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-green-50
                  border
                  border-green-100
                "
              >
                <span className={`w-2 h-2 rounded-full ${project?.status === "COMPLETED" ? "bg-gray-500" : "bg-green-500"}`} />

                <span className={`text-xs font-semibold ${project?.status === "COMPLETED" ? "text-gray-700" : "text-green-700"}`}>
                  {project?.status}
                </span>
              </div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-[#F7EFFB]
                  border
                  border-purple-100
                "
              >
                <Sparkles size={14} className="text-[#8B3FC7]" />

                <span className="text-xs font-semibold text-[#6B21A8]">Project Workspace</span>
              </div>
            </div>

            {/* IMAGE + QUICK SUMMARY */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
              {/* SUMMARY CARD */}
              <div
                className="
                  rounded-2xl
                  border
                  border-purple-100
                  bg-linear-to-br
                  from-[#FBF8FD]
                  to-[#F7EFFB]
                  p-6
                "
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <Folder size={16} className="text-[#7B2CBF]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#5B1F73]">Project Summary</h3>

                    <p className="text-[11px] text-gray-400">Quick information about your project</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white border border-purple-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={15} className="text-[#8B3FC7]" />
                      <span className="text-[11px] text-gray-400">Project Type</span>
                    </div>

                    <p className="text-sm font-semibold text-gray-800">Team Project</p>
                  </div>

                  <div className="rounded-xl bg-white border border-purple-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye size={15} className="text-[#8B3FC7]" />
                      <span className="text-[11px] text-gray-400">Visibility</span>
                    </div>

                    <p className="text-sm font-semibold text-gray-800">Public</p>
                  </div>

                  <div className="rounded-xl bg-white border border-purple-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={15} className="text-[#8B3FC7]" />
                      <span className="text-[11px] text-gray-400">Current Status</span>
                    </div>

                    <p className="text-sm font-semibold text-gray-800">{project?.status}</p>
                  </div>

                  <div className="rounded-xl bg-white border border-purple-50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={15} className="text-[#8B3FC7]" />
                      <span className="text-[11px] text-gray-400">Last Updated</span>
                    </div>

                    <p className="text-sm font-semibold text-gray-800">20 May 2025</p>
                  </div>
                </div>
              </div>

              {/* IMAGE */}
              <div
                className="
                  relative
                  min-h-62.5
                  rounded-2xl
                  overflow-hidden
                  border
                  border-purple-100
                "
                style={{
                  background: "linear-gradient(135deg, #F5EDFF, #EDE4FF)",
                }}
              >
                <img src={overview} alt="Project" className="w-full h-full object-cover" />

                <div
                  className="
                    absolute
                    -top-10
                    -right-10
                    w-28
                    h-28
                    rounded-full
                    border
                    border-purple-200
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-14
                    -left-10
                    w-32
                    h-32
                    rounded-full
                    border
                    border-purple-200
                  "
                />
              </div>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="mx-7 lg:mx-8 border-t border-gray-100" />

        {/* =========================================================
            TECH STACK
        ========================================================== */}
        <section className="px-7 lg:px-8 py-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  bg-purple-50
                "
              >
                <Code2 size={19} className="text-[#7B2CBF]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-[#6B21A8]">Tech Stack</h2>

                <p className="text-xs text-gray-400 mt-0.5">Technologies used in this project</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-[#9B6AA8]">{techStack.length} Technologies</span>
          </div>

          {/* TECH BADGES */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-xs
                  font-semibold
                  border
                  border-purple-100
                  bg-[#F7EFFB]
                  text-[#6B21A8]
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-sm
                  hover:border-purple-200
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B4DCA]" />
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="mx-7 lg:mx-8 border-t border-gray-100" />

        {/* =========================================================
            PROJECT DETAILS
        ========================================================== */}
        <section className="px-7 lg:px-8 py-7">
          <div className="flex items-center gap-2.5 mb-6">
            <div
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                bg-purple-50
              "
            >
              <Folder size={18} className="text-purple-600" />
            </div>

            <div>
              <h2 className="text-base font-bold text-[#6B21A8]">Project Details</h2>

              <p className="text-xs text-gray-400 mt-0.5">General information about this project</p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
            {/* CATEGORY */}
            <div className="flex items-center justify-between gap-5 py-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Folder size={17} className="text-purple-500" />
                <span className="text-sm">Category</span>
              </div>

              <span className="text-sm font-semibold text-gray-900">Web Application</span>
            </div>

            {/* PROJECT TYPE */}
            <div className="flex items-center justify-between gap-5 py-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Users size={17} className="text-purple-500" />
                <span className="text-sm">Project Type</span>
              </div>

              <span className="text-sm font-semibold text-gray-900">Team Project</span>
            </div>

            {/* VISIBILITY */}
            <div className="flex items-center justify-between gap-5 py-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Eye size={17} className="text-purple-500" />
                <span className="text-sm">Visibility</span>
              </div>

              <span className="text-sm font-semibold text-gray-900">Public</span>
            </div>

            {/* LAST UPDATED */}
            <div className="flex items-center justify-between gap-5 py-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Clock size={17} className="text-purple-500" />
                <span className="text-sm">Last Updated</span>
              </div>

              <span className="text-sm font-semibold text-gray-900">20 May 2025</span>
            </div>

            {/* STATUS */}
            <div className="flex items-center justify-between gap-5 py-2">
              <div className="flex items-center gap-3 text-gray-500">
                <Activity size={17} className="text-purple-500" />
                <span className="text-sm">Status</span>
              </div>

              <span
                className={`
                  text-xs
                  font-bold
                  px-3
                  py-1.5
                  rounded-lg
                  ${project?.status === "COMPLETED" ? "bg-gray-100 text-gray-700" : "bg-green-50 text-green-700"}
                `}
              >
                {project?.status}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================
          COMPLETE PROJECT MODAL
      ========================================================== */}
      {showCompleteModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            px-4
            bg-black/30
            backdrop-blur-md
          "
        >
          {/* MODAL */}
          <div
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              bg-white
              border
              border-purple-100
              shadow-2xl
              p-7
              animate-[fadeIn_0.2s_ease-out]
            "
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowCompleteModal(false)}
              className="
                absolute
                top-5
                right-5
                w-8
                h-8
                rounded-lg
                flex
                items-center
                justify-center
                text-gray-400
                hover:bg-gray-100
                hover:text-gray-600
                transition
              "
            >
              <X size={17} />
            </button>

            {/* ICON */}
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-[#F4E9FA]
                flex
                items-center
                justify-center
                mb-5
              "
            >
              <CheckCircle2 size={27} className="text-[#7B2CBF]" />
            </div>

            {/* TITLE */}
            <h2 className="text-xl font-bold text-[#4B185F]">Complete Project?</h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to mark <span className="font-semibold text-gray-800">"{project?.projectName}"</span> as completed?
            </p>

            {/* INFORMATION BOX */}
            <div
              className="
                mt-5
                rounded-2xl
                bg-[#FAF7FC]
                border
                border-purple-100
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-[#8B3FC7]" />

                <div>
                  <p className="text-xs font-bold text-[#5B1F73]">This action will:</p>

                  <ul className="mt-2 space-y-2">
                    <li className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B4DCA]" />
                      Mark the project as completed
                    </li>

                    <li className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B4DCA]" />
                      Complete the project lifecycle
                    </li>

                    <li className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B4DCA]" />
                      Update participating students' statistics
                    </li>

                    <li className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#9B4DCA]" />
                      Record their final project ratings
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCompleteModal(false)}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  text-xs
                  font-semibold
                  text-gray-600
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  handleTaskComplete();
                  setShowCompleteModal(false);
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  text-xs
                  font-semibold
                  text-white
                  bg-[#5B1F73]
                  hover:bg-[#4B185F]
                  shadow-sm
                  hover:shadow-md
                  transition-all
                "
              >
                Complete Project
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
