// ==========================================================================
// AdminPaymentsPage - Payment Transactions & Financial Ledger
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import StatusBadge from "../../components/common/StatusBadge";
import { CreditCard, DollarSign, TrendingUp, RefreshCw, CheckCircle2 } from "lucide-react";

export default function AdminPaymentsPage() {
  const { consultations, labBookings } = useApp();

  const consultationPayments = consultations.map((c) => ({
    id: c.paymentId || `PAY-${c.id}`,
    entity: "Doctor Consultation",
    referenceId: c.id,
    customerName: c.patientName,
    amount: c.fee,
    date: c.date,
    method: c.paymentMethod || "UPI",
    status: c.paymentStatus
  }));

  const labPayments = labBookings.map((b) => ({
    id: b.paymentId || `PAY-${b.id}`,
    entity: "Lab Home Collection",
    referenceId: b.id,
    customerName: b.patientName,
    amount: b.price,
    date: b.collectionDate,
    method: b.paymentMethod || "UPI",
    status: b.paymentStatus
  }));

  const allTransactions = [...consultationPayments, ...labPayments];

  const totalCollected = allTransactions
    .filter((t) => t.status === "PAID")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunded = allTransactions
    .filter((t) => t.status === "REFUNDED")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Payments & Settlement Ledger</h1>
        <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
          Monitor patient consultation fees, home lab payments, gateway transactions, and refunds.
        </p>
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>GROSS VOLUME</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#16a34a", marginTop: "4px" }}>
            ₹{totalCollected.toLocaleString()}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Settled successfully</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>REFUNDS PROCESSED</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#be123c", marginTop: "4px" }}>
            ₹{totalRefunded.toLocaleString()}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>Cancellations with 100% refund</span>
        </div>

        <div className="card">
          <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", fontWeight: 600 }}>GATEWAY HEALTH</div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", marginTop: "4px" }}>
            99.98%
          </div>
          <span style={{ fontSize: "0.75rem", color: "#16a34a", fontWeight: 600 }}>UPI & Cards Operational</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--slate-50)", textAlign: "left", color: "var(--slate-600)", borderBottom: "1px solid var(--border-color)" }}>
                <th style={{ padding: "12px 16px" }}>Transaction ID</th>
                <th style={{ padding: "12px 16px" }}>Service Category</th>
                <th style={{ padding: "12px 16px" }}>Patient</th>
                <th style={{ padding: "12px 16px" }}>Date</th>
                <th style={{ padding: "12px 16px" }}>Method</th>
                <th style={{ padding: "12px 16px" }}>Amount</th>
                <th style={{ padding: "12px 16px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: "1px solid var(--border-light)" }}>
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                    {tx.entity} <span style={{ color: "var(--slate-400)", fontSize: "0.75rem" }}>(#{tx.referenceId})</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{tx.customerName}</td>
                  <td style={{ padding: "12px 16px", color: "var(--slate-500)" }}>{tx.date}</td>
                  <td style={{ padding: "12px 16px", textTransform: "uppercase", fontWeight: 600 }}>{tx.method}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--navy-900)" }}>₹{tx.amount}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={tx.status} />
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
