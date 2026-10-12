// ==========================================================================
// AdminDoctorsPage - Doctor Credential Verification & Compliance Desk
// (SRS Section 25 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import { ShieldCheck, ShieldAlert, Clock, Stethoscope, Search, CheckCircle2, XCircle } from "lucide-react";

export default function AdminDoctorsPage() {
  const { doctors, verifyDoctor, addToast } = useApp();
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((d) => {
    const matchesStatus = filterStatus === "all" || d.verificationStatus.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase()) || d.licenseNumber.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Doctor Credential Verification</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Validate medical registration licenses and authorize digital prescribing access (SRS Section 25).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", alignItems: "center", flexWrap: "wrap" }}>
        {["all", "pending", "verified", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              border: filterStatus === s ? "1px solid var(--primary)" : "1px solid var(--slate-300)",
              background: filterStatus === s ? "var(--primary-light)" : "var(--white)",
              color: filterStatus === s ? "var(--primary-dark)" : "var(--navy-700)",
              fontWeight: 600,
              fontSize: "0.85rem",
              textTransform: "capitalize",
              cursor: "pointer"
            }}
          >
            {s} ({doctors.filter((d) => s === "all" ? true : d.verificationStatus.toLowerCase() === s).length})
          </button>
        ))}

        <div style={{ marginLeft: "auto", position: "relative" }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name, license..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "6px 12px", fontSize: "0.85rem", width: "240px" }}
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "14px 16px" }}>Doctor Name</th>
                <th style={{ padding: "14px 16px" }}>Specialty & Degrees</th>
                <th style={{ padding: "14px 16px" }}>Registration License</th>
                <th style={{ padding: "14px 16px" }}>Fee / Hospital</th>
                <th style={{ padding: "14px 16px" }}>Status</th>
                <th style={{ padding: "14px 16px", textAlign: "right" }}>Compliance Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        style={{ width: "38px", height: "38px", borderRadius: "10px", objectFit: "cover" }}
                      />
                      <div>
                        <strong style={{ color: "var(--navy-900)" }}>{doc.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>ID: #{doc.id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ fontWeight: 600, color: "var(--navy-800)" }}>{doc.specialty}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{doc.qualification} ({doc.experienceYears}y exp)</div>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <code style={{ background: "var(--slate-100)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8rem", color: "var(--navy-900)" }}>
                      {doc.licenseNumber}
                    </code>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <div>₹{doc.consultationFee}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{doc.hospital}</div>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <StatusBadge status={doc.verificationStatus} />
                  </td>

                  <td style={{ padding: "14px 16px", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      {doc.verificationStatus !== "VERIFIED" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => verifyDoctor(doc.id, "VERIFIED")}
                        >
                          <ShieldCheck size={14} /> Approve & Verify
                        </button>
                      )}

                      {doc.verificationStatus !== "REJECTED" && (
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ color: "#dc2626", borderColor: "#fecaca" }}
                          onClick={() => verifyDoctor(doc.id, "REJECTED")}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
