// ==========================================================================
// AdminUsersPage - Patient User Management & Demographics Directory
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Users, Search, Phone, Mail, MapPin } from "lucide-react";

export default function AdminUsersPage() {
  const { patients, consultations, records } = useApp();
  const [search, setSearch] = useState("");

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Registered Patient Directory</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Overview of registered patients, verified contact information, and record activity.
          </p>
        </div>

        <input
          type="text"
          className="form-input"
          placeholder="Search by name, phone, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "260px", fontSize: "0.85rem" }}
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px" }}>Patient Profile</th>
                <th style={{ padding: "12px 16px" }}>Contact</th>
                <th style={{ padding: "12px 16px" }}>Vitals & Blood Group</th>
                <th style={{ padding: "12px 16px" }}>Residential Address</th>
                <th style={{ padding: "12px 16px" }}>Consultations</th>
                <th style={{ padding: "12px 16px" }}>Vault Records</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const pCons = consultations.filter((c) => c.patientId === p.id);
                const pRecs = records.filter((r) => r.patientId === p.id);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <img
                          src={p.avatar}
                          alt={p.name}
                          style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <div>
                          <strong style={{ color: "var(--navy-900)" }}>{p.name}</strong>
                          <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>#{p.id}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <div>{p.email}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{p.phone}</div>
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <div>Age: {p.age} • {p.gender}</div>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)" }}>Blood: {p.bloodGroup}</div>
                    </td>

                    <td style={{ padding: "12px 16px", maxWidth: "260px", color: "var(--slate-600)", fontSize: "0.8rem" }}>
                      {p.address}
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <strong>{pCons.length}</strong> Sessions
                    </td>

                    <td style={{ padding: "12px 16px" }}>
                      <strong>{pRecs.length}</strong> Documents
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
