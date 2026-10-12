// ==========================================================================
// LabBookingsPage - Detailed Phlebotomy Field Assignment Sheet
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import { FlaskConical, MapPin, Clock, CheckCircle2, Phone, FileText } from "lucide-react";
import LabReportModal from "../../components/lab/LabReportModal";

export default function LabBookingsPage() {
  const { labBookings, updateLabStatus } = useApp();
  const [selectedBookingForReport, setSelectedBookingForReport] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Home Collection Bookings</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Track and execute home sample collections for all active patient requests.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {labBookings.map((b) => (
          <div key={b.id} className="card card-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>{b.testName}</h3>
                <StatusBadge status={b.status} />
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--slate-600)", marginBottom: "6px" }}>
                Patient: <strong>{b.patientName}</strong> • Phone: <a href={`tel:${b.patientPhone}`}>{b.patientPhone}</a>
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <span>📍 {b.collectionAddress}</span>
                <span>📅 {b.collectionDate} ({b.collectionTimeSlot})</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {b.status === "ASSIGNED" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateLabStatus(b.id, "COLLECTED")}
                >
                  <CheckCircle2 size={14} /> Mark Collected
                </button>
              )}
              {b.status === "COLLECTED" && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => updateLabStatus(b.id, "IN LAB")}
                >
                  Mark In Lab
                </button>
              )}
              {b.status === "REPORT READY" && (
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedBookingForReport(b)}
                >
                  <FileText size={14} /> View Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedBookingForReport && (
        <LabReportModal
          booking={selectedBookingForReport}
          isOpen={!!selectedBookingForReport}
          onClose={() => setSelectedBookingForReport(null)}
        />
      )}
    </div>
  );
}
