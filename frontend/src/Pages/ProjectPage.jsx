import PostProject from "../components/MyProject-Components/PostProject";
import ProjectStatus from "../components/MyProject-Components/ProjectStatus";
import ProjectHistory from "../components/MyProject-Components/ProjectHistory";
import { useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";

export default function ProjectPage() {

  const [projects,setProjects] = useState([]);
  const {error,showError} = useError();

  useEffect(()=>{
    const fetchData = async()=>{
    const rollNumber = localStorage.getItem("rollNumber");
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/project/getProject",{
      method : "POST",
      headers : {
        'content-type' : "application/json"
      },
      body : JSON.stringify(Number(rollNumber))
    })

     if (!response.ok) {
        const data = await response.json().catch(() => null);
        showError(data?.message || "Failed to fetch projects");
        return;
      }

      const data = await response.json();
      setProjects(data)
  }
  fetchData();
  },[]);

  if(error){
    showError(error);
  }

  return (
    <div className="flex w-full h-full overflow-hidden">

      {/* Main content - scrolls independently */}
      <div
        className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto h-full"
        style={{ backgroundColor: "#FCF7FA" }}
      >
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and share your work. Create entries or
            review your historical project deployments.
          </p>
        </div>

        {/* Top row: Post New Project (wider) + Project Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PostProject />
          </div>
          <div className="lg:col-span-1">
            <ProjectStatus projects={projects} />
          </div>
        </div>

        {/* Bottom: Project History */}
        <ProjectHistory projects={projects} />
      </div>
    </div>
  );
}