import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Users, Star, Briefcase, GraduationCap, MoreVertical, Code2, Crown } from "lucide-react";

const Team = () => {
  const { project, teamMembers = [], fetchData } = useOutletContext();
  const [openMenuFor, setOpenMenuFor] = useState(null);
  const [removingMemberId, setRemovingMemberId] = useState(null);
  const [error, setError] = useState("");

  const removeMember = async (member) => {
    if (!window.confirm(`Remove ${member.studentName} from this project?`)) return;
    try {
      setRemovingMemberId(member.memberId);
      setError("");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/pMember/removeMember?projectId=${project.id}&memberId=${member.memberId}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unable to remove member");
      }
      setOpenMenuFor(null);
      await fetchData?.();
    } catch (err) {
      setError(err.message || "Unable to remove member.");
    } finally {
      setRemovingMemberId(null);
    }
  };

  return (
    <div className="w-full">
      {/* ================= MAIN CARD ================= */}
      <div className="w-full rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="px-7 py-5 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#F3E8FF" }}>
                <Users size={21} style={{ color: "#7B2CBF" }} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>

                  {/* Count */}
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: "#F3E8FF",
                      color: "#7B2CBF",
                    }}
                  >
                    {teamMembers.length}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">People currently working on this project.</p>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}

        {/* ================= TEAM GRID ================= */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => {
              const initial = member.studentName ? member.studentName.charAt(0).toUpperCase() : "?";

              return (
                <div
                  key={index}
                  className={`
                    group
                    relative
                    rounded-2xl
                    border
                    p-5
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-md
                    ${member.role === "ADMIN" ? "border-purple-200 bg-purple-50/40" : "border-gray-100 bg-white"}
                  `}
                >
                  {/* ================= TOP ================= */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div
                        className="
                          w-12
                          h-12
                          rounded-full
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                        style={{
                          backgroundColor: member.role === "ADMIN" ? "#A855C7" : "#EDE9FE",
                        }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{
                            color: member.role === "ADMIN" ? "white" : "#7B2CBF",
                          }}
                        >
                          {initial}
                        </span>
                      </div>

                      {/* Name */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-semibold text-gray-900 truncate">{member.studentName}</h3>

                          {member.role === "ADMIN" && <Crown size={14} className="text-purple-500 shrink-0" />}
                        </div>

                        <p className="text-xs text-gray-500 mt-0.5">{member.email}</p>
                      </div>
                    </div>

                    {/* More button */}
                    {member.role !== "ADMIN" && (
                      <div className="relative">
                        <button
                          type="button"
                          aria-label={`Actions for ${member.studentName}`}
                          onClick={() => setOpenMenuFor(openMenuFor === member.memberId ? null : member.memberId)}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenuFor === member.memberId && (
                          <div className="absolute right-0 top-9 z-20 w-36 rounded-xl border border-red-100 bg-white p-1.5 shadow-lg">
                            <button type="button" onClick={() => removeMember(member)} disabled={removingMemberId === member.memberId} className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60">
                              {removingMemberId === member.memberId ? "Removing..." : "Remove member"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}                  </div>

                  {/* ================= ROLE ================= */}
                  <div className="mt-5">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-3
                        py-1.5
                        rounded-lg
                        text-xs
                        font-medium
                      "
                      style={{
                        backgroundColor: member.role === "ADMIN" ? "#F3E8FF" : "#F5F3FF",
                        color: "#6B21A8",
                      }}
                    >
                      {member.role === "ADMIN" && <Crown size={12} />}
                      {member.role}
                    </span>
                  </div>

                  {/* ================= STATS ================= */}
                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                      mt-5
                      pt-4
                      border-t
                      border-gray-100
                    "
                  >
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                        "
                        style={{ backgroundColor: "#FFF7ED" }}
                      >
                        <Star size={15} className="text-orange-500" fill="currentColor" />
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">Rating</p>

                        <p className="text-sm font-semibold text-gray-800">{member.rating}</p>
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          w-8
                          h-8
                          rounded-lg
                          flex
                          items-center
                          justify-center
                        "
                        style={{ backgroundColor: "#F3E8FF" }}
                      >
                        <Briefcase size={15} className="text-purple-600" />
                      </div>

                      <div>
                        <p className="text-[11px] text-gray-400">Projects</p>

                        <p className="text-sm font-semibold text-gray-800">{member.completedProjects}</p>
                      </div>
                    </div>
                  </div>

                  {/* ================= ACADEMIC INFO ================= */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <GraduationCap size={14} className="text-purple-500" />

                      <span>
                        Year {member.currentYear} · {member.department}
                      </span>
                    </div>
                  </div>

                  {/* ================= TECHNICAL INTEREST ================= */}
                  <div className="mt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Code2 size={14} className="text-purple-500" />

                      <span className="text-xs font-medium text-gray-500">Skills</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {member.technicalInterest?.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="
                              px-2.5
                              py-1
                              rounded-md
                              text-[11px]
                              font-medium
                            "
                          style={{
                            backgroundColor: "#F3EAF8",
                            color: "#6B21A8",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ================= VIEW PROFILE ================= */}
                  <button
                    className="
                      w-full
                      mt-5
                      py-2
                      rounded-lg
                      text-xs
                      font-medium
                      border
                      border-purple-200
                      text-purple-700
                      hover:bg-purple-50
                      transition
                    "
                  >
                    View Profile
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
