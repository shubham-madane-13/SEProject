// ==========================================================================
// Navbar - Header Component with Notifications & Navigation
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Activity,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Calendar,
  FileText
} from "lucide-react";

export default function Navbar({ onToggleSidebar }) {
  const {
    currentUser,
    activePage,
    navigateTo,
    logoutUser,
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter notifications relevant to current user
  const userNotifications = notifications.filter(
    (n) => currentUser && (n.role === currentUser.role || n.userId === currentUser.id)
  );

  const getPortalTitle = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case "patient": return "Patient Care Portal";
      case "doctor": return "Doctor Clinical Workspace";
      case "lab": return "Laboratory & Phlebotomy Hub";
      case "admin": return "Operations & Compliance Desk";
      default: return "Healthcare Portal";
    }
  };

  return (
    <header
      style={{
        backgroundColor: "var(--white)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)"
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Left Section: Logo & Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {currentUser && (
            <button
              onClick={onToggleSidebar}
              className="btn btn-ghost btn-icon"
              style={{ display: "flex" }}
              aria-label="Toggle navigation drawer"
            >
              <Menu size={20} />
            </button>
          )}

          <div
            onClick={() => navigateTo(currentUser ? `${currentUser.role}-dashboard` : "landing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                boxShadow: "0 4px 10px rgba(2, 132, 199, 0.3)"
              }}
            >
              <Activity size={22} />
            </div>
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--navy-900)", letterSpacing: "-0.03em" }}>
                TeleCare<span style={{ color: "var(--primary)" }}>Pro</span>
              </span>
              {currentUser && (
                <span
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    color: "var(--slate-500)",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em"
                  }}
                >
                  {getPortalTitle()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Public Navigation Links */}
        {!currentUser && (
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px"
            }}
            className="desktop-public-nav"
          >
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); navigateTo("landing"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "landing" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); navigateTo("about"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "about" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              How It Works
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); navigateTo("services"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "services" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              Services
            </a>
            <a
              href="#doctors"
              onClick={(e) => { e.preventDefault(); navigateTo("doctors"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "doctors" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              Doctors
            </a>
            <a
              href="#faq"
              onClick={(e) => { e.preventDefault(); navigateTo("faq"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "faq" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); navigateTo("contact"); }}
              style={{
                fontSize: "0.925rem",
                fontWeight: 600,
                color: activePage === "contact" ? "var(--primary)" : "var(--navy-700)"
              }}
            >
              Contact
            </a>
          </nav>
        )}

        {/* Right Section: Actions / Notifications / Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {!currentUser ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigateTo("login")}
              >
                Log In
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigateTo("register")}
              >
                Register
              </button>
            </div>
          ) : (
            <>
              {/* Notification Center Popover */}
              <div style={{ position: "relative" }}>
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  aria-label="View notifications"
                  style={{ position: "relative" }}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "6px",
                        right: "6px",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "#ef4444",
                        color: "#ffffff",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #ffffff"
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "48px",
                      width: "360px",
                      background: "var(--white)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-xl)",
                      border: "1px solid var(--border-color)",
                      zIndex: 200,
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        padding: "14px 18px",
                        background: "var(--slate-50)",
                        borderBottom: "1px solid var(--border-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>
                        Notifications ({userNotifications.length})
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--primary)",
                            fontSize: "0.775rem",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div style={{ maxHeight: "340px", overflowY: "auto" }}>
                      {userNotifications.length === 0 ? (
                        <div style={{ padding: "28px", textAlign: "center", color: "var(--slate-500)", fontSize: "0.85rem" }}>
                          No notifications at this time
                        </div>
                      ) : (
                        userNotifications.slice(0, 6).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              setShowNotifDropdown(false);
                              if (n.link) navigateTo(n.link);
                            }}
                            style={{
                              padding: "12px 18px",
                              borderBottom: "1px solid var(--border-light)",
                              backgroundColor: n.read ? "transparent" : "var(--primary-subtle)",
                              cursor: "pointer",
                              transition: "background var(--transition-fast)"
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                              <span style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--navy-900)" }}>
                                {n.title}
                              </span>
                              {!n.read && (
                                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--primary)" }} />
                              )}
                            </div>
                            <p style={{ fontSize: "0.775rem", color: "var(--slate-600)", lineHeight: "1.35", margin: 0 }}>
                              {n.message}
                            </p>
                            <span style={{ fontSize: "0.7rem", color: "var(--slate-400)", marginTop: "4px", display: "block" }}>
                              {new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Menu */}
              <div style={{ position: "relative" }}>
                <div
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    padding: "4px 8px",
                    borderRadius: "var(--radius-md)",
                    transition: "background var(--transition-fast)"
                  }}
                >
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                    alt={currentUser.name}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid var(--primary-light)"
                    }}
                  />
                  <div style={{ display: "none", md: "block", textAlign: "left" }}>
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--navy-900)", lineHeight: 1.2 }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: "0.725rem", color: "var(--slate-500)", textTransform: "capitalize" }}>
                      {currentUser.role}
                      {currentUser.role === "doctor" && currentUser.verificationStatus === "VERIFIED" && " ✓"}
                    </div>
                  </div>
                  <ChevronDown size={14} style={{ color: "var(--slate-400)" }} />
                </div>

                {showUserDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "48px",
                      width: "220px",
                      background: "var(--white)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-xl)",
                      border: "1px solid var(--border-color)",
                      zIndex: 200,
                      padding: "8px 0"
                    }}
                  >
                    <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border-light)" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--navy-900)" }}>{currentUser.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--slate-500)" }}>{currentUser.email}</div>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigateTo(currentUser.role === "patient" ? "profile" : `${currentUser.role}-profile`);
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        color: "var(--navy-800)",
                        cursor: "pointer"
                      }}
                    >
                      <User size={15} /> My Profile & Vitals
                    </button>

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        logoutUser();
                      }}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        fontSize: "0.85rem",
                        color: "#dc2626",
                        cursor: "pointer",
                        borderTop: "1px solid var(--border-light)"
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
