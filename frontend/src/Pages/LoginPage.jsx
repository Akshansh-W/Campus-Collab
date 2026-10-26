import loginImage from "../assets/loginImg.png";
import { useNavigate } from "react-router-dom";
import MoltenMetal from "..//components/LandingPage-Component/MoltenMetal";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useError } from "../context/ErrorContext";
import ErrorPage from "./ErrorPage";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, showError, clearError } = useError();

  // =========================================================
  // AUTH LOGIC
  // =========================================================

  useEffect(() => {
    const doesHaveToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      navigate("/profile");
    };

    doesHaveToken();

    return clearError;
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/student/loginStudent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/profile");
      setIsLoading(false);
    }

    if (!response.ok) {
      showError(data.message);
      setIsLoading(false);
    }
  };

  // =========================================================
  // EXISTING STATES — UNCHANGED
  // =========================================================

  if (error) {
    return <ErrorPage errorMessage={error}></ErrorPage>;
  }

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      className="
    relative
    min-h-screen
    w-full
    overflow-hidden
    bg-[#05040A]
    px-5
    py-10
    flex
    items-center
    justify-center
  "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <MoltenMetal
          color1="#7C3AED"
          color2="#C084FC"
          color3="#F5F3FF"
          speed={0.4}
          scale={3.5}
          detail={5}
          glow={4}
          coreSize={0.08}
          swirl={0.85}
          fold={-0.15}
          blackPoint={0.12}
          brightness={1.05}
          colorMode="molten"
          grain
          grainIntensity={0.035}
          mouseInteraction
          mouseStrength={0.4}
          opacity={1}
        />
      </div>
      {/* Dark atmospheric overlay */}

      <div
        className="
    pointer-events-none
    absolute
    inset-0
    z-1
    bg-[#05040A]/44
  "
      />

      {/* =====================================================
          MAIN LOGIN CARD
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-262.5
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.14]
          bg-[#09070F]/35
          shadow-[0_35px_100px_rgba(0,0,0,0.55)]
          backdrop-blur-3xl
        "
      >
        {/* Top purple highlight */}
        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-30
            h-px
            bg-linear-to-r
            from-transparent
            via-[#A855F7]/60
            to-transparent
          "
        />

        <div className="flex min-h-155 flex-col md:flex-row">
          {/* =================================================
              LEFT SIDE — FULL BLEED VISUAL
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-105
              w-full
              items-center
              justify-center
              overflow-hidden
              border-b
              border-white/8
              bg-[#08050F]
              md:min-h-full
              md:w-[48%]
              md:border-b-0
              md:border-r
            "
          >
            {/* =================================================
                YOUR LOGIN IMAGE

                This now fills the entire left panel.
            ================================================== */}

            <img
              src={loginImage}
              alt="Campus Collab"
              className="
                absolute
                inset-0
                z-0
                h-full
                w-full
                object-cover
                opacity-90
              "
            />

            {/* =================================================
                IMAGE BLENDING — RIGHT SIDE
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-1
                bg-linear-to-r
                from-transparent
                via-transparent
                to-[#08050F]/90
              "
            />

            {/* =================================================
                IMAGE BLENDING — BOTTOM
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-1
                bg-linear-to-t
                from-[#08050F]
                via-transparent
                to-[#08050F]/20
              "
            />

            {/* =================================================
                PURPLE ATMOSPHERIC GLOW
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-2
                h-107.5
                w-107.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#8B5CF6]/20
                blur-[120px]
              "
            />

            {/* =================================================
                DECORATIVE ORBIT
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-3
                h-107.5
                w-107.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#A855F7]/8
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-3
                h-77.5
                w-77.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#A855F7]/6
              "
            />

            
            {/* =================================================
                LEFT PANEL TEXT
            ================================================== */}

            <div
              className="
                absolute
                bottom-8
                left-0
                z-10
                w-full
                px-8
                text-center
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#C4B5FD]/80
                "
              >
                Where ideas connect
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/40
                "
              >
                Find people. Build teams. Create together.
              </p>
            </div>
          </div>

          {/* =================================================
              RIGHT SIDE — LOGIN FORM
          ================================================== */}

          <div
            className="
              flex
              w-full
              flex-1
              flex-col
              justify-center
              px-7
              py-12
              sm:px-12
              md:w-[52%]
              md:px-16
            "
          >
            {/* =================================================
                BRAND BADGE
            ================================================== */}

            <div
              className="
                mb-5
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-[#A855F7]/15
                bg-[#A855F7]/6
                px-3
                py-1.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#A855F7]
                  shadow-[0_0_10px_rgba(168,85,247,0.9)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#C4B5FD]/80
                "
              >
                Campus Collab
              </span>
            </div>

            {/* =================================================
                HEADING
            ================================================== */}

            <div className="mb-9">
              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-[-0.035em]
                  text-white
                  sm:text-[34px]
                "
              >
                Welcome back.
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                  text-white/40
                "
              >
                Sign in to continue building something worth sharing.
              </p>
            </div>

            {/* =================================================
                LOGIN FORM
            ================================================== */}

            <form onSubmit={handleLogin}>
              {/* Error */}

              {error && (
                <div
                  role="alert"
                  className="
                    mb-5
                    rounded-xl
                    border
                    border-red-400/20
                    bg-red-500/[0.07]
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-red-300
                  "
                >
                  {error}
                </div>
              )}

              {/* =================================================
                  EMAIL
              ================================================== */}

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-medium
                    tracking-wide
                    text-white/65
                  "
                >
                  Your email
                </label>

                <input
                  type="email"
                  value={email}
                  id="email"
                  onChange={(e) => {
                    clearError();
                    setEmail(e.target.value);
                  }}
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                    backdrop-blur-xl
                    transition-all
                    duration-300

                    hover:border-white/16

                    focus:border-[#A855F7]/50
                    focus:bg-[#A855F7]/[0.035]

                    focus:shadow-[0_0_0_4px_rgba(168,85,247,0.07),0_0_25px_rgba(139,92,246,0.08)]
                  "
                />
              </div>

              {/* =================================================
                  PASSWORD
              ================================================== */}

              <div className="mb-7">
                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-[12px]
                    font-medium
                    tracking-wide
                    text-white/65
                  "
                >
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    clearError();
                    setPassword(e.target.value);
                  }}
                  id="password"
                  placeholder="••••••••••"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                    backdrop-blur-xl
                    transition-all
                    duration-300

                    hover:border-white/16

                    focus:border-[#A855F7]/50
                    focus:bg-[#A855F7]/[0.035]

                    focus:shadow-[0_0_0_4px_rgba(168,85,247,0.07),0_0_25px_rgba(139,92,246,0.08)]
                  "
                />
              </div>

              {/* =================================================
                  GET GOING BUTTON
              ================================================== */}

              <button
                type="submit"
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-xl
                  bg-linear-to-r
                  from-[#7C3AED]
                  via-[#9333EA]
                  to-[#A855F7]
                  py-3.5
                  text-[14px]
                  font-semibold
                  text-white

                  shadow-[0_0_30px_rgba(139,92,246,0.20)]

                  transition-all
                  duration-300

                  hover:scale-[1.01]
                  hover:shadow-[0_0_45px_rgba(139,92,246,0.35)]

                  active:scale-[0.985]
                "
              >
                {/* Button shine */}

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-linear-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative z-10">Get Going</span>
              </button>
            </form>

            {/* =================================================
                SIGN UP
            ================================================== */}

            <div
              className="
                mt-8
                text-center
                text-[12px]
                text-white/30
              "
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  clearError();
                  navigate("/signup");
                }}
                className="
                  font-semibold
                  text-[#B57CFF]
                  transition-colors
                  hover:text-[#D8B4FE]
                  hover:underline
                  underline-offset-4
                "
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          whitespace-nowrap
          text-[9px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-white/15
        "
      >
        Campus Collab · Ideas meet people
      </div>
    </div>
  );
}
