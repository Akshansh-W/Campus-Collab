import { ArrowRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "#FCF7FA" }}
    >
      <div className="text-center">
        {/* 404 */}
        <h1
          className="text-6xl font-extrabold"
          style={{ color: "#7A3A93" }}
        >
          404
        </h1>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-900 mt-4">
          Lost in someone's thought?
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Return button */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white rounded-xl px-5 py-3"
          style={{ backgroundColor: "#5B1F73" }}
        >
          Return to Dashboard
          <ArrowRight size={16} />
        </button>

        {/* Go back */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: "#5B1F73" }}
          >
            <ChevronLeft size={14} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}