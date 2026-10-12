// ==========================================================================
// DemoBar - Quick Multi-Role Switcher & Interactive Prototyping Bar
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import { Shield, User, Stethoscope, FlaskConical, Settings, RotateCcw, Globe } from "lucide-react";

export default function DemoBar() {
  const { currentUser, switchRole, resetDemoData } = useApp();

  return (
    <div className="demo-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span className="demo-bar-badge">TeleCare Pro Live Preview</span>
        <span style={{ color: "#94a3b8", fontSize: "0.775rem" }}>
          Active Role: <strong style={{ color: "#ffffff" }}>{currentUser ? currentUser.role.toUpperCase() : "GUEST (PUBLIC)"}</strong>
          {currentUser && currentUser.name && ` (${currentUser.name})`}
        </span>
      </div>

      <div className="demo-bar-roles">
        <span style={{ fontSize: "0.75rem", color: "#94a3b8", marginRight: "4px" }}>Switch Persona:</span>
        
        <button
          className={`demo-role-btn ${currentUser?.role === "patient" ? "active" : ""}`}
          onClick={() => switchRole("patient")}
          title="Patient (Rahul Verma)"
        >
          <User size={13} />
          Patient
        </button>

        <button
          className={`demo-role-btn ${currentUser?.role === "doctor" && currentUser?.verificationStatus === "VERIFIED" ? "active" : ""}`}
          onClick={() => switchRole("doctor")}
          title="Doctor (Dr. Ananya Sharma - Verified)"
        >
          <Stethoscope size={13} />
          Doctor (Verified)
        </button>

        <button
          className={`demo-role-btn ${currentUser?.role === "doctor" && currentUser?.verificationStatus === "PENDING" ? "active" : ""}`}
          onClick={() => switchRole("doctor-pending")}
          title="Doctor (Dr. Vikram Malhotra - Pending Verification)"
        >
          <Stethoscope size={13} />
          Doctor (Pending)
        </button>

        <button
          className={`demo-role-btn ${currentUser?.role === "lab" ? "active" : ""}`}
          onClick={() => switchRole("lab")}
          title="Lab Phlebotomist (Suresh Kumar)"
        >
          <FlaskConical size={13} />
          Lab Tech
        </button>

        <button
          className={`demo-role-btn ${currentUser?.role === "admin" ? "active" : ""}`}
          onClick={() => switchRole("admin")}
          title="System Admin & Compliance"
        >
          <Shield size={13} />
          Admin
        </button>

        <button
          className={`demo-role-btn ${!currentUser ? "active" : ""}`}
          onClick={() => switchRole("public")}
          title="Public Website (Logged out)"
        >
          <Globe size={13} />
          Public Site
        </button>

        <button
          onClick={resetDemoData}
          style={{
            background: "rgba(239, 68, 68, 0.2)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "0.725rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginLeft: "6px"
          }}
          title="Reset all appointments, lab bookings, and audit records to original seed state"
        >
          <RotateCcw size={12} />
          Reset Data
        </button>
      </div>
    </div>
  );
}
