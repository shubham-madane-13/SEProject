// ==========================================================================
// AboutPage - Platform Mission, Medical Board & How It Works
// ==========================================================================

import React from "react";
import { ShieldCheck, Award, HeartPulse, CheckCircle2, Users, Clock } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AboutPage() {
  const { navigateTo } = useApp();

  return (
    <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "48px 24px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.05em" }}>
          About TeleCare Pro
        </span>
        <h1 style={{ fontSize: "2.5rem", color: "var(--navy-900)", marginTop: "6px" }}>
          Pioneering Remote Healthcare Excellence
        </h1>
        <p style={{ color: "var(--slate-600)", fontSize: "1.05rem", maxWidth: "680px", margin: "12px auto 0 auto", lineHeight: 1.6 }}>
          TeleCare Pro bridges patients, verified clinical specialists, and accredited pathology laboratories with secure, cloud-native telemedicine workflows.
        </p>
      </div>

      {/* How It Works (SRS Section 4) */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "1.6rem", color: "var(--navy-900)", textAlign: "center", marginBottom: "32px" }}>
          How the Platform Works
        </h2>
        <div className="grid-3">
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", fontWeight: 800, fontSize: "1.2rem" }}>
              1
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Choose Doctor & Slot</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Filter certified doctors by specialty, check live calendar availability, and choose video, audio, or text consultation mode.
            </p>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "var(--secondary-light)", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", fontWeight: 800, fontSize: "1.2rem" }}>
              2
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Attend Secure Consultation</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Join the real-time encrypted consultation room. Share symptoms, review past medical reports, and get instant diagnosis.
            </p>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#ecfdf5", color: "#047857", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", fontWeight: 800, fontSize: "1.2rem" }}>
              3
            </div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Receive Rx & Lab Support</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Download digitally signed e-prescriptions and schedule doorstep home sample collections with accredited pathology labs.
            </p>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Pillars */}
      <div style={{ background: "var(--slate-50)", padding: "36px", borderRadius: "var(--radius-xl)", border: "1px solid var(--border-color)" }}>
        <h3 style={{ fontSize: "1.3rem", color: "var(--navy-900)", marginBottom: "16px", textAlign: "center" }}>
          Clinical Standards & Compliance
        </h3>
        <div className="grid-2">
          <div style={{ display: "flex", gap: "12px" }}>
            <ShieldCheck size={24} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.95rem", color: "var(--navy-900)" }}>Strict Doctor Credentialing:</strong>
              <p style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginTop: "4px" }}>
                Every doctor must submit verified medical licenses, degrees, and registrations before issuing prescriptions.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <HeartPulse size={24} style={{ color: "#e11d48", flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: "0.95rem", color: "var(--navy-900)" }}>End-to-End Health Privacy:</strong>
              <p style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginTop: "4px" }}>
                Patient medical records are isolated and only accessible to the patient and their attending physician.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
