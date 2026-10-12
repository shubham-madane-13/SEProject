// ==========================================================================
// DoctorDashboard - Clinical Workspace & Daily Appointments (SRS Section 21)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import {
  Calendar,
  Clock,
  Video,
  Users,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2,
  Stethoscope
} from "lucide-react";
import PrescriptionModal from "../../components/prescription/PrescriptionModal";

export default function DoctorDashboard() {
  const {
    currentUser,
    consultations,
    startConsultation,
    navigateTo,
    patients
  } = useApp();

  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [selectedConsultationForRx, setSelectedConsultationForRx] = useState(null);

  const docId = currentUser?.id || "doc-1";
  const isVerified = currentUser?.verificationStatus === "VERIFIED";

  // Filter consultations for this doctor
  const docConsultations = consultations.filter((c) => c.doctorId === docId);

  // Today's consultations (date === 2026-10-07)
  const todayConsultations = docConsultations.filter(
    (c) => c.date === "2026-10-07" || c.status === "SCHEDULED"
  );

  const pendingAppointments = docConsultations.filter((c) => c.status === "SCHEDULED");
  const completedAppointments = docConsultations.filter((c) => c.status === "COMPLETED");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Verification Alert if Pending */}
      {!isVerified && (
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#92400e"
          }}
        >
          <AlertTriangle size={24} style={{ flexShrink: 0, color: "#d97706" }} />
          <div>
            <strong style={{ fontSize: "0.95rem" }}>Profile Under Compliance Review:</strong>
            <p style={{ margin: "2px 0 0 0", fontSize: "0.85rem" }}>
              Your state medical registration ({currentUser?.licenseNumber}) is currently being verified by the medical board. You can preview appointments, but digital e-prescribing is restricted until approved.
            </p>
          </div>
        </div>
      )}

      {/* Greeting Banner */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Doctor Clinical Workspace
            </span>
            {isVerified && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>
                <ShieldCheck size={14} /> Verified Practitioner
              </span>
            )}
          </div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>
            Welcome back, {currentUser?.name}
          </h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            {currentUser?.specialty} • {currentUser?.hospital || "TeleCare Virtual Network"} • Lic: {currentUser?.licenseNumber}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigateTo("doctor-availability")}
          >
            <Clock size={15} /> Manage Working Hours
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo("doctor-patients")}
          >
            <Users size={15} /> Patient Directory
          </button>
        </div>
      </div>

      {/* Stats Counter Bar (SRS Section 21) */}
      <div className="grid-4">
        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>TODAY'S SCHEDULE</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--navy-900)", marginTop: "4px" }}>
            {todayConsultations.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--primary)" }}>Appointments booked</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>PENDING SESSIONS</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginTop: "4px" }}>
            {pendingAppointments.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Ready for consultation</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>COMPLETED SESSIONS</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            {completedAppointments.length}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Consultations delivered</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>CONSULTATION FEE</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--secondary)", marginTop: "4px" }}>
            ₹{currentUser?.consultationFee || 800}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Per 15-min digital session</span>
        </div>
      </div>

      {/* Today's Consultations List (SRS Section 21 Example) */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={18} style={{ color: "var(--primary)" }} />
            <h3 style={{ fontSize: "1.15rem", margin: 0 }}>Today's Scheduled Consultations</h3>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigateTo("doctor-appointments")}
          >
            View All ({docConsultations.length}) →
          </button>
        </div>

        {todayConsultations.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No appointments scheduled for today"
            description="Your appointment queue is currently clear. Patients can book slots according to your published calendar."
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {todayConsultations.map((c) => {
              const patient = patients.find((p) => p.id === c.patientId);
              return (
                <div
                  key={c.id}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--slate-50)",
                    border: "1px solid var(--border-light)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px"
                  }}
                  className="card-hover"
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "1.05rem", color: "var(--navy-900)" }}>
                        {c.timeSlot} — {c.patientName}
                      </strong>
                      <StatusBadge status={c.status} />
                    </div>

                    <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                      <span>Mode: <strong style={{ textTransform: "capitalize" }}>{c.mode} Call</strong></span>
                      <span>Patient ID: #{c.patientId}</span>
                      <span>Appt ID: #{c.id}</span>
                    </div>

                    {c.reason && (
                      <p style={{ margin: "6px 0 0 0", fontSize: "0.825rem", color: "var(--navy-800)" }}>
                        <em>Chief Complaint:</em> {c.reason}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => navigateTo("doctor-patients", { patientId: c.patientId })}
                    >
                      <Users size={14} /> View Patient History
                    </button>

                    {(c.status === "SCHEDULED" || c.status === "IN PROGRESS") && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => startConsultation(c.id)}
                      >
                        <Video size={14} /> Start Consultation
                      </button>
                    )}

                    {c.status === "COMPLETED" && isVerified && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedConsultationForRx(c);
                          setPrescriptionModalOpen(true);
                        }}
                      >
                        <FileCheck2 size={14} /> Write E-Prescription
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
