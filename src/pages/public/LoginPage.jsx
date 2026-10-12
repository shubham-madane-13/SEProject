// ==========================================================================
// LoginPage - Role-Based Authentication & Instant Demo Logins
// (SRS Section 6 & 48 Compliant)
// ==========================================================================

import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DEMO_ACCOUNTS } from "../../data/mockData";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Stethoscope,
  FlaskConical,
  Shield,
  Activity
} from "lucide-react";

export default function LoginPage() {
  const { loginUser, navigateTo } = useApp();

  const [email, setEmail] = useState("patient@demo.com");
  const [password, setPassword] = useState("••••••••");
  const [roleHint, setRoleHint] = useState("patient");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    setTimeout(() => {
      setIsLoading(false);
      const res = loginUser(email, password, roleHint);
      if (!res.success) {
        setErrorMessage("Incorrect email or password. Please use one of the demo credentials.");
      }
    }, 600);
  };

  const handleQuickDemoSelect = (acc) => {
    setEmail(acc.email);
    setPassword("password123");
    setRoleHint(acc.role);
    loginUser(acc.email, "password123", acc.role);
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "40px auto", padding: "0 20px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "40px",
          background: "var(--white)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-xl)",
          border: "1px solid var(--border-color)",
          overflow: "hidden"
        }}
        className="login-container"
      >
        {/* Left: Login Form */}
        <div style={{ padding: "48px 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
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
            <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--navy-900)" }}>
              TeleCare<span style={{ color: "var(--primary)" }}>Pro</span>
            </span>
          </div>

          <h2 style={{ fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: "8px" }}>
            Welcome Back
          </h2>
          <p style={{ color: "var(--slate-500)", fontSize: "0.9rem", marginBottom: "28px" }}>
            Sign in to access your consultations, medical records, or professional dashboard.
          </p>

          {errorMessage && (
            <div style={{ padding: "12px", background: "#fef2f2", color: "#dc2626", borderRadius: "var(--radius-md)", fontSize: "0.85rem", marginBottom: "20px", border: "1px solid #fecaca" }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email or Mobile Number:</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--slate-400)" }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: "38px" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Account Password:</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--slate-400)" }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: "38px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "12px", height: "46px" }}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating Session..." : "Sign In to TeleCare Pro"} <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.85rem", color: "var(--slate-600)" }}>
            Don't have an account yet?{" "}
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); navigateTo("register"); }}
              style={{ fontWeight: 700, color: "var(--primary)" }}
            >
              Register here
            </a>
          </div>
        </div>

        {/* Right: Instant One-Click Demo Personas (SRS Section 48) */}
        <div
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            padding: "48px 36px",
            borderLeft: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <ShieldCheck size={18} style={{ color: "var(--secondary)" }} />
            <h3 style={{ fontSize: "1.1rem", color: "var(--navy-900)" }}>Instant Demo Accounts</h3>
          </div>
          <p style={{ fontSize: "0.8rem", color: "var(--slate-500)", marginBottom: "20px" }}>
            Click any role below to instantly log in and evaluate its specific workflows:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {DEMO_ACCOUNTS.map((acc) => {
              let Icon = User;
              if (acc.role === "doctor") Icon = Stethoscope;
              if (acc.role === "lab") Icon = FlaskConical;
              if (acc.role === "admin") Icon = Shield;

              return (
                <div
                  key={acc.role}
                  onClick={() => handleQuickDemoSelect(acc)}
                  style={{
                    background: "var(--white)",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-color)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                    boxShadow: "var(--shadow-xs)"
                  }}
                  className="card-hover"
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>
                      <Icon size={16} style={{ color: "var(--primary)" }} />
                      {acc.label}
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: 600 }}>Click to Login →</span>
                  </div>
                  <div style={{ fontSize: "0.775rem", color: "var(--slate-500)" }}>
                    {acc.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
