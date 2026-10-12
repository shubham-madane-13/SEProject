// ==========================================================================
// PatientConsultationsPage - Consultations Lifecycle & Action Center
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import {
  Calendar,
  Video,
  Clock,
  FileText,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";
import RescheduleModal from "../../components/consultation/RescheduleModal";
import CancelModal from "../../components/consultation/CancelModal";
import PrescriptionViewModal from "../../components/prescription/PrescriptionViewModal";

export default function PatientConsultationsPage() {
  const {
    consultations,
    currentUser,
    prescriptions,
    startConsultation,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState("all");
  const [rescheduleCons, setRescheduleCons] = useState(null);
  const [cancelCons, setCancelCons] = useState(null);
  const [viewPrescription, setViewPrescription] = useState(null);

  const myConsultations = consultations.filter((c) => c.patientId === currentUser?.id);

  const filtered = myConsultations.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "scheduled") return c.status === "SCHEDULED" || c.status === "IN PROGRESS";
    if (activeTab === "completed") return c.status === "COMPLETED";
    if (activeTab === "cancelled") return c.status === "CANCELLED" || c.status === "NO-SHOW";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>My Consultations</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Track, attend, reschedule, or cancel your doctor appointments.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => navigateTo("find-doctor")}>
          <Calendar size={15} /> Book New Consultation
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
        {[
          { id: "all", label: `All Consultations (${myConsultations.length})` },
          { id: "scheduled", label: "Upcoming / Scheduled" },
          { id: "completed", label: "Completed" },
          { id: "cancelled", label: "Cancelled & Refunds" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              border: activeTab === tab.id ? "1px solid var(--primary)" : "1px solid var(--slate-300)",
              background: activeTab === tab.id ? "var(--primary-light)" : "var(--white)",
              color: activeTab === tab.id ? "var(--primary-dark)" : "var(--navy-700)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Consultations List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No consultations found"
          description="You do not have any consultations under this status."
          actionLabel="Book a Consultation"
          onAction={() => navigateTo("find-doctor")}
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {filtered.map((c) => {
            const linkedPrescription = prescriptions.find((p) => p.consultationId === c.id || p.id === c.prescriptionId);

            return (
              <div
                key={c.id}
                className="card card-hover"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "18px"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--navy-900)" }}>
                      {c.doctorName}
                    </h3>
                    <StatusBadge status={c.status} />
                  </div>

                  <div style={{ display: "flex", gap: "16px", fontSize: "0.875rem", color: "var(--slate-600)", flexWrap: "wrap", marginBottom: "8px" }}>
                    <span>🩺 <strong>{c.specialty}</strong></span>
                    <span>📅 {c.date}</span>
                    <span>⏰ {c.timeSlot}</span>
                    <span style={{ textTransform: "capitalize" }}>📹 {c.mode} Call</span>
                    <span>Consultation ID: <code style={{ fontFamily: "var(--font-mono)" }}>#{c.id}</code></span>
                  </div>

                  {c.reason && (
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-800)" }}>
                      <strong>Reason:</strong> {c.reason}
                    </p>
                  )}

                  {c.notes && (
                    <p style={{ margin: "4px 0 0 0", fontSize: "0.825rem", color: "var(--slate-600)", background: "var(--slate-50)", padding: "6px 10px", borderRadius: "6px" }}>
                      <em>Doctor Notes:</em> {c.notes}
                    </p>
                  )}
                </div>

                {/* Actions per state */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {(c.status === "SCHEDULED" || c.status === "IN PROGRESS") && (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setRescheduleCons(c)}
                      >
                        Reschedule
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        style={{ color: "#dc2626", borderColor: "#fecaca" }}
                        onClick={() => setCancelCons(c)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => startConsultation(c.id)}
                      >
                        <Video size={14} /> Join Room
                      </button>
                    </>
                  )}

                  {c.status === "COMPLETED" && (
                    <>
                      {linkedPrescription ? (
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setViewPrescription(linkedPrescription)}
                        >
                          <FileText size={14} /> View E-Prescription
                        </button>
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>
                          Consultation Completed
                        </span>
                      )}
                    </>
                  )}

                  {c.status === "CANCELLED" && (
                    <span style={{ fontSize: "0.8rem", color: "#b91c1c", fontWeight: 600 }}>
                      Refund Processed ({c.paymentStatus})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleCons && (
        <RescheduleModal
          consultation={rescheduleCons}
          isOpen={!!rescheduleCons}
          onClose={() => setRescheduleCons(null)}
        />
      )}

      {/* Cancel Modal */}
      {cancelCons && (
        <CancelModal
          consultation={cancelCons}
          isOpen={!!cancelCons}
          onClose={() => setCancelCons(null)}
        />
      )}

      {/* Prescription View Modal */}
      {viewPrescription && (
        <PrescriptionViewModal
          prescription={viewPrescription}
          isOpen={!!viewPrescription}
          onClose={() => setViewPrescription(null)}
        />
      )}
    </div>
  );
}
