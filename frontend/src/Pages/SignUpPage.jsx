import loginImage from "../assets/favicon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useStudent } from "../context/StudentContext";
import { useError } from "../context/ErrorContext";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { student, setStudent } = useStudent();
  const { error, showError, clearError } = useError();

  const navigate = useNavigate();

  // =========================================================
  // SIGN UP LOGIC — UNCHANGED
  // =========================================================

  const sendOtp = async (e) => {
    e.preventDefault();

    setStudent((prev) => ({
      ...prev,
      studentEmail: email,
      studentPassword: password,
    }));

    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/student/sendOtp", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        sessionStorage.setItem("isSignedIn", "true");

        navigate("/otpverification", {
          state: { email: email },
        });

        setIsLoading(false);
      }

      if (response.status === 409) {
        const data = await response.json();
        showError(data.message);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("Server Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================
  // LOADING — UNCHANGED
  // =========================================================

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

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main center glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#7C3AED]/10
            blur-[150px]
          "
        />

        {/* Top-left purple glow */}
        <div
          className="
            absolute
            -left-48
            -top-48
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#A855F7]/10
            blur-[130px]
          "
        />

        {/* Bottom-right purple glow */}
        <div
          className="
            absolute
            -bottom-48
            -right-48
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#6D28D9]/10
            blur-[130px]
          "
        />

        {/* Subtle grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />
      </div>

      {/* =====================================================
          MAIN SIGN UP CARD
      ====================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[1050px]
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.14]
          bg-[#09070F]/25
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
            bg-gradient-to-r
            from-transparent
            via-[#A855F7]/60
            to-transparent
          "
        />

        <div className="flex min-h-[620px] flex-col md:flex-row">
          {/* =================================================
              LEFT SIDE — FULL BLEED VISUAL
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[420px]
              w-full
              items-center
              justify-center
              overflow-hidden
              border-b
              border-white/[0.08]
              bg-[#08050F]
              md:min-h-full
              md:w-[48%]
              md:border-b-0
              md:border-r
            "
          >
            {/* =================================================
                FULL BLEED IMAGE
            ================================================== */}

            <img
              src={loginImage}
              alt="Campus Colab"
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
                RIGHT SIDE IMAGE BLENDING
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-[1]
                bg-gradient-to-r
                from-transparent
                via-transparent
                to-[#08050F]/90
              "
            />

            {/* =================================================
                BOTTOM IMAGE BLENDING
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-[1]
                bg-gradient-to-t
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
                z-[2]
                h-[430px]
                w-[430px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#8B5CF6]/20
                blur-[120px]
              "
            />

            {/* =================================================
                DECORATIVE ORBITS
            ================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[3]
                h-[430px]
                w-[430px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#A855F7]/[0.08]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-[3]
                h-[310px]
                w-[310px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-[#A855F7]/[0.06]
              "
            />

            {/* =================================================
                OPTIONAL BACKGROUND IMAGE

                If you want to add another particle/shard
                background later, put the URL here.
            ================================================== */}

            {/*
            <img
              src="YOUR_BACKGROUND_IMAGE_URL_HERE"
              alt=""
              className="
                pointer-events-none
                absolute
                inset-0
                z-[1]
                h-full
                w-full
                object-cover
                opacity-20
                mix-blend-screen
              "
            />
            */}

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
              RIGHT SIDE — SIGN UP FORM
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
                bg-[#A855F7]/[0.01]
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
                Create your account.
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  leading-relaxed
                  text-white/40
                "
              >
                Join your campus and start building something worth sharing.
              </p>
            </div>

            {/* =================================================
                SIGN UP FORM
            ================================================== */}

            <form onSubmit={sendOtp}>
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
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  onChange={(e) => {
                    clearError();
                    setEmail(e.target.value);
                  }}
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/[0.10]
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

                    hover:border-white/[0.16]

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
                  id="password"
                  name="password"
                  onChange={(e) => {
                    clearError();
                    setPassword(e.target.value);
                  }}
                  placeholder="••••••••••"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/[0.10]
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

                    hover:border-white/[0.16]

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
                  bg-gradient-to-r
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
                    bg-gradient-to-r
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
                DIVIDER
            ================================================== */}

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.07]" />

              <span
                className="
                  text-[10px]
                  font-medium
                  tracking-wider
                  text-white/25
                "
              >
                OR
              </span>

              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            {/* =================================================
                LOGIN
            ================================================== */}

            <div
              className="
                mt-8
                text-center
                text-[12px]
                text-white/30
              "
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  clearError();
                  navigate("/login");
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
                Log in
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
          text-white/[0.15]
        "
      >
        Campus Collab · Ideas meet people
      </div>
    </div>
  );
}
