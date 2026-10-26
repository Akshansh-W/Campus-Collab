import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WorkbenchHeader from "../components/Workbench-Components/WorkbenchHeader";
import ProjectDetailsCard from "../components/Workbench-Components/WorkbenchProject";
import WorkbenchActivity from "../components/Workbench-Components/WorkbenchActivity";

export default function Workbench() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const rollNumber = localStorage.getItem("rollNumber");
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchWorkbenchData = async () => {
      try {
        setLoading(true);
        const [projectResponse, taskResponse, teamResponse] = await Promise.all([
          fetch(`${BASE_URL}/project/findProject/${projectId}`),
          fetch(`${BASE_URL}/task/getStudentTasks?rollNumber=${rollNumber}`),
          fetch(`${BASE_URL}/pMember/getMembers?projectId=${projectId}`),
        ]);
        if (projectResponse.ok) setProject(await projectResponse.json());
        if (taskResponse.ok) {
          const taskData = await taskResponse.json();
          setTasks(taskData.filter((task) => String(task.projectId) === String(projectId)));
        }
        if (teamResponse.ok) setTeam(await teamResponse.json());
      } catch (error) {
        console.error("Error fetching workbench data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkbenchData();
  }, [BASE_URL, projectId, rollNumber]);

  const updateTaskInState = (updatedTask) => {
    setTasks((previous) => previous.map((task) => task.taskId === updatedTask.taskId ? updatedTask : task));
  };

  const handleTaskStart = async (taskId) => {
    try {
      const response = await fetch(`${BASE_URL}/task/start/${taskId}`, { method: "PATCH" });
      if (!response.ok) throw new Error("Unable to start task");
      updateTaskInState(await response.json());
    } catch (error) {
      console.error("Error starting task:", error);
    }
  };

  const handleTaskComplete = async (taskId) => {
    const report = window.prompt("Briefly describe the work you completed:");
    if (report === null) return;
    const workLink = window.prompt("Add a work link (optional):");
    if (workLink === null) return;
    try {
      const response = await fetch(`${BASE_URL}/task/submit/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report, workLink }),
      });
      if (!response.ok) throw new Error("Failed to submit task");
      updateTaskInState(await response.json());
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  if (loading) return <div className="flex min-h-full w-full items-center justify-center bg-[#F5F1FA]"><div className="text-sm text-[#6B4A7D]">Loading workbench...</div></div>;
  if (!project) return <div className="flex min-h-full w-full items-center justify-center bg-[#F5F1FA]"><p className="text-[#6B4A7D]">Project not found.</p></div>;

  const myMember = team.find((member) => String(member.studentRollNumber) === String(rollNumber));
  return (
    <div className="min-h-full w-full bg-[#F5F1FA]">
      <div className="p-6">
        <WorkbenchHeader project={project} myRole={myMember?.appliedRole || "Member"} />
        <ProjectDetailsCard project={project} />
        <WorkbenchActivity tasks={tasks} team={team} onTaskStart={handleTaskStart} onTaskComplete={handleTaskComplete} />
      </div>
    </div>
  );
}