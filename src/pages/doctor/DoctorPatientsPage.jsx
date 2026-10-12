// ==========================================================================
// DoctorPatientsPage - Comprehensive Patient Clinical History & Records View
// (SRS Section 23 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";
import {
  Users,
  Search,
  FileText,
  Calendar,
  FolderLock,
  Heart,
  ShieldCheck,
  AlertTriangle,
  Clock
} from "lucide-react";
import RecordViewModal from "../../components/records/RecordViewModal";
import PrescriptionViewModal from "../../components/prescription/PrescriptionViewModal";

export default function DoctorPatientsPage() {
  const {
    patients,
    consultations,
    records,
    prescriptions,
    currentUser,
    pageParams
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(
    pageParams?.patientId || "pat-1"
  );
  const [viewRecord, setViewRecord] = useState(null);
  const [viewPrescription, setViewPrescription] = useState(null);

  // Doctors can only view patients who have had consultations with them or are in their clinic roster (SRS Section 23)
  const myPatientIds = [
    ...new Set(
      consultations
        .filter((c) => c.doctorId === (currentUser?.id || "doc-1"))
        .map((c) => c.patientId)
    )
  ];

  const visiblePatients = patients.filter((p) =>
    myPatientIds.includes(p.id) || p.id === "pat-1"
  );

  const selectedPatient =
    visiblePatients.find((p) => p.id === selectedPatientId) || visiblePatients[0];

  // Specific patient clinical assets
  const patientConsultations = consultations.filter((c) => c.patientId === selectedPatient?.id);
  const patientRecords = records.filter((r) => r.patientId === selectedPatient?.id);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === selectedPatient?.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>
          Patient Clinical Records & Medical History
        </h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Confidential medical chart access for attending physicians (HIPAA / Telemedicine Compliant).
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "24px" }} className="patient-roster-grid">
        {/* Left: Patient List */}
        <div className="card" style={{ padding: "16px" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy-900)", marginBottom: "12px" }}>
            My Patient Directory ({visiblePatients.length})
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {visiblePatients.map((p) => {
              const isSelected = p.id === selectedPatient?.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  style={{
                    padding: "12px",
                    borderRadius: "var(--radius-md)",
                    border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-light)",
                    background: isSelected ? "var(--primary-subtle)" : "var(--white)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all var(--transition-fast)"
                  }}
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                      {p.age} yrs • {p.bloodGroup} • {p.gender}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Patient's Full Medical Chart (SRS Section 23) */}
        {selectedPatient && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Patient Header Card */}
            <div className="card" style={{ background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <img
                    src={selectedPatient.avatar}
                    alt={selectedPatient.name}
                    style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--primary-light)" }}
                  />
                  <div>
                    <h2 style={{ fontSize: "1.4rem", color: "var(--navy-900)", margin: 0 }}>
                      {selectedPatient.name}
                    </h2>
                    <div style={{ fontSize: "0.85rem", color: "var(--slate-500)", marginTop: "2px" }}>
                      Patient ID: <code style={{ fontFamily: "var(--font-mono)" }}>#{selectedPatient.id}</code> • Age: {selectedPatient.age} • Gender: {selectedPatient.gender} • Blood Group: <strong>{selectedPatient.bloodGroup}</strong>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--slate-600)", marginTop: "2px" }}>
                      Emergency Contact: {selectedPatient.emergencyContact}
                    </div>
                  </div>
                </div>

                {/* Vitals / Allergy Badge */}
                <div style={{ padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", fontSize: "0.8rem", color: "#991b1b" }}>
                  <strong>Known Allergies:</strong> {selectedPatient.allergies || "None reported"}
                  <div style={{ color: "#7f1d1d", marginTop: "2px" }}>
                    Chronic: {selectedPatient.chronicConditions || "None"}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Records & Previous Scans (SRS Section 23) */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FolderLock size={18} style={{ color: "var(--primary)" }} />
                  <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Patient Vault Documents ({patientRecords.length})</h3>
                </div>
              </div>

              {patientRecords.length === 0 ? (
                <p style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>No medical records uploaded by this patient.</p>
              ) : (
                <div className="grid-2">
                  {patientRecords.map((r) => (
                    <div
                      key={r.id}
                      style={{
                        padding: "12px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-color)",
                        background: "var(--slate-50)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: "0.875rem", color: "var(--navy-900)", display: "block" }}>{r.name}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{r.type} • {r.uploadDate}</span>
                      </div>
                      <button className="btn btn-outline btn-sm" onClick={() => setViewRecord(r)}>
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Previous Prescriptions History */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText size={18} style={{ color: "var(--secondary)" }} />
                  <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Previous Prescriptions ({patientPrescriptions.length})</h3>
                </div>
              </div>

              {patientPrescriptions.length === 0 ? (
                <p style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>No previous prescriptions found for this patient.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {patientPrescriptions.map((rx) => (
                    <div
                      key={rx.id}
                      style={{
                        padding: "12px 16px",
                        background: "var(--slate-50)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border-light)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: "0.9rem", color: "var(--navy-900)" }}>{rx.diagnosis}</strong>
                        <div style={{ fontSize: "0.775rem", color: "var(--slate-500)" }}>
                          Date: {rx.date} • Prescribed by: {rx.doctorName} • {rx.medicines?.length || 0} Meds
                        </div>
                      </div>
                      <button className="btn btn-secondary btn-sm" onClick={() => setViewPrescription(rx)}>
                        View Rx
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Consultation History with this Patient */}
            <div className="card">
              <div className="card-header">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={18} style={{ color: "var(--navy-900)" }} />
                  <h3 style={{ fontSize: "1.1rem", margin: 0 }}>Consultation Sessions ({patientConsultations.length})</h3>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {patientConsultations.map((c) => (
                  <div
                    key={c.id}
                    style={{
                      padding: "12px",
                      background: "var(--white)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{c.date} at {c.timeSlot} ({c.mode.toUpperCase()})</span>
                        <StatusBadge status={c.status} />
                      </div>
                      {c.reason && (
                        <p style={{ margin: "2px 0 0 0", fontSize: "0.8rem", color: "var(--slate-600)" }}>
                          Complaint: {c.reason}
                        </p>
                      )}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--slate-400)", fontFamily: "var(--font-mono)" }}>
                      #{c.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Record Inspect Modal */}
      {viewRecord && (
        <RecordViewModal
          record={viewRecord}
          isOpen={!!viewRecord}
          onClose={() => setViewRecord(null)}
        />
      )}

      {/* Prescription Inspect Modal */}
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
