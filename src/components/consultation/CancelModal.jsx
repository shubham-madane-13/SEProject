// ==========================================================================
// CancelModal - Cancellation & Refund Confirmation (SRS Section 20)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AlertTriangle, DollarSign } from "lucide-react";
import Modal from "../common/Modal";

export default function CancelModal({ consultation, isOpen, onClose }) {
  const { cancelConsultation } = useApp();
  const [reason, setReason] = useState("Change of personal schedule");

  if (!consultation || !isOpen) return null;

  const handleConfirmCancel = () => {
    cancelConsultation(consultation.id, reason);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Consultation Confirmation">
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "#fee2e2",
            color: "#dc2626",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px auto"
          }}
        >
          <AlertTriangle size={26} />
        </div>
        <h4 style={{ fontSize: "1.1rem", color: "var(--navy-900)" }}>
          Are you sure you want to cancel this consultation?
        </h4>
        <p style={{ color: "var(--slate-500)", fontSize: "0.85rem", marginTop: "4px" }}>
          Consultation #{consultation.id} with {consultation.doctorName} on {consultation.date} ({consultation.timeSlot}).
        </p>
      </div>

      <div
        style={{
          background: "#f0fdf4",
          border: "1px solid #bbf7d0",
          borderRadius: "var(--radius-md)",
          padding: "14px",
          marginBottom: "18px",
          fontSize: "0.85rem",
          color: "#166534"
        }}
      >
        <strong>100% Refund Guarantee:</strong> Since you are cancelling before the consultation starts, a full refund of ₹{consultation.fee} will be credited back to your original payment method ({consultation.paymentMethod}) within 2-4 business hours.
      </div>

      <div className="form-group">
        <label className="form-label">Reason for Cancellation:</label>
        <select
          className="form-select"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="Change of personal schedule">Change of personal schedule</option>
          <option value="Symptoms resolved / feeling better">Symptoms resolved / feeling better</option>
          <option value="Consulted in-person locally">Consulted in-person locally</option>
          <option value="Technical or connectivity issues">Technical or connectivity issues</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
        <button className="btn btn-outline btn-sm" onClick={onClose}>
          Keep Appointment
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleConfirmCancel}>
          Yes, Cancel Consultation
        </button>
      </div>
    </Modal>
  );
}
