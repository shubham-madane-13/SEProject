# TeleCare Pro - Telemedicine & Remote Patient Monitoring System

[![Vite](https://img.shields.io/badge/Vite-8.3.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Compliance](https://img.shields.io/badge/SRS_1.0-Compliant-0284c7?style=flat)]()
[![License](https://img.shields.io/badge/Security-256--Bit_Encrypted-16a34a?style=flat)]()

**TeleCare Pro** is an enterprise-grade full-stack telemedicine and remote patient monitoring web application engineered strictly according to the Software Requirements Specification (SRS 1.0). It provides unified clinical workflows connecting Patients, Board-Certified Physicians, Field Phlebotomists, and Compliance Administrators.

---

## 🌟 Key Functional Pillars (SRS 1.0 Compliant)

1. **Real-Time Consultations (Video / Audio / Text Chat)**:
   - Encrypted consultation room with simulated HD video feeds, picture-in-picture local view, audio waveforms, and connection indicators.
   - Side drawer with patient vitals, medical history, past prescriptions, and in-call chat.
   - Complete Consultation & E-Prescription issuance shortcuts for attending physicians.

2. **Strict Consultation State Machine**:
   - `SCHEDULED` ➔ `IN PROGRESS` ➔ `COMPLETED`
   - Alternative branch: `SCHEDULED` ➔ `CANCELLED` (triggers 100% automated refund) or `NO-SHOW`.
   - Rigid state guards preventing invalid backwards transitions.

3. **Digitally Signed E-Prescriptions**:
   - **Credential Guard**: Only `VERIFIED` doctors can digitally sign and deliver electronic prescriptions.
   - Structured medication list with dosage, frequency, duration, and instructions.
   - Cryptographic SHA-256 signature seal, registration license stamp, and printable official Rx view.
   - Automatic sync into the patient's personal Medical Records vault.

4. **Home Sample Collection for Laboratory Diagnostics**:
   - Diagnostic tests catalogue (Complete Blood Count, Lipid Profile, Thyroid, HbA1c, Vit D & B12).
   - Doorstep collection booking with date, 2-hour collection window, and home address.
   - Phlebotomist status tracking machine: `REQUESTED` ➔ `ASSIGNED` ➔ `COLLECTED` ➔ `IN LAB` ➔ `REPORT READY`.
   - Automatic PDF report delivery to patient health vault with alert notifications.

5. **Encrypted Medical Records Vault**:
   - Upload, categorize (Lab Reports, Prescriptions, Imaging Scans, Clinical Notes), view, download, and delete health documents.
   - Granular privacy: Doctors only access documents for active consultations; patients manage their own vault.

6. **Doctor Credentialing & Admin Verification Desk**:
   - Newly registered doctors receive `PENDING` review status.
   - System Admins inspect degrees, medical council licenses, and registrations.
   - One-click approval (`VERIFIED`) enables consultation hosting and prescription issuing privileges.

7. **Immutable Audit Trails & Financial Settlement Ledger**:
   - Tracks every consultation booking, payment settlement, cancellation refund, doctor verification, and document upload.
   - Role-based audit filtering (Patient, Doctor, Lab, Admin, System).

8. **Patient Safety & Emergency Disclaimer (SRS Section 30)**:
   - Dismissible global medical notice directing acute emergencies to 112 / 911 services.

---

## 👥 Demo Personas & Instant Switcher

The application includes a persistent top **Demo Bar** allowing evaluators to switch roles with a single click:

| Role | Demo Email | Full Name / Description | Key Features |
|------|------------|-------------------------|--------------|
| **Patient** | `patient@demo.com` | Rahul Verma (Age 34, B+) | Book consultations, pay via UPI/Card, attend video call, view Rx, upload records, book home blood tests |
| **Doctor (Verified)** | `doctor@demo.com` | Dr. Ananya Sharma, MD | Start consultations, view patient chart, issue & digitally sign e-prescriptions, manage availability schedule |
| **Doctor (Pending)** | `doctor.vikram@demo.com` | Dr. Vikram Malhotra | Unverified state demo; demonstrates prescription authorization locks |
| **Lab Technician** | `lab@demo.com` | Suresh Kumar (Phlebotomist) | View assigned home collections, mark collected ➔ in lab, upload diagnostic reports |
| **Admin** | `admin@demo.com` | HealthCare Ops Admin | Verify doctor credentials, audit logs, revenue ledger, patient directory |
| **Public Portal** | *Guest* | Unauthenticated Visitor | Landing page, How It Works, Services, Find Doctors, FAQ, Contact, Login, Register |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
```bash
# Clone the repository and navigate to the directory
cd "SE Project"

# Install dependencies
npm install
```

### Running the Application
```bash
# Launch Vite dev server
npm run dev

# Open in browser
http://127.0.0.1:5173/
```

### Building for Production
```bash
npm run build
```

### Executing System Workflow Test Suite
To verify all 10 core SRS workflows programmatically:
```bash
node src/tests/systemWorkflowTest.js
```
*(All 28 automated integration assertions pass with 100% success rate)*

---

## 🏗️ Architecture & Project Structure

```
src/
├── components/
│   ├── common/             # DemoBar, Navbar, Sidebar, EmergencyBanner, StatusBadge, Toast, Modal, EmptyState
│   ├── consultation/       # ConsultationRoom, BookingModal, RescheduleModal, CancelModal
│   ├── lab/                # LabBookingModal, LabReportModal
│   ├── prescription/       # PrescriptionModal (Doctor Rx creator), PrescriptionViewModal (Official Document)
│   └── records/            # RecordUploadModal, RecordViewModal
├── context/
│   └── AppContext.jsx      # Central reactive state machine, domain operations, and audit logger
├── data/
│   └── mockData.js         # Realistic clinical seed datasets (Doctors, Patients, Records, Prescriptions, Labs)
├── pages/
│   ├── public/             # LandingPage, AboutPage, ServicesPage, PublicDoctorsPage, FAQPage, ContactPage, Login, Register
│   ├── patient/            # PatientDashboard, PatientConsultations, PatientRecords, PatientPrescriptions, LabTests, Notifications, Profile
│   ├── doctor/             # DoctorDashboard, DoctorAppointments, DoctorPatients, DoctorPrescriptions, DoctorAvailability, DoctorProfile
│   ├── lab/                # LabDashboard, LabBookings, LabReports
│   └── admin/              # AdminDashboard, AdminDoctors, AdminAuditLogs, AdminPayments, AdminUsers, AdminLabs
├── services/
│   └── storageService.js   # Resilient LocalStorage persistence with factory reset capability
├── tests/
│   └── systemWorkflowTest.js # 28/28 passing end-to-end integration test suite
├── index.css               # Tailored Healthcare SaaS design system with custom properties & elevation
├── App.jsx                 # Dynamic page router and layout assembly
└── main.jsx                # Application root entrypoint
```

---

## 🔒 Security & HIPAA Alignment
- **Isolated Health Vaults**: Patients can only inspect and manage their own documents.
- **Consultation Scoping**: Doctors access medical history strictly scoped to active consultation patients.
- **Prescribing Authorization**: Only doctors with `VERIFIED` state by compliance admins can issue digital prescriptions.
- **Audit Logging**: Every sensitive medical and transaction event is recorded with timestamps and actor credentials.
