// ==========================================================================
// DoctorAppointmentsPage - Doctor Appointment Management (SRS Section 21)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import { Calendar, Video, Clock, Users, FileCheck2, Search } from "lucide-react";
import PrescriptionModal from "../../components/prescription/PrescriptionModal";

export default function DoctorAppointmentsPage() {
  const {
    consultations,
    currentUser,
    startConsultation,
    navigateTo,
    patients
  } = useApp();

  const [activeTab, setActiveTab] = useState("all");
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedConsultationForRx, setSelectedConsultationForRx] = useState(null);

  const docId = currentUser?.id || "doc-1";
  const docConsultations = consultations.filter((c) => c.doctorId === docId);

  const filtered = docConsultations.filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "scheduled") return c.status === "SCHEDULED" || c.status === "IN PROGRESS";
    if (activeTab === "completed") return c.status === "COMPLETED";
    if (activeTab === "cancelled") return c.status === "CANCELLED";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Consultation Appointments</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Review, attend, and document all patient appointments across video, audio, and chat modes.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
        {[
          { id: "all", label: `All Appointments (${docConsultations.length})` },
          { id: "scheduled", label: "Upcoming / In Progress" },
          { id: "completed", label: "Completed" },
          { id: "cancelled", label: "Cancelled" }
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

      {/* Appointments List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No appointments in this category"
          description="There are currently no patient consultations under this view."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              className="card card-hover"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>
                    {c.patientName}
                  </h3>
                  <StatusBadge status={c.status} />
                </div>

                <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--slate-600)", flexWrap: "wrap", marginBottom: "6px" }}>
                  <span>📅 {c.date}</span>
                  <span>⏰ {c.timeSlot}</span>
                  <span style={{ textTransform: "capitalize" }}>📹 {c.mode} Call</span>
                  <span>Appt ID: <code>#{c.id}</code></span>
                  <span>Fee: ₹{c.fee} ({c.paymentStatus})</span>
                </div>

                {c.reason && (
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-800)" }}>
                    <strong>Chief Complaint:</strong> {c.reason}
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => navigateTo("doctor-patients", { patientId: c.patientId })}
                >
                  <Users size={14} /> Medical Chart
                </button>

                {(c.status === "SCHEDULED" || c.status === "IN PROGRESS") && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => startConsultation(c.id)}
                  >
                    <Video size={14} /> Start Consultation
                  </button>
                )}

                {c.status === "COMPLETED" && (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setSelectedConsultationForRx(c);
                      setPrescriptionModalOpen(true);
                    }}
                  >
                    <FileCheck2 size={14} /> Issue Rx
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {prescriptionModalOpen && selectedConsultationForRx && (
        <PrescriptionModal
          consultation={selectedConsultationForRx}
          patient={patients.find((p) => p.id === selectedConsultationForRx.patientId)}
          isOpen={prescriptionModalOpen}
          onClose={() => {
            setPrescriptionModalOpen(false);
            setSelectedConsultationForRx(null);
          }}
        />
      )}
    </div>
  );
}
