// ==========================================================================
// LabReportModal - Diagnostic Lab Report Viewer (SRS Section 16)
// ==========================================================================

import React from "react";
import Modal from "../common/Modal";
import { Printer, Download, ShieldCheck, FlaskConical, CheckCircle2 } from "lucide-react";

export default function LabReportModal({ booking, isOpen, onClose }) {
  if (!booking || !isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Diagnostic Report: ${booking.testName}`} maxWidth="780px">
      <div style={{ backgroundColor: "#ffffff", padding: "8px" }}>
        {/* Lab Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "14px",
            borderBottom: "2px solid var(--secondary)",
            marginBottom: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "var(--secondary)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FlaskConical size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
                TeleCare Diagnostics & Pathology Lab
              </h3>
              <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                NABL Accredited • ISO 15189 Certified Reference Laboratory
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right", fontSize: "0.8rem", color: "var(--slate-600)" }}>
            <div>Report Date: <strong>{booking.reportDate || "2026-10-04"}</strong></div>
            <div>Sample ID: <span style={{ fontFamily: "var(--font-mono)" }}>SMP-{booking.id}</span></div>
          </div>
        </div>

        {/* Patient Details Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "12px",
            padding: "10px 14px",
            background: "var(--slate-50)",
            borderRadius: "var(--radius-md)",
            marginBottom: "18px",
            fontSize: "0.825rem"
          }}
        >
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Patient:</span>
            <strong>{booking.patientName}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Sample Type:</span>
            <strong>{booking.sampleDetails || "Whole Blood (EDTA)"}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Collection Date:</span>
            <strong>{booking.collectionDate}</strong>
          </div>
        </div>

        {/* Diagnostic Findings */}
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ fontSize: "0.95rem", color: "var(--navy-900)", marginBottom: "8px" }}>
            Test Results & Analyte Parameters
          </h4>

          {booking.testName.toLowerCase().includes("lipid") ? (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ background: "var(--slate-100)", textAlign: "left" }}>
                  <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Investigation</th>
                  <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Result</th>
                  <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Unit</th>
                  <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Reference Interval</th>
                  <th style={{ padding: "8px", border: "1px solid var(--border-color)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", fontWeight: 600 }}>Total Cholesterol</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>195</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>mg/dL</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>&lt; 200</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", color: "#16a34a", fontWeight: 700 }}>Optimal</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", fontWeight: 600 }}>HDL Cholesterol ('Good')</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>48</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>mg/dL</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>&gt; 40</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", color: "#16a34a", fontWeight: 700 }}>Normal</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", fontWeight: 600 }}>LDL Cholesterol ('Bad')</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>118</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>mg/dL</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>&lt; 100</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", color: "#d97706", fontWeight: 700 }}>Borderline</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", fontWeight: 600 }}>Serum Triglycerides</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>145</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>mg/dL</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)" }}>&lt; 150</td>
                  <td style={{ padding: "8px", border: "1px solid var(--border-color)", color: "#16a34a", fontWeight: 700 }}>Normal</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div style={{ padding: "14px", background: "var(--slate-50)", borderRadius: "var(--radius-md)", fontSize: "0.85rem", lineHeight: 1.6 }}>
              <strong>Clinical Finding Summary:</strong>
              <p style={{ margin: "6px 0 0 0", color: "var(--navy-800)" }}>
                {booking.reportFindings || "All primary hematological indices within biological reference intervals. No abnormal cells or morphological abnormalities observed."}
              </p>
            </div>
          )}
        </div>

        {/* Verification Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--border-color)", fontSize: "0.8rem", color: "var(--slate-500)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16a34a", fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Verified by Chief Pathologist, MD
          </div>
          <div>Electronic Report Delivered to Health Vault</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }}>
        <button className="btn btn-outline btn-sm" onClick={() => window.print()}>
          <Printer size={14} /> Print Report
        </button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
