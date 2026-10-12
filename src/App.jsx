// ==========================================================================
// TeleCare Pro - Root Application & Navigation Router
// ==========================================================================

import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";

// Common UI Components
import DemoBar from "./components/common/DemoBar";
import EmergencyBanner from "./components/common/EmergencyBanner";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Toast from "./components/common/Toast";
import ConsultationRoom from "./components/consultation/ConsultationRoom";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import AboutPage from "./pages/public/AboutPage";
import ServicesPage from "./pages/public/ServicesPage";
import PublicDoctorsPage from "./pages/public/PublicDoctorsPage";
import FAQPage from "./pages/public/FAQPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

// Patient Pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientConsultationsPage from "./pages/patient/PatientConsultationsPage";
import PatientRecordsPage from "./pages/patient/PatientRecordsPage";
import PatientPrescriptionsPage from "./pages/patient/PatientPrescriptionsPage";
import PatientLabTestsPage from "./pages/patient/PatientLabTestsPage";
import PatientNotificationsPage from "./pages/patient/PatientNotificationsPage";
import PatientProfilePage from "./pages/patient/PatientProfilePage";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import DoctorPatientsPage from "./pages/doctor/DoctorPatientsPage";
import DoctorPrescriptionsPage from "./pages/doctor/DoctorPrescriptionsPage";
import DoctorAvailabilityPage from "./pages/doctor/DoctorAvailabilityPage";
import DoctorProfilePage from "./pages/doctor/DoctorProfilePage";

// Lab Pages
import LabDashboardPage from "./pages/lab/LabDashboardPage";
import LabBookingsPage from "./pages/lab/LabBookingsPage";
import LabReportsPage from "./pages/lab/LabReportsPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDoctorsPage from "./pages/admin/AdminDoctorsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminLabsPage from "./pages/admin/AdminLabsPage";
import AdminPaymentsPage from "./pages/admin/AdminPaymentsPage";
import AdminAuditLogsPage from "./pages/admin/AdminAuditLogsPage";

import { Activity, ShieldCheck, Heart, HeartPulse } from "lucide-react";

