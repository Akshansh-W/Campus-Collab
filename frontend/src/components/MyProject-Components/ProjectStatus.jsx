import React from "react";
import { Sparkles } from "lucide-react";

const ProjectStatus = ({ projects }) => {
  return (
    <div className="w-full rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold" style={{ color: "#5B1F73" }}>
        Project Status
      </h3>

      {/* Total Projects */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-gray-500">Total Projects</span>
        <span className="text-lg font-bold" style={{ color: "#5B1F73" }}>
          {projects.length}
        </span>
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-xl px-4 py-3 flex items-start gap-2" style={{ backgroundColor: "#F3ECF8" }}>
        <Sparkles size={14} className="mt-0.5 shrink-0" style={{ color: "#A56ABD" }} />
        <p className="text-xs" style={{ color: "#5B2A86" }}>
          Keep project intros concise.
        </p>
      </div>
    </div>
  );
};

export default ProjectStatus;
