# MedFlow - Advanced Clinic Management System

![MedFlow Banner](https://img.shields.io/badge/MedFlow-Clinic_Management_System-indigo?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-3982CE?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)

**MedFlow** is a robust, full-stack SaaS application designed to streamline hospital and clinic operations. Built with the latest web technologies, it offers a secure, efficient, and user-friendly platform for managing patient lifecycles, appointment scheduling, medical records, and financial transactions.

## 🌟 Comprehensive Features

### 🔐 Advanced Security & Role Management
- **Role-Based Access Control (RBAC)**: Secure, distinct portals for four user types:
    - **Admin**: Complete system oversight, user management, and clinic statistics.
    - **Doctor**: Appointment management, patient history access, and prescription generation.
    - **Receptionist**: Front-desk operations, patient registration, and scheduling.
    - **Patient**: Personal health portal for booking appointments and viewing history.
- **Secure Authentication**: Custom JWT-based session management with encrypted cookies.
- **Public Registration**: Seamless self-service registration for new patients.

### 🏥 Clinical & Operational Workflows
- **Interactive Scheduling**: Dynamic calendar system for booking appointments with conflict detection.
- **Patient Records**: Centralized database for patient demographics, medical history, and visit logs.
- **Digital Prescriptions**: Automated PDF generation for prescriptions, complete with doctor signatures and professional formatting (powered by `@react-pdf/renderer`).
- **Dashboard Analytics**: Real-time visualization of key metrics (Total Patients, Daily Appointments, Revenue).

### 💳 Financial Integration
- **Stripe Payments**: Integrated secure payment gateway for processing consultation fees.
- **Billing History**: Patients can track payment status (Pending/Paid) and view transaction details.

---

## 🏗️ System Architecture & Workflow

MedFlow follows a modern, scalable architecture using **Next.js 14 App Router**. The backend logic is handled via Server Actions and API Routes, interacting with a **SQLite** database (easily scalable to PostgreSQL) through **Prisma ORM**.

### Global Sequence Diagram
The following diagram illustrates the end-to-end flow of a patient booking an appointment, attending the consultation, and completing the payment.

![Global Sequence Diagram](./sequence%20diagram.jpg)

---

## 📸 Application Screenshots

### Admin Dashboard
*A centralized hub for clinic administrators to monitor daily operations, manage users, and view vital statistics.*
![Admin Dashboard](./admin%20dashboard%20screenshot.png)

### Patient Portal
*A personal dashboard for patients to manage their health journey, view upcoming appointments, and handle payments.*
![Patient Portal](./patient%20portal%20screenshot.png)

---

## 🛠️ Technology Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | Next.js 14 | React framework with App Router and Server Components |
| **Language** | TypeScript | Strictly typed JavaScript for robust code quality |
| **Styling** | Tailwind CSS | Utility-first CSS framework for rapid UI development |
| **UI Library** | shadcn/ui | Accessible, reusable component primitives |
| **Database** | SQLite | Lightweight relational database (Dev environment) |
| **ORM** | Prisma | Type-safe database client and schema management |
| **Auth** | NextAuth.js | Flexible authentication library (Custom JWT implementation) |
| **Payments** | Stripe | Payment processing infrastructure |
| **PDF** | @react-pdf | Client-side PDF generation for medical documents |

---

## ⚡ Installation & Setup Guide

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/medflow-dev/medflow-system.git
cd medflow-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database
Set up the SQLite database and populate it with initial demo data.
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Environment Configuration
Create a `.env` file in the root directory. You can copy the following configuration directly:

```env
# Database Connection
DATABASE_URL="file:./dev.db"

# Authentication Secrets (Randomly generated for demo)
NEXTAUTH_SECRET="super-secure-random-secret-key-2024"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Configuration (Test Mode Credentials)
# These are public test keys safe for development use
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51O..."
STRIPE_SECRET_KEY="sk_test_51O..."
```

### 5. Start Development Server
```bash
npm run dev
```
Access the application at [http://localhost:3000](http://localhost:3000).

---

## 👥 Demo Access Credentials

The system is pre-configured with the following user accounts for testing all role-specific features.

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Admin** | `admin@medflow.com` | `password` | Full System Access, User Management |
| **Doctor** | `dr.smith@medflow.com` | `password` | Consultations, Prescriptions |
| **Receptionist** | `reception@medflow.com` | `password` | Patient Registration, Scheduling |
| **Patient** | `patient1@medflow.com` | `password` | Booking, Payments, History |

---

## 📂 Project Structure

```bash
├── app/                   # Next.js App Router (Pages & API)
│   ├── admin/             # Admin-specific routes
│   ├── doctor/            # Doctor-specific routes
│   ├── patient/           # Patient-specific routes
│   ├── api/               # Backend API endpoints
│   └── login/             # Authentication pages
├── components/            # Reusable React Components
│   ├── ui/                # shadcn/ui design system
│   └── ...                # Feature components (Forms, Modals)
├── lib/                   # Core Utilities
│   ├── db.ts              # Prisma Client instance
│   ├── auth.ts            # Authentication logic
│   └── utils.ts           # Helper functions
├── prisma/                # Database Configuration
│   ├── schema.prisma      # Data models
│   └── seed.ts            # Initial data population
└── public/                # Static Assets (Images, Icons)
```

---

## 📄 License

This project is open-source and available under the **MIT License**.
