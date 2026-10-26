import { Plus, CheckCircle2, X, Sparkles, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useError } from "../../context/ErrorContext";
import ErrorPage from "../../Pages/ErrorPage";

const PostProject = () => {
  const [projectName, setProjectName] = useState("");
  const [overview, setOverview] = useState("");
  const [requirements, setRequirements] = useState("");
  const [technicalTags, setTechnicalTags] = useState("");
  const [appliedRole, setAppliedRole] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [generatingOverview, setGeneratingOverview] = useState(false);

  const { error, showError } = useError();

  // Generate project overview using Gemini
  const handleGenerateOverview = async () => {
    if (!projectName.trim()) {
      showError("Please enter the project title first.");
      return;
    }

    if (!technicalTags.trim()) {
      showError("Please enter the technical tags first.");
      return;
    }

    if (!requirements.trim()) {
      showError("Please enter the requirements first.");
      return;
    }

    setGeneratingOverview(true);

    try {
      const response = await fetch("http://localhost:8080/ai/generateOverview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName,
          techStack: technicalTags,
          requirements: requirements,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showError(data.message || "Failed to generate overview.");
        return;
      }

      setOverview(data.response);
    } catch (error) {
      console.error("Error generating overview:", error);
      showError("Unable to connect to the AI service.");
    } finally {
      setGeneratingOverview(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rollNumber = localStorage.getItem("rollNumber");

    const projectData = {
      projectName,
      overview,
      technicalTags,
      requirements,
      appliedRole,
      rollNumber,
    };

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/project/uploadProject", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }

      if (!response.ok) {
        showError(data.message);
      }
    } finally {
      window.location.reload();

      setOverview("");
      setProjectName("");
      setRequirements("");
      setTechnicalTags("");
      setAppliedRole("");
    }
  };

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-2xl bg-white px-7 py-7 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: "#5B1F73" }}>
          <Plus size={14} style={{ color: "#5B1F73" }} />
        </div>

        <h3 className="text-base font-bold text-gray-900">Post New Project</h3>
      </div>

      {/* Project Title */}
      <div className="mt-5">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Project Title</label>

        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g. NextGen Mobile App"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#A56ABD]"
        />
      </div>

      {/* Overview */}
      <div className="mt-4">
        {/* Overview label + AI button */}
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-gray-500">Overview</label>

          <button
            type="button"
            onClick={handleGenerateOverview}
            disabled={generatingOverview}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              generatingOverview ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#F3EAF7] text-[#5B1F73] hover:bg-[#E7DBEF]"
            }`}
          >
            {generatingOverview ? (
              <>
                <LoaderCircle size={14} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate Overview
              </>
            )}
          </button>
        </div>

        <textarea
          rows={3}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          placeholder="Describe the problem solved and the core technologies used..."
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#A56ABD] resize-none"
        />
      </div>

      {/* Technical Tags */}
      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Technical Tags</label>

        <input
          type="text"
          value={technicalTags}
          onChange={(e) => setTechnicalTags(e.target.value)}
          placeholder="e.g. React, Node.js, AWS"
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#A56ABD]"
        />
      </div>

      {/* Admin Role + Requirements */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Admin Technical Role */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Your Technical Role</label>

          <select
            value={appliedRole}
            onChange={(e) => setAppliedRole(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#A56ABD] bg-white"
            required
          >
            <option value="">Select your role</option>
            <option value="React Developer">React Developer</option>
            <option value="Java Developer">Java Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="SQL Developer">SQL Developer</option>
            <option value="Python Developer">Python Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="ML Engineer">ML Engineer</option>
          </select>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Requirements</label>

          <input
            type="text"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. High-speed API"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#A56ABD]"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end">
        <button type="submit" className="text-sm font-medium text-white rounded-xl px-6 py-2.5" style={{ backgroundColor: "#5B1F73" }}>
          Upload Project
        </button>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-green-100 bg-white px-5 py-4 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={22} className="text-green-600" />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Project Uploaded!</h4>

            <p className="text-xs text-gray-500">Your project has been uploaded successfully.</p>
          </div>

          <button type="button" onClick={() => setShowSuccess(false)} className="ml-3 text-gray-400 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
      )}
    </form>
  );
};

export default PostProject;
