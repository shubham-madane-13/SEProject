// ==========================================================================
// Toast - Notification Toasts Container
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((t) => {
        let Icon = Info;
        let className = "toast";

        if (t.type === "success") {
          Icon = CheckCircle2;
          className += " toast-success";
        } else if (t.type === "error") {
          Icon = AlertCircle;
          className += " toast-error";
        } else if (t.type === "warning") {
          Icon = AlertTriangle;
          className += " toast-warning";
        }

        return (
          <div key={t.id} className={className}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: "0.875rem", lineHeight: "1.4" }}>{t.message}</div>
            <button
              onClick={() => removeToast(t.id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255, 255, 255, 0.7)",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center"
              }}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
