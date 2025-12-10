import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DoctorAppointments } from "@/components/DoctorAppointments"

export default async function DoctorAppointmentsPage() {
    const session = await getSession()

    if (!session || session.role !== "DOCTOR") {
        redirect("/login")
    }

    return (
        <DashboardLayout session={session}>
            <DoctorAppointments />
        </DashboardLayout>
    )
}
