import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"

import { prisma } from "@/lib/db"

export default async function ReceptionistDashboard() {
    const session = await getSession()

    if (!session || session.role !== "RECEPTIONIST") {
        redirect("/login")
    }

    const patientCount = await prisma.patient.count()
    const appointmentCount = await prisma.appointment.count()

    return (
        <DashboardLayout session={session}>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome back, {session.name}</h1>
                <p className="text-gray-700 mb-8 text-base">Manage patient records and appointments.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">Total Patients</CardTitle>
                            <Users className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{patientCount}</div>
                            <p className="text-sm text-gray-600 mt-1">In system</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">Appointments</CardTitle>
                            <Calendar className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{appointmentCount}</div>
                            <p className="text-sm text-gray-600 mt-1">Scheduled</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                            <CardDescription className="text-gray-600">Manage clinic operations</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a href="/receptionist/patients" className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                                <h3 className="font-semibold text-gray-900">Manage Patients</h3>
                                <p className="text-sm text-gray-600 mt-1">Add and view patient records</p>
                            </a>
                            <a href="/receptionist/appointments" className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                                <h3 className="font-semibold text-gray-900">Manage Appointments</h3>
                                <p className="text-sm text-gray-600 mt-1">Schedule and view appointments</p>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
