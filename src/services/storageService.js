// ==========================================================================
// Storage Service - Resilient LocalStorage Persistence Layer
// ==========================================================================

import {
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_LAB_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from "../data/mockData";

const KEYS = {
  DOCTORS: "telecare_doctors_v1",
  PATIENTS: "telecare_patients_v1",
  CONSULTATIONS: "telecare_consultations_v1",
  RECORDS: "telecare_records_v1",
  PRESCRIPTIONS: "telecare_prescriptions_v1",
  LAB_BOOKINGS: "telecare_lab_bookings_v1",
  NOTIFICATIONS: "telecare_notifications_v1",
  AUDIT_LOGS: "telecare_audit_logs_v1",
  CURRENT_USER: "telecare_current_user_v1"
};

function getStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading localStorage for key ${key}:`, err);
    return fallback;
  }
}

function setStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage for key ${key}:`, err);
  }
}

export const storageService = {
  loadInitialState: () => {
    return {
      doctors: getStored(KEYS.DOCTORS, INITIAL_DOCTORS),
      patients: getStored(KEYS.PATIENTS, INITIAL_PATIENTS),
      consultations: getStored(KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS),
      records: getStored(KEYS.RECORDS, INITIAL_MEDICAL_RECORDS),
      prescriptions: getStored(KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS),
      labBookings: getStored(KEYS.LAB_BOOKINGS, INITIAL_LAB_BOOKINGS),
      notifications: getStored(KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS),
      auditLogs: getStored(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS),
      currentUser: getStored(KEYS.CURRENT_USER, {
        role: "patient",
        id: "pat-1",
        email: "patient@demo.com",
        name: "Rahul Verma"
      })
    };
  },

  saveDoctors: (data) => setStored(KEYS.DOCTORS, data),
  savePatients: (data) => setStored(KEYS.PATIENTS, data),
  saveConsultations: (data) => setStored(KEYS.CONSULTATIONS, data),
  saveRecords: (data) => setStored(KEYS.RECORDS, data),
  savePrescriptions: (data) => setStored(KEYS.PRESCRIPTIONS, data),
  saveLabBookings: (data) => setStored(KEYS.LAB_BOOKINGS, data),
  saveNotifications: (data) => setStored(KEYS.NOTIFICATIONS, data),
  saveAuditLogs: (data) => setStored(KEYS.AUDIT_LOGS, data),
  saveCurrentUser: (data) => setStored(KEYS.CURRENT_USER, data),

  resetAllData: () => {
    try {
      localStorage.removeItem(KEYS.DOCTORS);
      localStorage.removeItem(KEYS.PATIENTS);
      localStorage.removeItem(KEYS.CONSULTATIONS);
      localStorage.removeItem(KEYS.RECORDS);
      localStorage.removeItem(KEYS.PRESCRIPTIONS);
      localStorage.removeItem(KEYS.LAB_BOOKINGS);
      localStorage.removeItem(KEYS.NOTIFICATIONS);
      localStorage.removeItem(KEYS.AUDIT_LOGS);
      localStorage.removeItem(KEYS.CURRENT_USER);
    } catch (e) {
      console.warn("Error resetting storage", e);
    }
  }
};
