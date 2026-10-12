// ==========================================================================
// PrescriptionModal - Doctor E-Prescription Creation & Digital Signing
// (SRS Section 14 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";
import {
  Plus,
  Trash2,
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  PenTool,
  Check
} from "lucide-react";

export default function PrescriptionModal({ consultation, patient, isOpen, onClose }) {
  const { currentUser, createPrescription, addToast } = useApp();

  const [diagnosis, setDiagnosis] = useState(
    consultation?.reason
      ? `Clinical assessment for ${consultation.reason}`
      : "Upper Respiratory Tract Infection / Symptomatic Care"
  );
  const [bp, setBp] = useState("120/80 mmHg");
  const [pulse, setPulse] = useState("74 bpm");
  const [temp, setTemp] = useState("98.6 °F");
  const [spo2, setSpo2] = useState("99%");

  const [medicines, setMedicines] = useState([
    {
      id: "med-1",
      name: "Paracetamol 650mg",
      type: "Tablet",
      dosage: "1 Tablet",
      frequency: "Thrice daily after meals (TID)",
      duration: "5 Days",
      instructions: "Take with water if body temp exceeds 99°F"
    }
  ]);

  const [generalAdvice, setGeneralAdvice] = useState(
    "Adequate rest, stay well-hydrated with 2.5-3 Litres of fluids daily. Monitor temperature twice daily."
  );
  const [followUpDays, setFollowUpDays] = useState(7);
  const [isDigitallySigned, setIsDigitallySigned] = useState(false);
  const [signatureText, setSignatureText] = useState(
    currentUser?.name || "Dr. Ananya Sharma, MD Cardiology"
  );

  if (!isOpen) return null;

  const isDoctorVerified = currentUser?.role === "doctor" && currentUser?.verificationStatus === "VERIFIED";

  const handleAddMedicine = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: `med-${Date.now()}`,
        name: "",
        type: "Tablet",
        dosage: "1 Tablet",
        frequency: "Twice daily (BD)",
        duration: "5 Days",
        instructions: "Take after meals"
      }
    ]);
  };

  const handleRemoveMedicine = (id) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleMedicineChange = (id, field, value) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSaveAndSign = () => {
    if (!isDoctorVerified) {
      addToast("Unauthorized: Only VERIFIED doctors can digitally sign and issue prescriptions.", "error");
      return;
    }

    if (!diagnosis.trim()) {
      addToast("Please provide a clinical diagnosis.", "warning");
      return;
    }

    if (medicines.some((m) => !m.name.trim())) {
      addToast("All medication names must be filled out.", "warning");
      return;
    }

    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + parseInt(followUpDays || 7));

    const success = createPrescription({
      consultationId: consultation?.id || null,
      patientId: patient?.id || "pat-1",
      patientName: patient?.name || "Rahul Verma",
      doctorId: currentUser?.id || "doc-1",
      doctorName: currentUser?.name || "Dr. Ananya Sharma",
      doctorQualification: currentUser?.qualification || "MBBS, MD",
      doctorLicense: currentUser?.licenseNumber || "MCI-2012-84920",
      hospital: currentUser?.hospital || "TeleCare Network Hospitals",
      date: new Date().toISOString().split("T")[0],
      diagnosis,
      vitalSigns: {
        bloodPressure: bp,
        pulse,
        temperature: temp,
        spo2
      },
      medicines,
      generalAdvice,
      followUpInDays: parseInt(followUpDays),
      followUpDate: followUpDate.toISOString().split("T")[0]
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Issue Digitally Signed E-Prescription" maxWidth="780px">
      {!isDoctorVerified && (
        <div style={{ padding: "12px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-md)", marginBottom: "16px", color: "#991b1b", display: "flex", gap: "10px", alignItems: "center" }}>
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Digital Prescribing Locked:</strong> Your doctor account is currently <em>{currentUser?.verificationStatus || "PENDING"}</em>. Per Medical Council and Telemedicine Guidelines, only VERIFIED credentials can issue signed electronic prescriptions.
          </div>
        </div>
      )}

      {/* Patient & Doctor Header Bar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", padding: "14px", background: "var(--slate-50)", borderRadius: "var(--radius-md)", marginBottom: "18px", fontSize: "0.85rem" }}>
        <div>
          <span style={{ color: "var(--slate-500)", fontSize: "0.75rem", textTransform: "uppercase" }}>Patient</span>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{patient?.name}</div>
          <div style={{ color: "var(--slate-600)" }}>Age: {patient?.age} • Gender: {patient?.gender} • Blood Group: {patient?.bloodGroup}</div>
        </div>
        <div>
          <span style={{ color: "var(--slate-500)", fontSize: "0.75rem", textTransform: "uppercase" }}>Prescribing Physician</span>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{currentUser?.name}</div>
          <div style={{ color: "var(--slate-600)" }}>Lic: {currentUser?.licenseNumber} • {currentUser?.qualification}</div>
        </div>
      </div>

      {/* Diagnosis & Vitals */}
      <div className="form-group">
        <label className="form-label">Clinical Diagnosis / Impression:</label>
        <input
          type="text"
          className="form-input"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="e.g. Stage 1 Essential Hypertension, Sinus Tachycardia"
        />
      </div>

      {/* Recorded Vitals Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "18px" }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.75rem" }}>Blood Pressure</label>
          <input type="text" className="form-input" value={bp} onChange={(e) => setBp(e.target.value)} />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.75rem" }}>Pulse Rate</label>
          <input type="text" className="form-input" value={pulse} onChange={(e) => setPulse(e.target.value)} />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.75rem" }}>Temperature</label>
          <input type="text" className="form-input" value={temp} onChange={(e) => setTemp(e.target.value)} />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ fontSize: "0.75rem" }}>SpO2 (%)</label>
          <input type="text" className="form-input" value={spo2} onChange={(e) => setSpo2(e.target.value)} />
        </div>
      </div>

      {/* Medications Rx List */}
      <div style={{ marginBottom: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label className="form-label" style={{ margin: 0 }}>Prescribed Medications (Rx):</label>
          <button type="button" onClick={handleAddMedicine} className="btn btn-outline btn-sm">
            <Plus size={14} /> Add Medicine
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {medicines.map((m, idx) => (
            <div
              key={m.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr 2fr 40px",
                gap: "8px",
                alignItems: "center",
                padding: "10px",
                background: "var(--slate-50)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)"
              }}
            >
              <input
                type="text"
                className="form-input"
                placeholder="Medicine Name & Strength"
                value={m.name}
                onChange={(e) => handleMedicineChange(m.id, "name", e.target.value)}
                style={{ fontSize: "0.85rem", padding: "8px" }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Dosage (e.g. 1 Tab)"
                value={m.dosage}
                onChange={(e) => handleMedicineChange(m.id, "dosage", e.target.value)}
                style={{ fontSize: "0.85rem", padding: "8px" }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Frequency (e.g. TID)"
                value={m.frequency}
                onChange={(e) => handleMedicineChange(m.id, "frequency", e.target.value)}
                style={{ fontSize: "0.85rem", padding: "8px" }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Duration"
                value={m.duration}
                onChange={(e) => handleMedicineChange(m.id, "duration", e.target.value)}
                style={{ fontSize: "0.85rem", padding: "8px" }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Instructions (e.g. After food)"
                value={m.instructions}
                onChange={(e) => handleMedicineChange(m.id, "instructions", e.target.value)}
                style={{ fontSize: "0.85rem", padding: "8px" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveMedicine(m.id)}
                disabled={medicines.length === 1}
                className="btn btn-ghost btn-icon"
                style={{ width: "32px", height: "32px", color: "#dc2626" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* General Advice & Follow-Up */}
      <div className="form-group">
        <label className="form-label">General Medical Advice & Lifestyle Instructions:</label>
        <textarea
          className="form-textarea"
          rows={2}
          value={generalAdvice}
          onChange={(e) => setGeneralAdvice(e.target.value)}
          placeholder="Dietary precautions, exercise, red flag symptoms to watch for..."
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Follow-up Consultation in:</label>
          <select
            className="form-select"
            value={followUpDays}
            onChange={(e) => setFollowUpDays(e.target.value)}
          >
            <option value={3}>3 Days</option>
            <option value={5}>5 Days</option>
            <option value={7}>7 Days (1 Week)</option>
            <option value={14}>14 Days (2 Weeks)</option>
            <option value={30}>30 Days (1 Month)</option>
          </select>
        </div>

        {/* Digital Signature Affirmation */}
        <div style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", fontSize: "0.825rem", color: "#166534" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700 }}>
            <ShieldCheck size={18} style={{ color: "#16a34a" }} />
            Cryptographic Digital Signature
          </div>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.785rem" }}>
            Signing as <strong>{currentUser?.name}</strong> (License: {currentUser?.licenseNumber}). Generates tamper-proof SHA-256 seal.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
        <button className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary btn-sm"
          disabled={!isDoctorVerified}
          onClick={handleSaveAndSign}
        >
          <PenTool size={15} /> Digitally Sign & Deliver Prescription
        </button>
      </div>
    </Modal>
  );
}
