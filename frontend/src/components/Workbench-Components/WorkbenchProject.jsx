import { FileText, Code2, ClipboardList, Sparkles } from "lucide-react";

export default function WorkbenchProject({ project }) {
  return (
    <div className="bg-white border border-[#E5D8EB] rounded-3xl p-6 mb-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#EBDD F2] to-[#F3EAF6] flex items-center justify-center">
          <FileText size={21} className="text-[#5B1F73]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#321441]">Project Details</h2>

          <p className="text-xs text-[#92769D] mt-0.5">Overview of the project you're working on</p>
        </div>
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* About */}
        <div className="lg:col-span-2 rounded-2xl bg-linear-to-br from-[#FAF7FC] to-[#F5EDF8] border border-[#EDE2F1] p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <FileText size={16} className="text-[#70408A]" />
            </div>

            <h3 className="text-sm font-semibold text-[#43204F]">About Project</h3>
          </div>

          <p className="text-sm leading-6 text-[#725D7A]">{project?.overview || "No project overview available."}</p>
        </div>

        {/* Status / project info */}
        <div className="rounded-2xl bg-[#F8F2FA] border border-[#E8D9EF] p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <Sparkles size={16} className="text-[#7A3A93]" />
            </div>

            <h3 className="text-sm font-semibold text-[#43204F]">Project Status</h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {project?.status || "ACTIVE"}
          </div>
        </div>

        {/* Technology */}
        <div className="lg:col-span-2 rounded-2xl bg-[#FCFAFD] border border-[#EEE5F1] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#EEE3F3] flex items-center justify-center">
              <Code2 size={16} className="text-[#65317C]" />
            </div>

            <h3 className="text-sm font-semibold text-[#43204F]">Technology</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {project?.techStack?.map((tech, index) => {
              const colors = [
                "bg-[#F0E6F5] text-[#64307D]",
                "bg-[#EAF0FA] text-[#42658C]",
                "bg-[#EAF6F1] text-[#31745A]",
                "bg-[#FFF4E3] text-[#A36A27]",
              ];

              return (
                <span key={index} className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold ${colors[index % colors.length]}`}>
                  {tech}
                </span>
              );
            })}
          </div>
        </div>

        {/* Requirements */}
        <div className="rounded-2xl bg-[#F8F4FB] border border-[#E8DDEF] p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <ClipboardList size={16} className="text-[#70408A]" />
            </div>

            <h3 className="text-sm font-semibold text-[#43204F]">Requirements</h3>
          </div>

          <p className="text-sm leading-5 text-[#735E7B]">{project?.requirements || "No requirements specified."}</p>
        </div>
      </div>
    </div>
  );
}
