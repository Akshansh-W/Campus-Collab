import { ArrowLeft, ShieldCheck, UserRound, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WorkbenchHeader({ project, myRole }) {
  const navigate = useNavigate();

  return (
    <div className="mb-7">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/ongoingproject")}
        className="flex items-center gap-2 text-sm font-medium text-[#704B82] hover:text-[#5B1F73] transition mb-5"
      >
        <ArrowLeft size={17} />
        Back to Projects
      </button>

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#EDE2F3] via-[#F7F1FA] to-white border border-[#E4D5EB] px-7 py-6">
        {/* Decorative circles */}
        <div className="absolute -right-12 -top-16 w-44 h-44 rounded-full bg-[#D8BCE6] opacity-30" />
        <div className="absolute right-28 -bottom-20 w-32 h-32 rounded-full bg-[#C8A6DB] opacity-20" />

        <div className="relative flex items-start justify-between gap-8">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-[#7A3A93]">Project Workbench</span>

              <span className="w-1 h-1 rounded-full bg-[#A77CB8]" />

              <span className="text-xs text-[#92769D]">Student Workspace</span>
            </div>

            <h1 className="text-3xl font-bold text-[#321441]">{project?.projectName || "Project"}</h1>

            <p className="mt-2 text-sm leading-6 text-[#735E7B]">
              Work with your team, manage assigned tasks, and keep track of your project activities.
            </p>
          </div>

          {/* Right information */}
          <div className="relative min-w-67.5 bg-white/90 backdrop-blur-sm border border-[#E2D2EA] rounded-2xl p-5 shadow-sm">
            {/* Admin */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EDE2F3] flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#5B1F73]" />
              </div>

              <div>
                <p className="text-xs text-[#92769D]">Project Admin</p>

                <p className="text-sm font-semibold text-[#321441]">{project?.adminName || "Admin"}</p>
              </div>
            </div>

            <div className="h-px bg-[#EEE6F1] my-4" />

            {/* Your Role */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7DBEF] flex items-center justify-center">
                <UserRound size={19} className="text-[#6B2B87]" />
              </div>

              <div>
                <p className="text-xs text-[#92769D]">Your Role</p>

                <p className="text-sm font-semibold text-[#321441]">{myRole || "Member"}</p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CircleCheck size={15} />
                {project?.status || "ACTIVE"}
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#F1E8F5] text-[#6B2B87] text-[11px] font-medium">Joined Project</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
