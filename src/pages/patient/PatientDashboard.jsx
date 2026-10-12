// ==========================================================================
// PatientDashboard - Patient Primary Home Screen (SRS Section 7 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import {
  Calendar,
  Search,
  UploadCloud,
  FlaskConical,
  Video,
  FileCheck2,
  FolderLock,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
  Heart,
  AlertCircle
} from "lucide-react";
import RecordUploadModal from "../../components/records/RecordUploadModal";
import LabBookingModal from "../../components/lab/LabBookingModal";
import RescheduleModal from "../../components/consultation/RescheduleModal";
import CancelModal from "../../components/consultation/CancelModal";

export default function PatientDashboard() {
  const {
    currentUser,
    consultations,
    records,
    prescriptions,
    labBookings,
    navigateTo,
    startConsultation
  } = useApp();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [labBookingModalOpen, setLabBookingModalOpen] = useState(false);
  const [rescheduleCons, setRescheduleCons] = useState(null);
  const [cancelCons, setCancelCons] = useState(null);

  // Filter for this patient
  const myConsultations = consultations.filter((c) => c.patientId === currentUser?.id);
  const myRecords = records.filter((r) => r.patientId === currentUser?.id);
  const myPrescriptions = prescriptions.filter((p) => p.patientId === currentUser?.id);
  const myLabBookings = labBookings.filter((l) => l.patientId === currentUser?.id);

  // Next upcoming consultation
  const upcomingConsultation = myConsultations.find(
    (c) => c.status === "SCHEDULED" || c.status === "IN PROGRESS"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Greeting & Patient Overview (SRS Section 7) */}
      <div
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)",
          borderRadius: "var(--radius-xl)",
          padding: "28px 32px",
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
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Patient Portal
            </span>
          </div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>
            Good day, {currentUser?.name || "Rahul Verma"}
          </h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Your health dashboard is up to date. You have{" "}
            <strong>{upcomingConsultation ? "1 upcoming appointment" : "0 appointments"}</strong> scheduled today.
          </p>
        </div>

        {/* Quick Action Buttons (SRS Section 7) */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigateTo("find-doctor")}
          >
            <Calendar size={15} /> Book Consultation
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigateTo("find-doctor")}
          >
            <Search size={15} /> Find Doctor
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setUploadModalOpen(true)}
          >
            <UploadCloud size={15} /> Upload Record
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setLabBookingModalOpen(true)}
          >
            <FlaskConical size={15} /> Book Lab Test
          </button>
        </div>
      </div>

      {/* Upcoming Appointment Spotlight Card */}
      {upcomingConsultation ? (
        <div
          style={{
            background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
            color: "#ffffff",
            borderRadius: "var(--radius-xl)",
            padding: "24px 30px",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px"
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255, 255, 255, 0.2)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "12px", textTransform: "uppercase" }}>
              <Clock size={12} /> Next Scheduled Appointment
            </div>
            <h2 style={{ fontSize: "1.45rem", margin: "0 0 6px 0", color: "#ffffff" }}>
              {upcomingConsultation.doctorName} • {upcomingConsultation.specialty}
            </h2>
            <div style={{ display: "flex", gap: "16px", fontSize: "0.9rem", color: "#e0f2fe", flexWrap: "wrap" }}>
              <span>📅 {upcomingConsultation.date}</span>
              <span>⏰ {upcomingConsultation.timeSlot}</span>
              <span style={{ textTransform: "capitalize" }}>📹 {upcomingConsultation.mode} Consultation</span>
              <span>ID: #{upcomingConsultation.id}</span>
            </div>
            {upcomingConsultation.reason && (
              <p style={{ margin: "10px 0 0 0", fontSize: "0.85rem", color: "#bae6fd", maxWidth: "600px" }}>
                <em>Reason:</em> {upcomingConsultation.reason}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setRescheduleCons(upcomingConsultation)}
              className="btn btn-outline btn-sm"
              style={{ background: "rgba(255, 255, 255, 0.15)", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}
            >
              Reschedule
            </button>
            <button
              onClick={() => setCancelCons(upcomingConsultation)}
              className="btn btn-outline btn-sm"
              style={{ background: "rgba(239, 68, 68, 0.2)", color: "#ffffff", borderColor: "rgba(239, 68, 68, 0.4)" }}
            >
              Cancel
            </button>
            <button
              onClick={() => startConsultation(upcomingConsultation.id)}
              className="btn btn-lg"
              style={{ background: "#ffffff", color: "var(--primary-dark)", fontWeight: 700, boxShadow: "0 4px 14px rgba(0,0,0,0.2)" }}
            >
              <Video size={18} /> Join Consultation
            </button>
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No upcoming consultations scheduled"
          description="You don't have any pending doctor appointments. Choose from our verified specialists to book a video or voice call."
          actionLabel="Book a Consultation"
          onAction={() => navigateTo("find-doctor")}
        />
      )}

      {/* Grid of 4 Dashboard Overview Cards (SRS Section 7) */}
      <div className="grid-2">
        {/* Card 1: Consultation History */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={18} style={{ color: "var(--primary)" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Consultation History</h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigateTo("consultations")}
            >
              View All ({myConsultations.length}) →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {myConsultations.slice(0, 3).map((c) => (
              <div
                key={c.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "var(--slate-50)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-light)"
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>
                    {c.doctorName}
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--slate-500)" }}>
                    {c.specialty} • {c.date} ({c.timeSlot}) • {c.mode.toUpperCase()}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <StatusBadge status={c.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Recent Medical Records */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FolderLock size={18} style={{ color: "var(--primary)" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Recent Health Documents</h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigateTo("records")}
            >
              View Vault ({myRecords.length}) →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {myRecords.length === 0 ? (
              <p style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>No medical records uploaded yet.</p>
            ) : (
              myRecords.slice(0, 3).map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "var(--slate-50)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>
                      {r.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                      {r.type} • Uploaded: {r.uploadDate} • {r.fileSize}
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => navigateTo("records")}
                  >
                    View
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 3: E-Prescriptions */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FileCheck2 size={18} style={{ color: "var(--secondary)" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Digitally Signed E-Prescriptions</h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigateTo("prescriptions")}
            >
              View All ({myPrescriptions.length}) →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {myPrescriptions.length === 0 ? (
              <p style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>No prescriptions issued yet.</p>
            ) : (
              myPrescriptions.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "var(--slate-50)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>
                      {p.diagnosis}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                      By {p.doctorName} • {p.date} • {p.medicines?.length || 0} Medications
                    </div>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700 }}>
                    ✓ SIGNED
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Card 4: Lab Test & Home Sample Collection Status */}
        <div className="card">
          <div className="card-header">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FlaskConical size={18} style={{ color: "#d97706" }} />
              <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Laboratory Bookings</h3>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigateTo("lab-tests")}
            >
              Book Tests ({myLabBookings.length}) →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {myLabBookings.length === 0 ? (
              <p style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>You haven't booked any laboratory tests.</p>
            ) : (
              myLabBookings.slice(0, 3).map((lb) => (
                <div
                  key={lb.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px",
                    background: "var(--slate-50)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)"
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>
                      {lb.testName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                      Collection: {lb.collectionDate} ({lb.collectionTimeSlot})
                    </div>
                  </div>
                  <StatusBadge status={lb.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <RecordUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
      )}

      {/* Lab Booking Modal */}
      {labBookingModalOpen && (
        <LabBookingModal isOpen={labBookingModalOpen} onClose={() => setLabBookingModalOpen(false)} />
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
    </div>
  );
}
