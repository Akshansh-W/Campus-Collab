import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rollNumber");
    
    navigate("/login");
  };

  return (
    <div
      className="min-h-full w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "#FCF7FA" }}
    >
      <div className="w-full max-w-sm rounded-3xl bg-white px-8 py-10 shadow-lg text-center">
        {/* Icon badge */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
          style={{ backgroundColor: "#E7DBEF" }}
        >
          <User size={28} style={{ color: "#5B1F73" }} />
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-gray-900 mt-5">Settings</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your active session and account preferences.
        </p>

        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold rounded-xl py-3.5"
          style={{ backgroundColor: "#5B1F73" }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
}