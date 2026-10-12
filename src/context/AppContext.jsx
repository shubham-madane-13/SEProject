// ==========================================================================
// Central AppContext - TeleCare Pro State & Domain Service Machine
// ==========================================================================

import React, { createContext, useContext, useState, useEffect } from "react";
import { storageService } from "../services/storageService";
import { LAB_TESTS_CATALOG } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const initial = storageService.loadInitialState();

  const [doctors, setDoctors] = useState(initial.doctors);
  const [patients, setPatients] = useState(initial.patients);
  const [consultations, setConsultations] = useState(initial.consultations);
  const [records, setRecords] = useState(initial.records);
  const [prescriptions, setPrescriptions] = useState(initial.prescriptions);
  const [labBookings, setLabBookings] = useState(initial.labBookings);
  const [notifications, setNotifications] = useState(initial.notifications);
  const [auditLogs, setAuditLogs] = useState(initial.auditLogs);
  const [currentUser, setCurrentUser] = useState(initial.currentUser);

  // Navigation State
  const [activePage, setActivePage] = useState("landing");
  const [pageParams, setPageParams] = useState({});
  const [activeConsultationRoomId, setActiveConsultationRoomId] = useState(null);

  // Global Toasts
  const [toasts, setToasts] = useState([]);

  // Persistence side effects
  useEffect(() => { storageService.saveDoctors(doctors); }, [doctors]);
  useEffect(() => { storageService.savePatients(patients); }, [patients]);
  useEffect(() => { storageService.saveConsultations(consultations); }, [consultations]);
  useEffect(() => { storageService.saveRecords(records); }, [records]);
  useEffect(() => { storageService.savePrescriptions(prescriptions); }, [prescriptions]);
  useEffect(() => { storageService.saveLabBookings(labBookings); }, [labBookings]);
  useEffect(() => { storageService.saveNotifications(notifications); }, [notifications]);
  useEffect(() => { storageService.saveAuditLogs(auditLogs); }, [auditLogs]);
  useEffect(() => { storageService.saveCurrentUser(currentUser); }, [currentUser]);

  // Toast Helper
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Logging Helper
  const logAudit = (action, entity, entityId, details, status = "SUCCESS") => {
    const newLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: new Date().toISOString(),
      userId: currentUser?.id || "guest",
      userName: currentUser?.name || "Guest User",
      userRole: currentUser?.role || "public",
      action,
      entity,
      entityId,
      details,
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Add Notification Helper
  const pushNotification = (userId, role, type, title, message, link = "") => {
    const newNotif = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`,
      userId,
      role,
      type,
      title,
      message,
      link,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Navigation Controller
  const navigateTo = (page, params = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Switch Role / Demo Quick-Access
  const switchRole = (role) => {
    if (role === "patient") {
      const p = patients.find((pat) => pat.email === "patient@demo.com") || patients[0];
      const user = { ...p, role: "patient" };
      setCurrentUser(user);
      setActiveConsultationRoomId(null);
      navigateTo("patient-dashboard");
      addToast(`Switched to Patient view: ${p.name}`, "success");
    } else if (role === "doctor") {
      const d = doctors.find((doc) => doc.id === "doc-1") || doctors[0];
      const user = { ...d, role: "doctor" };
      setCurrentUser(user);
      setActiveConsultationRoomId(null);
      navigateTo("doctor-dashboard");
      addToast(`Switched to Doctor view: ${d.name} (${d.verificationStatus})`, "success");
    } else if (role === "doctor-pending") {
      const d = doctors.find((doc) => doc.verificationStatus === "PENDING") || doctors[3];
      const user = { ...d, role: "doctor" };
      setCurrentUser(user);
      setActiveConsultationRoomId(null);
      navigateTo("doctor-dashboard");
      addToast(`Switched to Unverified Doctor view: ${d.name} (PENDING)`, "warning");
    } else if (role === "lab") {
      const user = {
        id: "phleb-01",
        name: "Suresh Kumar",
        email: "lab@demo.com",
        role: "lab",
        title: "Senior Phlebotomist & Lab Associate"
      };
      setCurrentUser(user);
      setActiveConsultationRoomId(null);
      navigateTo("lab-dashboard");
      addToast("Switched to Lab Technician / Phlebotomist view", "success");
    } else if (role === "admin") {
      const user = {
        id: "admin-1",
        name: "HealthCare Ops Admin",
        email: "admin@demo.com",
        role: "admin"
      };
      setCurrentUser(user);
      setActiveConsultationRoomId(null);
      navigateTo("admin-dashboard");
      addToast("Switched to Admin / Support Staff view", "success");
    } else if (role === "public") {
      setCurrentUser(null);
      setActiveConsultationRoomId(null);
      navigateTo("landing");
      addToast("Signed out to Public Portal", "info");
    }
  };

  // Auth Functions
  const loginUser = (email, password, roleHint) => {
    // Demo accounts check
    if (email === "patient@demo.com" || roleHint === "patient") {
      switchRole("patient");
      return { success: true };
    }
    if (email === "doctor@demo.com" || roleHint === "doctor") {
      switchRole("doctor");
      return { success: true };
    }
    if (email === "lab@demo.com" || roleHint === "lab") {
      switchRole("lab");
      return { success: true };
    }
    if (email === "admin@demo.com" || roleHint === "admin") {
      switchRole("admin");
      return { success: true };
    }

    // Generic match
    const existingPatient = patients.find((p) => p.email.toLowerCase() === email.toLowerCase());
    if (existingPatient) {
      setCurrentUser({ ...existingPatient, role: "patient" });
      navigateTo("patient-dashboard");
      addToast(`Welcome back, ${existingPatient.name}`, "success");
      return { success: true };
    }

    const existingDoctor = doctors.find((d) => d.id === email || d.name.toLowerCase().includes(email.toLowerCase()));
    if (existingDoctor) {
      setCurrentUser({ ...existingDoctor, role: "doctor" });
      navigateTo("doctor-dashboard");
      addToast(`Welcome back, ${existingDoctor.name}`, "success");
      return { success: true };
    }

    // Default fallback
    switchRole("patient");
    return { success: true };
  };

  const registerUser = (formData) => {
    const { role, name, email, phone, specialty, qualification, licenseNumber } = formData;
    if (role === "doctor") {
      const newDoc = {
        id: `doc-${Date.now().toString().slice(-4)}`,
        name,
        email,
        phone: phone || "+91 90000 00000",
        specialty: specialty || "General Medicine",
        qualification: qualification || "MBBS, MD",
        licenseNumber: licenseNumber || "MCI-NEW-2026",
        experienceYears: 5,
        consultationFee: 600,
        rating: 5.0,
        reviewCount: 0,
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
        bio: `Registered physician in ${specialty}. Credentials under review by compliance desk.`,
        verificationStatus: "PENDING",
        hospital: "TeleCare Network",
        languages: ["English"],
        modes: ["video", "audio", "chat"],
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        workingHours: { start: "09:00", end: "17:00" },
        availableSlots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"],
        blockedSlots: []
      };
      setDoctors((prev) => [newDoc, ...prev]);
      setCurrentUser({ ...newDoc, role: "doctor" });
      logAudit("DOCTOR_REGISTERED", "Doctor", newDoc.id, `Doctor ${name} registered. Status: PENDING.`);
      pushNotification("admin-1", "admin", "DOCTOR_VERIFICATION_PENDING", "New Doctor Registration", `${name} (${specialty}) has registered and requires license verification.`);
      navigateTo("doctor-dashboard");
      addToast("Doctor registered successfully. Account is pending verification.", "warning");
      return { success: true };
    } else {
      const newPatient = {
        id: `pat-${Date.now().toString().slice(-4)}`,
        name,
        email,
        phone: phone || "+91 98000 00000",
        age: 30,
        gender: "Not specified",
        bloodGroup: "O+",
        address: formData.address || "Bengaluru, Karnataka",
        allergies: "None reported",
        chronicConditions: "None",
        emergencyContact: "Family (+91 99000 00000)",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
      };
      setPatients((prev) => [newPatient, ...prev]);
      setCurrentUser({ ...newPatient, role: "patient" });
      logAudit("PATIENT_REGISTERED", "Patient", newPatient.id, `Patient ${name} registered on portal.`);
      navigateTo("patient-dashboard");
      addToast(`Welcome to TeleCare Pro, ${name}!`, "success");
      return { success: true };
    }
  };

  const logoutUser = () => {
    switchRole("public");
  };

  // Consultation Operations
  const bookConsultation = (bookingData) => {
    const { doctorId, date, timeSlot, mode, reason, paymentMethod } = bookingData;
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) {
      addToast("Selected doctor is not found.", "error");
      return null;
    }

    const newId = `c-${Date.now().toString().slice(-5)}`;
    const newConsultation = {
      id: newId,
      patientId: currentUser.id,
      patientName: currentUser.name,
      doctorId: doc.id,
      doctorName: doc.name,
      specialty: doc.specialty,
      date,
      timeSlot,
      mode,
      status: "SCHEDULED",
      fee: doc.consultationFee,
      paymentStatus: "PAID",
      paymentMethod: paymentMethod || "UPI",
      paymentId: `PAY-${(paymentMethod || "UPI").toUpperCase()}-${Math.floor(Math.random() * 900000 + 100000)}`,
      reason: reason || "General Consultation",
      notes: "",
      prescriptionId: null,
      createdAt: new Date().toISOString()
    };

    setConsultations((prev) => [newConsultation, ...prev]);
    logAudit("BOOKED_CONSULTATION", "Consultation", newId, `Consultation booked with ${doc.name} for ${date} at ${timeSlot} (${mode}).`);
    pushNotification(
      currentUser.id,
      "patient",
      "CONSULTATION_CONFIRMED",
      "Consultation Confirmed",
      `Your ${mode} consultation with ${doc.name} on ${date} at ${timeSlot} is confirmed. Unique ID: #${newId}.`
    );
    pushNotification(
      doc.id,
      "doctor",
      "NEW_APPOINTMENT",
      "New Appointment Booked",
      `Patient ${currentUser.name} booked a ${mode} consultation on ${date} at ${timeSlot}.`
    );
    addToast("Consultation booked & payment confirmed!", "success");
    return newConsultation;
  };

  const startConsultation = (consultationId) => {
    const cons = consultations.find((c) => c.id === consultationId);
    if (!cons) return;
    if (cons.status !== "SCHEDULED" && cons.status !== "IN PROGRESS") {
      addToast(`Cannot start consultation with status: ${cons.status}`, "warning");
      return;
    }

    setConsultations((prev) =>
      prev.map((c) => (c.id === consultationId ? { ...c, status: "IN PROGRESS" } : c))
    );
    setActiveConsultationRoomId(consultationId);
    logAudit("STARTED_CONSULTATION", "Consultation", consultationId, `Consultation started in real-time room.`);
    addToast("Entered consultation room. Live session in progress.", "info");
  };

  const completeConsultation = (consultationId, notes = "") => {
    const cons = consultations.find((c) => c.id === consultationId);
    if (!cons) return;

    setConsultations((prev) =>
      prev.map((c) => (c.id === consultationId ? { ...c, status: "COMPLETED", notes: notes || c.notes } : c))
    );
    setActiveConsultationRoomId(null);
    logAudit("COMPLETED_CONSULTATION", "Consultation", consultationId, `Doctor completed consultation #${consultationId}.`);
    pushNotification(
      cons.patientId,
      "patient",
      "CONSULTATION_COMPLETED",
      "Consultation Completed",
      `Your consultation with ${cons.doctorName} is completed. You can review notes and e-prescriptions.`
    );
    addToast("Consultation marked as COMPLETED.", "success");
  };

  const cancelConsultation = (consultationId, reason = "Patient requested cancellation") => {
    const cons = consultations.find((c) => c.id === consultationId);
    if (!cons) return;
    if (cons.status === "COMPLETED") {
      addToast("Completed consultations cannot be cancelled.", "error");
      return;
    }

    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId
          ? { ...c, status: "CANCELLED", paymentStatus: "REFUNDED", notes: `Cancelled: ${reason}` }
          : c
      )
    );
    logAudit("CANCELLED_CONSULTATION", "Consultation", consultationId, `Consultation cancelled. Reason: ${reason}. Refund processed.`);
    pushNotification(
      cons.patientId,
      "patient",
      "CONSULTATION_CANCELLED",
      "Consultation Cancelled",
      `Your consultation #${consultationId} has been cancelled. 100% refund initiated.`
    );
    pushNotification(
      cons.doctorId,
      "doctor",
      "CONSULTATION_CANCELLED",
      "Consultation Cancelled",
      `Consultation #${consultationId} by ${cons.patientName} was cancelled.`
    );
    addToast("Consultation cancelled. Refund processed.", "info");
  };

  const rescheduleConsultation = (consultationId, newDate, newSlot) => {
    const cons = consultations.find((c) => c.id === consultationId);
    if (!cons) return;
    if (cons.status !== "SCHEDULED") {
      addToast("Only scheduled consultations can be rescheduled.", "error");
      return;
    }

    setConsultations((prev) =>
      prev.map((c) =>
        c.id === consultationId ? { ...c, date: newDate, timeSlot: newSlot } : c
      )
    );
    logAudit("RESCHEDULED_CONSULTATION", "Consultation", consultationId, `Rescheduled to ${newDate} at ${newSlot}.`);
    pushNotification(
      cons.patientId,
      "patient",
      "CONSULTATION_RESCHEDULED",
      "Consultation Rescheduled",
      `Your consultation #${consultationId} is rescheduled to ${newDate} at ${newSlot}.`
    );
    pushNotification(
      cons.doctorId,
      "doctor",
      "CONSULTATION_RESCHEDULED",
      "Appointment Rescheduled",
      `Patient ${cons.patientName} rescheduled consultation #${consultationId} to ${newDate} at ${newSlot}.`
    );
    addToast("Consultation successfully rescheduled!", "success");
  };

  // E-Prescription Operations
  const createPrescription = (prescriptionData) => {
    const currentDoc = doctors.find((d) => d.id === currentUser?.id);
    // Security check: Only verified doctors can issue prescriptions
    if (currentDoc && currentDoc.verificationStatus !== "VERIFIED") {
      addToast("Prescription authorization failed: Only VERIFIED doctors can issue e-prescriptions.", "error");
      return false;
    }

    const newId = `rx-${Date.now().toString().slice(-4)}`;
    const hash = `SHA256:${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`;

    const newPrescription = {
      id: newId,
      ...prescriptionData,
      doctorSignature: {
        signed: true,
        signatureText: `${currentUser?.name || "Dr. Attending Physician"}`,
        signedAt: new Date().toISOString(),
        digitalHash: hash
      }
    };

    setPrescriptions((prev) => [newPrescription, ...prev]);

    // Update Consultation if attached
    if (prescriptionData.consultationId) {
      setConsultations((prev) =>
        prev.map((c) =>
          c.id === prescriptionData.consultationId ? { ...c, prescriptionId: newId } : c
        )
      );
    }

    // Automatically add to patient's Medical Records
    const newRecord = {
      id: `rec-${Date.now().toString().slice(-4)}`,
      patientId: prescriptionData.patientId,
      name: `E-Prescription - ${prescriptionData.diagnosis || "Medical Advice"}`,
      type: "Prescription",
      uploadDate: new Date().toISOString().split("T")[0],
      fileSize: "0.8 MB",
      fileType: "PDF",
      uploadedBy: currentUser?.name || "Doctor",
      notes: `Digitally signed by ${currentUser?.name}. Diagnosis: ${prescriptionData.diagnosis}`,
      verified: true
    };
    setRecords((prev) => [newRecord, ...prev]);

    logAudit("CREATED_PRESCRIPTION", "EPrescription", newId, `Doctor ${currentUser?.name} digitally signed prescription #${newId} for ${prescriptionData.patientName}.`);
    pushNotification(
      prescriptionData.patientId,
      "patient",
      "PRESCRIPTION_ISSUED",
      "New E-Prescription Available",
      `Dr. ${currentUser?.name} has issued your digitally signed prescription #${newId}.`
    );
    addToast("E-Prescription digitally signed and delivered to patient vault!", "success");
    return true;
  };

  // Lab Home Collection Booking
  const bookLabCollection = (labData) => {
    const { testId, collectionAddress, collectionDate, collectionTimeSlot, paymentMethod } = labData;
    const test = LAB_TESTS_CATALOG.find((t) => t.id === testId);
    if (!test) {
      addToast("Selected test not found.", "error");
      return null;
    }

    const newId = `lb-${Date.now().toString().slice(-4)}`;
    const newBooking = {
      id: newId,
      patientId: currentUser.id,
      patientName: currentUser.name,
      patientPhone: currentUser.phone || "+91 98765 43210",
      testId: test.id,
      testName: test.name,
      testCategory: test.category,
      price: test.price,
      collectionAddress,
      collectionDate,
      collectionTimeSlot,
      assignedPhlebotomist: {
        name: "Suresh Kumar",
        phone: "+91 98451 98765",
        id: "phleb-01"
      },
      status: "ASSIGNED", // REQUESTED -> ASSIGNED -> COLLECTED -> IN LAB -> REPORT READY -> CANCELLED
      paymentStatus: "PAID",
      paymentMethod: paymentMethod || "UPI",
      paymentId: `PAY-LAB-${Math.floor(Math.random() * 90000 + 10000)}`,
      sampleDetails: test.sampleType,
      reportUrl: null,
      reportDate: null,
      reportFindings: "",
      createdAt: new Date().toISOString()
    };

    setLabBookings((prev) => [newBooking, ...prev]);
    logAudit("BOOKED_LAB_COLLECTION", "LabBooking", newId, `Home collection booked for ${test.name} on ${collectionDate} (${collectionTimeSlot}).`);
    pushNotification(
      currentUser.id,
      "patient",
      "LAB_BOOKING_CONFIRMED",
      "Lab Home Collection Confirmed",
      `Phlebotomist Suresh Kumar assigned for ${test.name} collection on ${collectionDate} (${collectionTimeSlot}).`
    );
    pushNotification(
      "phleb-01",
      "lab",
      "NEW_SAMPLE_ASSIGNMENT",
      "New Home Sample Assignment",
      `Collection requested for ${currentUser.name} at ${collectionAddress} on ${collectionDate}.`
    );
    addToast("Home sample collection booked successfully!", "success");
    return newBooking;
  };

  // Lab Phlebotomist Status Machine
  const updateLabStatus = (bookingId, newStatus, findings = "") => {
    const b = labBookings.find((x) => x.id === bookingId);
    if (!b) return;

    setLabBookings((prev) =>
      prev.map((item) => {
        if (item.id === bookingId) {
          const updated = { ...item, status: newStatus };
          if (newStatus === "REPORT READY") {
            updated.reportDate = new Date().toISOString().split("T")[0];
            updated.reportFindings = findings || `Diagnostic tests completed for ${item.testName}. All automated parameters verified by Chief Pathologist.`;
            updated.reportUrl = `/reports/${item.id}-report.pdf`;
          }
          return updated;
        }
        return item;
      })
    );

    // If report becomes ready, automatically deposit into patient's Medical Records!
    if (newStatus === "REPORT READY") {
      const newRec = {
        id: `rec-${Date.now().toString().slice(-4)}`,
        patientId: b.patientId,
        name: `Diagnostic Report: ${b.testName}`,
        type: "Lab Report",
        uploadDate: new Date().toISOString().split("T")[0],
        fileSize: "1.6 MB",
        fileType: "PDF",
        uploadedBy: "Lab Partner (Suresh Kumar, Phlebotomist)",
        notes: findings || `Automated analysis for ${b.testName}. Normal reference profile.`,
        verified: true
      };
      setRecords((prev) => [newRec, ...prev]);
      pushNotification(
        b.patientId,
        "patient",
        "LAB_REPORT_READY",
        "Laboratory Report is Ready",
        `Your test report for ${b.testName} has been uploaded and added to your health records.`
      );
    }

    logAudit("UPDATED_LAB_STATUS", "LabBooking", bookingId, `Status updated to ${newStatus} for booking #${bookingId}.`);
    addToast(`Lab booking status updated to ${newStatus}.`, "success");
  };

  // Medical Record Management
  const uploadMedicalRecord = (recordData) => {
    const newRecord = {
      id: `rec-${Date.now().toString().slice(-4)}`,
      patientId: currentUser.id,
      uploadDate: new Date().toISOString().split("T")[0],
      fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      fileType: recordData.fileType || "PDF",
      uploadedBy: currentUser.name,
      verified: true,
      ...recordData
    };

    setRecords((prev) => [newRecord, ...prev]);
    logAudit("UPLOADED_RECORD", "MedicalRecord", newRecord.id, `Patient uploaded record: ${newRecord.name} (${newRecord.type}).`);
    addToast("Document uploaded securely to Medical Vault.", "success");
    return newRecord;
  };

  const deleteMedicalRecord = (recordId) => {
    const rec = records.find((r) => r.id === recordId);
    setRecords((prev) => prev.filter((r) => r.id !== recordId));
    logAudit("DELETED_RECORD", "MedicalRecord", recordId, `Deleted record: ${rec?.name || recordId}.`);
    addToast("Medical document deleted.", "info");
  };

  // Admin Doctor Verification
  const verifyDoctor = (doctorId, newStatus) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc) return;

    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, verificationStatus: newStatus } : d))
    );
    logAudit("DOCTOR_VERIFICATION_STATUS_CHANGED", "Doctor", doctorId, `Admin changed verification status of ${doc.name} to ${newStatus}.`);
    pushNotification(
      doctorId,
      "doctor",
      newStatus === "VERIFIED" ? "CREDENTIALS_APPROVED" : "CREDENTIALS_REJECTED",
      `Medical Credentials ${newStatus}`,
      `Your doctor profile verification status is now ${newStatus}. ${newStatus === "VERIFIED" ? "You may now conduct consultations and digitally issue e-prescriptions." : "Please contact compliance desk."}`
    );
    addToast(`Doctor ${doc.name} status updated to ${newStatus}.`, newStatus === "VERIFIED" ? "success" : "warning");
  };

  // Doctor Availability Update
  const updateDoctorAvailability = (doctorId, availabilityData) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === doctorId ? { ...d, ...availabilityData } : d))
    );
    logAudit("UPDATED_AVAILABILITY", "Doctor", doctorId, `Doctor updated working hours and slot schedule.`);
    addToast("Availability schedule updated.", "success");
  };

  // Notifications Controller
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast("All notifications marked as read.", "info");
  };

  // Reset Factory Data
  const resetDemoData = () => {
    storageService.resetAllData();
    window.location.reload();
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (currentUser ? n.role === currentUser.role || n.userId === currentUser.id : false)
  ).length;

  return (
    <AppContext.Provider
      value={{
        doctors,
        patients,
        consultations,
        records,
        prescriptions,
        labBookings,
        labTestsCatalog: LAB_TESTS_CATALOG,
        notifications,
        auditLogs,
        currentUser,
        unreadCount,
        activePage,
        pageParams,
        activeConsultationRoomId,
        toasts,
        addToast,
        removeToast,
        navigateTo,
        switchRole,
        loginUser,
        registerUser,
        logoutUser,
        bookConsultation,
        startConsultation,
        completeConsultation,
        cancelConsultation,
        rescheduleConsultation,
        createPrescription,
        bookLabCollection,
        updateLabStatus,
        uploadMedicalRecord,
        deleteMedicalRecord,
        verifyDoctor,
        updateDoctorAvailability,
        markNotificationRead,
        markAllNotificationsRead,
        resetDemoData,
        setActiveConsultationRoomId
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
