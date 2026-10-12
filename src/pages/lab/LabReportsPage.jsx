// ==========================================================================
// LabReportsPage - Pathology Diagnostics & Report Delivery Engine
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import { FileCheck2, UploadCloud, FileText } from "lucide-react";
import LabReportModal from "../../components/lab/LabReportModal";

export default function LabReportsPage() {
  const { labBookings, updateLabStatus, addToast } = useApp();
  const [selectedBookingForReport, setSelectedBookingForReport] = useState(null);
  const [activeUploadId, setActiveUploadId] = useState(null);
  const [findingsText, setFindingsText] = useState("");

  const handleUploadSubmit = (b) => {
    if (!findingsText.trim()) {
      addToast("Please provide diagnostic findings to publish report.", "warning");
      return;
    }
    updateLabStatus(b.id, "REPORT READY", findingsText);
    setActiveUploadId(null);
    setFindingsText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Diagnostic Report Delivery</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Publish verified pathology findings directly to patient health vaults.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {labBookings.map((b) => (
          <div key={b.id} className="card card-hover" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>{b.testName}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginTop: "2px" }}>
                  Patient: <strong>{b.patientName}</strong> • Date: {b.collectionDate}
                </div>
              </div>

              <div>
                {b.status === "REPORT READY" ? (
                  <button className="btn btn-outline btn-sm" onClick={() => setSelectedBookingForReport(b)}>
                    <FileText size={14} /> View Published Report
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-sm" onClick={() => setActiveUploadId(activeUploadId === b.id ? null : b.id)}>
                    <UploadCloud size={14} /> Upload / Publish Report
                  </button>
                )}
              </div>
            </div>

            {activeUploadId === b.id && (
              <div style={{ background: "var(--slate-50)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid var(--secondary)", marginTop: "6px" }}>
                <label className="form-label" style={{ color: "var(--secondary)" }}>Pathology Findings & Analyte Values:</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="Enter parameters (e.g. Normal complete blood count. WBC 7200 /mcL, Hb 14.2 g/dL, Platelets normal)..."
                  value={findingsText}
                  onChange={(e) => setFindingsText(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setActiveUploadId(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleUploadSubmit(b)}>
                    Publish Report & Alert Patient
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

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
