import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ClipboardList,
  UserRound,
  CalendarDays,
  Flag,
  CheckCircle2,
  Clock3,
  CircleDot,
  Users,
  Check,
  FolderKanban,
  FileText,
  ExternalLink,
  Hash,
} from "lucide-react";

export default function TaskManagement() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${BASE_URL}/task/getAllTasks?projectId=${projectId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load project tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTasks();
    }
  }, [projectId]);

  // ============================
  // MARK TASK COMPLETED
  // ============================

  const markCompleted = async (taskId) => {
    try {
      setUpdatingTask(taskId);
      setError("");

      const response = await fetch(`${BASE_URL}/task/complete/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "COMPLETED",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      setTasks((prevTasks) => prevTasks.map((task) => (task.taskId === taskId ? { ...task, status: "COMPLETED" } : task)));
    } catch (err) {
      console.error(err);
      setError("Unable to mark task as completed.");
    } finally {
      setUpdatingTask(null);
    }
  };

  // ============================
  // REQUEST CHANGES
  // ============================

  const requestChanges = async (taskId) => {
    try {
      setUpdatingTask(taskId);
      setError("");

      const response = await fetch(`${BASE_URL}/task/requestChanges/${taskId}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to request changes");
      }

      setTasks((previousTasks) => previousTasks.map((task) => (task.taskId === taskId ? { ...task, status: "IN_PROGRESS" } : task)));
    } catch (err) {
      console.error(err);
      setError("Unable to request changes.");
    } finally {
      setUpdatingTask(null);
    }
  };

  // ============================
  // STATUS UI
  // ============================

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: CheckCircle2,
        };

      case "SUBMITTED":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: Clock3,
        };

      case "IN_PROGRESS":
        return {
          bg: "bg-purple-50",
          text: "text-purple-700",
          border: "border-purple-200",
          icon: CircleDot,
        };

      default:
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: Clock3,
        };
    }
  };

  // ============================
  // PRIORITY UI
  // ============================

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-50 text-red-600 border-red-200";

      case "MEDIUM":
        return "bg-orange-50 text-orange-600 border-orange-200";

      case "LOW":
        return "bg-green-50 text-green-600 border-green-200";

      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  // ============================
  // FORMAT SUBMISSION DATE
  // ============================

  const formatSubmittedAt = (date) => {
    if (!date) return "Not submitted";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return date;
    }

    return formattedDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="w-full bg-[#F5F1FA] py-10">
        <div className="bg-white rounded-3xl border border-[#E5D8EB] p-12 text-center shadow-sm">
          <div className="w-9 h-9 mx-auto border-3 border-[#E3D2EA] border-t-[#7A3A93] rounded-full animate-spin" />

          <p className="mt-4 text-sm font-medium text-[#806B87]">Loading project tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F1FA]">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8D7F0] flex items-center justify-center">
              <ClipboardList size={23} className="text-[#6B2B87]" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#321441]">Task Management</h2>

              <p className="text-sm text-[#806B87] mt-1">Manage tasks assigned to your project team.</p>
            </div>
          </div>

          {/* Task Count */}

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5D8EB]">
            <ClipboardList size={16} className="text-[#7A3A93]" />

            <span className="text-sm font-semibold text-[#5B1F73]">
              {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* ERROR */}
      {/* ================================================= */}

      {error && <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}

      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {tasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E5D8EB] shadow-sm p-14 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#F0E5F5] flex items-center justify-center">
            <ClipboardList size={28} className="text-[#7A3A93]" />
          </div>

          <h3 className="mt-5 text-lg font-bold text-[#321441]">No tasks assigned yet</h3>

          <p className="mt-2 text-sm text-[#92769D]">Tasks assigned to your team will appear here.</p>
        </div>
      ) : (
        /* ================================================= */
        /* TASK LIST */
        /* ================================================= */

        <div className="space-y-4">
          {tasks.map((task) => {
            const statusStyle = getStatusStyle(task.status);
            const StatusIcon = statusStyle.icon;

            const isCompleted = task.status === "COMPLETED";
            const isSubmitted = task.status === "SUBMITTED";
            const isUpdating = updatingTask === task.taskId;

            return (
              <div
                key={task.taskId}
                className={`bg-white rounded-4xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
                  isCompleted ? "border-emerald-200" : "border-[#E5D8EB]"
                }`}
              >
                {/* ============================= */}
                {/* COLOR TOP STRIP */}
                {/* ============================= */}

                <div
                  className={`h-2 ${
                    isCompleted
                      ? "bg-emerald-400"
                      : task.priority === "HIGH"
                        ? "bg-red-400"
                        : task.priority === "MEDIUM"
                          ? "bg-orange-400"
                          : "bg-[#9A65B0]"
                  }`}
                />

                <div className="p-5 sm:p-6">
                  {/* ============================= */}
                  {/* TOP ROW */}
                  {/* ============================= */}

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex gap-4">
                      {/* Task Icon */}

                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? "bg-emerald-50" : "bg-[#F0E5F5]"}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={21} className="text-emerald-600" />
                        ) : (
                          <ClipboardList size={21} className="text-[#7A3A93]" />
                        )}
                      </div>

                      {/* Title */}

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`text-base font-bold ${isCompleted ? "text-[#617067]" : "text-[#321441]"}`}>{task.tittle}</h3>

                          <span
                            className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            <span className="flex items-center gap-1">
                              <StatusIcon size={11} />
                              {task.status}
                            </span>
                          </span>
                        </div>

                        <p className="text-sm text-[#806B87] mt-2 leading-relaxed max-w-2xl">{task.description}</p>
                      </div>
                    </div>

                    {/* Priority */}

                    <span className={`self-start px-3 py-1.5 rounded-full border text-[11px] font-bold ${getPriorityStyle(task.priority)}`}>
                      <span className="flex items-center gap-1.5">
                        <Flag size={12} />
                        {task.priority}
                      </span>
                    </span>
                  </div>

                  {/* ================================================= */}
                  {/* PROJECT INFORMATION */}
                  {/* ================================================= */}

                  <div className="mt-5 pt-5 border-t border-[#F0E8F3]">
                    <div className="flex items-center gap-2 mb-4">
                      <FolderKanban size={16} className="text-[#7A3A93]" />

                      <h4 className="text-xs font-bold uppercase tracking-wide text-[#5B1F73]">Project Information</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Project Name */}

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7FC] border border-[#F0E8F3]">
                        <div className="w-9 h-9 rounded-lg bg-[#E8D7F0] flex items-center justify-center">
                          <FolderKanban size={16} className="text-[#6B2B87]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[10px] text-[#9A879F]">Project</p>

                          <p className="text-sm font-semibold text-[#43204F] truncate">{task.projectName || "N/A"}</p>
                        </div>
                      </div>

                      {/* Project ID */}

                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF7FC] border border-[#F0E8F3]">
                        <div className="w-9 h-9 rounded-lg bg-[#EEE7F8] flex items-center justify-center">
                          <Hash size={16} className="text-[#7650A3]" />
                        </div>

                        <div>
                          <p className="text-[10px] text-[#9A879F]">Project ID</p>

                          <p className="text-sm font-semibold text-[#43204F]">{task.projectId}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* TASK INFORMATION */}
                  {/* ================================================= */}

                  <div className="mt-5 pt-5 border-t border-[#F0E8F3]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Student */}

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E8D7F0] flex items-center justify-center">
                          <UserRound size={17} className="text-[#6B2B87]" />
                        </div>

                        <div>
                          <p className="text-[11px] text-[#9A879F]">Assigned to</p>

                          <p className="text-sm font-semibold text-[#43204F]">{task.studentName}</p>
                        </div>
                      </div>

                      {/* Roll Number */}

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E4F0F4] flex items-center justify-center">
                          <Users size={17} className="text-[#427A8A]" />
                        </div>

                        <div>
                          <p className="text-[11px] text-[#9A879F]">Roll Number</p>

                          <p className="text-sm font-semibold text-[#43204F]">{task.studentRollNumber}</p>
                        </div>
                      </div>

                      {/* Due Date */}

                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#EEE7F8] flex items-center justify-center">
                          <CalendarDays size={17} className="text-[#7650A3]" />
                        </div>

                        <div>
                          <p className="text-[11px] text-[#9A879F]">Due date</p>

                          <p className="text-sm font-semibold text-[#43204F]">{task.dueDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* SUBMISSION DETAILS */}
                  {/* ================================================= */}

                  {(isSubmitted || isCompleted || task.report || task.workLink || task.submittedAt) && (
                    <div className="mt-5 pt-5 border-t border-[#F0E8F3]">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText size={16} className="text-[#7A3A93]" />

                        <h4 className="text-xs font-bold uppercase tracking-wide text-[#5B1F73]">Submission Details</h4>
                      </div>

                      <div className="space-y-3">
                        {/* Report */}

                        {task.report && (
                          <div className="p-4 rounded-xl bg-[#FAF7FC] border border-[#F0E8F3]">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText size={15} className="text-[#7A3A93]" />

                              <p className="text-[11px] font-semibold text-[#806B87] uppercase">Report</p>
                            </div>

                            <p className="text-sm text-[#43204F] leading-relaxed whitespace-pre-wrap">{task.report}</p>
                          </div>
                        )}

                        {/* Work Link */}

                        {task.workLink && (
                          <div className="p-4 rounded-xl bg-[#F7F4FB] border border-[#E5D8EB]">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <ExternalLink size={15} className="text-[#7A3A93] shrink-0" />

                                <div className="min-w-0">
                                  <p className="text-[11px] font-semibold text-[#806B87] uppercase">Work Link</p>

                                  <p className="text-sm text-[#43204F] truncate mt-0.5">{task.workLink}</p>
                                </div>
                              </div>

                              <a
                                href={task.workLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#5B1F73] text-white text-xs font-semibold hover:bg-[#4C185F] transition"
                              >
                                Open
                                <ExternalLink size={13} />
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Submitted At */}

                        {task.submittedAt && (
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                              <Clock3 size={16} className="text-blue-600" />
                            </div>

                            <div>
                              <p className="text-[11px] text-[#9A879F]">Submitted at</p>

                              <p className="text-sm font-semibold text-[#43204F]">{formatSubmittedAt(task.submittedAt)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ================================================= */}
                  {/* ACTION */}
                  {/* ================================================= */}

                  {task.status === "SUBMITTED" && (
                    <div className="mt-5 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => requestChanges(task.taskId)}
                        disabled={isUpdating}
                        className="rounded-xl border border-[#D9C5E2] bg-white px-4 py-2.5 text-xs font-semibold text-[#5B1F73] transition hover:bg-[#F7F0FA] disabled:opacity-60"
                      >
                        Request Changes
                      </button>

                      <button
                        type="button"
                        onClick={() => markCompleted(task.taskId)}
                        disabled={isUpdating}
                        className="flex items-center gap-2 rounded-xl bg-[#5B1F73] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#4C185F] disabled:opacity-60"
                      >
                        <Check size={15} />
                        Mark as Completed
                      </button>
                    </div>
                  )}

                  {/* Waiting */}

                  {!isCompleted && task.status !== "SUBMITTED" && (
                    <p className="mt-5 text-right text-xs font-medium text-[#92769D]">Waiting for the member's work submission.</p>
                  )}

                  {/* Completed */}

                  {isCompleted && (
                    <div className="mt-5 flex justify-end">
                      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                        <CheckCircle2 size={15} />
                        Task Completed
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
