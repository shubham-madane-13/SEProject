// ==========================================================================
// ConsultationRoom - Realistic Telemedicine Video/Audio/Chat Interface
// (SRS Section 12 Compliant)
// ==========================================================================

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  FileText,
  User,
  Shield,
  Send,
  Paperclip,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  Heart,
  Activity,
  X
} from "lucide-react";
import PrescriptionModal from "../prescription/PrescriptionModal";

export default function ConsultationRoom({ consultationId, onClose }) {
  const {
    consultations,
    patients,
    records,
    prescriptions,
    currentUser,
    completeConsultation,
    addToast
  } = useApp();

  const consultation = consultations.find((c) => c.id === consultationId);
  const patient = patients.find((p) => p.id === consultation?.patientId) || patients[0];

  // In-call toggles
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeTab, setActiveTab] = useState("chart"); // 'chart' | 'records' | 'chat' | 'notes'
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  // Call Timer
  const [seconds, setSeconds] = useState(145);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // In-call chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: "m-1",
      sender: "doctor",
      name: consultation?.doctorName || "Doctor",
      text: "Hello Rahul, good day! I have opened your previous ECG and blood reports on my screen.",
      time: "08:01 PM"
    },
    {
      id: "m-2",
      sender: "patient",
      name: patient?.name || "Rahul Verma",
      text: "Good evening doctor. Yes, I've had some occasional chest tightness after climbing stairs.",
      time: "08:02 PM"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Doctor Clinical Notes
  const [doctorNotes, setDoctorNotes] = useState(
    consultation?.notes ||
      "Patient reports intermittent mild chest tightness on moderate exertion. No radiation to jaw or left arm. Rest ECG from 01 Oct is within normal sinus rhythm. Advised ambulatory BP monitoring and symptom diary."
  );

  // E-Prescription Modal trigger
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  if (!consultation) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `msg-${Date.now()}`,
      sender: currentUser?.role === "doctor" ? "doctor" : "patient",
      name: currentUser?.name || "User",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setChatMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // Simulated reply from doctor if patient sends message
    if (currentUser?.role === "patient") {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: "doctor",
            name: consultation.doctorName,
            text: "Understood. Let me check your lung sounds and pulse rate right away.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }
        ]);
      }, 1500);
    }
  };

  const handleEndCall = () => {
    completeConsultation(consultation.id, doctorNotes);
    if (currentUser?.role === "doctor") {
      addToast("Consultation completed. Would you like to issue an e-prescription now?", "info");
      setShowPrescriptionModal(true);
    } else {
      if (onClose) onClose();
    }
  };

  const patientRecords = records.filter((r) => r.patientId === consultation.patientId);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === consultation.patientId);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#090d16",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "var(--font-main)"
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: "12px 24px",
          background: "rgba(15, 23, 42, 0.95)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e", animation: "pulse-badge 1.5s infinite" }} />
            <strong style={{ fontSize: "0.95rem" }}>
              {consultation.mode.toUpperCase()} CONSULTATION #{consultation.id}
            </strong>
          </div>
          <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>|</span>
          <span style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>
            Dr. {consultation.doctorName} ↔ {consultation.patientName}
          </span>
          <div
            style={{
              background: "rgba(2, 132, 199, 0.2)",
              color: "#38bdf8",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Shield size={12} /> 256-Bit Encrypted
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Clock size={14} style={{ color: "#38bdf8" }} />
            {formatTimer(seconds)}
          </div>

          <button
            onClick={() => setSidePanelOpen(!sidePanelOpen)}
            className="btn btn-outline btn-sm"
            style={{ background: "rgba(255, 255, 255, 0.1)", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.2)" }}
          >
            {sidePanelOpen ? "Hide Patient Chart" : "Show Patient Chart"}
          </button>
        </div>
      </div>

      {/* Main Call Area + Side Panel */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Call Canvas */}
        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "#0f172a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          {consultation.mode === "video" ? (
            /* VIDEO MODE SIMULATION */
            <div
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "820px",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#020617",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Remote Doctor Video Feed Simulation */}
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80"
                alt="Doctor Feed"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: isVideoOff ? "brightness(0.2)" : "none"
                }}
              />

              {/* Doctor Video Overlay Info */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  background: "rgba(15, 23, 42, 0.75)",
                  backdropFilter: "blur(6px)",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                <span>{consultation.doctorName} (Cardiologist)</span>
                <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>• Apollo Heart Institute</span>
              </div>

              {/* Patient Local Video PIP Preview */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "200px",
                  height: "140px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  background: "#1e293b"
                }}
              >
                <img
                  src={patient.avatar}
                  alt="Patient Self View"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "6px",
                    left: "8px",
                    background: "rgba(0,0,0,0.6)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "0.7rem",
                    color: "#ffffff"
                  }}
                >
                  You ({patient.name})
                </div>
              </div>
            </div>
          ) : (
            /* AUDIO OR CHAT CALL INTERFACE */
            <div style={{ textAlign: "center", color: "#ffffff" }}>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  margin: "0 auto 24px auto",
                  border: "4px solid var(--primary)",
                  boxShadow: "0 0 30px rgba(2, 132, 199, 0.5)",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80"
                  alt="Doctor"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <h2 style={{ fontSize: "1.6rem", color: "#ffffff", marginBottom: "6px" }}>{consultation.doctorName}</h2>
              <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "16px" }}>{consultation.specialty} • Voice Line Active</p>
              
              {/* Audio Wave Simulation */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", height: "40px" }}>
                {[30, 60, 90, 45, 80, 100, 70, 40, 85, 55, 95, 30].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: "4px",
                      height: `${h}%`,
                      background: isMuted ? "#64748b" : "var(--primary)",
                      borderRadius: "4px",
                      transition: "height 200ms ease"
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Panel: Patient Medical Records, Vitals & Clinical Notes */}
        {sidePanelOpen && (
          <div
            style={{
              width: "420px",
              backgroundColor: "var(--white)",
              borderLeft: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              boxShadow: "var(--shadow-xl)"
            }}
          >
            {/* Side Panel Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--border-light)",
                background: "var(--slate-50)"
              }}
            >
              {[
                { id: "chart", label: "Patient Vitals", icon: Activity },
                { id: "records", label: "Records", icon: FileText },
                { id: "chat", label: "In-Call Chat", icon: MessageSquare },
                { id: "notes", label: "Doctor Rx", icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: "12px 6px",
                      border: "none",
                      background: active ? "var(--white)" : "transparent",
                      borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                      color: active ? "var(--primary-dark)" : "var(--slate-600)",
                      fontWeight: active ? 700 : 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Patient Chart & Vitals */}
            {activeTab === "chart" && (
              <div style={{ padding: "18px", overflowY: "auto", flex: 1 }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div>
                    <h4 style={{ margin: 0, fontSize: "1rem" }}>{patient.name}</h4>
                    <span style={{ fontSize: "0.8rem", color: "var(--slate-500)" }}>
                      {patient.age} yrs • {patient.gender} • Blood Group: <strong>{patient.bloodGroup}</strong>
                    </span>
                  </div>
                </div>

                <div style={{ background: "var(--slate-50)", padding: "14px", borderRadius: "var(--radius-md)", marginBottom: "14px", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--slate-400)", marginBottom: "6px" }}>
                    Clinical Alert / Allergies
                  </div>
                  <div style={{ color: "#b91c1c", fontWeight: 600, fontSize: "0.85rem" }}>
                    Allergies: {patient.allergies || "None reported"}
                  </div>
                  <div style={{ color: "var(--navy-800)", fontSize: "0.85rem", marginTop: "4px" }}>
                    Chronic Conditions: {patient.chronicConditions || "None"}
                  </div>
                </div>

                <div style={{ background: "var(--primary-subtle)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid #bae6fd" }}>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--primary-dark)", marginBottom: "6px" }}>
                    Chief Complaint for this session
                  </div>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-900)", lineHeight: 1.4 }}>
                    {consultation.reason || "Routine Cardiology follow-up."}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Uploaded Records */}
            {activeTab === "records" && (
              <div style={{ padding: "16px", overflowY: "auto", flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "12px", color: "var(--navy-900)" }}>
                  Patient Vault Documents ({patientRecords.length})
                </div>
                {patientRecords.map((r) => (
                  <div
                    key={r.id}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--border-color)",
                      marginBottom: "10px",
                      background: "var(--white)"
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--navy-900)" }}>{r.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--slate-500)", marginTop: "2px" }}>
                      {r.type} • {r.uploadDate} • {r.fileSize}
                    </div>
                    {r.notes && (
                      <p style={{ fontSize: "0.75rem", color: "var(--navy-700)", margin: "4px 0 0 0" }}>
                        <em>Notes:</em> {r.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: In-Call Live Chat */}
            {activeTab === "chat" && (
              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: 1, padding: "16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {chatMessages.map((m) => {
                    const isMe = m.sender === (currentUser?.role === "doctor" ? "doctor" : "patient");
                    return (
                      <div
                        key={m.id}
                        style={{
                          alignSelf: isMe ? "flex-end" : "flex-start",
                          maxWidth: "85%",
                          backgroundColor: isMe ? "var(--primary)" : "var(--slate-100)",
                          color: isMe ? "#ffffff" : "var(--navy-900)",
                          padding: "10px 14px",
                          borderRadius: "12px",
                          fontSize: "0.85rem"
                        }}
                      >
                        <div style={{ fontSize: "0.7rem", opacity: 0.8, marginBottom: "2px" }}>{m.name} • {m.time}</div>
                        <div>{m.text}</div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSendMessage} style={{ padding: "12px", borderTop: "1px solid var(--border-light)", display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Type in-call message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ fontSize: "0.85rem", padding: "8px 12px" }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: "8px 14px" }}>
                    <Send size={15} />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 4: Doctor Notes & E-Prescription Trigger */}
            {activeTab === "notes" && (
              <div style={{ padding: "18px", overflowY: "auto", flex: 1 }}>
                <div className="form-group">
                  <label className="form-label">Clinical Consultation Notes:</label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    value={doctorNotes}
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    placeholder="Enter diagnostic impressions, exam findings, vitals..."
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>

                <div style={{ marginTop: "16px", background: "var(--primary-subtle)", padding: "16px", borderRadius: "var(--radius-md)", border: "1px solid #bae6fd" }}>
                  <h5 style={{ margin: "0 0 6px 0", color: "var(--primary-dark)" }}>Digital E-Prescription</h5>
                  <p style={{ margin: "0 0 12px 0", fontSize: "0.8rem", color: "var(--slate-600)" }}>
                    Issue cryptographically signed e-prescription with Rx medicines, dosage, and duration.
                  </p>
                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: "100%" }}
                    onClick={() => setShowPrescriptionModal(true)}
                  >
                    <FileText size={15} /> Create & Digitally Sign Prescription
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* In-Call Controls Bottom Bar (SRS Section 12) */}
      <div
        style={{
          padding: "14px 24px",
          background: "#090d16",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px"
        }}
      >
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            addToast(isMuted ? "Microphone unmuted." : "Microphone muted.", "info");
          }}
          className={`btn ${isMuted ? "btn-danger" : "btn-outline"} btn-icon`}
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={() => {
            setIsVideoOff(!isVideoOff);
            addToast(isVideoOff ? "Camera turned on." : "Camera turned off.", "info");
          }}
          className={`btn ${isVideoOff ? "btn-danger" : "btn-outline"} btn-icon`}
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          aria-label={isVideoOff ? "Start Video" : "Stop Video"}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          onClick={() => {
            setIsScreenSharing(!isScreenSharing);
            addToast(isScreenSharing ? "Screen sharing stopped." : "Screen sharing active.", "info");
          }}
          className={`btn ${isScreenSharing ? "btn-primary" : "btn-outline"} btn-icon`}
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          aria-label="Toggle Screen Share"
        >
          <Monitor size={20} />
        </button>

        <button
          onClick={() => {
            setSidePanelOpen(true);
            setActiveTab("chat");
          }}
          className="btn btn-outline btn-icon"
          style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          aria-label="Toggle Live Chat"
        >
          <MessageSquare size={20} />
        </button>

        <button
          onClick={handleEndCall}
          className="btn btn-danger"
          style={{ padding: "0 24px", height: "48px", borderRadius: "24px", gap: "8px", fontWeight: 700 }}
        >
          <PhoneOff size={18} /> End Consultation
        </button>
      </div>

      {/* Prescription Modal inside Consultation Room */}
      {showPrescriptionModal && (
        <PrescriptionModal
          consultation={consultation}
          patient={patient}
          isOpen={showPrescriptionModal}
          onClose={() => {
            setShowPrescriptionModal(false);
            if (consultation.status === "COMPLETED" && onClose) onClose();
          }}
        />
      )}
    </div>
  );
}
