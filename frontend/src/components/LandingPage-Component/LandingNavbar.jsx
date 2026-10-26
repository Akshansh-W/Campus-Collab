import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Sun, Sparkles } from "lucide-react";

const Navbar = ({ tabs = [] }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === "/") {
      return location.pathname === "/";
    }

    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`
        fixed left-1/2 top-5 z-50
        flex w-[calc(100%-32px)] max-w-[1380px]
        -translate-x-1/2 items-center justify-between
        transition-all duration-500
        ${
          scrolled
            ? "rounded-2xl border border-white/[0.12] bg-[#09070f]/80 px-5 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            : "px-1 py-2"
        }
      `}
    >
      {/* =====================================================
          LOGO
      ====================================================== */}
      <Link to="/" className="group flex shrink-0 items-center gap-2.5">
        <div
          className="
            relative flex h-8 w-8 items-center justify-center
            overflow-hidden rounded-lg
            bg-gradient-to-br from-[#a855f7] via-[#8b5cf6] to-[#c084fc]
            shadow-[0_0_25px_rgba(168,85,247,0.35)]
          "
        >
          <Sparkles size={17} strokeWidth={2.2} className="text-white transition-transform duration-500 group-hover:rotate-12" />

          <div
            className="
              absolute inset-0
              bg-gradient-to-tr from-transparent via-white/30 to-transparent
              -translate-x-full
              transition-transform duration-700
              group-hover:translate-x-full
            "
          />
        </div>

        <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">Campus Collab</span>
      </Link>

      {/* =====================================================
          CENTER NAVIGATION
      ====================================================== */}
      <nav
        className="
          absolute left-1/2 hidden -translate-x-1/2
          items-center gap-1
          rounded-full
          border border-white/[0.10]
          bg-white/[0.025]
          p-1
          shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
          backdrop-blur-xl
          md:flex
        "
      >
        {/* subtle outer glow */}
        <div
          className="
            pointer-events-none absolute -inset-px
            rounded-full
            bg-gradient-to-r
            from-purple-500/[0.06]
            via-transparent
            to-purple-500/[0.06]
          "
        />

        {tabs.map((tab) => {
          const active = isActive(tab.href);

          return (
            <Link
              key={tab.href}
              to={tab.href}
              className={`
        group relative z-10
        min-w-[90px]
        rounded-full
        px-5 py-2.5
        text-center
        text-[14px]
        font-medium
        transition-all duration-300
        ${active ? "text-white" : "text-white/60 hover:text-white"}
      `}
            >
              {/* =========================================
          PURPLE GLASS HOVER
      ========================================== */}
              <span
                className="
          pointer-events-none
          absolute inset-0 -z-10
          rounded-full
          border border-transparent

          bg-gradient-to-b
          from-[#a855f7]/25
          via-[#8b5cf6]/12
          to-[#6d28d9]/5

          opacity-0
          scale-[0.88]

          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]

          transition-all duration-300 ease-out

          group-hover:scale-100
          group-hover:border-[#a855f7]/20
          group-hover:opacity-100
        "
              />

              {/* =========================================
          AMBIENT PURPLE BLOOM
      ========================================== */}
              <span
                className="
          pointer-events-none
          absolute -inset-3 -z-20
          rounded-full
          bg-[#9333ea]/20
          opacity-0
          blur-xl
          transition-opacity duration-300
          group-hover:opacity-100
        "
              />

              {/* =========================================
          TEXT
      ========================================== */}
              <span
                className="
          relative z-10
          transition-all duration-300
          group-hover:text-white
          group-hover:[text-shadow:0_0_12px_rgba(168,85,247,0.45)]
        "
              >
                {tab.name}
              </span>

              {/* =========================================
          ACTIVE UNDERLINE
      ========================================== */}
              {active && (
                <span
                  className="
            absolute bottom-[3px] left-1/2
            h-[2px] w-6
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-[#a855f7]
            to-[#c084fc]
            shadow-[0_0_10px_rgba(168,85,247,0.9)]
          "
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* =====================================================
          RIGHT ACTIONS
      ====================================================== */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Get Started */}
        <Link
          to="/login"
          className="
            group relative
            hidden sm:flex
            items-center gap-2
            overflow-hidden
            rounded-full
            bg-gradient-to-r
            from-[#9333ea]
            via-[#a855f7]
            to-[#c084fc]
            px-5 py-2.5
            text-[14px]
            font-semibold
            text-white
            shadow-[0_0_30px_rgba(168,85,247,0.25)]
            transition-all duration-300
            hover:scale-[1.025]
            hover:shadow-[0_0_40px_rgba(168,85,247,0.40)]
            active:scale-[0.98]
          "
        >
          {/* shine sweep */}
          <span
            className="
              absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-white/25
              to-transparent
              transition-transform duration-700
              group-hover:translate-x-full
            "
          />

          <span className="relative">Get Started</span>

          <ArrowRight
            size={16}
            strokeWidth={2}
            className="
              relative
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
