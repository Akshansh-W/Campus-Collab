import React, { useState } from "react";
import { Star, CheckCircle2, Users, MessageSquare, Trophy, X, Loader2, ArrowRight } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

const RateTeam = () => {
  const { project, teamMembers = [], fetchData } = useOutletContext();

  const navigate = useNavigate();

  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});

  const [ratingsSubmitted, setRatingsSubmitted] = useState(false);
  const [completionModal, setCompletionModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [completing, setCompleting] = useState(false);

  // --------------------------------------------------
  // Rating
  // --------------------------------------------------

  const handleRating = (memberId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [memberId]: rating,
    }));
  };

  const handleFeedback = (memberId, value) => {
    setFeedback((prev) => ({
      ...prev,
      [memberId]: value,
    }));
  };

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  const getMemberId = (member) => {
    return member.memberId;
  };

  const getMemberName = (member) => {
    return member.studentName;
  };

  const getMemberRole = (member) => {
    return member.appliedRole;
  };

  const getMemberRollNumber = (member) => {
    return member.rollNumber;
  };

  // --------------------------------------------------
  // Remove Admin from Rating
  // --------------------------------------------------

  const rateableMembers = teamMembers.filter((member) => member.role !== "ADMIN");

  // --------------------------------------------------
  // Rating condition
  // --------------------------------------------------

  const ratedMembers = rateableMembers.filter((member) => ratings[getMemberId(member)]);

  const totalMembers = rateableMembers.length;
  const totalRated = ratedMembers.length;

  const allMembersRated = totalMembers > 0 && totalRated === totalMembers;

  const projectCompleted = project?.status === "COMPLETED";

  // --------------------------------------------------
  // Submit Ratings
  // --------------------------------------------------

  const handleSubmitRatings = async () => {
    if (!allMembersRated || !project?.id) return;

    try {
      setLoading(true);

      await Promise.all(
        rateableMembers.map(async (member) => {
          const memberId = getMemberId(member);

          const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/project/submitRatings`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              projectId: project.id,
              studentRollNumber: Number(getMemberRollNumber(member)),
              rating: ratings[memberId],
              comment: feedback[memberId] || "",
            }),
          });

          if (!response.ok) {
            const data = await response.json().catch(() => ({}));

            throw new Error(data.message || "Unable to submit team ratings");
          }
        }),
      );

      setRatingsSubmitted(true);
      setCompletionModal(true);
    } catch (err) {
      console.error("Error submitting ratings:", err);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Complete Project
  // --------------------------------------------------

  const handleCompleteProject = async () => {
    try {
      setCompleting(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/project/completeProject?projectId=${project.id}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        throw new Error("Failed to complete project");
      }

      if (fetchData) {
        await fetchData();
      }

      setCompletionModal(false);

      // Navigate to completed page
      navigate(`/projectworkspace/${project.id}/completed`);
    } catch (err) {
      console.error("Project completion error:", err);
    } finally {
      setCompleting(false);
    }
  };

  // --------------------------------------------------
  // Already completed
  // --------------------------------------------------

  if (projectCompleted) {
    return (
      <div className="min-h-full bg-[#F5F1FA] p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-12 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-6">
              <CheckCircle2 size={42} className="text-[#5B1F73]" />
            </div>

            <h1 className="text-3xl font-bold text-[#3F1552]">Project Completed</h1>

            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              This project has already been completed. Task operations and further project completion actions are no longer available.
            </p>

            <button
              onClick={() => navigate(`/projectworkspace/${project.id}/completed`)}
              className="mt-7 px-6 py-3 rounded-xl bg-[#5B1F73] text-white font-medium hover:bg-[#4A175F] transition flex items-center gap-2 mx-auto"
            >
              View Project
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Main UI
  // --------------------------------------------------

  return (
    <div className="min-h-full bg-[#F5F1FA] p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ------------------------------------------ */}
        {/* Header */}
        {/* ------------------------------------------ */}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-xl bg-[#E7DBEF] flex items-center justify-center">
              <Trophy size={23} className="text-[#5B1F73]" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#3F1552]">Rate Your Team</h1>

              <p className="text-gray-500 text-sm mt-1">Give feedback to your collaborators before completing the project.</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------ */}
        {/* Progress Card */}
        {/* ------------------------------------------ */}

        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 mb-7">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4E9FA] flex items-center justify-center">
                <Users size={20} className="text-[#6B2B87]" />
              </div>

              <div>
                <p className="font-semibold text-gray-800">Rating Progress</p>

                <p className="text-sm text-gray-500">
                  {totalRated} of {totalMembers} members rated
                </p>
              </div>
            </div>

            <span className="text-lg font-bold text-[#5B1F73]">{totalMembers > 0 ? Math.round((totalRated / totalMembers) * 100) : 0}%</span>
          </div>

          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#7B2CBF] rounded-full transition-all duration-500"
              style={{
                width: `${totalMembers > 0 ? (totalRated / totalMembers) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* ------------------------------------------ */}
        {/* Team Members */}
        {/* ------------------------------------------ */}

        <div className="space-y-5">
          {rateableMembers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-purple-100 p-10 text-center">
              <Users size={40} className="mx-auto text-purple-300 mb-4" />

              <h3 className="text-lg font-semibold text-gray-700">No team members found</h3>

              <p className="text-sm text-gray-500 mt-1">There are no collaborators available to rate.</p>
            </div>
          ) : (
            rateableMembers.map((member) => {
              const memberId = getMemberId(member);
              const currentRating = ratings[memberId] || 0;

              return (
                <div key={memberId} className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6">
                  {/* Member Header */}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#E7DBEF] to-[#F4E9FA] flex items-center justify-center text-[#5B1F73] font-bold text-lg">
                        {getMemberName(member).charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{getMemberName(member)}</h3>

                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="px-2.5 py-1 rounded-lg bg-[#F4E9FA] text-[#6B2B87] text-xs font-medium">{getMemberRole(member)}</span>

                          <span className="text-xs text-gray-400">Roll No. {getMemberRollNumber(member)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stars */}

                    <div>
                      <p className="text-xs text-gray-500 mb-2 text-center md:text-right">Your Rating</p>

                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            disabled={ratingsSubmitted}
                            onClick={() => handleRating(memberId, star)}
                            className={`transition-transform ${!ratingsSubmitted ? "hover:scale-110" : ""}`}
                          >
                            <Star size={25} className={star <= currentRating ? "fill-[#F5B642] text-[#F5B642]" : "text-gray-300"} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}

                  <div className="mt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare size={16} className="text-[#7B2CBF]" />

                      <label className="text-sm font-medium text-gray-700">
                        Feedback
                        <span className="text-gray-400 font-normal"> (optional)</span>
                      </label>
                    </div>

                    <textarea
                      value={feedback[memberId] || ""}
                      disabled={ratingsSubmitted}
                      onChange={(e) => handleFeedback(memberId, e.target.value)}
                      maxLength={300}
                      rows={3}
                      placeholder={`Write something about ${getMemberName(member)}'s contribution...`}
                      className="w-full resize-none rounded-xl border border-purple-100 bg-[#FCF9FD] px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-200 focus:border-[#A855D8] transition"
                    />

                    <div className="text-right text-xs text-gray-400 mt-1">{(feedback[memberId] || "").length}/300</div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ------------------------------------------ */}
        {/* Bottom Actions */}
        {/* ------------------------------------------ */}

        <div className="mt-8 bg-white rounded-2xl border border-purple-100 shadow-sm p-5">
          {!ratingsSubmitted ? (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800">Ready to submit ratings?</p>

                {!allMembersRated ? (
                  <p className="text-sm text-gray-500 mt-1">Rate every team member before continuing.</p>
                ) : (
                  <p className="text-sm text-green-600 mt-1">All team members have been rated.</p>
                )}
              </div>

              <button
                onClick={handleSubmitRatings}
                disabled={!allMembersRated || loading}
                className={`px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${
                  allMembersRated ? "bg-[#5B1F73] text-white hover:bg-[#4A175F]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Submit Ratings
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 size={21} className="text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Ratings submitted</p>

                  <p className="text-sm text-gray-500">Your team ratings are complete.</p>
                </div>
              </div>

              <button
                onClick={() => setCompletionModal(true)}
                className="px-6 py-3 rounded-xl bg-[#5B1F73] text-white font-medium hover:bg-[#4A175F] transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} />
                Mark Project Complete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* Completion Confirmation Modal */}
      {/* ================================================= */}

      {completionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
            {/* Modal Header */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#E7DBEF] flex items-center justify-center">
                  <Trophy size={22} className="text-[#5B1F73]" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-800">Complete Project</h2>

                  <p className="text-xs text-gray-500">Final confirmation</p>
                </div>
              </div>

              <button
                onClick={() => setCompletionModal(false)}
                disabled={completing}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
              >
                <X size={19} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}

            <div className="px-6 py-6">
              <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to complete this project?</h3>

              <p className="text-sm text-gray-500 mt-3 leading-6">
                Completing <span className="font-semibold text-[#5B1F73]">{project?.projectName}</span> will close the project and disable further
                task operations.
              </p>

              <div className="mt-5 bg-[#F7EFFB] rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={19} className="text-[#7B2CBF] mt-0.5 shrink-0" />

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>✓ Team ratings have been submitted</p>
                    <p>✓ Project will be marked as completed</p>
                    <p>✓ Task operations will be disabled</p>
                    <p>✓ Project history will be preserved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button
                onClick={() => setCompletionModal(false)}
                disabled={completing}
                className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCompleteProject}
                disabled={completing}
                className="px-5 py-2.5 rounded-xl bg-[#5B1F73] text-white font-medium hover:bg-[#4A175F] transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {completing ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={17} />
                    Yes, Complete Project
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateTeam;
