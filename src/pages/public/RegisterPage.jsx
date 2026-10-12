// ==========================================================================
// RegisterPage - Multi-Role Registration (Patient, Doctor, Lab Partner)
// (SRS Section 6 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  User,
  Stethoscope,
  FlaskConical,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity
} from "lucide-react";

export default function RegisterPage() {
  const { registerUser, navigateTo } = useApp();

  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("Cardiology");
  const [qualification, setQualification] = useState("MBBS, MD");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      registerUser({
        role,
        name,
        email,
        phone,
        specialty,
        qualification,
        licenseNumber,
        address
      });
    }, 600);
  };

  return (
    <div style={{ maxWidth: "780px", margin: "40px auto", padding: "0 20px" }}>
      <div
        style={{
          background: "var(--white)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid var(--border-color)",
          padding: "40px"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              background: "var(--primary)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto"
            }}
          >
            <Activity size={24} />
          </div>
          <h2 style={{ fontSize: "1.8rem", color: "var(--navy-900)" }}>Create an Account</h2>
          <p style={{ color: "var(--slate-500)", fontSize: "0.9rem", marginTop: "4px" }}>
            Select your account type to access specialized healthcare tools.
          </p>
        </div>

        {/* Role Selector Tabs (SRS Section 6: Patient, Doctor, Lab) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
          {[
            { id: "patient", label: "Patient", desc: "Book consults & lab tests", icon: User },
            { id: "doctor", label: "Doctor / Specialist", desc: "Clinical practice & digital Rx", icon: Stethoscope },
            { id: "lab", label: "Lab Technician", desc: "Home collection & diagnostics", icon: FlaskConical }
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius-md)",
                  border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                  background: isSelected ? "var(--primary-subtle)" : "var(--white)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all var(--transition-fast)"
                }}
              >
                <Icon size={24} style={{ color: isSelected ? "var(--primary)" : "var(--slate-400)", marginBottom: "6px" }} />
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>{r.label}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{r.desc}</div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Full Legal Name:</label>
              <input
                type="text"
                className="form-input"
                placeholder={role === "doctor" ? "e.g. Dr. Rajesh Verma" : "e.g. Rahul Sharma"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address:</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="form-group">
              <label className="form-label">Phone Number:</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Residential City / Address:</label>
              <input
                type="text"
                className="form-input"
                placeholder="Bengaluru, Karnataka"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Conditional Doctor Credential Fields */}
          {role === "doctor" && (
            <div style={{ background: "var(--slate-50)", padding: "18px", borderRadius: "var(--radius-md)", marginBottom: "20px", border: "1px solid var(--border-light)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy-900)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} style={{ color: "var(--primary)" }} />
                Medical Credential & Verification Data
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Specialty:</label>
                  <select
                    className="form-select"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="General Medicine">General Medicine</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Degrees & Qualifications:</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. MBBS, MD, DM"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "12px", marginBottom: 0 }}>
                <label className="form-label">Medical Council Registration / License Number:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. MCI-2018-99412 or State Medical Council Reg"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                />
                <span className="form-hint">
                  Doctor credentials will be placed in PENDING state until compliance admin review.
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", height: "46px", marginTop: "12px" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : `Register as ${role === "doctor" ? "Doctor" : role === "lab" ? "Lab Partner" : "Patient"}`}
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.85rem", color: "var(--slate-600)" }}>
          Already have an account?{" "}
          <a
            href="#login"
            onClick={(e) => { e.preventDefault(); navigateTo("login"); }}
            style={{ fontWeight: 700, color: "var(--primary)" }}
          >
            Sign In here
          </a>
        </div>
      </div>
    </div>
  );
}
