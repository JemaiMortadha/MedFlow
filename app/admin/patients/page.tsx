import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { PatientManagement } from "@/components/PatientManagement"

export default async function AdminPatientsPage() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    return (
        <DashboardLayout session={session}>
            <PatientManagement />
        </DashboardLayout>
    )
}
