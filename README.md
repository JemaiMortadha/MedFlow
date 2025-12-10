# MedFlow - Clinic Management System

![MedFlow Banner](https://img.shields.io/badge/MedFlow-Clinic_Management_System-indigo?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-SQLite-3982CE?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**MedFlow** is a modern, full-stack Clinic Management SaaS application built with Next.js 14. It provides a comprehensive solution for managing hospital operations, including patient records, appointment scheduling, prescriptions, and billing, with a secure role-based access control system.

## 🚀 Key Features

### 🔐 Authentication & Security
- **Role-Based Access Control (RBAC)**: Distinct portals for Admins, Doctors, Receptionists, and Patients.
- **Secure Login**: Custom JWT-based authentication system.
- **Public Registration**: New patients can register and immediately access their portal.

### 🏥 Clinic Operations
- **Dashboard Statistics**: Real-time overview of patients, appointments, and revenue.
- **Patient Management**: Complete CRUD operations for patient records and medical history.
- **Appointment Scheduling**: Interactive booking system with doctor and patient selection.
- **Prescription Generation**: Doctors can generate and download professional PDF prescriptions.

### 💳 Billing & Payments
- **Stripe Integration**: Secure payment processing for appointments.
- **Invoice Management**: Track payment status (Pending/Paid) for all consultations.

### 🎨 UI/UX
- **Modern Design**: Built with `shadcn/ui` and Tailwind CSS for a polished, accessible interface.
- **Responsive Layout**: Fully functional on desktop and mobile devices.
- **High Contrast**: Optimized for readability and accessibility.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [SQLite](https://www.sqlite.org/) (Dev) / PostgreSQL (Prod ready)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **Payments**: [Stripe](https://stripe.com/)

---

## 📸 Screenshots

### Admin Dashboard
*Real-time statistics and quick actions for clinic management.*
![Admin Dashboard](/home/mortadha/.gemini/antigravity/brain/73704bb7-51f6-4c2c-9e3d-8dbf37426716/admin_dashboard_stats_1765328415771.png)

### Patient Portal
*Patients can view appointments, pay bills, and manage their profile.*
![Patient Dashboard](/home/mortadha/.gemini/antigravity/brain/73704bb7-51f6-4c2c-9e3d-8dbf37426716/patient_dashboard_new_user_1765327958822.png)

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/medflow.git
    cd medflow
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up the database**
    Initialize the SQLite database and seed it with demo data:
    ```bash
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

4.  **Configure Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="your-secret-key"
    NEXTAUTH_URL="http://localhost:3000"
    
    # Stripe (Optional for test mode)
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
    STRIPE_SECRET_KEY="sk_test_..."
    ```

5.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Accounts

The application comes pre-seeded with the following accounts for testing:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | `admin@medflow.com` | `password` | Full System Access |
| **Doctor** | `dr.smith@medflow.com` | `password` | Appointments, Prescriptions |
| **Receptionist** | `reception@medflow.com` | `password` | Patients, Scheduling |
| **Patient** | `patient1@medflow.com` | `password` | My Appointments, Payments |

---

## 📂 Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── admin/             # Admin dashboard routes
│   ├── doctor/            # Doctor dashboard routes
│   ├── patient/           # Patient dashboard routes
│   ├── receptionist/      # Receptionist dashboard routes
│   └── api/               # API routes (Auth, Patients, etc.)
├── components/            # React components
│   ├── ui/                # shadcn/ui reusable components
│   └── ...                # Feature-specific components
├── lib/                   # Utilities (DB, Auth, Validation)
├── prisma/                # Database schema and seed script
└── public/                # Static assets
```

---

## 📄 License

This project is licensed under the MIT License.
