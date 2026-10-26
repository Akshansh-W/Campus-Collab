import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Users, UserRound, ClipboardPlus, CalendarDays, Flag, FileText, Send, CheckCircle2 } from "lucide-react";

export default function TaskAssignment() {
  const { projectId } = useParams();

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    dueDate: "",
  });

  const [loadingMembers, setLoadingMembers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);

        const response = await fetch(`${BASE_URL}/pMember/getMembers?projectId=${projectId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch project members");
        }

        const data = await response.json();

        const validMembers = data.filter((member) => member.role === "MEMBER");

        setMembers(validMembers);
      } catch (err) {
        console.error(err);
        setError("Unable to load project members.");
      } finally {
        setLoadingMembers(false);
      }
    };

    if (projectId) {
      fetchMembers();
    }
  }, [projectId, BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setMessage("");
    setError("");
  };

  // ============================
  // ASSIGN TASK
  // ============================

  const handleAssignTask = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!selectedMember) {
      setError("Please select a team member.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a task title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a task description.");
      return;
    }

    if (!formData.dueDate) {
      setError("Please select a due date.");
      return;
    }

    try {
      setSubmitting(true);

      const taskData = {
        rollNumber: Number(selectedMember.rollNumber),
        projectId: Number(projectId),
        title: formData.title,
        description: formData.description,
        status: "ASSIGNED",
        priority: formData.priority,
        dueDate: formData.dueDate,
      };

      const response = await fetch(`${BASE_URL}/task/assignTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign task");
      }

      setMessage(`Task assigned successfully to ${selectedMember.studentName || "the student"}.`);

      // Clear form
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to assign task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F5F1FA]">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EBDD F2] flex items-center justify-center">
            <ClipboardPlus size={20} className="text-[#6B2B87]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#321441]">Assign Tasks</h2>

            <p className="text-sm text-[#806B87] mt-1">Assign work to members of your project team.</p>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ================================================= */}
        {/* TEAM MEMBERS */}
        {/* ================================================= */}

        <div className="xl:col-span-2">
          <div className="bg-white border border-[#E5D8EB] rounded-3xl shadow-sm overflow-hidden">
            {/* Card Header */}

            <div className="px-6 py-5 border-b border-[#EEE6F1] bg-linear-to-r from-[#F7F0FA] to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EBDD F2] flex items-center justify-center">
                    <Users size={19} className="text-[#6B2B87]" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#321441]">Team Members</h3>

                    <p className="text-xs text-[#92769D] mt-0.5">Select a member to assign a task</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-[#EEE3F3] text-[#65317C] text-xs font-semibold">{members.length}</span>
              </div>
            </div>

            {/* Members */}

            <div className="p-4">
              {loadingMembers ? (
                <div className="py-12 text-center">
                  <div className="w-8 h-8 mx-auto border-2 border-[#D9C5E2] border-t-[#6B2B87] rounded-full animate-spin" />

                  <p className="text-xs text-[#92769D] mt-3">Loading team members...</p>
                </div>
              ) : members.length === 0 ? (
                <div className="py-12 text-center">
                  <Users size={25} className="mx-auto text-[#AD99B5]" />

                  <p className="text-sm font-medium text-[#6F5B76] mt-3">No team members found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {members.map((member) => {
                    const name = member.studentName;
                    const role = member.appliedRole;
                    const rollNumber = member.rollNumber;

                    const isSelected = selectedMember && String(selectedMember.rollNumber) === String(rollNumber);
                    return (
                      <button
                        key={member.memberId}
                        type="button"
                        onClick={() => handleSelectMember(member)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                          isSelected
                            ? "bg-[#F2E8F6] border-[#B889C7] shadow-sm"
                            : "bg-white border-transparent hover:bg-[#FAF7FC] hover:border-[#E8DCEF]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Avatar */}

                          <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                              isSelected ? "bg-[#D9BCE4] text-[#5B1F73]" : "bg-[#EEE3F3] text-[#6B2B87]"
                            }`}
                          >
                            {name.charAt(0).toUpperCase()}
                          </div>

                          {/* Member Info */}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-[#392043] truncate">{name}</p>

                              {isSelected && <CheckCircle2 size={15} className="text-[#6B2B87] shrink-0" />}
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 rounded-full bg-[#F0E7F4] text-[#70408A] text-[10px] font-semibold">
                                {member.role || "MEMBER"}
                              </span>

                              <span className="inline-flex items-center max-w-30 px-2.5 py-1 rounded-md bg-[#F8F1FA] text-[10px] font-semibold text-[#5B1F73] border border-[#F8F1FA] truncate">
                                {role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* ASSIGN TASK FORM */}
        {/* ================================================= */}

        <div className="xl:col-span-3">
          <div className="bg-white border border-[#E5D8EB] rounded-3xl shadow-sm overflow-hidden">
            {/* Form Header */}

            <div className="px-6 py-5 bg-linear-to-r from-[#F7F0FA] to-white border-b border-[#EEE6F1]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EBDD F2] flex items-center justify-center">
                  <ClipboardPlus size={19} className="text-[#6B2B87]" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#321441]">New Task</h3>

                  <p className="text-xs text-[#92769D] mt-0.5">Create and assign a task</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAssignTask} className="p-6">
              {/* Selected Member */}

              <div className="mb-6">
                <label className="block text-xs font-semibold text-[#5A4262] mb-2">Assign To</label>

                <div className="rounded-xl border border-[#E5D8EB] bg-[#FAF7FC] px-4 py-3">
                  {selectedMember ? (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E5D5EC] flex items-center justify-center text-xs font-bold text-[#5B1F73]">
                        {(selectedMember.studentName || selectedMember.student?.studentName || "M").charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#392043]">
                          {selectedMember.studentName || selectedMember.student?.studentName || "Member"}
                        </p>

                        <p className="text-[11px] text-[#92769D]">{selectedMember.appliedRole || selectedMember.role || "Member"}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-[#A08CA7]">
                      <UserRound size={16} />
                      Select a team member
                    </div>
                  )}
                </div>
              </div>

              {/* Task Title */}

              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#5A4262] mb-2">Task Title</label>

                <div className="relative">
                  <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A18AA9]" />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Create the homepage"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4D8E9] bg-white text-sm text-[#392043] outline-none focus:border-[#9A6AAD] focus:ring-2 focus:ring-[#EBDD F2] placeholder:text-[#B09E B6]"
                  />
                </div>
              </div>

              {/* Description */}

              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#5A4262] mb-2">Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what needs to be completed..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E4D8E9] bg-white text-sm text-[#392043] outline-none resize-none focus:border-[#9A6AAD] focus:ring-2 focus:ring-[#EBDDF2] placeholder:text-[#B09EB6]"
                />
              </div>

              {/* Priority + Due Date */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Priority */}

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5A4262] mb-2">
                    <Flag size={13} />
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4D8E9] bg-white text-sm text-[#392043] outline-none focus:border-[#9A6AAD] focus:ring-2 focus:ring-[#EBDDF2]"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* Due Date */}

                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5A4262] mb-2">
                    <CalendarDays size={13} />
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4D8E9] bg-white text-sm text-[#392043] outline-none focus:border-[#9A6AAD] focus:ring-2 focus:ring-[#EBDDF2]"
                  />
                </div>
              </div>

              {/* Messages */}

              {error && <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-xs font-medium text-red-600">{error}</div>}

              {message && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  {message}
                </div>
              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5B1F73] hover:bg-[#4C185F] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm transition"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Assigning Task...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Assign Task
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
