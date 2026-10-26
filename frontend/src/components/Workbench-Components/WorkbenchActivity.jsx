import { CheckCircle2, Clock3, Users, ChevronRight, Circle, Send } from "lucide-react";

function getStatusStyle(status) {
  switch (status) {
    case "COMPLETED":
      return {
        badge: "bg-emerald-50 text-emerald-600 border border-emerald-100",
        icon: "text-emerald-500",
      };

    case "SUBMITTED":
      return {
        badge: "bg-[#F0E6F5] text-[#71358A] border border-[#E3D1EA]",
        icon: "text-[#71358A]",
      };

    case "IN_PROGRESS":
      return {
        badge: "bg-blue-50 text-blue-600 border border-blue-100",
        icon: "text-blue-500",
      };

    case "ASSIGNED":
    case "INCOMPLETE":
      return {
        badge: "bg-amber-50 text-amber-600 border border-amber-100",
        icon: "text-amber-500",
      };

    default:
      return {
        badge: "bg-gray-50 text-gray-500 border border-gray-100",
        icon: "text-gray-400",
      };
  }
}

function getStatusIcon(status) {
  const style = getStatusStyle(status);

  if (status === "COMPLETED") {
    return <CheckCircle2 size={19} className={style.icon} />;
  }

  if (status === "IN_PROGRESS") {
    return <Clock3 size={19} className={style.icon} />;
  }

  if (status === "SUBMITTED") {
    return <Send size={17} className={style.icon} />;
  }

  return <Circle size={19} className={style.icon} />;
}

export default function WorkbenchActivity({ tasks = [], team = [], onTaskStart, onTaskComplete }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* ================================================= */}
      {/* TASKS */}
      {/* ================================================= */}

      <div className="xl:col-span-2 bg-white border border-[#E5D8EB] rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-[#F7F0FA] to-white border-b border-[#EEE5F1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#EBDD F2] flex items-center justify-center">
                <CheckCircle2 size={21} className="text-[#5B1F73]" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#321441]">Assigned Tasks</h2>

                <p className="text-xs text-[#92769D] mt-0.5">Tasks assigned to you</p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-[#EEE3F3] text-[#65317C] text-xs font-semibold">
              {tasks.length} {tasks.length === 1 ? "Task" : "Tasks"}
            </div>
          </div>
        </div>

        {/* Task list */}
        <div>
          {tasks.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#F3EBF6] flex items-center justify-center mb-3">
                <CheckCircle2 size={21} className="text-[#8B65A0]" />
              </div>

              <p className="text-sm font-medium text-[#5F4968]">No tasks assigned yet</p>

              <p className="text-xs text-[#9A879F] mt-1">Your assigned tasks will appear here.</p>
            </div>
          ) : (
            tasks.map((task) => {
              const statusStyle = getStatusStyle(task.status);

              return (
                <div key={task.taskId} className="px-6 py-5 border-b border-[#F1EBF3] last:border-b-0 hover:bg-[#FCFAFD] transition">
                  <div className="flex items-center justify-between gap-5">
                    {/* Left */}
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 shrink-0">{getStatusIcon(task.status)}</div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-[#392043]">{task.title || task.tittle}</h3>

                        <p className="text-xs text-[#8B778F] mt-1 line-clamp-1">{task.description}</p>

                        {task.dueDate && (
                          <div className="flex items-center gap-2 mt-2">
                            <Clock3 size={12} className="text-[#9A879F]" />

                            <span className="text-[11px] text-[#8B778F]">Due: {task.dueDate}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-3 py-1.5 rounded-full text-[11px] font-semibold ${statusStyle.badge}`}>
                        {task.status?.replace("_", " ")}
                      </span>

                      <ChevronRight size={17} className="text-[#B09CB7]" />
                    </div>
                  </div>

                  {task.status === "ASSIGNED" && (
                    <div className="mt-4 ml-7">
                      <button type="button" onClick={() => onTaskStart?.(task.taskId)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B1F73] hover:bg-[#4B185F] text-white text-xs font-semibold shadow-sm transition">
                        Start Task
                      </button>
                    </div>
                  )}

                  {/* Student submission */}
                  {task.status === "IN_PROGRESS" && (
                    <div className="mt-4 ml-7">
                      <button
                        type="button"
                        onClick={() => onTaskComplete?.(task.taskId)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#5B1F73] hover:bg-[#4B185F] text-white text-xs font-semibold shadow-sm transition"
                      >
                        <Send size={14} />
                        Submit for Verification
                      </button>
                    </div>
                  )}

                  {/* Waiting for admin */}
                  {task.status === "SUBMITTED" && (
                    <div className="mt-3 ml-7">
                      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5EDF8] border border-[#E8D9EF]">
                        <Clock3 size={14} className="text-[#71358A]" />

                        <span className="text-xs font-medium text-[#71358A]">Waiting for admin verification</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* TEAM */}
      {/* ================================================= */}

      <div className="bg-white border border-[#E5D8EB] rounded-3xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-linear-to-r from-[#F7F0FA] to-white border-b border-[#EEE5F1]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#EBDD F2] flex items-center justify-center">
              <Users size={21} className="text-[#5B1F73]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#321441]">Team</h2>

              <p className="text-xs text-[#92769D] mt-0.5">Project members</p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="p-5">
          {team.length === 0 ? (
            <div className="py-10 text-center">
              <Users size={24} className="mx-auto text-[#A58CAD] mb-2" />

              <p className="text-sm text-[#8A748F]">No team members found.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {team.map((member) => {
                const name = member.studentName || "Member";

                return (
                  <div key={member.memberId} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F3FA] transition">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#E6D5ED] to-[#D8BDE3] flex items-center justify-center text-sm font-bold text-[#5B1F73] shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#392043] truncate">{name}</p>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            member.role === "ADMIN" ? "bg-[#EEE3F3] text-[#65317C]" : "bg-[#EEF5FA] text-[#52718C]"
                          }`}
                        >
                          {member.role || "MEMBER"}
                        </span>

                        {member.appliedRole && <span className="text-[11px] text-[#92769D] truncate">{member.appliedRole}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
