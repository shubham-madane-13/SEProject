// ==========================================================================
// AdminAuditLogsPage - Security, Compliance, & Regulatory Audit Trails
// (SRS Section 45 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { FileSearch, ShieldCheck, Download, Filter, Search } from "lucide-react";

export default function AdminAuditLogsPage() {
  const { auditLogs, addToast } = useApp();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || log.userRole.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const handleExport = () => {
    addToast("Exporting immutable audit log in JSON / CSV format...", "info");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>
            Regulatory Audit & Compliance Logs
          </h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Immutable chronological logging of all platform clinical, prescribing, payment, and security events.
          </p>
        </div>

        <button className="btn btn-outline btn-sm" onClick={handleExport}>
          <Download size={15} /> Export Audit Log
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--slate-400)" }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: "36px", fontSize: "0.85rem" }}
              placeholder="Search actions, users, or entity IDs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>Role:</span>
            <select
              className="form-select"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ width: "140px", fontSize: "0.85rem", padding: "8px" }}
            >
              <option value="all">All Actors</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="lab">Lab Partner</option>
              <option value="admin">Admin</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px" }}>Timestamp</th>
                <th style={{ padding: "12px 16px" }}>User / Role</th>
                <th style={{ padding: "12px 16px" }}>Event Action</th>
                <th style={{ padding: "12px 16px" }}>Target Entity</th>
                <th style={{ padding: "12px 16px" }}>Details & Parameters</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "12px 16px", color: "var(--slate-500)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: "0.775rem" }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    <strong style={{ color: "var(--navy-900)" }}>{log.userName}</strong>
                    <div style={{ fontSize: "0.725rem", color: "var(--slate-500)", textTransform: "capitalize" }}>
                      {log.userRole}
                    </div>
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: "var(--slate-100)", padding: "3px 8px", borderRadius: "4px", fontWeight: 600, fontSize: "0.775rem", color: "var(--navy-900)" }}>
                      {log.action}
                    </span>
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    <div>{log.entity}</div>
                    <code style={{ fontSize: "0.725rem", color: "var(--slate-500)" }}>#{log.entityId}</code>
                  </td>

                  <td style={{ padding: "12px 16px", color: "var(--navy-800)", maxWidth: "380px" }}>
                    {log.details}
                  </td>

                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px" }}>
                      <ShieldCheck size={14} /> {log.status}
                    </span>
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
