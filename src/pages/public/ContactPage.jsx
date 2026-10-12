// ==========================================================================
// ContactPage - Support, Clinic Location & Emergency Assistance Info
// ==========================================================================

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ContactPage() {
  const { addToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Your support inquiry has been submitted. Our medical concierge will respond shortly.", "success");
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "40px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.2rem", color: "var(--navy-900)" }}>Get in Touch with Patient Support</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Have questions regarding consultations, test reports, or provider onboarding? We're here 24/7.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "36px" }} className="contact-grid">
        {/* Contact Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--navy-900)" }}>Medical Concierge</h3>
            
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--primary-light)", color: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={18} />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "block" }}>Toll-Free Helpline</span>
                <strong>1800-TELE-CARE (+91 80 4000 9000)</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--secondary-light)", color: "var(--secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={18} />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "block" }}>Support Email</span>
                <strong>support@telecarepro.health</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={18} />
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "block" }}>Central Medical Hub</span>
                <strong>EcoWorld Tech Park, Outer Ring Road, Bengaluru - 560103</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card">
          <h3 style={{ fontSize: "1.2rem", marginBottom: "16px", color: "var(--navy-900)" }}>
            Send us a Message
          </h3>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "30px 10px" }}>
              <CheckCircle2 size={42} style={{ color: "#16a34a", margin: "0 auto 12px auto" }} />
              <h4 style={{ color: "var(--navy-900)", marginBottom: "4px" }}>Message Received!</h4>
              <p style={{ color: "var(--slate-600)", fontSize: "0.9rem" }}>
                A medical care representative will review your message and reach out within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter full name"
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
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">How can we assist you?</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Inquire about a doctor, lab test booking, or technical questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: "100%", height: "44px" }}>
                <Send size={15} /> Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
