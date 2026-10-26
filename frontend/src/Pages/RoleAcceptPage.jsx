import { ArrowLeft } from "lucide-react";
import RoleRequestCard from "../components/MyProject-Components/RoleRequestCard";
import LoadingScreen from "../Pages/LoadingScreen";
import { useError } from "../context/ErrorContext";
import { useOutletContext, useRouteError } from "react-router-dom";
import { useState } from "react";
export default function RoleAcceptPage() {
  const [loading, setLoading] = useState(false);
  const { error, setError, clearError } = useError();
  const { requests, fetchData } = useOutletContext();
  const handleConfirm = async (requestId) => {
    setLoading(true);
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/pjr/acceptRequest?requestId=${requestId}`, {
      method: "post",
    });
    if (response.ok) {
      await fetchData();
      setLoading(false);
    }
  };

  const handleDecline = async (requestId) => {
    setLoading(true);
    const response = await fetch(import.meta.env.VITE_BACKEND_BASE_URL + `/pjr/deleteRequest?requestId=${requestId}`, {
      method: "post",
    });
    if (response.ok) {
      await fetchData();
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <div className="min-h-[117.647vh] w-full" style={{ backgroundColor: "#FCF7FA" }}>
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Joining Requests</h1>

          <p className="text-sm text-gray-500 mt-1">Review candidates seeking to collaborate on this project.</p>

          {/* Error message */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
                  <span className="text-red-600 font-bold">!</span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-red-800">Something went wrong</h3>

                  <p className="text-sm text-red-600 mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!error && requests.length === 0 && (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white py-14 text-center shadow-sm">
              <h3 className="text-base font-semibold text-gray-800">No joining requests</h3>

              <p className="mt-1 text-sm text-gray-500">There are currently no students waiting to join this project.</p>
            </div>
          )}

          {/* Cards grid */}
          {!error && requests.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {requests.map((request) => (
                <RoleRequestCard key={request.requestId} {...request} onDecline={handleDecline} onApprove={handleConfirm} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
