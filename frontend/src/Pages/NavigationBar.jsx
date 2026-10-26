import React, { useState } from "react";
import { LayoutDashboard, Compass, FolderOpen, MessageSquare, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import navImg from "../assets/NavImg.png";

const NAV_ITEMS = [
  { id: "/profile", label: "Dashboard", icon: LayoutDashboard },
  { id: "/explore", label: "Explore", icon: Compass },
  { id: "/project", label: "My Projects", icon: FolderOpen },
  { id: "/ongoingproject", label: "OnGoing Projects", icon: FolderOpen },
  { id: "/signout", label: "Settings", icon: Settings },
];
const NavigationBar = ({ activeId = "dashboard" }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(activeId);

  const handleClick = (id) => {
    setActive(id);
    navigate(id);
  };

  return (
    <aside
      className="w-64 h-full flex flex-col py-6 px-4" // no bg-white here
      style={{
        backgroundImage: `url(${navImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional Overlay to maintain contrast for text and icons */}
      <div className="absolute inset-0 z-0 bg-white/20 backdrop-blur-[1px]" />

      {/* Sidebar Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <div className="mb-8 flex justify-center pl-3">
          <span className="relative inline-flex items-center text-3xl font-extrabold tracking-tight">
            <span className="absolute -inset-x-2 -inset-y-1 rounded-full bg-[#b875d5]/25 blur-md" />
            <span className="relative bg-linear-to-r from-[#e6a5f5] via-[#c87ae2] to-[#f2e9ff] bg-clip-text text-transparent drop-shadow-[0_0_7px_rgba(219,147,244,0.72)]">
              Campus
            </span>
            <span className="relative text-[#f5ebff] drop-shadow-[0_0_8px_rgba(255,255,255,0.38)]">Collab</span>
          </span>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-4">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => handleClick(id)}
                className="group flex items-center gap-5 w-full text-left px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: isActive ? "#A56ABD" : "#E7DBEF",
                  boxShadow: isActive ? "0 0 3px 1px rgba(197, 126, 220, 0.58)" : "0 0 2px 1px rgba(231, 219, 239, 0.52)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#A56ABD";
                    e.currentTarget.style.boxShadow = "0 0 5px 2px rgba(197, 126, 220, 0.72)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#E7DBEF";
                    e.currentTarget.style.boxShadow = "0 0 2px 1px rgba(231, 219, 239, 0.52)";
                  }
                }}
              >
                <Icon size={20} className={`transition-colors duration-200 ${isActive ? "text-white" : "text-[#5B2A86] group-hover:text-white"}`} />
                <span
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive ? "text-white" : "text-[#3d2a4a] group-hover:text-white"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default NavigationBar;
