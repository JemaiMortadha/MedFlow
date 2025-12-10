import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AppointmentManagement } from "@/components/AppointmentManagement"

export default async function ReceptionistAppointmentsPage() {
    const session = await getSession()

    if (!session || session.role !== "RECEPTIONIST") {
        redirect("/login")
    }

    return (
        <DashboardLayout session={session}>
            <AppointmentManagement />
        </DashboardLayout>
    )
}
