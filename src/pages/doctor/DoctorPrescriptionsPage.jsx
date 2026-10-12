// ==========================================================================
// DoctorPrescriptionsPage - Doctor E-Prescription Management & Digital Records
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import { FileCheck2, Plus, Eye, ShieldCheck, PenTool } from "lucide-react";
import PrescriptionModal from "../../components/prescription/PrescriptionModal";
import PrescriptionViewModal from "../../components/prescription/PrescriptionViewModal";

export default function DoctorPrescriptionsPage() {
  const { prescriptions, currentUser, patients } = useApp();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedRxForView, setSelectedRxForView] = useState(null);

  const docId = currentUser?.id || "doc-1";
  const myPrescriptions = prescriptions.filter((p) => p.doctorId === docId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>E-Prescription Management</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Generate, digitally sign, and review prescriptions delivered to your patients.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setCreateModalOpen(true)}
        >
          <PenTool size={15} /> Create New Prescription
        </button>
      </div>

      {myPrescriptions.length === 0 ? (
        <EmptyState
          icon={FileCheck2}
          title="No prescriptions issued yet"
          description="You haven't issued any digital prescriptions yet. You can create one directly from a completed consultation or click below."
          actionLabel="Create E-Prescription"
          onAction={() => setCreateModalOpen(true)}
        />
      ) : (
        <div className="grid-2">
          {myPrescriptions.map((rx) => (
            <div key={rx.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                    <ShieldCheck size={14} /> Legally Valid Digital Signature
                  </span>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
                    {rx.diagnosis}
                  </h3>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--slate-500)", background: "var(--slate-100)", padding: "2px 8px", borderRadius: "4px" }}>
                  #{rx.id}
                </span>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginBottom: "14px" }}>
                <div>Patient: <strong>{rx.patientName}</strong></div>
                <div>Date: <strong>{rx.date}</strong> • Appt: #{rx.consultationId || "Direct"}</div>
              </div>

              <div style={{ background: "var(--slate-50)", padding: "10px", borderRadius: "var(--radius-md)", marginBottom: "16px", flex: 1, fontSize: "0.8rem" }}>
                <strong>Rx Medications ({rx.medicines?.length || 0}):</strong>
                <ul style={{ margin: "4px 0 0 16px", padding: 0, color: "var(--navy-800)" }}>
                  {rx.medicines?.map((m, idx) => (
                    <li key={idx}>
                      {m.name} — {m.dosage} ({m.frequency})
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-light)", paddingTop: "12px", marginTop: "auto" }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedRxForView(rx)}
                >
                  <Eye size={13} /> View & Print Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creation Modal */}
      {createModalOpen && (
        <PrescriptionModal
          patient={patients[0]}
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      )}

      {/* View Modal */}
      {selectedRxForView && (
        <PrescriptionViewModal
          prescription={selectedRxForView}
          isOpen={!!selectedRxForView}
          onClose={() => setSelectedRxForView(null)}
        />
      )}
    </div>
  );
}
