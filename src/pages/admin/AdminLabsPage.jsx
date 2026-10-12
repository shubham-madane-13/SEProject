// ==========================================================================
// AdminLabsPage - Laboratory Partners & Test Catalog Operations
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import { FlaskConical, Truck, CheckCircle2, Award } from "lucide-react";

export default function AdminLabsPage() {
  const { labTestsCatalog, labBookings } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Laboratory Operations & Tests</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Manage accredited diagnostic laboratory partners, field phlebotomist fleet, and test catalogue.
        </p>
      </div>

      {/* Partner Info Banner */}
      <div className="card" style={{ background: "linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)", border: "1px solid #99f6e4" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <Award size={22} style={{ color: "var(--secondary)" }} />
          <h3 style={{ margin: 0, fontSize: "1.15rem", color: "var(--navy-900)" }}>
            Primary Partner: TeleCare Diagnostics Central Lab
          </h3>
        </div>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--slate-600)" }}>
          NABL Accredited • ISO 15189 Certified Reference Laboratory. Serving 12 metropolitan zones with cold-chain sample preservation and real-time electronic report delivery.
        </p>
      </div>

      {/* Diagnostic Catalog Table */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-light)", background: "var(--slate-50)" }}>
          <h3 style={{ fontSize: "1.05rem", margin: 0, color: "var(--navy-900)" }}>
            Active Diagnostic Catalog ({labTestsCatalog.length} Tests)
          </h3>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px" }}>Test Name</th>
                <th style={{ padding: "12px 16px" }}>Category</th>
                <th style={{ padding: "12px 16px" }}>Sample Specimen</th>
                <th style={{ padding: "12px 16px" }}>Fasting Prerequisite</th>
                <th style={{ padding: "12px 16px" }}>Turnaround</th>
                <th style={{ padding: "12px 16px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {labTestsCatalog.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--navy-900)" }}>
                    {t.name}
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--secondary)", fontWeight: 600 }}>
                    {t.category}
                  </td>
                  <td style={{ padding: "12px 16px" }}>{t.sampleType}</td>
                  <td style={{ padding: "12px 16px", color: "var(--slate-600)" }}>{t.fastingRequired}</td>
                  <td style={{ padding: "12px 16px" }}>{t.turnaroundHours} Hours</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--navy-900)" }}>₹{t.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
