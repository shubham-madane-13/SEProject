// ==========================================================================
// TeleCare Pro - Seed Mock Dataset & Domain Entities (SRS Compliant)
// ==========================================================================

export const INITIAL_DOCTORS = [
  {
    id: "doc-1",
    name: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD (Internal Med), DM (Cardiology)",
    experienceYears: 12,
    consultationFee: 800,
    rating: 4.9,
    reviewCount: 148,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    bio: "Senior Consultant Interventional Cardiologist specializing in preventive cardiology, hypertension, coronary care, and heart failure management with over 12 years of clinical excellence.",
    verificationStatus: "VERIFIED",
    licenseNumber: "MCI-2012-84920",
    hospital: "Apollo Hospitals & TeleCare Network",
    languages: ["English", "Hindi"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    workingHours: { start: "09:00", end: "18:00" },
    availableSlots: [
      "09:00 AM", "10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM", "08:00 PM"
    ],
    blockedSlots: ["12:30 PM", "01:00 PM"]
  },
  {
    id: "doc-2",
    name: "Dr. Rajesh Menon",
    specialty: "General Medicine",
    qualification: "MBBS, MD (General Medicine)",
    experienceYears: 15,
    consultationFee: 500,
    rating: 4.8,
    reviewCount: 284,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    bio: "Senior Physician with comprehensive experience in adult chronic disease management, infectious diseases, metabolic disorders, and telemedicine consultation.",
    verificationStatus: "VERIFIED",
    licenseNumber: "MCI-2009-41235",
    hospital: "Fortis Healthcare",
    languages: ["English", "Hindi", "Malayalam"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: { start: "08:00", end: "16:00" },
    availableSlots: [
      "08:30 AM", "10:00 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"
    ],
    blockedSlots: ["12:00 PM"]
  },
  {
    id: "doc-3",
    name: "Dr. Priya Sundaram",
    specialty: "Dermatology",
    qualification: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    experienceYears: 8,
    consultationFee: 700,
    rating: 4.9,
    reviewCount: 96,
    avatar: "https://images.unsplash.com/photo-1594824813583-11882cf0b5ec?auto=format&fit=crop&w=300&q=80",
    bio: "Expert dermatologist providing digital consultations for eczema, acne, psoriasis, allergic dermatoses, and hair disorders with evidence-based protocols.",
    verificationStatus: "VERIFIED",
    licenseNumber: "MCI-2016-19382",
    hospital: "Manipal Hospital",
    languages: ["English", "Tamil", "Hindi"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Tuesday", "Wednesday", "Thursday", "Saturday"],
    workingHours: { start: "10:00", end: "19:00" },
    availableSlots: [
      "10:30 AM", "12:00 PM", "02:30 PM", "04:00 PM", "06:00 PM"
    ],
    blockedSlots: ["01:00 PM"]
  },
  {
    id: "doc-4",
    name: "Dr. Vikram Malhotra",
    specialty: "Neurology",
    qualification: "MBBS, MD (Med), DM (Neurology) - AIIMS",
    experienceYears: 10,
    consultationFee: 1000,
    rating: 4.7,
    reviewCount: 64,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    bio: "Neurologist focusing on headaches, migraine, neuropathy, sleep disorders, and stroke rehabilitation. Currently undergoing credential verification for digital prescribing.",
    verificationStatus: "PENDING",
    licenseNumber: "DMC-2014-99120",
    hospital: "AIIMS New Delhi Affiliate",
    languages: ["English", "Hindi", "Punjabi"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Monday", "Wednesday", "Friday"],
    workingHours: { start: "11:00", end: "17:00" },
    availableSlots: ["11:30 AM", "02:00 PM", "04:00 PM"],
    blockedSlots: []
  },
  {
    id: "doc-5",
    name: "Dr. Sunita Kulkarni",
    specialty: "Pediatrics",
    qualification: "MBBS, DCH, MD (Pediatrics)",
    experienceYears: 11,
    consultationFee: 600,
    rating: 4.9,
    reviewCount: 182,
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80",
    bio: "Compassionate pediatrician with expertise in childhood vaccinations, neonatal care, growth monitoring, and common childhood infections.",
    verificationStatus: "VERIFIED",
    licenseNumber: "MMC-2013-58210",
    hospital: "Max Super Speciality Hospital",
    languages: ["English", "Hindi", "Marathi"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
    workingHours: { start: "09:30", end: "16:30" },
    availableSlots: ["10:00 AM", "11:30 AM", "02:30 PM", "03:45 PM"],
    blockedSlots: ["01:00 PM"]
  },
  {
    id: "doc-6",
    name: "Dr. Amitav Ghosh",
    specialty: "Orthopedics",
    qualification: "MBBS, MS (Orthopedics), MCh Ortho",
    experienceYears: 14,
    consultationFee: 750,
    rating: 4.8,
    reviewCount: 112,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
    bio: "Senior orthopedic surgeon advising on joint pains, arthritis management, sports injury rehabilitation, and posture ergonomics.",
    verificationStatus: "VERIFIED",
    licenseNumber: "WBMC-2010-77341",
    hospital: "AMRI Hospital",
    languages: ["English", "Hindi", "Bengali"],
    modes: ["video", "audio", "chat"],
    workingDays: ["Tuesday", "Thursday", "Saturday"],
    workingHours: { start: "10:00", end: "18:00" },
    availableSlots: ["10:30 AM", "12:00 PM", "03:30 PM", "05:00 PM"],
    blockedSlots: []
  }
];

export const INITIAL_PATIENTS = [
  {
    id: "pat-1",
    name: "Rahul Verma",
    email: "patient@demo.com",
    phone: "+91 98765 43210",
    age: 34,
    gender: "Male",
    bloodGroup: "B+",
    address: "Flat 402, Green Glen Heights, Bellandur, Bengaluru, Karnataka - 560103",
    allergies: "Penicillin, Dust Mites",
    chronicConditions: "Mild Essential Hypertension",
    emergencyContact: "Pooja Verma (+91 98765 11111)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "pat-2",
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    phone: "+91 98220 12345",
    age: 29,
    gender: "Female",
    bloodGroup: "O+",
    address: "12A Palm Meadows, Indiranagar, Bengaluru, Karnataka - 560038",
    allergies: "None reported",
    chronicConditions: "Hypothyroidism",
    emergencyContact: "Rakesh Patel (+91 98220 99999)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "pat-3",
    name: "Ramesh Iyer",
    email: "r.iyer@gmail.com",
    phone: "+91 99401 54321",
    age: 58,
    gender: "Male",
    bloodGroup: "A+",
    address: "45 Lakeview Enclave, HSR Layout, Bengaluru, Karnataka - 560102",
    allergies: "Sulfa Drugs",
    chronicConditions: "Type 2 Diabetes Mellitus, Dyslipidemia",
    emergencyContact: "Meenakshi Iyer (+91 99401 00000)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const INITIAL_CONSULTATIONS = [
  {
    id: "c-101",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    doctorId: "doc-1",
    doctorName: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    date: "2026-10-07",
    timeSlot: "08:00 PM",
    mode: "video",
    status: "SCHEDULED", // SCHEDULED | IN PROGRESS | COMPLETED | CANCELLED | NO-SHOW
    fee: 800,
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    paymentId: "PAY-UPI-994821",
    reason: "Follow-up on mild hypertension, elevated pulse readings, and chest tightness during exercise",
    notes: "",
    prescriptionId: null,
    createdAt: "2026-10-07T10:15:00Z"
  },
  {
    id: "c-102",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    doctorId: "doc-2",
    doctorName: "Dr. Rajesh Menon",
    specialty: "General Medicine",
    date: "2026-10-02",
    timeSlot: "10:00 AM",
    mode: "video",
    status: "COMPLETED",
    fee: 500,
    paymentStatus: "PAID",
    paymentMethod: "Card",
    paymentId: "PAY-CRD-882103",
    reason: "High fever (101 F), persistent sore throat and dry cough for 3 days",
    notes: "Patient presented with acute seasonal viral pharyngitis. Throat inflamed, no exudate. Vitals stable. Advised 5-day course of symptomatic treatment.",
    prescriptionId: "rx-201",
    followUpDate: "2026-10-09",
    createdAt: "2026-10-01T14:20:00Z"
  },
  {
    id: "c-103",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    doctorId: "doc-3",
    doctorName: "Dr. Priya Sundaram",
    specialty: "Dermatology",
    date: "2026-09-20",
    timeSlot: "04:30 PM",
    mode: "chat",
    status: "COMPLETED",
    fee: 700,
    paymentStatus: "PAID",
    paymentMethod: "Net Banking",
    paymentId: "PAY-NB-771920",
    reason: "Dry red itchy rash on inner left forearm worsening after shower",
    notes: "Erythematous scaly plaque consistent with contact dermatitis / mild atopic flare. Advised topical barrier cream and low-potency steroid.",
    prescriptionId: "rx-202",
    createdAt: "2026-09-19T09:00:00Z"
  },
  {
    id: "c-104",
    patientId: "pat-2",
    patientName: "Sneha Patel",
    doctorId: "doc-1",
    doctorName: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    date: "2026-10-08",
    timeSlot: "11:30 AM",
    mode: "video",
    status: "SCHEDULED",
    fee: 800,
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    paymentId: "PAY-UPI-120938",
    reason: "Pre-operative cardiac clearance for minor laparoscopic procedure",
    notes: "",
    prescriptionId: null,
    createdAt: "2026-10-07T11:45:00Z"
  },
  {
    id: "c-105",
    patientId: "pat-3",
    patientName: "Ramesh Iyer",
    doctorId: "doc-1",
    doctorName: "Dr. Ananya Sharma",
    specialty: "Cardiology",
    date: "2026-10-06",
    timeSlot: "03:30 PM",
    mode: "audio",
    status: "CANCELLED",
    fee: 800,
    paymentStatus: "REFUNDED",
    paymentMethod: "Card",
    paymentId: "PAY-CRD-550192",
    reason: "Routine quarterly diabetic heart check",
    notes: "Cancelled by patient due to urgent flight travel. 100% refund initiated to source account.",
    prescriptionId: null,
    createdAt: "2026-10-05T08:30:00Z"
  }
];

export const INITIAL_MEDICAL_RECORDS = [
  {
    id: "rec-1",
    patientId: "pat-1",
    name: "Complete Blood Count (CBC) Automated Report",
    type: "Lab Report",
    uploadDate: "2026-10-03",
    fileSize: "1.4 MB",
    fileType: "PDF",
    uploadedBy: "Lab Technician (Suresh Kumar)",
    notes: "WBC: 7,200 /mcL, Hb: 14.2 g/dL, Platelets: 240,000 /mcL. All counts within standard reference limits.",
    verified: true
  },
  {
    id: "rec-2",
    patientId: "pat-1",
    name: "Chest X-Ray Digital Radiography (PA View)",
    type: "Scan",
    uploadDate: "2026-09-15",
    fileSize: "4.8 MB",
    fileType: "JPG",
    uploadedBy: "Rahul Verma (Patient)",
    notes: "Bilateral lung fields clear. Normal cardiac silhouette. Costophrenic angles sharp.",
    verified: true
  },
  {
    id: "rec-3",
    patientId: "pat-1",
    name: "Hospital Discharge Summary - Manipal Heart Care",
    type: "Clinical Note",
    uploadDate: "2026-05-10",
    fileSize: "2.1 MB",
    fileType: "PDF",
    uploadedBy: "Rahul Verma (Patient)",
    notes: "Elective laparoscopic cholecystectomy. Uneventful post-operative recovery. Discharged in stable condition.",
    verified: true
  },
  {
    id: "rec-4",
    patientId: "pat-1",
    name: "12-Lead Electrocardiogram (ECG) Tracing",
    type: "Scan",
    uploadDate: "2026-10-01",
    fileSize: "3.2 MB",
    fileType: "PDF",
    uploadedBy: "Rahul Verma (Patient)",
    notes: "Normal sinus rhythm, Rate: 72 bpm, PR interval 156ms, QRS axis normal. No ischemic ST-T changes.",
    verified: true
  }
];

export const INITIAL_PRESCRIPTIONS = [
  {
    id: "rx-201",
    consultationId: "c-102",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    doctorId: "doc-2",
    doctorName: "Dr. Rajesh Menon",
    doctorQualification: "MBBS, MD (General Medicine)",
    doctorLicense: "MCI-2009-41235",
    hospital: "Fortis Healthcare & TeleCare",
    date: "2026-10-02",
    diagnosis: "Acute Viral Pharyngitis & Mild Upper Respiratory Infection",
    vitalSigns: {
      bloodPressure: "122/78 mmHg",
      pulse: "78 bpm",
      temperature: "99.2 °F",
      spo2: "98% on Room Air"
    },
    medicines: [
      {
        id: "med-1",
        name: "Paracetamol 650mg",
        type: "Tablet",
        dosage: "1 Tablet",
        frequency: "Thrice daily after meals (TID)",
        duration: "5 Days",
        instructions: "Take with warm water if body temp exceeds 99°F"
      },
      {
        id: "med-2",
        name: "Levocetirizine 5mg",
        type: "Tablet",
        dosage: "1 Tablet",
        frequency: "Once daily at bedtime (OD)",
        duration: "5 Days",
        instructions: "May cause mild drowsiness; avoid driving"
      },
      {
        id: "med-3",
        name: "Warm Saline Gargles",
        type: "Oral Care",
        dosage: "1 Glass",
        frequency: "Three times daily",
        duration: "7 Days",
        instructions: "Use lukewarm water with 1/2 tsp salt"
      }
    ],
    generalAdvice: "Adequate hydration with 2.5 to 3 Litres of fluids daily. Rest for 48 hours. Report back if fever persists beyond 5 days.",
    followUpInDays: 7,
    followUpDate: "2026-10-09",
    doctorSignature: {
      signed: true,
      signatureText: "Dr. Rajesh Menon, MD",
      signedAt: "2026-10-02T10:35:12Z",
      digitalHash: "SHA256:7b91ec8301cf6a5291da938e51b2049e"
    }
  },
  {
    id: "rx-202",
    consultationId: "c-103",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    doctorId: "doc-3",
    doctorName: "Dr. Priya Sundaram",
    doctorQualification: "MBBS, MD (Dermatology)",
    doctorLicense: "MCI-2016-19382",
    hospital: "Manipal Hospital & TeleCare",
    date: "2026-09-20",
    diagnosis: "Contact Dermatitis / Mild Atopic Eczema (Forearm)",
    vitalSigns: {
      bloodPressure: "118/76 mmHg",
      pulse: "72 bpm",
      temperature: "98.4 °F",
      spo2: "99%"
    },
    medicines: [
      {
        id: "med-4",
        name: "Hydrocortisone 1% Topical Cream",
        type: "Ointment",
        dosage: "Thin film",
        frequency: "Twice daily (BD)",
        duration: "7 Days",
        instructions: "Apply gently to red patches after cleansing with mild soap"
      },
      {
        id: "med-5",
        name: "Ceramide Barrier Body Lotion",
        type: "Lotion",
        dosage: "Liberal application",
        frequency: "Twice daily immediately post bath",
        duration: "30 Days",
        instructions: "Keep skin well hydrated"
      }
    ],
    generalAdvice: "Avoid harsh perfumed soaps, detergents, and synthetic fabrics. Wear loose cotton garments.",
    followUpInDays: 14,
    followUpDate: "2026-10-04",
    doctorSignature: {
      signed: true,
      signatureText: "Dr. Priya Sundaram, MD",
      signedAt: "2026-09-20T17:05:44Z",
      digitalHash: "SHA256:3a44b82d90ef0192ca5419b8823c91a0"
    }
  }
];

export const LAB_TESTS_CATALOG = [
  {
    id: "lt-1",
    name: "Complete Blood Count (CBC) with ESR",
    category: "Hematology",
    description: "Evaluates overall health and detects a wide range of disorders including anemia, infection, and leukemia.",
    sampleType: "Blood (EDTA Tube)",
    fastingRequired: "No fasting needed",
    turnaroundHours: 12,
    price: 450,
    parametersCovered: ["Hemoglobin", "RBC Count", "WBC & Differential", "Platelets", "PCV/Hematocrit", "ESR"]
  },
  {
    id: "lt-2",
    name: "Comprehensive Lipid Profile",
    category: "Cardiovascular / Biochemistry",
    description: "Measures blood fats to evaluate cardiovascular risk, atherosclerosis, and monitor cholesterol treatment.",
    sampleType: "Serum Blood",
    fastingRequired: "10-12 hours overnight fasting required",
    turnaroundHours: 24,
    price: 750,
    parametersCovered: ["Total Cholesterol", "HDL 'Good' Cholesterol", "LDL 'Bad' Cholesterol", "Triglycerides", "VLDL", "Chol/HDL Ratio"]
  },
  {
    id: "lt-3",
    name: "HbA1c Glycated Hemoglobin (Diabetes Check)",
    category: "Endocrinology",
    description: "Measures average blood sugar levels over the past 3 months for diabetes diagnosis and monitoring.",
    sampleType: "Blood (EDTA)",
    fastingRequired: "No fasting needed",
    turnaroundHours: 12,
    price: 500,
    parametersCovered: ["HbA1c Percentage", "Estimated Average Glucose (eAG)"]
  },
  {
    id: "lt-4",
    name: "Thyroid Function Profile (T3, T4, TSH)",
    category: "Endocrinology",
    description: "Screens for hypothyroidism, hyperthyroidism, and evaluates metabolic gland function.",
    sampleType: "Serum Blood",
    fastingRequired: "Morning sample preferred",
    turnaroundHours: 24,
    price: 600,
    parametersCovered: ["Total T3", "Total T4", "Ultrasensitive TSH"]
  },
  {
    id: "lt-5",
    name: "Comprehensive Liver Function Test (LFT)",
    category: "Biochemistry",
    description: "Evaluates liver inflammation, viral hepatitis effects, jaundice, and bile duct health.",
    sampleType: "Serum Blood",
    fastingRequired: "8 hours fasting recommended",
    turnaroundHours: 24,
    price: 700,
    parametersCovered: ["Bilirubin Total & Direct", "SGOT / AST", "SGPT / ALT", "Alkaline Phosphatase", "Total Protein & Albumin"]
  },
  {
    id: "lt-6",
    name: "Kidney Function Test (KFT with Electrolytes)",
    category: "Renal Function",
    description: "Assesses renal filtration rate, nitrogen clearance, and electrolyte balance.",
    sampleType: "Serum Blood & Urine",
    fastingRequired: "No fasting needed",
    turnaroundHours: 24,
    price: 650,
    parametersCovered: ["Serum Creatinine", "Blood Urea Nitrogen (BUN)", "Uric Acid", "Serum Sodium", "Potassium", "Chloride"]
  },
  {
    id: "lt-7",
    name: "Vitamin D (25-OH) & Vitamin B12 Duo Pack",
    category: "Vitamins & Wellness",
    description: "Evaluates bone density health, nerve conduction, fatigue, and immune resistance.",
    sampleType: "Serum Blood",
    fastingRequired: "Fasting not mandatory",
    turnaroundHours: 24,
    price: 1200,
    parametersCovered: ["25-Hydroxy Vitamin D", "Active Vitamin B12 (Cobalamin)"]
  }
];

export const INITIAL_LAB_BOOKINGS = [
  {
    id: "lb-501",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    patientPhone: "+91 98765 43210",
    testId: "lt-1",
    testName: "Complete Blood Count (CBC) with ESR",
    testCategory: "Hematology",
    price: 450,
    collectionAddress: "Flat 402, Green Glen Heights, Bellandur, Bengaluru, Karnataka - 560103",
    collectionDate: "2026-10-08",
    collectionTimeSlot: "07:30 AM – 09:30 AM",
    assignedPhlebotomist: {
      name: "Suresh Kumar",
      phone: "+91 98451 98765",
      id: "phleb-01"
    },
    status: "ASSIGNED", // REQUESTED | ASSIGNED | COLLECTED | IN LAB | REPORT READY | CANCELLED
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    paymentId: "PAY-LAB-38912",
    sampleDetails: "Blood sample (Vacutainer purple top)",
    reportUrl: null,
    reportDate: null,
    reportFindings: "",
    createdAt: "2026-10-07T08:30:00Z"
  },
  {
    id: "lb-502",
    patientId: "pat-1",
    patientName: "Rahul Verma",
    patientPhone: "+91 98765 43210",
    testId: "lt-2",
    testName: "Comprehensive Lipid Profile",
    testCategory: "Cardiovascular / Biochemistry",
    price: 750,
    collectionAddress: "Flat 402, Green Glen Heights, Bellandur, Bengaluru, Karnataka - 560103",
    collectionDate: "2026-10-03",
    collectionTimeSlot: "08:00 AM – 10:00 AM",
    assignedPhlebotomist: {
      name: "Suresh Kumar",
      phone: "+91 98451 98765",
      id: "phleb-01"
    },
    status: "REPORT READY",
    paymentStatus: "PAID",
    paymentMethod: "Credit Card",
    paymentId: "PAY-LAB-11029",
    sampleDetails: "Blood sample (Vacutainer gold top)",
    reportUrl: "/reports/lipid-profile-rahul.pdf",
    reportDate: "2026-10-04",
    reportFindings: "Total Cholesterol: 195 mg/dL (Normal <200), HDL: 48 mg/dL (>40), LDL: 118 mg/dL (<100 slightly elevated), Triglycerides: 145 mg/dL (<150). Overall favorable ratio.",
    createdAt: "2026-10-02T16:00:00Z"
  },
  {
    id: "lb-503",
    patientId: "pat-2",
    patientName: "Sneha Patel",
    patientPhone: "+91 98220 12345",
    testId: "lt-4",
    testName: "Thyroid Function Profile (T3, T4, TSH)",
    testCategory: "Endocrinology",
    price: 600,
    collectionAddress: "12A Palm Meadows, Indiranagar, Bengaluru - 560038",
    collectionDate: "2026-10-08",
    collectionTimeSlot: "08:00 AM – 10:00 AM",
    assignedPhlebotomist: null,
    status: "REQUESTED",
    paymentStatus: "PAID",
    paymentMethod: "UPI",
    paymentId: "PAY-LAB-55912",
    sampleDetails: "Serum Blood",
    reportUrl: null,
    reportDate: null,
    reportFindings: "",
    createdAt: "2026-10-07T12:10:00Z"
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    userId: "pat-1",
    role: "patient",
    type: "CONSULTATION_REMINDER",
    title: "Upcoming Consultation in 1 Hour",
    message: "Your video consultation with Dr. Ananya Sharma (Cardiologist) is scheduled for today at 08:00 PM. Please be ready with your previous records.",
    link: "consultations",
    read: false,
    createdAt: "2026-10-07T19:00:00Z"
  },
  {
    id: "notif-2",
    userId: "pat-1",
    role: "patient",
    type: "LAB_REPORT_READY",
    title: "Laboratory Report is Ready",
    message: "Your Comprehensive Lipid Profile test report has been verified by the lab pathologist and is now available in your records.",
    link: "lab-tests",
    read: false,
    createdAt: "2026-10-04T15:30:00Z"
  },
  {
    id: "notif-3",
    userId: "pat-1",
    role: "patient",
    type: "PRESCRIPTION_ISSUED",
    title: "New E-Prescription Issued",
    message: "Dr. Rajesh Menon has issued and digitally signed your prescription for consultation #c-102.",
    link: "prescriptions",
    read: true,
    createdAt: "2026-10-02T10:36:00Z"
  },
  {
    id: "notif-4",
    userId: "doc-1",
    role: "doctor",
    type: "NEW_APPOINTMENT",
    title: "New Video Consultation Booked",
    message: "Patient Rahul Verma has booked an evening consultation for today at 08:00 PM regarding cardiology follow-up.",
    link: "appointments",
    read: false,
    createdAt: "2026-10-07T10:15:00Z"
  },
  {
    id: "notif-5",
    userId: "phleb-01",
    role: "lab",
    type: "NEW_SAMPLE_ASSIGNMENT",
    title: "New Home Sample Collection Assigned",
    message: "You have been assigned for home blood collection for Rahul Verma on 08 Oct, 07:30 AM – 09:30 AM in Bellandur.",
    link: "lab-bookings",
    read: false,
    createdAt: "2026-10-07T08:35:00Z"
  },
  {
    id: "notif-6",
    userId: "admin-1",
    role: "admin",
    type: "DOCTOR_VERIFICATION_PENDING",
    title: "Doctor Credential Verification Required",
    message: "Dr. Vikram Malhotra (Neurology, AIIMS) has submitted his medical registration and degrees for verification.",
    link: "admin-doctors",
    read: false,
    createdAt: "2026-10-06T14:00:00Z"
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-10-07T19:00:00Z",
    userId: "sys-scheduler",
    userName: "System Automated Cron",
    userRole: "system",
    action: "SENT_REMINDER_NOTIFICATION",
    entity: "Consultation",
    entityId: "c-101",
    details: "Automated SMS and in-app reminder dispatched to Rahul Verma for 08:00 PM consultation.",
    status: "SUCCESS"
  },
  {
    id: "log-2",
    timestamp: "2026-10-07T10:15:30Z",
    userId: "pat-1",
    userName: "Rahul Verma",
    userRole: "patient",
    action: "BOOKED_CONSULTATION",
    entity: "Consultation",
    entityId: "c-101",
    details: "Booked video consultation with Dr. Ananya Sharma. Payment ₹800 settled via UPI gateway.",
    status: "SUCCESS"
  },
  {
    id: "log-3",
    timestamp: "2026-10-07T08:30:15Z",
    userId: "pat-1",
    userName: "Rahul Verma",
    userRole: "patient",
    action: "BOOKED_LAB_COLLECTION",
    entity: "LabBooking",
    entityId: "lb-501",
    details: "Requested home sample collection for Complete Blood Count (CBC). Address verified.",
    status: "SUCCESS"
  },
  {
    id: "log-4",
    timestamp: "2026-10-06T14:10:00Z",
    userId: "doc-4",
    userName: "Dr. Vikram Malhotra",
    userRole: "doctor",
    action: "SUBMITTED_CREDENTIALS",
    entity: "DoctorProfile",
    entityId: "doc-4",
    details: "Uploaded medical license DMC-2014-99120 and AIIMS DM certificate for verification.",
    status: "SUCCESS"
  },
  {
    id: "log-5",
    timestamp: "2026-10-04T15:30:00Z",
    userId: "lab-1",
    userName: "Suresh Kumar",
    userRole: "lab",
    action: "UPLOADED_LAB_REPORT",
    entity: "LabBooking",
    entityId: "lb-502",
    details: "Lipid Profile results uploaded, report state updated to REPORT READY. Notification sent.",
    status: "SUCCESS"
  },
  {
    id: "log-6",
    timestamp: "2026-10-02T10:35:12Z",
    userId: "doc-2",
    userName: "Dr. Rajesh Menon",
    userRole: "doctor",
    action: "DIGITALLY_SIGNED_PRESCRIPTION",
    entity: "EPrescription",
    entityId: "rx-201",
    details: "E-Prescription cryptographically signed with license MCI-2009-41235 and delivered to patient.",
    status: "SUCCESS"
  }
];

export const DEMO_ACCOUNTS = [
  {
    role: "patient",
    email: "patient@demo.com",
    label: "Patient (Rahul Verma)",
    name: "Rahul Verma",
    description: "Book consultations, view prescriptions, manage records, book home lab tests"
  },
  {
    role: "doctor",
    email: "doctor@demo.com",
    label: "Doctor (Dr. Ananya Sharma - Verified)",
    name: "Dr. Ananya Sharma",
    description: "Conduct consultations, view patient history, issue digitally signed e-prescriptions"
  },
  {
    role: "lab",
    email: "lab@demo.com",
    label: "Lab Phlebotomist (Suresh Kumar)",
    name: "Suresh Kumar",
    description: "Track home sample collection, update processing status, upload lab reports"
  },
  {
    role: "admin",
    email: "admin@demo.com",
    label: "Admin / Operations",
    name: "HealthCare Ops Admin",
    description: "Verify doctors, view audit logs, manage compliance, monitor transactions"
  }
];
