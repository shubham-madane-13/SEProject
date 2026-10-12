// ==========================================================================
// EmptyState - Reusable Empty State Display Component
// ==========================================================================

import React from "react";
import { FolderOpen } from "lucide-react";

export default function EmptyState({
  icon: Icon = FolderOpen,
  title = "No data found",
  description = "There are no records to display at this moment.",
  actionLabel,
  onAction
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        background: "var(--white)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--slate-300)",
        margin: "12px 0"
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--primary-light)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px"
        }}
      >
        <Icon size={28} />
      </div>

      <h3 style={{ fontSize: "1.1rem", marginBottom: "6px", color: "var(--navy-900)" }}>
        {title}
      </h3>
      <p style={{ color: "var(--slate-500)", maxWidth: "420px", fontSize: "0.9rem", marginBottom: actionLabel ? "20px" : 0 }}>
        {description}
      </p>

      {actionLabel && onAction && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
