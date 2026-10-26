import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, ArrowRight } from "lucide-react";
import LoadingScreen from "./LoadingScreen";

const STATUS_STYLES = {
  ACTIVE: { bg: "#E1F5EA", text: "#1E9E5A", dot: "#1E9E5A" },
  COMPLETED: { bg: "#E4EEFB", text: "#3B6FB6", dot: "#3B6FB6" },
  PENDING: { bg: "#FBF3D9", text: "#B98900", dot: "#B98900" },
};

export default function OnGoingProject() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const rollNumber = localStorage.getItem("rollNumber");

        const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/pMember/getStudentProjects?rollNumber=${rollNumber}`, {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Failed to load ongoing projects", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const ongoingProjects = projects.filter((project) => project.status !== "COMPLETED");

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#F5F1FA" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900">Ongoing Projects</h1>
        <p className="text-sm text-gray-500 mt-1">Projects currently in progress across campus.</p>
        {ongoingProjects.length === 0 ? (
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 px-6 py-16 flex items-center justify-center">
            <p className="text-sm text-gray-400">No ongoing projects right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 mt-8">
            {ongoingProjects.map((project) => {
              const adminInitial = project.adminName?.trim().charAt(0).toUpperCase() || "?";
              const statusStyle = STATUS_STYLES[project.status] || STATUS_STYLES.ACTIVE;

              return (
                <div key={project.id} className="w-full bg-white rounded-2xl border border-gray-100 px-8 py-7 shadow-sm">
                  <div className="flex items-center justify-between gap-6 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#EDE4F7" }}>
                        <Layers size={18} style={{ color: "#7A3A93" }} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 truncate">{project.projectName}</h3>
                      <span
                        className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1"
                        style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusStyle.dot }} />
                        {project.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#A56ABD" }}>
                          <span className="text-white text-[11px] font-semibold">{adminInitial}</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600">{project.adminName}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate(`/workbench/${project.id}`)}
                        className="text-xs font-medium rounded-lg px-4 py-2"
                        style={{ backgroundColor: "#5B1F73", color: "#FFFFFF" }}
                      >
                        Manage Project
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-4 leading-relaxed max-w-3xl">{project.overview}</p>

                  {project.requirements && (
                    <p className="text-xs text-gray-400 mt-3">
                      <span className="font-medium text-gray-500">Requirements: </span>
                      {project.requirements}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {(project.techStack || []).map((tech, i) => (
                      <span key={i} className="rounded-full text-xs font-medium px-3 py-1" style={{ backgroundColor: "#F3ECF8", color: "#5B1F73" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
