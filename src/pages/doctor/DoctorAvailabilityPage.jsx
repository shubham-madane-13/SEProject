// ==========================================================================
// DoctorAvailabilityPage - Schedule & Working Hours Management (SRS Section 22)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Clock, Calendar, Check, Plus, Trash2, ShieldCheck } from "lucide-react";

export default function DoctorAvailabilityPage() {
  const { currentUser, updateDoctorAvailability, addToast } = useApp();

  const [workingDays, setWorkingDays] = useState(
    currentUser?.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  );
  const [startTime, setStartTime] = useState(currentUser?.workingHours?.start || "09:00");
  const [endTime, setEndTime] = useState(currentUser?.workingHours?.end || "18:00");
  const [slots, setSlots] = useState(
    currentUser?.availableSlots || [
      "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"
    ]
  );
  const [blockedSlots, setBlockedSlots] = useState(currentUser?.blockedSlots || ["12:30 PM"]);
  const [newSlotInput, setNewSlotInput] = useState("");

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleDay = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d) => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlotInput.trim()) return;
    if (slots.includes(newSlotInput.trim())) {
      addToast("Slot already exists in schedule.", "warning");
      return;
    }
    setSlots([...slots, newSlotInput.trim()]);
    setNewSlotInput("");
  };

  const handleRemoveSlot = (slot) => {
    setSlots(slots.filter((s) => s !== slot));
    setBlockedSlots(blockedSlots.filter((s) => s !== slot));
  };

  const toggleBlockSlot = (slot) => {
    if (blockedSlots.includes(slot)) {
      setBlockedSlots(blockedSlots.filter((s) => s !== slot));
      addToast(`Slot ${slot} unblocked for patient booking.`, "info");
    } else {
      setBlockedSlots([...blockedSlots, slot]);
      addToast(`Slot ${slot} blocked from patient booking.`, "info");
    }
  };

  const handleSaveSchedule = () => {
    updateDoctorAvailability(currentUser.id, {
      workingDays,
      workingHours: { start: startTime, end: endTime },
      availableSlots: slots,
      blockedSlots
    });
  };

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Availability Management</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Define clinical working days, consultation hours, and manage open/blocked time slots.
        </p>
      </div>

      <div className="card">
        {/* Working Days Selector (SRS Section 22) */}
        <div style={{ marginBottom: "24px" }}>
          <label className="form-label" style={{ marginBottom: "8px" }}>Active Clinical Working Days:</label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {daysOfWeek.map((day) => {
              const active = workingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "var(--radius-md)",
                    border: active ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                    background: active ? "var(--primary-subtle)" : "var(--white)",
                    color: active ? "var(--primary-dark)" : "var(--navy-700)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  {active && <Check size={14} />} {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Shift Start Time:</label>
            <input
              type="time"
              className="form-input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Shift End Time:</label>
            <input
              type="time"
              className="form-input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        {/* Time Slots Management & Blocking (SRS Section 22) */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <label className="form-label" style={{ margin: 0 }}>
              Available Consultation Slots (Click to toggle Block/Unblock):
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
            {slots.map((slot) => {
              const isBlocked = blockedSlots.includes(slot);
              return (
                <div
                  key={slot}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "var(--radius-md)",
                    border: isBlocked ? "1px dashed #ef4444" : "1px solid var(--primary)",
                    background: isBlocked ? "#fef2f2" : "var(--primary-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.85rem"
                  }}
                >
                  <span
                    onClick={() => toggleBlockSlot(slot)}
                    style={{
                      cursor: "pointer",
                      fontWeight: 700,
                      color: isBlocked ? "#dc2626" : "var(--primary-dark)",
                      textDecoration: isBlocked ? "line-through" : "none"
                    }}
                    title={isBlocked ? "Blocked. Click to make available." : "Available. Click to block."}
                  >
                    {slot} {isBlocked && "(Blocked)"}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(slot)}
                    style={{ background: "none", border: "none", color: "var(--slate-400)", cursor: "pointer", padding: "2px" }}
                    title="Remove slot"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add custom slot */}
          <form onSubmit={handleAddSlot} style={{ display: "flex", gap: "10px", maxWidth: "340px" }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 06:30 PM"
              value={newSlotInput}
              onChange={(e) => setNewSlotInput(e.target.value)}
              style={{ padding: "8px 12px", fontSize: "0.85rem" }}
            />
            <button type="submit" className="btn btn-outline btn-sm">
              <Plus size={14} /> Add Slot
            </button>
          </form>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--border-light)", paddingTop: "18px" }}>
          <button className="btn btn-primary" onClick={handleSaveSchedule}>
            Save Availability Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
