import React, { useState } from "react";
import { Plus, ChevronDown, ArrowRight } from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const TECH_INTERESTS = [
  { label: "Web Development" },
  { label: "UI/UX Design" },
  { label: "Machine Learning" },
  { label: "Deep Learning" },
  { label: "Data Science" },
  { label: "Mobile Apps" },
  { label: "Cloud Computing" },
  { label: "Cybersecurity" },
  { label: "Blockchain" },
];

const SetupForm = () => {
  const otpVerified = sessionStorage.getItem("otpVerified");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { student, setStudent } = useStudent();

  if (!otpVerified) {
    return <Navigate to="/login" replace />;
  }

  // Toggle technical interests 
  const toggleInterest = (interest) => {
    setStudent((prev) => {
      const interests = prev?.technicalInterests || [];
      const alreadySelected = interests.includes(interest);
      return {
        ...prev,
        technicalInterests: alreadySelected
          ? interests.filter((s) => s !== interest)
          : [...interests, interest],
      };
    });
  };

  // Main submission function
  const handleSetup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_BASE_URL + "/student/createStudent",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(student),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);

        setStudent(data.student);
        setIsLoading(false);
        navigate("/profile", { replace: true });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error creating student profile:", error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-3xl bg-white px-8 py-8 shadow-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">
          Complete your profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tell us a bit about yourself to personalize your experience.
        </p>

        <form onSubmit={handleSetup}>
          {/* Full Name */}
          <div className="mt-6">
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "#5B1F73" }}
            >
              Full Name
            </label>
            <input
              type="text"
              value={student?.studentName || ""}
              placeholder="Your name"
              onChange={(e) =>
                setStudent((prev) => ({ ...prev, studentName: e.target.value }))
              }
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#A56ABD]"
            />
          </div>

          {/* Roll Number */}
          <div className="mt-5">
            <label
              className="block text-xs font-semibold mb-1.5"
              style={{ color: "#5B1F73" }}
            >
              Roll Number / Student ID
            </label>
            <input
              type="text"
              value={student?.rollNumber || ""}
              onChange={(e) =>
                setStudent((prev) => ({ ...prev, rollNumber: e.target.value }))
              }
              placeholder="e.g. CS2024001"
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#A56ABD]"
            />
          </div>

          {/* Year + Department */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "#5B1F73" }}
              >
                Current Year
              </label>
              <div className="relative">
                <select
                  value={student?.currentYear || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      currentYear: e.target.value,
                    }))
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#A56ABD]"
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: "#5B1F73" }}
              >
                Department
              </label>
              <div className="relative">
                <select
                  value={student?.department || ""}
                  onChange={(e) =>
                    setStudent((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-500 outline-none focus:border-[#A56ABD]"
                >
                  <option value="" disabled>
                    Select Dept
                  </option>
                  <option value="cs">Computer Science</option>
                  <option value="ece">Electronics</option>
                  <option value="me">Mechanical</option>
                  <option value="ce">Civil</option>
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Technical Interests */}
          <div className="mt-5">
            <label
              className="block text-xs font-semibold mb-2"
              style={{ color: "#5B1F73" }}
            >
              Technical Interests (Select multiple)
            </label>
            <div className="flex flex-wrap gap-2">
              {TECH_INTERESTS.map(({ label }) => {
                // Fixed line: Safe check using optional chaining and fallback array
                const isSelected = (student?.technicalInterests || []).includes(
                  label
                );

                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleInterest(label)}
                    className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-3.5 py-1.5 border"
                    style={{
                      backgroundColor: isSelected ? "#5B1F73" : "#F3ECF8",
                      color: isSelected ? "#FFFFFF" : "#5B2A86",
                      borderColor: isSelected ? "#5B1F73" : "#E7DBEF",
                    }}
                  >
                    {label}
                    <Plus size={12} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-7 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold rounded-xl py-3.5"
            style={{ backgroundColor: "#5B1F73" }}
          >
            Continue to Dashboard
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupForm;