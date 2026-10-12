// ==========================================================================
// PatientRecordsPage - Encrypted Health Document Vault (SRS Section 13)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import {
  FolderLock,
  UploadCloud,
  FileText,
  Image,
  Eye,
  Trash2,
  Download,
  Filter,
  ShieldCheck
} from "lucide-react";
import RecordUploadModal from "../../components/records/RecordUploadModal";
import RecordViewModal from "../../components/records/RecordViewModal";

export default function PatientRecordsPage() {
  const { records, currentUser, deleteMedicalRecord, addToast } = useApp();

  const [activeCategory, setActiveCategory] = useState("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedRecordForView, setSelectedRecordForView] = useState(null);

  const myRecords = records.filter((r) => r.patientId === currentUser?.id);

  const filteredRecords = myRecords.filter((r) => {
    if (activeCategory === "all") return true;
    return r.type.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Medical Records Vault</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Securely store, organize, and share clinical documents, lab reports, and radiological scans.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setUploadModalOpen(true)}>
          <UploadCloud size={15} /> Upload Medical Document
        </button>
      </div>

      {/* Category Filter Pills (SRS Section 13) */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
        {[
          { id: "all", label: `All Documents (${myRecords.length})` },
          { id: "lab report", label: "Lab Reports" },
          { id: "prescription", label: "Prescriptions" },
          { id: "scan", label: "Scans & Imaging" },
          { id: "clinical note", label: "Clinical Notes & Summaries" }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              border: activeCategory === cat.id ? "1px solid var(--primary)" : "1px solid var(--slate-300)",
              background: activeCategory === cat.id ? "var(--primary-light)" : "var(--white)",
              color: activeCategory === cat.id ? "var(--primary-dark)" : "var(--navy-700)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          icon={FolderLock}
          title="No medical records found"
          description="You haven't uploaded any medical records in this category. Upload prescriptions or lab PDFs to keep them in one secure place."
          actionLabel="Upload First Document"
          onAction={() => setUploadModalOpen(true)}
        />
      ) : (
        <div className="grid-3">
          {filteredRecords.map((r) => (
            <div key={r.id} className="card card-hover" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: r.type === "Scan" ? "#fef3c7" : r.type === "Lab Report" ? "var(--secondary-light)" : "var(--primary-light)",
                    color: r.type === "Scan" ? "#d97706" : r.type === "Lab Report" ? "var(--secondary)" : "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FileText size={20} />
                </div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--slate-100)",
                    color: "var(--navy-700)"
                  }}
                >
                  {r.type}
                </span>
              </div>

              <h3 style={{ fontSize: "1.05rem", color: "var(--navy-900)", marginBottom: "6px", lineHeight: 1.3 }}>
                {r.name}
              </h3>

              <div style={{ fontSize: "0.8rem", color: "var(--slate-500)", marginBottom: "12px" }}>
                Uploaded: {r.uploadDate} • {r.fileSize} ({r.fileType})
              </div>

              {r.notes && (
                <p style={{ fontSize: "0.785rem", color: "var(--navy-700)", lineHeight: 1.4, flex: 1, marginBottom: "16px", background: "var(--slate-50)", padding: "8px", borderRadius: "6px" }}>
                  {r.notes}
                </p>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-light)", paddingTop: "12px", marginTop: "auto" }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setSelectedRecordForView(r)}
                >
                  <Eye size={13} /> View
                </button>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => addToast(`Downloading ${r.name}...`, "info")}
                    title="Download"
                  >
                    <Download size={14} />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{ color: "#dc2626" }}
                    onClick={() => {
                      if (window.confirm(`Delete ${r.name}?`)) {
                        deleteMedicalRecord(r.id);
                      }
                    }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <RecordUploadModal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} />
      )}

      {/* View Modal */}
      {selectedRecordForView && (
        <RecordViewModal
          record={selectedRecordForView}
          isOpen={!!selectedRecordForView}
          onClose={() => setSelectedRecordForView(null)}
        />
      )}
    </div>
  );
}