function MainContent() {
  const {
    currentUser,
    activePage,
    navigateTo,
    activeConsultationRoomId,
    setActiveConsultationRoomId
  } = useApp();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic Page Router
  const renderPage = () => {
    // 1. Explicit Public Route Matches
    if (activePage === "landing") return <LandingPage />;
    if (activePage === "about") return <AboutPage />;
    if (activePage === "services") return <ServicesPage />;
    if (activePage === "doctors") return <PublicDoctorsPage />;
    if (activePage === "faq") return <FAQPage />;
    if (activePage === "contact") return <ContactPage />;
    if (activePage === "login") return <LoginPage />;
    if (activePage === "register") return <RegisterPage />;

    // 2. Patient Routes
    if (activePage === "patient-dashboard") return <PatientDashboard />;
    if (activePage === "find-doctor") return <PublicDoctorsPage />;
    if (activePage === "consultations") return <PatientConsultationsPage />;
    if (activePage === "records") return <PatientRecordsPage />;
    if (activePage === "prescriptions") return <PatientPrescriptionsPage />;
    if (activePage === "lab-tests") return <PatientLabTestsPage />;
    if (activePage === "notifications") return <PatientNotificationsPage />;
    if (activePage === "profile") return <PatientProfilePage />;

    // 3. Doctor Routes
    if (activePage === "doctor-dashboard") return <DoctorDashboard />;
    if (activePage === "doctor-appointments") return <DoctorAppointmentsPage />;
    if (activePage === "doctor-patients") return <DoctorPatientsPage />;
    if (activePage === "doctor-prescriptions") return <DoctorPrescriptionsPage />;
    if (activePage === "doctor-availability") return <DoctorAvailabilityPage />;
    if (activePage === "doctor-profile") return <DoctorProfilePage />;

    // 4. Lab Routes
    if (activePage === "lab-dashboard") return <LabDashboardPage />;
    if (activePage === "lab-bookings") return <LabBookingsPage />;
    if (activePage === "lab-reports") return <LabReportsPage />;

    // 5. Admin Routes
    if (activePage === "admin-dashboard") return <AdminDashboardPage />;
    if (activePage === "admin-doctors") return <AdminDoctorsPage />;
    if (activePage === "admin-users") return <AdminUsersPage />;
    if (activePage === "admin-labs") return <AdminLabsPage />;
    if (activePage === "admin-payments") return <AdminPaymentsPage />;
    if (activePage === "admin-audit") return <AdminAuditLogsPage />;

    // Default Fallback
    return currentUser ? (
      currentUser.role === "doctor" ? <DoctorDashboard /> :
      currentUser.role === "lab" ? <LabDashboardPage /> :
      currentUser.role === "admin" ? <AdminDashboardPage /> :
      <PatientDashboard />
    ) : <LandingPage />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 1. Global Interactive Demo Switcher */}
      <DemoBar />

      {/* 2. Medical Emergency Notice Banner (SRS Section 30) */}
      <EmergencyBanner />

      {/* 3. Header Navbar */}
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* 4. Main Body: Sidebar (if logged in) + Content */}
      <div className="app-container">
        {currentUser && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main className="app-main">
          <div className="content-area">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* 5. Live Interactive Consultation Room Overlay (SRS Section 12) */}
      {activeConsultationRoomId && (
        <ConsultationRoom
          consultationId={activeConsultationRoomId}
          onClose={() => setActiveConsultationRoomId(null)}
        />
      )}

      {/* 6. Toast Notifications */}
      <Toast />

      {/* 7. Comprehensive Platform Footer */}
      <footer
        style={{
          backgroundColor: "#090d16",
          color: "#94a3b8",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "48px 24px 24px 24px",
          marginTop: "auto"
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "36px",
            paddingBottom: "36px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
          }}
          className="footer-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: "var(--primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Activity size={20} />
              </div>
              <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#ffffff" }}>
                TeleCare<span style={{ color: "var(--primary)" }}>Pro</span>
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.6, maxWidth: "340px", color: "#94a3b8" }}>
              Enterprise-grade Telemedicine & Remote Patient Monitoring System. Certified digital consultations, digitally signed e-prescriptions, and doorstep laboratory home sample collections.
            </p>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "14px" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo("landing"); }} style={{ color: "#94a3b8" }}>Home</a>
              <a href="#about" onClick={(e) => { e.preventDefault(); navigateTo("about"); }} style={{ color: "#94a3b8" }}>How It Works</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); navigateTo("services"); }} style={{ color: "#94a3b8" }}>Services</a>
              <a href="#doctors" onClick={(e) => { e.preventDefault(); navigateTo("doctors"); }} style={{ color: "#94a3b8" }}>Doctors Directory</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); navigateTo("faq"); }} style={{ color: "#94a3b8" }}>FAQ</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "14px" }}>Portals</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
              <span style={{ color: "#cbd5e1", cursor: "pointer" }} onClick={() => navigateTo("patient-dashboard")}>Patient Portal</span>
              <span style={{ color: "#cbd5e1", cursor: "pointer" }} onClick={() => navigateTo("doctor-dashboard")}>Doctor Clinical Desk</span>
              <span style={{ color: "#cbd5e1", cursor: "pointer" }} onClick={() => navigateTo("lab-dashboard")}>Phlebotomy & Lab Hub</span>
              <span style={{ color: "#cbd5e1", cursor: "pointer" }} onClick={() => navigateTo("admin-dashboard")}>Compliance & Operations</span>
            </div>
          </div>

          <div>
            <h4 style={{ color: "#ffffff", fontSize: "0.95rem", marginBottom: "14px" }}>Emergency Care Notice</h4>
            <p style={{ fontSize: "0.8rem", color: "#cbd5e1", lineHeight: 1.5 }}>
              This platform is strictly intended for non-emergency healthcare consultations. If you are experiencing acute life-threatening distress, call 112 / 911 immediately.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: "1440px", margin: "0 auto", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.775rem", flexWrap: "wrap", gap: "10px" }}>
          <div>© 2026 TeleCare Pro Technologies Inc. All rights reserved. ISO 27001 & HIPAA Compliant.</div>
          <div style={{ display: "flex", gap: "16px" }}>
            <span>Privacy Policy</span>
            <span>Terms of Practice</span>
            <span>Medical Council Guidelines</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
