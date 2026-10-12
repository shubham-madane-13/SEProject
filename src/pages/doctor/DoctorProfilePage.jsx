// ==========================================================================
// DoctorProfilePage - Doctor Credentials, Bio, & Practice Information
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Stethoscope, ShieldCheck, Award, MapPin, DollarSign, Clock } from "lucide-react";

export default function DoctorProfilePage() {
  const { currentUser, addToast } = useApp();

  const [bio, setBio] = useState(currentUser?.bio || "");
  const [fee, setFee] = useState(currentUser?.consultationFee || 800);
  const [hospital, setHospital] = useState(currentUser?.hospital || "Apollo Hospitals");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Doctor practice profile updated successfully.", "success");
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Doctor Profile & Credentials</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Manage your verified qualifications, consultation fee, and clinical biography.
        </p>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid var(--border-light)" }}>
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"}
            alt={currentUser?.name}
            style={{ width: "80px", height: "80px", borderRadius: "16px", objectFit: "cover", border: "3px solid var(--primary-light)" }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 style={{ fontSize: "1.4rem", color: "var(--navy-900)", margin: 0 }}>{currentUser?.name}</h2>
              {currentUser?.verificationStatus === "VERIFIED" ? (
                <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", background: "#dcfce7", padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  <ShieldCheck size={14} /> VERIFIED
                </span>
              ) : (
                <span style={{ fontSize: "0.75rem", color: "#92400e", fontWeight: 700, background: "#fef3c7", padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  PENDING VERIFICATION
                </span>
              )}
            </div>
            <div style={{ color: "var(--primary-dark)", fontSize: "0.9rem", fontWeight: 600, marginTop: "2px" }}>
              {currentUser?.specialty} • {currentUser?.qualification}
            </div>
            <div style={{ color: "var(--slate-500)", fontSize: "0.8rem", marginTop: "2px" }}>
              Medical Registration / License: <strong>{currentUser?.licenseNumber}</strong>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Consultation Fee (₹):</label>
              <input
                type="number"
                className="form-input"
                value={fee}
                onChange={(e) => setFee(Number(e.target.value))}
                min={200}
                max={5000}
                step={50}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Affiliated Hospital / Practice:</label>
              <input
                type="text"
                className="form-input"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Doctor Bio & Clinical Expertise:</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your specializations, years of experience, treatments..."
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Doctor Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
