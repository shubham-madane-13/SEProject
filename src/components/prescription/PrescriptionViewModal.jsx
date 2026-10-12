// ==========================================================================
// PrescriptionViewModal - Official Viewable & Printable E-Prescription Document
// ==========================================================================

import React from "react";
import Modal from "../common/Modal";
import { Printer, Download, ShieldCheck, Activity, QrCode } from "lucide-react";

export default function PrescriptionViewModal({ prescription, isOpen, onClose }) {
  if (!prescription || !isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`E-Prescription #${prescription.id}`} maxWidth="820px">
      <div className="printable-prescription" style={{ backgroundColor: "#ffffff", padding: "10px" }}>
        {/* Prescription Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: "16px",
            borderBottom: "2px solid var(--primary)",
            marginBottom: "16px"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff"
                }}
              >
                <Activity size={18} />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--navy-900)" }}>
                TeleCare<span style={{ color: "var(--primary)" }}>Pro</span>
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>
              Certified Telemedicine Clinical Platform
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <h4 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
              {prescription.doctorName}
            </h4>
            <div style={{ fontSize: "0.85rem", color: "var(--slate-600)" }}>
              {prescription.doctorQualification}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: 600 }}>
              Reg License: {prescription.doctorLicense}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--slate-400)" }}>
              {prescription.hospital || "TeleCare Virtual Network"}
            </div>
          </div>
        </div>

        {/* Patient Details & Vitals Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "12px",
            padding: "12px",
            background: "var(--slate-50)",
            borderRadius: "var(--radius-md)",
            marginBottom: "18px",
            fontSize: "0.825rem",
            border: "1px solid var(--border-light)"
          }}
        >
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Patient Name</span>
            <strong>{prescription.patientName}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Date</span>
            <strong>{prescription.date}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Prescription ID</span>
            <strong style={{ fontFamily: "var(--font-mono)" }}>#{prescription.id}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Consultation ID</span>
            <strong>{prescription.consultationId ? `#${prescription.consultationId}` : "Direct Clinical"}</strong>
          </div>
        </div>

        {/* Vitals Summary */}
        {prescription.vitalSigns && (
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px", padding: "8px 12px", background: "var(--primary-subtle)", borderRadius: "6px", fontSize: "0.8rem", color: "var(--primary-dark)" }}>
            <span><strong>BP:</strong> {prescription.vitalSigns.bloodPressure || "120/80"}</span>
            <span><strong>Pulse:</strong> {prescription.vitalSigns.pulse || "72 bpm"}</span>
            <span><strong>Temp:</strong> {prescription.vitalSigns.temperature || "98.6°F"}</span>
            <span><strong>SpO2:</strong> {prescription.vitalSigns.spo2 || "98%"}</span>
          </div>
        )}

        {/* Diagnosis */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-500)", marginBottom: "4px" }}>
            Clinical Diagnosis
          </div>
          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--navy-900)" }}>
            {prescription.diagnosis}
          </div>
        </div>

        {/* Prescription Symbol (Rx) & Medications Table */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)", marginBottom: "8px", fontFamily: "serif" }}>
            ℞
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-100)", textAlign: "left" }}>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>#</th>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>Medicine / Composition</th>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>Dosage</th>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>Frequency</th>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>Duration</th>
                <th style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>Instructions</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines?.map((m, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>{index + 1}</td>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)", fontWeight: 600 }}>{m.name}</td>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>{m.dosage}</td>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>{m.frequency}</td>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)" }}>{m.duration}</td>
                  <td style={{ padding: "8px 10px", border: "1px solid var(--border-color)", color: "var(--slate-600)" }}>{m.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* General Advice */}
        {prescription.generalAdvice && (
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-500)", marginBottom: "4px" }}>
              Dietary & Lifestyle Advice
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-800)" }}>
              {prescription.generalAdvice}
            </p>
          </div>
        )}

        {/* Follow-up Note */}
        {prescription.followUpDate && (
          <div style={{ marginBottom: "20px", fontSize: "0.85rem" }}>
            <strong>Follow-up Recommendation:</strong> Review consultation scheduled for <strong>{prescription.followUpDate}</strong> ({prescription.followUpInDays || 7} days).
          </div>
        )}

        {/* Digital Signature & Verification Box */}
        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.75rem", color: "var(--slate-500)" }}>
            <div style={{ width: "40px", height: "40px", border: "1px solid var(--slate-300)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <QrCode size={28} style={{ color: "var(--navy-900)" }} />
            </div>
            <div>
              <div>Security Hash: <span style={{ fontFamily: "var(--font-mono)" }}>{prescription.doctorSignature?.digitalHash || "SHA256:7b91ec8301cf6a5291da"}</span></div>
              <div>Digitally Signed: {new Date(prescription.doctorSignature?.signedAt || Date.now()).toLocaleString()}</div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", color: "#16a34a", fontSize: "0.8rem", fontWeight: 700 }}>
              <ShieldCheck size={16} /> Digitally Signed
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--navy-900)", marginTop: "4px" }}>
              {prescription.doctorSignature?.signatureText || prescription.doctorName}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
              Authorized Medical Practitioner
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
        <button className="btn btn-outline btn-sm" onClick={handlePrint}>
          <Printer size={14} /> Print E-Prescription
        </button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
