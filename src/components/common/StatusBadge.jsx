// ==========================================================================
// StatusBadge - Canonical Colored Status Component
// ==========================================================================

import React from "react";
import { CheckCircle2, Clock, AlertCircle, XCircle, Activity, ShieldCheck, ShieldAlert } from "lucide-react";

export default function StatusBadge({ status, type = "consultation" }) {
  if (!status) return null;

  const s = status.toUpperCase();

  // Consultation Statuses
  if (s === "SCHEDULED" || s === "ASSIGNED") {
    return (
      <span className="badge badge-scheduled">
        <Clock size={12} />
        {status}
      </span>
    );
  }

  if (s === "IN PROGRESS" || s === "IN LAB" || s === "COLLECTED") {
    return (
      <span className="badge badge-in-progress">
        <Activity size={12} />
        {status}
      </span>
    );
  }

  if (s === "COMPLETED" || s === "REPORT READY" || s === "PAID") {
    return (
      <span className="badge badge-completed">
        <CheckCircle2 size={12} />
        {status}
      </span>
    );
  }

  if (s === "CANCELLED" || s === "REJECTED" || s === "FAILED") {
    return (
      <span className="badge badge-cancelled">
        <XCircle size={12} />
        {status}
      </span>
    );
  }

  if (s === "NO-SHOW" || s === "REFUNDED") {
    return (
      <span className="badge badge-noshow">
        <AlertCircle size={12} />
        {status}
      </span>
    );
  }

  if (s === "VERIFIED") {
    return (
      <span className="badge badge-verified">
        <ShieldCheck size={12} />
        VERIFIED
      </span>
    );
  }

  if (s === "PENDING" || s === "REQUESTED") {
    return (
      <span className="badge badge-pending">
        <Clock size={12} />
        {status}
      </span>
    );
  }

  return <span className="badge badge-noshow">{status}</span>;
}
