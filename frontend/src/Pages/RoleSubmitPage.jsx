import { ArrowLeft, CheckCircle2, X, XCircle } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoleSubmitPage() {
  const location = useLocation();
  const {tech, id} = location.state;
  const navigate = useNavigate();
  const [message, SetMessage] = useState("");
  const rollNumber = localStorage.getItem('rollNumber');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

  const submitApplication = async()=>{
    const roleDetails = {
      projectId : id,
      rollNumber : Number(rollNumber),
      appliedRole : tech,
      message,
    }
    
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + "/pjr/submitRequest",{
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(roleDetails)
    });

   if (response.ok) {
      setNotificationType("success");
      setNotificationMessage(
        "Your application has been submitted successfully."
      );
      setShowNotification(true);

      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
    if (response.status === 409) {
      const data = await response.json();
      setNotificationType("error");
      setNotificationMessage(data.message);
      setShowNotification(true);
      return;
}


}

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FCF7FA" }}>
      <div className="max-w-2xl mx-auto px-8 py-8">
        {/* Heading */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={()=>(navigate(-1))}
            className="text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Applying for{" "}
            <span style={{ color: "#5B1F73" }}>{tech} Developer</span>
          </h1>
        </div>


        {/* Card 2: Message to admin */}
        <div className="mt-6 rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold" style={{ color: "#5B1F73" }}>
            Message to Admin
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Why are you interested in this project? Tell the project lead why
            you're a good fit based on your skills and experience.
          </p>

          <textarea
            rows={5}
            value={message}
            onChange={(e)=>(SetMessage(e.target.value))}
            placeholder="Tell the project lead why you're a good fit..."
            className="w-full mt-4 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-[#A56ABD] resize-none"
          />

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={()=>(navigate(-1))}
              className="text-sm font-medium rounded-xl px-5 py-2.5 border"
              style={{ borderColor: "#5B1F73", color: "#5B1F73" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submitApplication}
              className="text-sm font-medium text-white rounded-xl px-5 py-2.5"
              style={{ backgroundColor: "#5B1F73" }}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
      {showNotification && (
      <div
        className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border bg-white px-5 py-4 shadow-lg ${
          notificationType === "success"
            ? "border-green-100"
            : "border-red-100"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            notificationType === "success"
              ? "bg-green-100"
              : "bg-red-100"
          }`}
        >
          {notificationType === "success" ? (
            <CheckCircle2 size={22} className="text-green-600" />
          ) : (
            <XCircle size={22} className="text-red-600" />
          )}
        </div>

        {/* Message */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            {notificationType === "success"
              ? "Application Submitted!"
              : "Application Failed"}
          </h4>

          <p className="text-xs text-gray-500">
            {notificationMessage}
          </p>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={() => setShowNotification(false)}
          className="ml-3 text-gray-400 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
    )}
    </div>
  );
}