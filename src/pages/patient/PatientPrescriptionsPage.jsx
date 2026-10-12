// ==========================================================================
// PatientPrescriptionsPage - E-Prescriptions Issued to Patient (SRS Section 14)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import { FileCheck2, Printer, ShieldCheck, Eye, Activity, Calendar } from "lucide-react";
import PrescriptionViewModal from "../../components/prescription/PrescriptionViewModal";

export default function PatientPrescriptionsPage() {
  const { prescriptions, currentUser, navigateTo } = useApp();
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const myPrescriptions = prescriptions.filter((p) => p.patientId === currentUser?.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>My E-Prescriptions</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Access your digitally signed, legally valid prescriptions issued by attending doctors.
        </p>
      </div>

      {myPrescriptions.length === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title="No prescriptions available"
          description="You don't have any electronic prescriptions issued yet. Attend a consultation to receive clinical advice and digital prescriptions."
          actionLabel="Book a Consultation"
          onAction={() => navigateTo("find-doctor")}
        />
      ) : (
        <div className="grid-2">
          {myPrescriptions.map((rx) => (
            <div key={rx.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#16a34a", fontSize: "0.775rem", fontWeight: 700, marginBottom: "4px" }}>
                    <ShieldCheck size={14} /> Digitally Signed
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--navy-900)" }}>
                    {rx.diagnosis}
                  </h3>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--slate-500)", background: "var(--slate-100)", padding: "2px 8px", borderRadius: "4px" }}>
                  #{rx.id}
                </span>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginBottom: "14px" }}>
                <div>Prescribed by: <strong>{rx.doctorName}</strong> ({rx.doctorQualification})</div>
                <div>Date: <strong>{rx.date}</strong> • Reg: {rx.doctorLicense}</div>
              </div>

              {/* Medicines preview */}
              <div style={{ background: "var(--slate-50)", padding: "12px", borderRadius: "var(--radius-md)", marginBottom: "16px", flex: 1 }}>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-500)", display: "block", marginBottom: "6px" }}>
                  Medications Prescribed ({rx.medicines?.length || 0})
                </span>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.825rem" }}>
                  {rx.medicines?.slice(0, 3).map((m, idx) => (
                    <li key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong style={{ color: "var(--navy-900)" }}>• {m.name}</strong>
                      <span style={{ color: "var(--slate-500)" }}>{m.dosage} ({m.frequency})</span>
                    </li>
                  ))}
                  {rx.medicines?.length > 3 && (
                    <li style={{ color: "var(--primary)", fontSize: "0.775rem" }}>
                      + {rx.medicines.length - 3} more medications...
                    </li>
                  )}
                </ul>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "12px", marginTop: "auto" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-400)" }}>
                  Hash: {rx.doctorSignature?.digitalHash ? rx.doctorSignature.digitalHash.substring(0, 16) + "..." : "SHA256:7b91e..."}
                </span>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedPrescription(rx)}
                >
                  <Eye size={13} /> View & Print Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPrescription && (
        <PrescriptionViewModal
          prescription={selectedPrescription}
          isOpen={!!selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </div>
  );
}
