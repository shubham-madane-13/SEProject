// ==========================================================================
// PatientLabTestsPage - Diagnostic Catalog & Live Sample Tracking
// (SRS Section 15 & 16 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import {
  FlaskConical,
  Search,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  AlertCircle,
  Truck
} from "lucide-react";
import LabBookingModal from "../../components/lab/LabBookingModal";
import LabReportModal from "../../components/lab/LabReportModal";

export default function PatientLabTestsPage() {
  const { labTestsCatalog, labBookings, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState("tests"); // 'tests' | 'bookings'
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedTestForBooking, setSelectedTestForBooking] = useState(null);
  const [viewReportBooking, setViewReportBooking] = useState(null);

  const myBookings = labBookings.filter((b) => b.patientId === currentUser?.id);

  const filteredTests = labTestsCatalog.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Laboratory Diagnostics</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Book certified home sample collections & receive digitized pathological reports.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            setSelectedTestForBooking(labTestsCatalog[0]);
            setBookingModalOpen(true);
          }}
        >
          <FlaskConical size={15} /> Book Home Collection
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
        <button
          onClick={() => setActiveTab("tests")}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-full)",
            border: activeTab === "tests" ? "1px solid var(--secondary)" : "1px solid var(--slate-300)",
            background: activeTab === "tests" ? "var(--secondary-light)" : "var(--white)",
            color: activeTab === "tests" ? "var(--secondary)" : "var(--navy-700)",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          Diagnostic Test Packages ({labTestsCatalog.length})
        </button>

        <button
          onClick={() => setActiveTab("bookings")}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-full)",
            border: activeTab === "bookings" ? "1px solid var(--secondary)" : "1px solid var(--slate-300)",
            background: activeTab === "bookings" ? "var(--secondary-light)" : "var(--white)",
            color: activeTab === "bookings" ? "var(--secondary)" : "var(--navy-700)",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          My Booked Collections ({myBookings.length})
        </button>
      </div>

      {/* TAB 1: Tests Catalog */}
      {activeTab === "tests" && (
        <div>
          {/* Search Bar */}
          <div style={{ maxWidth: "480px", marginBottom: "20px", position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "13px", color: "var(--slate-400)" }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "38px" }}
              placeholder="Search tests: CBC, Lipid, Thyroid, HbA1c..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid-3">
            {filteredTests.map((test) => (
              <div key={test.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--secondary)", textTransform: "uppercase", background: "var(--secondary-subtle)", padding: "3px 8px", borderRadius: "var(--radius-full)", border: "1px solid #99f6e4" }}>
                    {test.category}
                  </span>
                  <strong style={{ fontSize: "1.2rem", color: "var(--navy-900)" }}>₹{test.price}</strong>
                </div>

                <h3 style={{ fontSize: "1.1rem", color: "var(--navy-900)", marginBottom: "6px" }}>
                  {test.name}
                </h3>

                <p style={{ fontSize: "0.825rem", color: "var(--slate-600)", lineHeight: 1.45, flex: 1, marginBottom: "14px" }}>
                  {test.description}
                </p>

                <div style={{ background: "var(--slate-50)", padding: "10px", borderRadius: "var(--radius-md)", fontSize: "0.785rem", marginBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div><strong>Sample:</strong> {test.sampleType}</div>
                  <div><strong>Prerequisite:</strong> {test.fastingRequired}</div>
                  <div><strong>Turnaround:</strong> {test.turnaroundHours} Hours</div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: "100%", marginTop: "auto" }}
                  onClick={() => {
                    setSelectedTestForBooking(test);
                    setBookingModalOpen(true);
                  }}
                >
                  Book Home Collection
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: My Booked Collections (SRS Section 15 & 16) */}
      {activeTab === "bookings" && (
        <div>
          {myBookings.length === 0 ? (
            <EmptyState
              icon={FlaskConical}
              title="No laboratory bookings"
              description="You have not booked any diagnostic home sample collections yet."
              actionLabel="Explore Test Packages"
              onAction={() => setActiveTab("tests")}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {myBookings.map((b) => (
                <div key={b.id} className="card card-hover" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "18px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--navy-900)" }}>{b.testName}</h3>
                      <StatusBadge status={b.status} />
                    </div>

                    <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--slate-600)", flexWrap: "wrap", marginBottom: "6px" }}>
                      <span>📅 Collection Date: <strong>{b.collectionDate}</strong></span>
                      <span>⏰ Window: <strong>{b.collectionTimeSlot}</strong></span>
                      <span>Price: <strong>₹{b.price} ({b.paymentStatus})</strong></span>
                    </div>

                    <div style={{ display: "flex", gap: "16px", fontSize: "0.8rem", color: "var(--slate-500)", flexWrap: "wrap" }}>
                      <span>📍 Address: {b.collectionAddress}</span>
                      {b.assignedPhlebotomist && (
                        <span>🧑‍⚕️ Phlebotomist: <strong>{b.assignedPhlebotomist.name} ({b.assignedPhlebotomist.phone})</strong></span>
                      )}
                    </div>
                  </div>

                  <div>
                    {b.status === "REPORT READY" ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setViewReportBooking(b)}
                      >
                        <FileText size={14} /> View Diagnostic Report
                      </button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--slate-500)", background: "var(--slate-100)", padding: "6px 12px", borderRadius: "6px" }}>
                        <Truck size={14} /> Tracking: {b.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lab Booking Modal */}
      {bookingModalOpen && (
        <LabBookingModal
          preselectedTest={selectedTestForBooking}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

      {/* Lab Report Modal */}
      {viewReportBooking && (
        <LabReportModal
          booking={viewReportBooking}
          isOpen={!!viewReportBooking}
          onClose={() => setViewReportBooking(null)}
        />
      )}
    </div>
  );
}
