import { FolderOpen, MoreVertical, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  "In Progress": { bg: "#F1E4FB", text: "#8B3AB0", dot: "#8B3AB0" },
  Completed: { bg: "#E1F5EA", text: "#1E9E5A", dot: "#1E9E5A" },
};

export default function ProjectsAndRecommendation({ activeProjects = [] }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex h-full w-full flex-col rounded-3xl bg-white px-6 py-6"
      style={{ boxShadow: "0 4px 24px rgba(91,31,115,0.06)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FolderOpen size={20} style={{ color: "#5B1F73" }} />
          <h3 className="text-base font-bold text-gray-900">My Projects</h3>
        </div>
        <button
          type="button"
          className="text-xs font-medium rounded-lg px-3 py-1.5"
          style={{ backgroundColor: "#F3ECF8", color: "#5B1F73" }}
        >
          View All Projects →
        </button>
      </div>

      {/* Rows */}
      <div className="flex flex-1 flex-col divide-y divide-gray-100">
        {!Array.isArray(activeProjects) || activeProjects.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">
            No projects yet — create one to get started.
          </p>
        ) : (
          activeProjects.map((project, index) => {
            const name =
              typeof project === "string" ? project : project?.projectName || "Untitled";

            const status =
              typeof project === "string"
                ? "In Progress"
                : project?.status || "In Progress";

            // Safely retrieve array tags regardless of API schema
            const tags =
              typeof project === "string"
                ? []
                : Array.isArray(project?.techStack)
                ? project.techStack
                : [];

            const badge = name?.slice(0, 2).toUpperCase() || "PR";
            const statusStyle =
              STATUS_STYLES[status] || STATUS_STYLES["In Progress"];

            return (
              <div key={index} className="flex items-center gap-4 py-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ backgroundColor: "#EDE4F7", color: "#7A3A93" }}
                >
                  {badge}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {name}
                  </p>
                  {tags.length > 0 && (
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium rounded-full px-2 py-0.5"
                          style={{
                            backgroundColor: "#F3F1F6",
                            color: "#6B6577",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span
                  className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1.5"
                  style={{
                    backgroundColor: statusStyle.bg,
                    color: statusStyle.text,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: statusStyle.dot }}
                  />
                  {status}
                </span>

                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 shrink-0"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Create new project */}
      <button
        type="button"
        onClick={() => navigate("/project")}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium"
        style={{
          borderColor: "#E7DBEF",
          color: "#5B1F73",
          backgroundColor: "#F9F5FC",
        }}
      >
        <Plus size={16} />
        Create New Project
      </button>
    </div>
  );
}