// ==========================================================================
// RecordUploadModal - Upload & Categorize Health Document (SRS Section 13)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import Modal from "../common/Modal";
import { UploadCloud, FileText, Image, AlertCircle } from "lucide-react";

export default function RecordUploadModal({ isOpen, onClose }) {
  const { uploadMedicalRecord, addToast } = useApp();

  const [recordName, setRecordName] = useState("");
  const [recordType, setRecordType] = useState("Lab Report");
  const [notes, setNotes] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileType, setFileType] = useState("PDF");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setSelectedFileName(f.name);
      if (!recordName) {
        setRecordName(f.name.replace(/\.[^/.]+$/, ""));
      }
      if (f.name.endsWith(".jpg") || f.name.endsWith(".png") || f.name.endsWith(".jpeg")) {
        setFileType("JPG");
      } else {
        setFileType("PDF");
      }
    }
  };

  const handleUpload = () => {
    if (!recordName.trim()) {
      addToast("Please provide a name for this record.", "warning");
      return;
    }

    uploadMedicalRecord({
      name: recordName,
      type: recordType,
      fileType,
      notes: notes || "Uploaded by patient for doctor consultation",
      url: "#"
    });

    setRecordName("");
    setNotes("");
    setSelectedFileName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Health Document" maxWidth="580px">
      {/* File Dropzone Simulation */}
      <div
        style={{
          border: "2px dashed var(--slate-300)",
          borderRadius: "var(--radius-lg)",
          padding: "24px 16px",
          textAlign: "center",
          backgroundColor: "var(--slate-50)",
          marginBottom: "18px",
          cursor: "pointer",
          position: "relative"
        }}
      >
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "pointer",
            width: "100%",
            height: "100%"
          }}
        />
        <UploadCloud size={38} style={{ color: "var(--primary)", margin: "0 auto 8px auto" }} />
        <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--navy-900)" }}>
          {selectedFileName ? selectedFileName : "Click or drag & drop medical document"}
        </div>
        <p style={{ fontSize: "0.775rem", color: "var(--slate-500)", margin: "4px 0 0 0" }}>
          Supports PDF, JPG, PNG up to 25 MB (End-to-End Encrypted)
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Document Title:</label>
        <input
          type="text"
          className="form-input"
          value={recordName}
          onChange={(e) => setRecordName(e.target.value)}
          placeholder="e.g. Lipid Profile Report, Knee MRI Scan, Echo Summary"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category / Record Type:</label>
        <select
          className="form-select"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
        >
          <option value="Lab Report">Lab Report</option>
          <option value="Prescription">Prescription</option>
          <option value="Scan">Diagnostic Scan (X-Ray, MRI, CT)</option>
          <option value="Clinical Note">Clinical Note / Discharge Summary</option>
          <option value="Vaccination">Vaccination Record</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Clinical Observations or Doctor's Notes (Optional):</label>
        <textarea
          className="form-textarea"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Performed at Apollo diagnostics; doctor advised review after 2 weeks..."
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
        <button className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleUpload}>
          Upload to Secure Vault
        </button>
      </div>
    </Modal>
  );
}
