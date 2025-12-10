import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { PatientAppointments } from "@/components/PatientAppointments"

export default async function PatientAppointmentsPage() {
    const session = await getSession()

    if (!session || session.role !== "PATIENT") {
        redirect("/login")
    }

    return (
        <DashboardLayout session={session}>
            <PatientAppointments />
        </DashboardLayout>
    )
}
