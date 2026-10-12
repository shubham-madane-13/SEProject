// ==========================================================================
// RescheduleModal - Modify Appointment Date & Slot (SRS Section 19)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import Modal from "../common/Modal";

export default function RescheduleModal({ consultation, isOpen, onClose }) {
  const { rescheduleConsultation, doctors } = useApp();

  const [selectedDate, setSelectedDate] = useState("2026-10-09");
  const [selectedSlot, setSelectedSlot] = useState("");

  if (!consultation || !isOpen) return null;

  const doc = doctors.find((d) => d.id === consultation.doctorId);
  const availableSlots = doc ? doc.availableSlots : ["09:00 AM", "11:30 AM", "03:00 PM", "05:00 PM"];

  const handleConfirm = () => {
    if (!selectedSlot) return;
    rescheduleConsultation(consultation.id, selectedDate, selectedSlot);
    onClose();
  };

  const dates = [
    { label: "Thu, 09 Oct", value: "2026-10-09" },
    { label: "Fri, 10 Oct", value: "2026-10-10" },
    { label: "Sat, 11 Oct", value: "2026-10-11" },
    { label: "Mon, 13 Oct", value: "2026-10-13" }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Reschedule Consultation #${consultation.id}`}>
      <div style={{ marginBottom: "16px", padding: "12px", background: "var(--slate-50)", borderRadius: "var(--radius-md)" }}>
        <div style={{ fontSize: "0.85rem", color: "var(--slate-500)" }}>Current Appointment:</div>
        <strong style={{ fontSize: "0.95rem" }}>
          {consultation.doctorName} • {consultation.date} at {consultation.timeSlot}
        </strong>
      </div>

      <div className="form-group">
        <label className="form-label">Select New Date:</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {dates.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => setSelectedDate(d.value)}
              style={{
                padding: "8px 6px",
                borderRadius: "var(--radius-sm)",
                border: selectedDate === d.value ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                background: selectedDate === d.value ? "var(--primary-subtle)" : "var(--white)",
                fontWeight: 600,
                fontSize: "0.8rem",
                cursor: "pointer"
              }}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group" style={{ marginTop: "16px" }}>
        <label className="form-label">Select New Time Slot:</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {availableSlots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                style={{
                  padding: "8px 4px",
                  borderRadius: "var(--radius-sm)",
                  border: isSelected ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                  background: isSelected ? "var(--primary)" : "var(--white)",
                  color: isSelected ? "#ffffff" : "var(--navy-800)",
                  fontWeight: 600,
                  fontSize: "0.825rem",
                  cursor: "pointer"
                }}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
        <button className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button
          className="btn btn-primary btn-sm"
          disabled={!selectedSlot}
          onClick={handleConfirm}
        >
          Confirm Reschedule
        </button>
      </div>
    </Modal>
  );
}
