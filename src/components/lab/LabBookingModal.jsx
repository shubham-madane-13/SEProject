// ==========================================================================
// LabBookingModal - Patient Home Sample Collection Booking Flow
// (SRS Section 15 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";
import confetti from "canvas-confetti";
import {
  FlaskConical,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Truck
} from "lucide-react";

export default function LabBookingModal({ preselectedTest, isOpen, onClose }) {
  const { labTestsCatalog, bookLabCollection, currentUser, addToast } = useApp();

  const [selectedTestId, setSelectedTestId] = useState(preselectedTest?.id || labTestsCatalog[0]?.id);
  const [collectionDate, setCollectionDate] = useState("2026-10-08");
  const [collectionTimeSlot, setCollectionTimeSlot] = useState("07:30 AM – 09:30 AM");
  const [address, setAddress] = useState(
    currentUser?.address || "Flat 402, Green Glen Heights, Bellandur, Bengaluru - 560103"
  );
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen) return null;

  const currentTest = labTestsCatalog.find((t) => t.id === selectedTestId) || preselectedTest || labTestsCatalog[0];

  const timeSlots = [
    "06:30 AM – 08:30 AM",
    "08:00 AM – 10:00 AM",
    "10:00 AM – 12:00 PM",
    "02:00 PM – 04:00 PM",
    "04:30 PM – 06:30 PM"
  ];

  const handleConfirm = () => {
    if (!address.trim()) {
      addToast("Please provide sample collection address.", "warning");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const res = bookLabCollection({
        testId: currentTest.id,
        collectionAddress: address,
        collectionDate,
        collectionTimeSlot,
        paymentMethod
      });
      if (res) {
        setConfirmedBooking(res);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 1000);
  };

  const handleClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Book Home Sample Collection" maxWidth="640px">
      {!confirmedBooking ? (
        <div>
          {/* Test Selector */}
          <div className="form-group">
            <label className="form-label">Diagnostic Test Package:</label>
            <select
              className="form-select"
              value={selectedTestId}
              onChange={(e) => setSelectedTestId(e.target.value)}
            >
              {labTestsCatalog.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (₹{t.price}) - {t.category}
                </option>
              ))}
            </select>
          </div>

          {/* Test Highlights */}
          <div
            style={{
              padding: "12px",
              background: "var(--primary-subtle)",
              borderRadius: "var(--radius-md)",
              marginBottom: "16px",
              fontSize: "0.825rem",
              border: "1px solid #bae6fd"
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "4px" }}>
              {currentTest.name}
            </div>
            <div style={{ color: "var(--slate-600)" }}>{currentTest.description}</div>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px", color: "var(--navy-800)" }}>
              <span><strong>Sample:</strong> {currentTest.sampleType}</span>
              <span><strong>Fasting:</strong> {currentTest.fastingRequired}</span>
              <span><strong>Report in:</strong> {currentTest.turnaroundHours} hrs</span>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div className="form-group">
              <label className="form-label">Collection Date:</label>
              <input
                type="date"
                className="form-input"
                value={collectionDate}
                onChange={(e) => setCollectionDate(e.target.value)}
                min="2026-10-07"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Collection Window:</label>
              <select
                className="form-select"
                value={collectionTimeSlot}
                onChange={(e) => setCollectionTimeSlot(e.target.value)}
              >
                {timeSlots.map((ts) => (
                  <option key={ts} value={ts}>
                    {ts}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Collection Address */}
          <div className="form-group">
            <label className="form-label">Home / Office Collection Address:</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House/Flat number, building name, street, locality, pincode..."
            />
            <span className="form-hint">Our certified phlebotomist will arrive with sterilized collection kits.</span>
          </div>

          {/* Fee & Payment Method */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px",
              background: "var(--slate-50)",
              borderRadius: "var(--radius-md)",
              marginBottom: "18px",
              border: "1px solid var(--border-color)"
            }}
          >
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", display: "block" }}>Total Package Cost:</span>
              <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--secondary)" }}>
                ₹{currentTest.price}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#16a34a", marginLeft: "8px" }}>(Free Home Collection)</span>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {["upi", "card", "cash"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: paymentMethod === method ? "2px solid var(--primary)" : "1px solid var(--slate-300)",
                    background: paymentMethod === method ? "var(--primary-subtle)" : "var(--white)",
                    fontSize: "0.775rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    cursor: "pointer"
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button className="btn btn-outline btn-sm" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary btn-sm"
              disabled={isSubmitting}
              onClick={handleConfirm}
            >
              {isSubmitting ? "Processing..." : `Book Home Collection (₹${currentTest.price})`}
            </button>
          </div>
        </div>
      ) : (
        /* Confirmation State */
        <div style={{ textAlign: "center", padding: "14px 6px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto"
            }}
          >
            <CheckCircle2 size={32} />
          </div>

          <h3 style={{ fontSize: "1.2rem", color: "var(--navy-900)", marginBottom: "4px" }}>
            Lab Home Collection Booked!
          </h3>
          <p style={{ color: "var(--slate-600)", fontSize: "0.85rem", marginBottom: "16px" }}>
            Booking ID: <strong>#{confirmedBooking.id}</strong>. Phlebotomist Suresh Kumar has been assigned.
          </p>

          <div
            style={{
              background: "var(--slate-50)",
              borderRadius: "var(--radius-md)",
              padding: "16px",
              textAlign: "left",
              fontSize: "0.85rem",
              marginBottom: "20px",
              border: "1px solid var(--border-color)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "var(--slate-500)" }}>Test:</span>
              <strong>{confirmedBooking.testName}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "var(--slate-500)" }}>Date & Window:</span>
              <strong>{confirmedBooking.collectionDate} ({confirmedBooking.collectionTimeSlot})</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "var(--slate-500)" }}>Phlebotomist:</span>
              <strong>{confirmedBooking.assignedPhlebotomist.name} ({confirmedBooking.assignedPhlebotomist.phone})</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--slate-500)" }}>Status:</span>
              <strong style={{ color: "var(--primary)" }}>ASSIGNED</strong>
            </div>
          </div>

          <button className="btn btn-primary btn-sm" onClick={handleClose}>
            Done & View Lab Bookings
          </button>
        </div>
      )}
    </Modal>
  );
}
