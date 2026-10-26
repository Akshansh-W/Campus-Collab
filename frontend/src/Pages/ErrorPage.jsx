import { CloudOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage({ errorMessage, errorRef = "ER-894-PQ" }) {
  const navigate = useNavigate();
  const onRetry = () => window.location.reload();
  return (
    <div
      className="h-[117.647vh] w-full flex items-center justify-center px-6"
      style={{ backgroundColor: "#FCF7FA" }}
    >
      <div className="w-full max-w-xl text-center">
        {/* Icon badge */}
        <div
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl"
          style={{ backgroundColor: "#F3ECF8" }}
        >
          <CloudOff size={44} style={{ color: "#5B1F73" }} />
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Oops! Something went wrong
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-gray-500">
          {errorMessage}
          <br />
          Don't worry, your progress is safe.
        </p>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() =>{ localStorage.removeItem('token'); navigate("/login")}}
            className="rounded-xl px-7 py-3.5 text-base font-semibold text-white"
            style={{ backgroundColor: "#5B1F73" }}
          >
            Back to Login
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="rounded-xl border px-7 py-3.5 text-base font-semibold"
            style={{ borderColor: "#E7DBEF", color: "#5B1F73" }}
          >
            Try Again
          </button>
        </div>

        {/* Error reference */}
        <p className="mt-10 text-sm" style={{ color: "#C9BBD1" }}>
          Error Ref: {errorRef}
        </p>
      </div>
    </div>
  );
}