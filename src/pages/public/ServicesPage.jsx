// ==========================================================================
// ServicesPage - Telemedicine & Health Services Catalogue
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import { Video, FileCheck2, FlaskConical, FolderLock, Heart, Sparkles, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const { navigateTo, switchRole, currentUser } = useApp();

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.05em" }}>
          Clinical Solutions
        </span>
        <h1 style={{ fontSize: "2.4rem", color: "var(--navy-900)", marginTop: "6px" }}>
          Comprehensive Digital Telecare Services
        </h1>
        <p style={{ color: "var(--slate-600)", fontSize: "1rem", maxWidth: "600px", margin: "10px auto 0 auto" }}>
          Explore our complete suite of remote outpatient services, diagnostics, and patient monitoring tools.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        {/* Service 1 */}
        <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" }}>
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <Video size={22} />
            </div>
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy-900)", marginBottom: "8px" }}>
              Teleconsultation & Remote Examinations
            </h2>
            <p style={{ color: "var(--slate-600)", fontSize: "0.925rem", lineHeight: 1.6, marginBottom: "16px" }}>
              Consult board-certified doctors in over 20 clinical specialties. Enjoy uninterrupted high-definition video, crystal-clear VoIP audio, or real-time text chat from any device.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "var(--navy-800)" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> Video, voice call, or continuous secure chat
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> Live doctor review of past reports during call
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--primary)" }} /> Automated follow-up calendar reminders
              </li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"
            alt="Doctor Consult"
            style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "var(--radius-lg)" }}
          />
        </div>

        {/* Service 2 */}
        <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" }}>
          <img
            src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80"
            alt="Lab Diagnostics"
            style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "var(--radius-lg)" }}
          />
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "var(--secondary-light)", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <FlaskConical size={22} />
            </div>
            <h2 style={{ fontSize: "1.5rem", color: "var(--navy-900)", marginBottom: "8px" }}>
              Home Sample Collection Diagnostics
            </h2>
            <p style={{ color: "var(--slate-600)", fontSize: "0.925rem", lineHeight: 1.6, marginBottom: "16px" }}>
              Skip clinic waiting rooms. Certified phlebotomists arrive at your home or workplace at your scheduled time window with barcoded, temperature-controlled sample kits.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "var(--navy-800)" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--secondary)" }} /> CBC, Lipid Profile, Thyroid, HbA1c, Vit D
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--secondary)" }} /> Real-time phlebotomist tracking: Requested → In Lab
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <CheckCircle2 size={16} style={{ color: "var(--secondary)" }} /> Automated PDF report deposit in health vault
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
