// ==========================================================================
// RecordViewModal - View Health Document & Download/Delete Actions
// ==========================================================================

import React from "react";
import Modal from "../common/Modal";
import { Download, Trash2, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function RecordViewModal({ record, isOpen, onClose }) {
  const { deleteMedicalRecord, currentUser, addToast } = useApp();

  if (!record || !isOpen) return null;

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${record.name}" from your medical vault?`)) {
      deleteMedicalRecord(record.id);
      onClose();
    }
  };

  const handleDownload = () => {
    addToast(`Downloading ${record.name} (${record.fileType})...`, "info");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={record.name} maxWidth="640px">
      <div style={{ marginBottom: "16px" }}>
        {/* Document Metadata Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            padding: "12px",
            background: "var(--slate-50)",
            borderRadius: "var(--radius-md)",
            marginBottom: "16px",
            fontSize: "0.825rem"
          }}
        >
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Document Type</span>
            <strong>{record.type}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>Upload Date</span>
            <strong>{record.uploadDate}</strong>
          </div>
          <div>
            <span style={{ color: "var(--slate-500)", display: "block" }}>File Size / Format</span>
            <strong>{record.fileSize} ({record.fileType})</strong>
          </div>
        </div>

        {/* Visual Document Mock Preview Container */}
        <div
          style={{
            height: "220px",
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
            padding: "20px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "var(--white)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
              boxShadow: "var(--shadow-sm)",
              marginBottom: "10px"
            }}
          >
            <FileText size={32} />
          </div>
          <strong style={{ fontSize: "0.95rem", color: "var(--navy-900)" }}>{record.name}</strong>
          <span style={{ fontSize: "0.8rem", color: "var(--slate-500)", marginTop: "4px" }}>
            Uploaded by: {record.uploadedBy || "Patient Vault"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", color: "#16a34a", fontSize: "0.75rem", fontWeight: 600 }}>
            <ShieldCheck size={14} /> Certified Secure Digital Copy
          </div>
        </div>

        {/* Notes */}
        {record.notes && (
          <div style={{ padding: "12px", background: "var(--primary-subtle)", borderRadius: "var(--radius-md)", border: "1px solid #bae6fd", fontSize: "0.85rem" }}>
            <strong style={{ color: "var(--primary-dark)", display: "block", marginBottom: "2px" }}>Notes:</strong>
            <p style={{ margin: 0, color: "var(--navy-800)" }}>{record.notes}</p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
        {currentUser?.role === "patient" && (
          <button className="btn btn-outline btn-sm" onClick={handleDelete} style={{ color: "#dc2626", borderColor: "#fecaca" }}>
            <Trash2 size={14} /> Delete Record
          </button>
        )}
        <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
          <button className="btn btn-primary btn-sm" onClick={handleDownload}>
            <Download size={14} /> Download Document
          </button>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
