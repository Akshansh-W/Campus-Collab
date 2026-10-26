import React from "react";
import { Star } from "lucide-react";

const RoleRequestCard = ({ requestId, name, rating, appliedRole, quote, onApprove, onDecline }) => {
  console.log(requestId);
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="w-full h-full rounded-2xl bg-white px-6 py-6 shadow-sm border border-gray-100">
      {" "}
      {/* Candidate info */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#E7DBEF" }}>
          <span className="text-base font-semibold" style={{ color: "#5B1F73" }}>
            {initial}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900">{name}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} fill="#5B1F73" style={{ color: "#5B1F73" }} />
            <span className="text-xs font-medium text-gray-700">{rating}</span>
          </div>
        </div>
      </div>
      {/* Applied role */}
      <p className="mt-4 text-xs font-medium" style={{ color: "#5B1F73" }}>
        Role: <span className="font-semibold text-gray-800">{appliedRole}-Developer</span>
      </p>
      {/* Quote */}
      <div className="mt-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#F3ECF8" }}>
        <p className="text-xs italic leading-relaxed" style={{ color: "#5B2A86" }}>
          "{quote}"
        </p>
      </div>
      {/* Actions */}
      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onApprove(requestId)}
          className="flex-1 text-sm font-medium text-white rounded-xl px-4 py-2.5"
          style={{ backgroundColor: "#5B1F73" }}
        >
          Approve
        </button>
        <button
          type="button"
          onClick={() => onDecline(requestId)}
          className="flex-1 text-sm font-medium rounded-xl px-4 py-2.5 border"
          style={{ borderColor: "#5B1F73", color: "#5B1F73" }}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default RoleRequestCard;
