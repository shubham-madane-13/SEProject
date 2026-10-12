// ==========================================================================
// PublicDoctorsPage - Doctor Discovery & Filtering Engine (SRS Section 8)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  Video,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  ArrowRight
} from "lucide-react";
import BookingModal from "../../components/consultation/BookingModal";

export default function PublicDoctorsPage() {
  const { doctors, currentUser, switchRole, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [maxFee, setMaxFee] = useState(1500);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);

  // Filter doctors
  const filteredDoctors = doctors.filter((doc) => {
    // Only show verified or public doctors
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "all" || doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesMode =
      selectedMode === "all" || doc.modes.includes(selectedMode);

    const matchesFee = doc.consultationFee <= maxFee;

    return matchesSearch && matchesSpecialty && matchesMode && matchesFee;
  });

  const specialties = [
    "All",
    "Cardiology",
    "General Medicine",
    "Dermatology",
    "Pediatrics",
    "Neurology",
    "Orthopedics"
  ];

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "2.2rem", color: "var(--navy-900)", marginBottom: "6px" }}>
          Find & Consult Top Doctors
        </h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem" }}>
          Book instant video, voice, or text consultations with verified medical specialists.
        </p>
      </div>

      {/* Search & Filter Toolbar (SRS Section 8) */}
      <div
        style={{
          background: "var(--white)",
          padding: "20px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)",
          border: "1px solid var(--border-color)",
          marginBottom: "28px"
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "14px", alignItems: "center" }} className="search-filter-grid">
          {/* Search Input */}
          <div style={{ position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "12px", top: "13px", color: "var(--slate-400)" }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "38px" }}
              placeholder="Search by doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <select
              className="form-select"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
            >
              {specialties.map((s) => (
                <option key={s} value={s.toLowerCase()}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Mode Filter */}
          <div>
            <select
              className="form-select"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="all">All Consultation Modes</option>
              <option value="video">Video Call Only</option>
              <option value="audio">Audio Call Only</option>
              <option value="chat">Text Chat Only</option>
            </select>
          </div>

          {/* Fee Range Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", fontWeight: 600 }}>Max Fee: ₹{maxFee}</span>
            <input
              type="range"
              min="300"
              max="1500"
              step="50"
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              style={{ accentColor: "var(--primary)" }}
            />
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid-3">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
            {/* Doctor Card Header */}
            <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "14px" }}>
              <img
                src={doc.avatar}
                alt={doc.name}
                style={{ width: "68px", height: "68px", borderRadius: "14px", objectFit: "cover" }}
              />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--navy-900)" }}>{doc.name}</h3>
                  {doc.verificationStatus === "VERIFIED" ? (
                    <span title="Verified by Medical Board" style={{ color: "#16a34a", display: "flex" }}>
                      <ShieldCheck size={16} />
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.65rem", padding: "1px 6px", background: "#fef3c7", color: "#92400e", borderRadius: "4px", fontWeight: 700 }}>
                      PENDING
                    </span>
                  )}
                </div>

                <div style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.875rem" }}>
                  {doc.specialty}
                </div>

                <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>
                  {doc.experienceYears} Years Exp • {doc.qualification}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.775rem", marginTop: "2px", color: "#d97706" }}>
                  <Star size={13} fill="#d97706" />
                  <strong>{doc.rating}</strong>
                  <span style={{ color: "var(--slate-400)" }}>({doc.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.825rem", color: "var(--slate-600)", lineHeight: 1.45, flex: 1, marginBottom: "14px" }}>
              {doc.bio}
            </p>

            {/* Availability & Modes */}
            <div style={{ background: "var(--slate-50)", padding: "10px 12px", borderRadius: "var(--radius-md)", marginBottom: "14px", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "var(--slate-500)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={13} /> Next Available:
                </span>
                <strong style={{ color: "#16a34a" }}>Today, {doc.availableSlots[0] || "09:00 AM"}</strong>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: "var(--slate-500)" }}>Modes:</span>
                <span style={{ display: "flex", gap: "6px", color: "var(--navy-800)" }}>
                  {doc.modes.includes("video") && <Video size={14} title="Video Available" />}
                  {doc.modes.includes("audio") && <Phone size={14} title="Audio Available" />}
                  {doc.modes.includes("chat") && <MessageSquare size={14} title="Chat Available" />}
                </span>
              </div>
            </div>

            {/* Price & Action Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "14px", marginTop: "auto" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--slate-500)", display: "block" }}>Fee</span>
                <strong style={{ fontSize: "1.15rem", color: "var(--navy-900)" }}>₹{doc.consultationFee}</strong>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (!currentUser) switchRole("patient");
                    setSelectedDoctorForBooking(doc);
                  }}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px" }}>
          <p style={{ color: "var(--slate-500)" }}>No doctors matched your criteria. Try adjusting your filters or search query.</p>
        </div>
      )}

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
