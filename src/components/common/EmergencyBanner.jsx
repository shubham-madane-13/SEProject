// ==========================================================================
// Emergency Safety Disclaimer Banner (SRS Section 30 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="emergency-banner" role="alert">
      <AlertTriangle size={16} style={{ flexShrink: 0, color: "#be123c" }} />
      <span>
        <strong>Medical Notice:</strong> This platform is designed for non-emergency telemedicine. If you are experiencing chest pain, severe breathlessness, uncontrolled bleeding, or life-threatening symptoms, please call emergency services (112 / 911) or visit the nearest emergency facility immediately.
      </span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss medical emergency disclaimer"
        style={{
          background: "none",
          border: "none",
          color: "#9f1239",
          cursor: "pointer",
          marginLeft: "12px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
