// ==========================================================================
// Sidebar - Responsive Role-Based Navigation Sidebar
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Search,
  Calendar,
  FolderLock,
  FileCheck2,
  FlaskConical,
  Bell,
  User,
  Settings,
  Users,
  Clock,
  ShieldCheck,
  CreditCard,
  FileSearch,
  CheckCircle2,
  Stethoscope,
  X
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const {
    currentUser,
    activePage,
    navigateTo,
    unreadCount,
    consultations,
    labBookings,
    records,
    prescriptions,
    doctors
  } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  // Counts for Badges
  const upcomingConsCount = consultations.filter(
    (c) => c.status === "SCHEDULED" && (role === "patient" ? c.patientId === currentUser.id : c.doctorId === currentUser.id)
  ).length;

  const pendingLabCount = labBookings.filter(
    (l) => l.status === "REQUESTED" || l.status === "ASSIGNED" || l.status === "IN LAB"
  ).length;

  const pendingDocsCount = doctors.filter((d) => d.verificationStatus === "PENDING").length;

  // Navigation Items per Role (SRS Section 37)
  const getNavItems = () => {
    switch (role) {
      case "patient":
        return [
          { id: "patient-dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "find-doctor", label: "Find Doctor", icon: Search },
          { id: "consultations", label: "My Consultations", icon: Calendar, badge: upcomingConsCount },
          { id: "records", label: "Medical Records", icon: FolderLock, badge: records.filter(r => r.patientId === currentUser.id).length },
          { id: "prescriptions", label: "E-Prescriptions", icon: FileCheck2, badge: prescriptions.filter(p => p.patientId === currentUser.id).length },
          { id: "lab-tests", label: "Lab Tests & Collection", icon: FlaskConical },
          { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
          { id: "profile", label: "Health Profile & Vitals", icon: User }
        ];

      case "doctor":
        return [
          { id: "doctor-dashboard", label: "Clinical Dashboard", icon: LayoutDashboard },
          { id: "doctor-appointments", label: "Appointments", icon: Calendar, badge: upcomingConsCount },
          { id: "doctor-patients", label: "Patients & Medical History", icon: Users },
          { id: "doctor-prescriptions", label: "E-Prescriptions (Rx)", icon: FileCheck2 },
          { id: "doctor-availability", label: "Availability Schedule", icon: Clock },
          { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount },
          { id: "doctor-profile", label: "Doctor Profile", icon: Stethoscope }
        ];

      case "lab":
        return [
          { id: "lab-dashboard", label: "Lab Overview", icon: LayoutDashboard },
          { id: "lab-bookings", label: "Assigned Collections", icon: FlaskConical, badge: pendingLabCount },
          { id: "lab-reports", label: "Report Upload & Delivery", icon: FileCheck2 },
          { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount }
        ];

      case "admin":
        return [
          { id: "admin-dashboard", label: "Platform Overview", icon: LayoutDashboard },
          { id: "admin-doctors", label: "Doctor Verification", icon: ShieldCheck, badge: pendingDocsCount },
          { id: "admin-users", label: "Patient Directory", icon: Users },
          { id: "admin-labs", label: "Lab Partners & Tests", icon: FlaskConical },
          { id: "admin-payments", label: "Payments & Revenue", icon: CreditCard },
          { id: "admin-audit", label: "Audit & Compliance Logs", icon: FileSearch }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            zIndex: 40,
            backdropFilter: "blur(2px)"
          }}
          className="mobile-backdrop"
        />
      )}

      <aside
        style={{
          width: "260px",
          backgroundColor: "var(--white)",
          borderRight: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          minHeight: "calc(100vh - 80px)",
          padding: "20px 14px",
          transition: "transform var(--transition-normal)",
          zIndex: 45
        }}
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", padding: "0 8px" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--slate-400)" }}>
            Main Menu
          </span>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-icon mobile-close-btn"
            style={{ width: "28px", height: "28px" }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                  color: isActive ? "var(--primary-dark)" : "var(--navy-700)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all var(--transition-fast)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon
                    size={18}
                    style={{
                      color: isActive ? "var(--primary)" : "var(--slate-400)",
                      flexShrink: 0
                    }}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    style={{
                      background: isActive ? "var(--primary)" : "var(--slate-200)",
                      color: isActive ? "#ffffff" : "var(--navy-800)",
                      padding: "2px 7px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.725rem",
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Doctor Verification Warning Badge in Sidebar if unverified */}
        {role === "doctor" && currentUser.verificationStatus === "PENDING" && (
          <div
            style={{
              padding: "12px",
              background: "#fffbeb",
              border: "1px solid #fde68a",
              borderRadius: "var(--radius-md)",
              marginBottom: "16px",
              fontSize: "0.775rem",
              color: "#92400e"
            }}
          >
            <strong>License Under Review:</strong> Your credentials are being validated by the admin desk. Prescription signing is locked until verification.
          </div>
        )}

        {/* Patient Emergency Helpline Widget */}
        {role === "patient" && (
          <div
            style={{
              padding: "14px",
              background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
              border: "1px solid #bbf7d0",
              borderRadius: "var(--radius-md)",
              fontSize: "0.785rem",
              color: "#166534"
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={14} style={{ color: "#16a34a" }} />
              24/7 Medical Support
            </div>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#15803d" }}>
              Toll-Free Helpline: <strong>1800-TELE-CARE</strong>
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
