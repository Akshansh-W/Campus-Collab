import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import rocket from "../../assets/rocket.jpg";

export default function InspirationCard() {
  const navigate = useNavigate();
  return (
    <div
      className="relative w-full h-full min-h-105 rounded-3xl overflow-hidden flex flex-col px-7 py-7"
      style={{
        backgroundImage: rocket ? `url(${rocket})` : "none",
        backgroundColor: "#1E0B3E", // shows if no image is passed yet
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay so text stays readable over any image */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(18,7,31,0.55) 0%, rgba(18,7,31,0.35) 50%, rgba(18,7,31,0.75) 100%)",
        }}
      />

      {/* Quote - sits on top of the image/overlay */}
      <div className="relative z-10 shrink-0">
        <span className="text-5xl font-serif leading-none" style={{ color: "#C9A9D6" }}>
          AI
        </span>
        <p className="text-white text-xl font-semibold leading-snug mt-2">Recommended Projects</p>
        <p className="text-sm mt-3" style={{ color: "#E0CCEB" }}>
          — Here comes projects
        </p>
      </div>

      {/* Spacer pushes the button to the bottom */}
      <div className="flex-1" />

      {/* CTA - also sits on top of the image/overlay */}
      <button
        type="button"
        onClick={() => navigate("/explore")}
        className="relative z-10 shrink-0 w-full text-sm font-semibold rounded-xl py-3.5"
        style={{ backgroundColor: "#FFFFFF", color: "#2E1065" }}
      >
        Explore 🚀
      </button>
    </div>
  );
}
