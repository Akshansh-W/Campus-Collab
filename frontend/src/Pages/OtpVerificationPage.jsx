import { use, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { useError } from "../context/ErrorContext";

export default function OtpVerificationPage() {

  const isSignedIn = sessionStorage.getItem("isSignedIn");
  if(!isSignedIn){
    return <Navigate to="/login" replace/>
  }

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState();
  const email = location.state?.email;
  const {error,showError,clearError} = useError();
  const navigate = useNavigate();

  // UI Helper Function 
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // only allow empty or a single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to the next box if a digit was typed (not on delete)
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  // Another UI helper Function
  const handleKeyDown = (index, e) => {
    // if backspace is pressed on an empty box, jump back to the previous one
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Main Function 
  const handleVerification = async()=>{

    setIsLoading(true)
    const fullOtp = otp.join("");
    try{
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/student/validateOtp",{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify({email : email, otp : fullOtp})
    });

    if(response.ok){
      sessionStorage.removeItem("isSignedIn");
      sessionStorage.setItem("otpVerified","true");

      navigate("/setupForm");
    }
    
    const data = await response.json();
    
    if(!response.ok){
      showError(data.message);
      setIsLoading(false);
    }
    
  }catch(e){
    console.log("Frontend error : ", e);
    setIsLoading(false);
  }finally{
    setIsLoading(false);
  }

  }

  if(isLoading){
    return <LoadingScreen></LoadingScreen>
  }
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4"
      style={{ backgroundColor: "#FCF7FA" }}
    >
      <div className="w-full max-w-md text-center">
        {/* Brand */}
        <h1 className="text-3xl font-extrabold" style={{ color: "#5B1F73" }}>
          CampusColab
        </h1>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mt-6">
          Verify Your Identity
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          We've sent a 4-digit code to your email.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-[#f1b8c0] bg-[#fff1f3] px-3.5 py-3 text-left text-sm font-medium text-[#b4233c]"
          >
            {error}
          </div>
        )}

        {/* OTP input boxes */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              maxLength={1}
              value={digit}
              placeholder="0"
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`h-14 w-12 rounded-xl border text-center text-xl font-semibold text-gray-700 placeholder-gray-300 outline-none transition-colors ${error ? "border-[#e07180] bg-[#fffafb] focus:border-[#c94f60]" : "border-gray-200 focus:border-[#A56ABD]"}`}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          type="button"
          className="mt-8 w-full flex items-center justify-center gap-2 text-white text-sm font-semibold rounded-xl py-4"
          style={{ backgroundColor: "#5B1F73" }}
          onClick={handleVerification}
        >
          Verify
          <ArrowRight size={16} />
        </button>

        {/* Resend */}
        <button
          type="button"
          className="mt-5 text-sm font-medium"
          style={{ color: "#5B1F73" }}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}