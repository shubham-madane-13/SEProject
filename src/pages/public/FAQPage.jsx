// ==========================================================================
// FAQPage - Answers to Common Patient & Doctor Questions
// ==========================================================================

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Are the e-prescriptions issued on TeleCare Pro legally valid?",
      a: "Yes. All prescriptions are digitally signed by credentialed medical practitioners holding valid registrations from state medical councils, fully adhering to national Telemedicine Practice Guidelines and IT Acts."
    },
    {
      q: "How does the home lab sample collection service work?",
      a: "When you book a test, our certified phlebotomist receives your address and arrival window. They collect the sample using sealed, barcoded vacuum tubes and transport it in cold-chain storage to our accredited diagnostic laboratory. You receive SMS/in-app tracking throughout."
    },
    {
      q: "Can I reschedule or cancel my booked consultation?",
      a: "Yes, you can easily reschedule to any other available slot of that doctor, or cancel up until the scheduled consultation begins. In case of cancellation, a 100% refund is automatically initiated to your original payment method."
    },
    {
      q: "Who can see my uploaded medical records?",
      a: "Only you and the specific attending doctor during an active consultation can review your uploaded medical documents. Our platform implements role-based access control and strict data privacy."
    },
    {
      q: "What should I do if I have a life-threatening medical emergency?",
      a: "TeleCare Pro is intended strictly for non-emergency outpatient consultations. If you or a family member experience symptoms such as severe chest pain, breathing distress, stroke symptoms, or severe trauma, please call 112/911 immediately or visit the nearest emergency hospital."
    }
  ];

  return (
    <div style={{ maxWidth: "880px", margin: "40px auto", padding: "0 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <HelpCircle size={36} style={{ color: "var(--primary)", margin: "0 auto 10px auto" }} />
        <h1 style={{ fontSize: "2.2rem", color: "var(--navy-900)" }}>Frequently Asked Questions</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Everything you need to know about our teleconsultations, e-prescriptions, and home lab bookings.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {faqs.map((f, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                overflow: "hidden"
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--navy-900)",
                  cursor: "pointer"
                }}
              >
                <span>{f.q}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen && (
                <div style={{ padding: "0 20px 18px 20px", color: "var(--slate-600)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
