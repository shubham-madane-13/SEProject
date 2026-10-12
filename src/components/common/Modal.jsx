// ==========================================================================
// Modal - Animated Accessible Dialog Overlay
// ==========================================================================

import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children, maxWidth = "620px" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content" style={{ maxWidth }}>
        <div className="modal-header">
          <h3 style={{ fontSize: "1.2rem", color: "var(--navy-900)" }}>{title}</h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon"
            style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
