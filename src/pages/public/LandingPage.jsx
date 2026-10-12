// ==========================================================================
// LandingPage - Premium Modern Telemedicine SaaS Hero & Platform Showcase
// (SRS Section 5 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Video,
  FileCheck2,
  FlaskConical,
  FolderLock,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Activity,
  PhoneCall,
  Search,
  Sparkles,
  Users
} from "lucide-react";
import BookingModal from "../../components/consultation/BookingModal";

export default function LandingPage() {
  const { doctors, navigateTo, switchRole, currentUser } = useApp();
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  const featuredDoctors = doctors.filter((d) => d.verificationStatus === "VERIFIED").slice(0, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px", paddingBottom: "60px" }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%)",
          padding: "60px 24px 80px 24px",
          borderBottom: "1px solid var(--border-light)"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "48px",
            alignItems: "center"
          }}
          className="hero-grid"
        >
          {/* Hero Left Content */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                background: "var(--primary-light)",
                color: "var(--primary-dark)",
                fontSize: "0.825rem",
                fontWeight: 700,
                marginBottom: "20px"
              }}
            >
              <Sparkles size={15} /> Next-Gen Telemedicine & Remote Patient Monitoring
            </div>

            <h1
              style={{
                fontSize: "3.2rem",
                lineHeight: "1.15",
                fontWeight: 800,
                color: "var(--navy-900)",
                marginBottom: "20px",
                letterSpacing: "-0.03em"
              }}
            >
              Healthcare, <br />
              <span style={{ color: "var(--primary)" }}>Wherever You Are.</span>
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.65",
                color: "var(--navy-700)",
                marginBottom: "32px",
                maxWidth: "560px"
              }}
            >
              Consult verified specialists via encrypted video, manage your lifelong medical records in a secure vault, receive legally valid e-prescriptions, and order doorstep diagnostic sample collections—all seamlessly unified.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "36px" }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  if (currentUser?.role === "patient") {
                    navigateTo("find-doctor");
                  } else {
                    switchRole("patient");
                    navigateTo("find-doctor");
                  }
                }}
              >
                Book a Consultation <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={() => navigateTo("doctors")}
              >
                <Search size={18} /> Find a Doctor
              </button>
            </div>

            {/* Trust Badges */}
            <div style={{ display: "flex", gap: "28px", borderTop: "1px solid var(--slate-200)", paddingTop: "24px" }}>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy-900)" }}>20k+</div>
                <div style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>Consultations Completed</div>
              </div>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy-900)" }}>100%</div>
                <div style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>Verified Specialists</div>
              </div>
              <div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--navy-900)" }}>4.9★</div>
                <div style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>Patient Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Realistic Healthcare Dashboard Composite */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-xl)",
                padding: "24px",
                boxShadow: "var(--shadow-xl)",
                border: "1px solid var(--border-color)",
                position: "relative"
              }}
            >
              {/* Telemedicine Video Call Mockup */}
              <div
                style={{
                  height: "220px",
                  borderRadius: "var(--radius-lg)",
                  position: "relative",
                  overflow: "hidden",
                  marginBottom: "20px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor Online"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: "rgba(15, 23, 42, 0.75)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                  Live Video Consultation • Dr. Ananya Sharma
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    width: "80px",
                    height: "55px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "2px solid #fff"
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                    alt="Self View"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>

              {/* Patient Live Vitals & Action Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ background: "var(--primary-subtle)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid #bae6fd" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--primary-dark)", fontSize: "0.8rem", fontWeight: 700 }}>
                    <Activity size={16} /> Remote Vitals Monitoring
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-900)", marginTop: "4px" }}>
                    120 / 78 <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--slate-500)" }}>mmHg</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>Normal Blood Pressure</span>
                </div>

                <div style={{ background: "#ecfdf5", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid #a7f3d0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#047857", fontSize: "0.8rem", fontWeight: 700 }}>
                    <ShieldCheck size={16} /> E-Prescription Signed
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--navy-900)", marginTop: "4px" }}>
                    Verified Digital Rx
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#047857" }}>Ready for instant pharmacy dispatch</span>
                </div>
              </div>
            </div>

            {/* Floating Lab Badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-25px",
                left: "-25px",
                background: "var(--white)",
                padding: "12px 18px",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--secondary-light)",
                  color: "var(--secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FlaskConical size={20} />
              </div>
              <div>
                <strong style={{ fontSize: "0.85rem", color: "var(--navy-900)" }}>Home Lab Collection</strong>
                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Phlebotomist at doorstep in 2 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Comprehensive Care (SRS Section 2) */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.05em" }}>
            Integrated Healthcare Ecosystem
          </span>
          <h2 style={{ fontSize: "2.2rem", color: "var(--navy-900)", marginTop: "6px" }}>
            Everything You Need for Remote Clinical Care
          </h2>
        </div>

        <div className="grid-4">
          <div className="card card-hover">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Video size={24} />
            </div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Real-Time Consultations</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Connect with top specialists via high-definition video, crystal-clear voice, or secure real-time messaging with live vitals sync.
            </p>
          </div>

          <div className="card card-hover">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--secondary-light)", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <FileCheck2 size={24} />
            </div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Digitally Signed Rx</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Receive cryptographically signed electronic prescriptions complete with medical council license validation, dosage instructions, and refill trackers.
            </p>
          </div>

          <div className="card card-hover">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <FlaskConical size={24} />
            </div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Doorstep Lab Tests</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Book home sample collection by certified phlebotomists. Track collection status and get NABL-accredited diagnostic reports deposited straight into your records.
            </p>
          </div>

          <div className="card card-hover">
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#f3e8ff", color: "#7e22ce", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <FolderLock size={24} />
            </div>
            <h3 style={{ fontSize: "1.15rem", marginBottom: "8px" }}>Encrypted Health Vault</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--slate-600)", lineHeight: 1.5 }}>
              Safely store blood reports, MRI scans, discharge summaries, and prescriptions with patient-controlled granular access and complete audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.05em" }}>
              Medical Specialists
            </span>
            <h2 style={{ fontSize: "2rem", color: "var(--navy-900)", marginTop: "4px" }}>
              Consult Verified Doctors Online
            </h2>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigateTo("doctors")}>
            View All Doctors ({doctors.length}) <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid-3">
          {featuredDoctors.map((doc) => (
            <div key={doc.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  style={{ width: "64px", height: "64px", borderRadius: "14px", objectFit: "cover" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <h4 style={{ margin: 0, fontSize: "1.05rem" }}>{doc.name}</h4>
                    <span title="Verified Physician" style={{ color: "var(--primary)", display: "flex" }}>
                      <ShieldCheck size={16} />
                    </span>
                  </div>
                  <div style={{ color: "var(--primary-dark)", fontSize: "0.85rem", fontWeight: 600 }}>
                    {doc.specialty}
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--slate-500)" }}>
                    {doc.experienceYears} Years Exp • {doc.qualification}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.825rem", color: "var(--slate-600)", lineHeight: 1.45, flex: 1, marginBottom: "16px" }}>
                {doc.bio}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "14px", marginTop: "auto" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "block" }}>Consultation Fee</span>
                  <strong style={{ fontSize: "1.1rem", color: "var(--navy-900)" }}>₹{doc.consultationFee}</strong>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      if (!currentUser) switchRole("patient");
                      setSelectedDoctorForBooking(doc);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedDoctorForBooking && (
        <BookingModal
          doctor={selectedDoctorForBooking}
          isOpen={!!selectedDoctorForBooking}
          onClose={() => setSelectedDoctorForBooking(null)}
          onBookingSuccess={() => {
            setSelectedDoctorForBooking(null);
            navigateTo("consultations");
          }}
        />
      )}
    </div>
  );
}
