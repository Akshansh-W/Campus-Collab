import { useEffect, useState } from "react";
import { Laptop, Sparkles, ArrowUpRight } from "lucide-react";

export default function DesktopOnly({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const checkScreenSize = () => {
      setIsMobile(mediaQuery.matches);
      setChecked(true);
    };

    checkScreenSize();

    mediaQuery.addEventListener("change", checkScreenSize);

    return () => {
      mediaQuery.removeEventListener("change", checkScreenSize);
    };
  }, []);

  if (!checked) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#0b0610] text-white flex items-center justify-center px-6">
        {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Main purple glow */}
          <div
            className="
            absolute
            left-1/2
            top-[30%]
            h-105
            w-105
            -translate-x-1/2
            rounded-full
            bg-[#7B2FA3]/20
            blur-[120px]
            animate-pulse
          "
          />

          {/* Top-right glow */}
          <div
            className="
            absolute
            -right-32
            -top-32
            h-80
            w-[320px]
            rounded-full
            bg-[#C36BFF]/10
            blur-[100px]
          "
          />

          {/* Bottom-left glow */}
          <div
            className="
            absolute
            -bottom-40
            -left-32
            h-87.5
            w-87.5
            rounded-full
            bg-[#633080]/20
            blur-[110px]
          "
          />

          {/* Decorative dots */}
          <div className="absolute left-[12%] top-[20%] h-2 w-2 rounded-full bg-[#C77DFF]/60 animate-pulse" />
          <div className="absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#E0B4FF]/70 animate-pulse" />
          <div className="absolute bottom-[20%] left-[20%] h-1.5 w-1.5 rounded-full bg-[#A56ABD]/50 animate-pulse" />
          <div className="absolute bottom-[28%] right-[20%] h-2 w-2 rounded-full bg-[#C77DFF]/50 animate-pulse" />
        </div>

        {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

        <main className="relative z-10 flex w-full translate-y-6 max-w-2xl flex-col items-center text-center">
          {/* Floating laptop */}
          <div className="relative mb-8">
            {/* Glow behind laptop */}
            <div
              className="
              absolute
              inset-0
              scale-150
              rounded-full
              bg-[#A56ABD]/20
              blur-3xl
            "
            />

            <div
              className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[28px]
              border
              border-white/10
              bg-white/6
              shadow-[0_20px_60px_rgba(165,106,189,0.25)]
              backdrop-blur-xl
              animate-[float_4s_ease-in-out_infinite]
            "
            >
              <Laptop size={45} strokeWidth={1.5} className="text-[#D9A8FF]" />

              {/* Sparkle */}
              <Sparkles
                size={18}
                className="
                absolute
                -right-2
                -top-2
                text-[#E3B7FF]
                animate-pulse
              "
              />
            </div>
          </div>

          {/* Small badge */}
          <div
            className="
            mb-5
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#A56ABD]/25
            bg-[#A56ABD]/10
            px-4
            py-2
            text-xs
            font-medium
            text-[#D8A8F2]
            backdrop-blur-md
          "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C77DFF] animate-pulse" />
            Desktop experience required
          </div>

          {/* Heading */}
          <h1
            className="
            max-w-xl
            text-4xl
            font-bold
            leading-[1.08]
            tracking-tight
            text-white
            sm:text-5xl
          "
          >
            CampusCollab needs
            <span className="block bg-linear-to-r from-[#D99AFF] via-[#B967E8] to-[#E7C9FF] bg-clip-text text-transparent">
              a little more screen.
            </span>
          </h1>

          {/* Description */}
          <p
            className="
            mt-6
            max-w-lg
            text-sm
            leading-7
            text-[#A99AAF]
            sm:text-base
          "
          >
            We love your phone. Really. ❤️
            <br />
            But CampusCollab has a lot of projects, code, ideas and
            <span className="text-[#D3A3EE]"> questionable late-night debugging.</span>
            Your tiny screen deserves a break.
          </p>

          {/* Funny quote */}
          <div
            className="
            mt-7
            max-w-md
            rounded-2xl
            border
            border-white8
            bg-white/[0.035]
            px-6
            py-4
            shadow-[0_15px_50px_rgba(0,0,0,0.25)]
            backdrop-blur-xl
          "
          >
            <p className="text-sm italic leading-6 text-[#C9B8D1]">
              “If your screen is smaller than your ambition,
              <span className="font-semibold text-[#DCA8FF]"> we have a problem.</span>”
            </p>
          </div>

          {/* Bottom hint */}
          <p className="mt-8 text-[11px] tracking-wide text-[#66596D]">CampusCollab • Built for builders</p>
        </main>

        {/* =====================================================
          FLOAT ANIMATION
      ===================================================== */}

        <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
      </div>
    );
  }

  return children;
}
