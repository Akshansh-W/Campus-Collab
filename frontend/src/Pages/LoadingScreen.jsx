import { RefreshCw } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: "#FCF7FA" }}
    >
      {/* Brand */}
      <h1 className="text-2xl font-extrabold" style={{ color: "#5B1F73" }}>
        CampusColab
      </h1>

      {/* Spinner */}
      <RefreshCw
        size={22}
        className="mt-10 animate-spin"
        style={{ color: "#5B1F73" }}
      />

      {/* Quote */}
      <p
        className="mt-6 text-sm text-center max-w-xs italic"
        style={{ color: "#8a6a9c" }}
      >
        "Great things take time."
      </p>

      {/* Dots */}
      <div className="mt-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              backgroundColor: "#A56ABD",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}