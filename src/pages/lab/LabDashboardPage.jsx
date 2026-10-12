// ==========================================================================
// LabDashboardPage - Phlebotomist & Laboratory Operations Hub
// (SRS Section 3 & 15 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import {
  FlaskConical,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  FileText,
  UploadCloud,
  Activity,
  AlertCircle
} from "lucide-react";
import LabReportModal from "../../components/lab/LabReportModal";

export default function LabDashboardPage() {
  const { labBookings, updateLabStatus, addToast, navigateTo } = useApp();

  const [selectedBookingForReport, setSelectedBookingForReport] = useState(null);
  const [reportFindingsInput, setReportFindingsInput] = useState("");
  const [activeUploadId, setActiveUploadId] = useState(null);

  const pendingCollection = labBookings.filter((b) => b.status === "ASSIGNED" || b.status === "REQUESTED");
  const inLabSamples = labBookings.filter((b) => b.status === "COLLECTED" || b.status === "IN LAB");
  const completedReports = labBookings.filter((b) => b.status === "REPORT READY");

  const handleAdvanceStatus = (bookingId, currentStatus) => {
    if (currentStatus === "REQUESTED") {
      updateLabStatus(bookingId, "ASSIGNED");
    } else if (currentStatus === "ASSIGNED") {
      updateLabStatus(bookingId, "COLLECTED");
    } else if (currentStatus === "COLLECTED") {
      updateLabStatus(bookingId, "IN LAB");
    }
  };

  const handleUploadReport = (bookingId) => {
    if (!reportFindingsInput.trim()) {
      addToast("Please provide diagnostic findings before marking report ready.", "warning");
      return;
    }
    updateLabStatus(bookingId, "REPORT READY", reportFindingsInput);
    setActiveUploadId(null);
    setReportFindingsInput("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "26px 32px",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Phlebotomy & Diagnostics Hub
          </span>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: "4px 0 0 0" }}>
            Field Collections & Diagnostics Queue
          </h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Active Phlebotomist: <strong>Suresh Kumar</strong> • TeleCare Diagnostics Laboratory
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigateTo("lab-bookings")}>
            <Truck size={15} /> All Field Bookings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid-3">
        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>PENDING SAMPLES</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginTop: "4px" }}>
            {pendingCollection.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Home visits assigned</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>SAMPLES IN LAB</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--secondary)", marginTop: "4px" }}>
            {inLabSamples.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Under automated processing</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>REPORTS DELIVERED</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            {completedReports.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Uploaded to patient vault</span>
        </div>
      </div>

      {/* Assigned Home Collections (SRS Section 15 & 16) */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FlaskConical size={18} style={{ color: "var(--secondary)" }} />
            <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Active Sample Collections & Processing</h3>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {labBookings.map((b) => (
            <div
              key={b.id}
              style={{
                padding: "18px 20px",
                borderRadius: "var(--radius-lg)",
                background: "var(--slate-50)",
                border: "1px solid var(--border-color)",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
                      {b.testName}
                    </h4>
                    <StatusBadge status={b.status} />
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginTop: "2px" }}>
                    Patient: <strong>{b.patientName}</strong> • Phone: <a href={`tel:${b.patientPhone}`}>{b.patientPhone}</a>
                  </div>
                </div>

                <div style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>
                  Booking ID: <code style={{ fontFamily: "var(--font-mono)" }}>#{b.id}</code>
                </div>
              </div>

              {/* Address & Window */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "12px", background: "var(--white)", padding: "12px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-light)", fontSize: "0.85rem" }}>
                <div>
                  <span style={{ color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={14} /> Collection Address:
                  </span>
                  <strong style={{ color: "var(--navy-900)" }}>{b.collectionAddress}</strong>
                </div>

                <div>
                  <span style={{ color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={14} /> Scheduled Window:
                  </span>
                  <strong>{b.collectionDate} ({b.collectionTimeSlot})</strong>
                </div>
              </div>

              {/* Progress State Machine Actions (SRS Section 15 & 16) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "12px" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>
                  Sample Requirement: <strong>{b.sampleDetails}</strong>
                </span>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {b.status === "REQUESTED" && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleAdvanceStatus(b.id, b.status)}
                    >
                      Assign Myself & Confirm
                    </button>
                  )}

                  {b.status === "ASSIGNED" && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAdvanceStatus(b.id, b.status)}
                    >
                      <CheckCircle2 size={14} /> Mark Sample as Collected
                    </button>
                  )}

                  {b.status === "COLLECTED" && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAdvanceStatus(b.id, b.status)}
                    >
                      <FlaskConical size={14} /> Transported: Mark "In Lab"
                    </button>
                  )}

                  {b.status === "IN LAB" && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActiveUploadId(activeUploadId === b.id ? null : b.id)}
                    >
                      <UploadCloud size={14} /> Upload Diagnostic Report & Mark Ready
                    </button>
                  )}

                  {b.status === "REPORT READY" && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedBookingForReport(b)}
                    >
                      <FileText size={14} /> View Completed Report
                    </button>
                  )}
                </div>
              </div>

              {/* In-Line Report Upload Drawer */}
              {activeUploadId === b.id && (
                <div style={{ background: "var(--white)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--secondary)", marginTop: "8px" }}>
                  <h5 style={{ margin: "0 0 8px 0", color: "var(--secondary)" }}>Enter Diagnostic Findings for {b.testName}:</h5>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="Enter automated analysis summary (e.g. Total Cholesterol 195 mg/dL, HDL 48 mg/dL, normal reference range)..."
                    value={reportFindingsInput}
                    onChange={(e) => setReportFindingsInput(e.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setActiveUploadId(null)}>
                      Cancel
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => handleUploadReport(b.id)}>
                      <UploadCloud size={14} /> Confirm & Deliver to Patient Vault
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lab Report Modal */}
      {selectedBookingForReport && (
        <LabReportModal
          booking={selectedBookingForReport}
          isOpen={!!selectedBookingForReport}
          onClose={() => setSelectedBookingForReport(null)}
        />
      )}
    </div>
  );
}
