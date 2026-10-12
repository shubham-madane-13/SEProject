// ==========================================================================
// PatientProfilePage - Patient Demographics & Medical Profile Summary
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { User, Heart, AlertTriangle, Phone, MapPin, Mail, ShieldCheck } from "lucide-react";

export default function PatientProfilePage() {
  const { currentUser, addToast } = useApp();

  const [allergies, setAllergies] = useState(currentUser?.allergies || "Penicillin, Dust Mites");
  const [conditions, setConditions] = useState(currentUser?.chronicConditions || "Mild Essential Hypertension");
  const [emergencyContact, setEmergencyContact] = useState(currentUser?.emergencyContact || "Pooja Verma (+91 98765 11111)");
  const [address, setAddress] = useState(currentUser?.address || "Flat 402, Green Glen Heights, Bellandur, Bengaluru");

  const handleSave = (e) => {
    e.preventDefault();
    addToast("Health profile and emergency contact details updated.", "success");
  };

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Health Profile & Demographics</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Maintain your personal health summary, emergency contacts, and known allergies.
        </p>
      </div>

      <div className="card">
        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid var(--border-light)" }}>
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
            alt={currentUser?.name}
            style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary-light)" }}
          />
          <div>
            <h2 style={{ fontSize: "1.4rem", color: "var(--navy-900)", margin: 0 }}>{currentUser?.name}</h2>
            <div style={{ color: "var(--slate-500)", fontSize: "0.85rem", marginTop: "4px" }}>
              Age: {currentUser?.age || 34} • Gender: {currentUser?.gender || "Male"} • Blood Group: <strong style={{ color: "var(--primary)" }}>{currentUser?.bloodGroup || "B+"}</strong>
            </div>
            <div style={{ color: "var(--slate-500)", fontSize: "0.85rem" }}>
              Patient ID: <code style={{ fontFamily: "var(--font-mono)" }}>#{currentUser?.id}</code>
            </div>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Email Address:</label>
              <input type="email" className="form-input" value={currentUser?.email || ""} readOnly style={{ background: "var(--slate-50)" }} />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number:</label>
              <input type="tel" className="form-input" value={currentUser?.phone || ""} readOnly style={{ background: "var(--slate-50)" }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Residential Address (for Home Sample Collection):</label>
            <input
              type="text"
              className="form-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label" style={{ color: "#b91c1c" }}>
                Known Drug Allergies / Sensitivities:
              </label>
              <input
                type="text"
                className="form-input"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Chronic Health Conditions:</label>
              <input
                type="text"
                className="form-input"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Emergency Contact Name & Phone:</label>
            <input
              type="text"
              className="form-input"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
