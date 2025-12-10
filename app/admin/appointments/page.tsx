import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { AppointmentManagement } from "@/components/AppointmentManagement"

export default async function AdminAppointmentsPage() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    return (
        <DashboardLayout session={session}>
            <AppointmentManagement />
        </DashboardLayout>
    )
}
