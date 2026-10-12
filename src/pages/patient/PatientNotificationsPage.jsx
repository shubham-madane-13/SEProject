// ==========================================================================
// PatientNotificationsPage - Comprehensive Notifications & Reminders Center
// (SRS Section 17 & 18 Compliant)
// ==========================================================================

import React from "react";
import { useApp } from "../../context/AppContext";
import EmptyState from "../../components/common/EmptyState";
import { Bell, CheckCircle2, Clock, Calendar, FileText, FlaskConical } from "lucide-react";

export default function PatientNotificationsPage() {
  const {
    notifications,
    currentUser,
    markNotificationRead,
    markAllNotificationsRead,
    navigateTo
  } = useApp();

  const myNotifications = notifications.filter(
    (n) => currentUser && (n.role === currentUser.role || n.userId === currentUser.id)
  );

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "1.9rem", color: "var(--navy-900)", margin: 0 }}>Notification Center</h1>
          <p style={{ color: "var(--slate-600)", fontSize: "0.95rem", marginTop: "4px" }}>
            Real-time updates on appointment reminders, lab reports, and doctor e-prescriptions.
          </p>
        </div>

        {myNotifications.some((n) => !n.read) && (
          <button className="btn btn-outline btn-sm" onClick={markAllNotificationsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      {myNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="You are completely caught up with your clinical updates and appointment alerts."
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {myNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.link) navigateTo(n.link);
              }}
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-lg)",
                background: n.read ? "var(--white)" : "var(--primary-subtle)",
                border: "1px solid",
                borderColor: n.read ? "var(--border-color)" : "#bae6fd",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                display: "flex",
                gap: "14px",
                alignItems: "flex-start"
              }}
              className="card-hover"
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: n.read ? "var(--slate-100)" : "var(--primary)",
                  color: n.read ? "var(--slate-600)" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <Bell size={18} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--navy-900)" }}>
                    {n.title}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--slate-400)" }}>
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--navy-700)", lineHeight: 1.45 }}>
                  {n.message}
                </p>

                {n.link && (
                  <span style={{ fontSize: "0.775rem", color: "var(--primary)", fontWeight: 600, marginTop: "6px", display: "inline-block" }}>
                    View Details →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
