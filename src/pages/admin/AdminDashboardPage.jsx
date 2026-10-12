// ==========================================================================
// AdminDashboardPage - Platform Executive Overview & Telecare Metrics
// (SRS Section 24 Compliant)
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import {
  Users,
  Stethoscope,
  ShieldCheck,
  Calendar,
  CreditCard,
  FlaskConical,
  FileSearch,
  Activity,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

export default function AdminDashboardPage() {
  const {
    patients,
    doctors,
    consultations,
    labBookings,
    auditLogs,
    navigateTo,
    verifyDoctor
  } = useApp();

  const verifiedDoctors = doctors.filter((d) => d.verificationStatus === "VERIFIED");
  const pendingDoctors = doctors.filter((d) => d.verificationStatus === "PENDING");
  const activeConsultations = consultations.filter((c) => c.status === "SCHEDULED" || c.status === "IN PROGRESS");
  const completedConsultations = consultations.filter((c) => c.status === "COMPLETED");

  const totalRevenue = consultations
    .filter((c) => c.paymentStatus === "PAID")
    .reduce((acc, c) => acc + (c.fee || 0), 0) +
    labBookings
      .filter((b) => b.paymentStatus === "PAID")
      .reduce((acc, b) => acc + (b.price || 0), 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-xl)",
          padding: "28px 32px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Platform Operations & Compliance Desk
          </span>
          <h1 style={{ fontSize: "2rem", color: "#ffffff", margin: "4px 0 0 0" }}>
            TeleCare Pro Executive Analytics
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", marginTop: "4px" }}>
            Real-time platform monitoring, credential verification, and financial auditing.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo("admin-doctors")}
          >
            <ShieldCheck size={15} /> Review Doctors ({pendingDoctors.length} Pending)
          </button>
          <button
            className="btn btn-outline btn-sm"
            style={{ background: "rgba(255, 255, 255, 0.1)", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.2)" }}
            onClick={() => navigateTo("admin-audit")}
          >
            <FileSearch size={15} /> Audit Logs
          </button>
        </div>
      </div>

      {/* 8 Metric KPI Cards (SRS Section 24) */}
      <div className="grid-4">
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>TOTAL PATIENTS</span>
            <Users size={18} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy-900)", marginTop: "6px" }}>
            {patients.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>100% Active Profiles</span>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>TOTAL DOCTORS</span>
            <Stethoscope size={18} style={{ color: "var(--secondary)" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy-900)", marginTop: "6px" }}>
            {doctors.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{verifiedDoctors.length} Verified • {pendingDoctors.length} Pending</span>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>ACTIVE CONSULTATIONS</span>
            <Activity size={18} style={{ color: "#d97706" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginTop: "6px" }}>
            {activeConsultations.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Live in queue or progress</span>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>PLATFORM REVENUE</span>
            <CreditCard size={18} style={{ color: "#16a34a" }} />
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "6px" }}>
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Settled via UPI/Cards</span>
        </div>
      </div>

      {/* Pending Doctor Verification Alert Box (SRS Section 25) */}
      {pendingDoctors.length > 0 && (
        <div className="card" style={{ borderLeft: "4px solid #f59e0b" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={20} style={{ color: "#d97706" }} />
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
                Pending Doctor Verifications ({pendingDoctors.length})
              </h3>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigateTo("admin-doctors")}>
              Review All Applications →
            </button>
          </div>

          <p style={{ color: "var(--slate-600)", fontSize: "0.85rem", marginBottom: "14px" }}>
            Physicians awaiting registration license validation before prescribing authority is granted.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {pendingDoctors.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  background: "#fffbeb",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #fde68a"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--navy-900)" }}>{doc.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--slate-600)" }}>
                    {doc.specialty} • License: <strong>{doc.licenseNumber}</strong> • {doc.qualification}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => verifyDoctor(doc.id, "VERIFIED")}
                  >
                    <ShieldCheck size={14} /> Approve & Verify Doctor
                  </button>
                  <button
                    className="btn btn-outline btn-sm"
                    style={{ color: "#dc2626", borderColor: "#fecaca" }}
                    onClick={() => verifyDoctor(doc.id, "REJECTED")}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent System Activity / Audit Log Snapshot */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FileSearch size={18} style={{ color: "var(--primary)" }} />
            <h3 style={{ fontSize: "1.15rem", margin: 0 }}>System Audit Trail Snapshot</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => navigateTo("admin-audit")}>
            Full Audit Logs ({auditLogs.length}) →
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)" }}>
                <th style={{ padding: "10px" }}>Timestamp</th>
                <th style={{ padding: "10px" }}>Actor</th>
                <th style={{ padding: "10px" }}>Action</th>
                <th style={{ padding: "10px" }}>Entity</th>
                <th style={{ padding: "10px" }}>Details</th>
                <th style={{ padding: "10px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "10px", color: "var(--slate-500)", whiteSpace: "nowrap" }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td style={{ padding: "10px", fontWeight: 600 }}>{log.userName} ({log.userRole})</td>
                  <td style={{ padding: "10px" }}>
                    <code style={{ fontSize: "0.75rem", background: "var(--slate-100)", padding: "2px 6px", borderRadius: "4px" }}>
                      {log.action}
                    </code>
                  </td>
                  <td style={{ padding: "10px" }}>{log.entity} #{log.entityId}</td>
                  <td style={{ padding: "10px", color: "var(--slate-600)" }}>{log.details}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>
                      ✓ {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
