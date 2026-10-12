// ==========================================================================
// BookingModal - Multi-Step Consultation Booking & Payment Simulation
// (SRS Section 10 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  X,
  Stethoscope
} from "lucide-react";

export default function BookingModal({ doctor, isOpen, onClose, onBookingSuccess }) {
  const { bookConsultation, currentUser } = useApp();

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2026-10-08");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedMode, setSelectedMode] = useState("video");
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [confirmedConsultation, setConfirmedConsultation] = useState(null);

  if (!isOpen || !doctor) return null;

  const dates = [
    { label: "Today (07 Oct)", value: "2026-10-07" },
    { label: "Tomorrow (08 Oct)", value: "2026-10-08" },
    { label: "Thu, 09 Oct", value: "2026-10-09" },
    { label: "Fri, 10 Oct", value: "2026-10-10" }
  ];

  const handleNext = () => {
    if (step === 2 && !selectedSlot) return;
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePayAndConfirm = () => {
    setIsProcessingPayment(true);
    setPaymentError("");

    setTimeout(() => {
      setIsProcessingPayment(false);
      const res = bookConsultation({
        doctorId: doctor.id,
        date: selectedDate,
        timeSlot: selectedSlot || doctor.availableSlots[0],
        mode: selectedMode,
        reason: reason || "General Consultation",
        paymentMethod
      });

      if (res) {
        setConfirmedConsultation(res);
        setStep(5); // Success step
        try {
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        } catch (e) {
          /* ignore */
        }
        if (onBookingSuccess) onBookingSuccess(res);
      } else {
        setPaymentError("Payment verification failed. Please try an alternative payment method.");
      }
    }, 1200);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedSlot("");
    setConfirmedConsultation(null);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessingPayment) resetAndClose();
      }}
    >
      <div className="modal-content modal-content-lg" style={{ maxWidth: "720px" }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "0.05em" }}>
              Consultation Booking Flow
            </span>
            <h3 style={{ fontSize: "1.2rem", color: "var(--navy-900)" }}>
              {step === 5 ? "Booking Confirmed!" : `Book Consultation with ${doctor.name}`}
            </h3>
          </div>
          {step !== 5 && (
            <button onClick={resetAndClose} className="btn btn-ghost btn-icon" aria-label="Close">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Multi-step progress indicator */}
        {step < 5 && (
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-light)", background: "var(--slate-50)" }}>
            {[
              { num: 1, title: "Mode & Reason" },
              { num: 2, title: "Date & Slot" },
              { num: 3, title: "Summary" },
              { num: 4, title: "Payment" }
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  fontWeight: step === s.num ? 700 : 500,
                  color: step === s.num ? "var(--primary)" : step > s.num ? "var(--secondary)" : "var(--slate-400)",
                  borderBottom: step === s.num ? "2px solid var(--primary)" : "2px solid transparent",
                  backgroundColor: step === s.num ? "var(--white)" : "transparent"
                }}
              >
                Step {s.num}: {s.title}
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body">
          {/* STEP 1: Select Consultation Mode & Chief Complaint */}
          {step === 1 && (
            <div>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "20px", padding: "12px", background: "var(--primary-subtle)", borderRadius: "var(--radius-md)" }}>
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover" }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: "1.05rem" }}>{doctor.name}</h4>
                  <p style={{ margin: "2px 0", fontSize: "0.85rem", color: "var(--slate-600)" }}>{doctor.specialty} • {doctor.hospital}</p>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--primary)" }}>₹{doctor.consultationFee} Consultation Fee</span>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Consultation Mode:</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  {[
                    { id: "video", label: "Video Call", desc: "Face-to-face HD consultation", icon: Video },
                    { id: "audio", label: "Voice Call", desc: "Direct private phone call", icon: Phone },
                    { id: "chat", label: "Text Chat", desc: "Secure messaging & photos", icon: MessageSquare }
                  ].map((m) => {
                    const Icon = m.icon;
                    const selected = selectedMode === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMode(m.id)}
                        style={{
                          padding: "14px",
                          borderRadius: "var(--radius-md)",
                          border: selected ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                          background: selected ? "var(--primary-subtle)" : "var(--white)",
                          cursor: "pointer",
                          textAlign: "center"
                        }}
                      >
                        <Icon size={24} style={{ color: selected ? "var(--primary)" : "var(--slate-500)", marginBottom: "6px" }} />
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>{m.label}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{m.desc}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "18px" }}>
                <label className="form-label">Chief Medical Complaint / Reason for Consultation:</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  placeholder="e.g. Experiencing mild chest tightness, shortness of breath on exertion, and reviewing recent ECG..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className="form-hint">Brief description helps the doctor prepare your clinical chart beforehand.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Available Time Slot */}
          {step === 2 && (
            <div>
              <div className="form-group">
                <label className="form-label">Choose Consultation Date:</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setSelectedDate(d.value)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "var(--radius-md)",
                        border: selectedDate === d.value ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                        background: selectedDate === d.value ? "var(--primary-subtle)" : "var(--white)",
                        color: selectedDate === d.value ? "var(--primary-dark)" : "var(--navy-800)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        cursor: "pointer"
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "20px" }}>
                <label className="form-label">Doctor's Available Slots for {selectedDate}:</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  {doctor.availableSlots.map((slot) => {
                    const isBlocked = doctor.blockedSlots?.includes(slot);
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isBlocked}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: "10px 6px",
                          borderRadius: "var(--radius-md)",
                          border: isSelected ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                          background: isSelected ? "var(--primary)" : isBlocked ? "var(--slate-100)" : "var(--white)",
                          color: isSelected ? "#ffffff" : isBlocked ? "var(--slate-400)" : "var(--navy-800)",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          cursor: isBlocked ? "not-allowed" : "pointer"
                        }}
                      >
                        <Clock size={12} style={{ marginRight: "4px" }} />
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {!selectedSlot && (
                  <span className="form-error">Please select one time slot to continue.</span>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Booking Summary */}
          {step === 3 && (
            <div>
              <div style={{ background: "var(--slate-50)", padding: "20px", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
                <h4 style={{ marginBottom: "14px", fontSize: "1.05rem", color: "var(--navy-900)" }}>Consultation Summary</h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "0.9rem" }}>
                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Attending Physician</span>
                    <strong>{doctor.name}</strong>
                    <div style={{ fontSize: "0.8rem", color: "var(--slate-600)" }}>{doctor.specialty} ({doctor.qualification})</div>
                  </div>

                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Consultation Mode</span>
                    <strong style={{ textTransform: "capitalize" }}>{selectedMode} Consultation</strong>
                  </div>

                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Appointment Date</span>
                    <strong>{selectedDate}</strong>
                  </div>

                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Scheduled Time Slot</span>
                    <strong>{selectedSlot || doctor.availableSlots[0]}</strong>
                  </div>

                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Patient Name</span>
                    <strong>{currentUser?.name || "Rahul Verma"}</strong>
                  </div>

                  <div>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.8rem" }}>Consultation Fee</span>
                    <strong style={{ color: "var(--secondary)", fontSize: "1.1rem" }}>₹{doctor.consultationFee}</strong>
                  </div>
                </div>

                {reason && (
                  <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--slate-200)", fontSize: "0.85rem" }}>
                    <span style={{ color: "var(--slate-500)", display: "block", fontSize: "0.785rem" }}>Reason for Visit:</span>
                    <p style={{ margin: "2px 0", color: "var(--navy-800)" }}>{reason}</p>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "16px", padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "var(--radius-md)", display: "flex", gap: "10px", alignItems: "center", fontSize: "0.825rem", color: "#166534" }}>
                <ShieldCheck size={20} style={{ color: "#16a34a", flexShrink: 0 }} />
                <span>
                  <strong>HIPAA & Telemedicine Compliant:</strong> Real-time audio/video streams are 256-bit end-to-end encrypted. Full digital e-prescription included if clinically indicated.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Payment Gateway Simulation */}
          {step === 4 && (
            <div>
              <div style={{ marginBottom: "18px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--slate-500)" }}>Total Amount Payable:</span>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--navy-900)" }}>₹{doctor.consultationFee}</div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Payment Method:</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { id: "upi", label: "Instant UPI (Google Pay, PhonePe, Paytm, BHIM)", desc: "Zero gateway surcharge • Instant confirmation" },
                    { id: "card", label: "Credit / Debit Card (Visa, MasterCard, RuPay)", desc: "Secure 3D-Secure payment" },
                    { id: "netbanking", label: "Net Banking (All major Indian & Global banks)", desc: "HDFC, ICICI, SBI, Axis, etc." }
                  ].map((p) => (
                    <label
                      key={p.id}
                      style={{
                        padding: "12px 16px",
                        borderRadius: "var(--radius-md)",
                        border: paymentMethod === p.id ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                        background: paymentMethod === p.id ? "var(--primary-subtle)" : "var(--white)",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="radio"
                        name="payMethod"
                        value={p.id}
                        checked={paymentMethod === p.id}
                        onChange={() => setPaymentMethod(p.id)}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--navy-900)" }}>{p.label}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{p.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {paymentError && (
                <div className="form-error" style={{ padding: "8px", background: "#fef2f2", borderRadius: "6px" }}>
                  <AlertTriangle size={14} style={{ display: "inline", marginRight: "4px" }} />
                  {paymentError}
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Booking Confirmation (SRS Step 10 & 11) */}
          {step === 5 && confirmedConsultation && (
            <div style={{ textAlign: "center", padding: "20px 10px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#dcfce7",
                  color: "#15803d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto"
                }}
              >
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: "1.3rem", color: "var(--navy-900)", marginBottom: "4px" }}>
                Consultation Successfully Scheduled!
              </h3>
              <p style={{ color: "var(--slate-600)", fontSize: "0.9rem", marginBottom: "20px" }}>
                Your appointment ID is <strong>#{confirmedConsultation.id}</strong>. A confirmation SMS & in-app reminder have been sent.
              </p>

              <div
                style={{
                  background: "var(--slate-50)",
                  borderRadius: "var(--radius-lg)",
                  padding: "18px",
                  maxWidth: "480px",
                  margin: "0 auto 24px auto",
                  textAlign: "left",
                  border: "1px solid var(--border-color)",
                  fontSize: "0.875rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--slate-500)" }}>Doctor:</span>
                  <strong>{confirmedConsultation.doctorName}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--slate-500)" }}>Date & Time:</span>
                  <strong>{confirmedConsultation.date} at {confirmedConsultation.timeSlot}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--slate-500)" }}>Mode:</span>
                  <strong style={{ textTransform: "capitalize" }}>{confirmedConsultation.mode} Call</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: "var(--slate-500)" }}>Payment Status:</span>
                  <strong style={{ color: "#16a34a" }}>PAID ({confirmedConsultation.paymentId})</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--slate-500)" }}>Status:</span>
                  <strong style={{ color: "var(--primary)" }}>SCHEDULED</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {step > 1 && step < 5 && (
            <button className="btn btn-outline btn-sm" onClick={handleBack} disabled={isProcessingPayment}>
              <ArrowLeft size={14} /> Back
            </button>
          )}

          {step < 3 && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleNext}
              disabled={step === 2 && !selectedSlot}
            >
              Continue <ArrowRight size={14} />
            </button>
          )}

          {step === 3 && (
            <button className="btn btn-primary btn-sm" onClick={handleNext}>
              Proceed to Payment (₹{doctor.consultationFee}) <ArrowRight size={14} />
            </button>
          )}

          {step === 4 && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handlePayAndConfirm}
              disabled={isProcessingPayment}
              style={{ minWidth: "160px" }}
            >
              {isProcessingPayment ? "Simulating Payment..." : `Pay ₹${doctor.consultationFee} & Confirm`}
            </button>
          )}

          {step === 5 && (
            <button className="btn btn-primary btn-sm" onClick={resetAndClose}>
              Done & Return to Appointments
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
