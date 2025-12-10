import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CreditCard } from "lucide-react"

import { prisma } from "@/lib/db"

export default async function PatientDashboard() {
    const session = await getSession()

    if (!session || session.role !== "PATIENT") {
        redirect("/login")
    }

    // Get patient record first
    const patient = await prisma.patient.findFirst({
        where: { email: session.email }
    })

    let upcomingAppointments = 0
    let pendingPayments = 0

    if (patient) {
        upcomingAppointments = await prisma.appointment.count({
            where: {
                patientId: patient.id,
                date: {
                    gte: new Date()
                },
                status: "scheduled"
            }
        })

        // For now, we'll count completed appointments without payments as "pending payments"
        // or use the Payment model if we want to be more precise
        const unpaidAppointments = await prisma.appointment.count({
            where: {
                patientId: patient.id,
                status: "completed",
                payment: {
                    is: null
                }
            }
        })
        pendingPayments = unpaidAppointments
    }

    return (
        <DashboardLayout session={session}>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome, {session.name}</h1>
                <p className="text-gray-700 mb-8 text-base">Manage your appointments and health records.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">My Appointments</CardTitle>
                            <Calendar className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{upcomingAppointments}</div>
                            <p className="text-sm text-gray-600 mt-1">Upcoming appointments</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">Pending Payments</CardTitle>
                            <CreditCard className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{pendingPayments}</div>
                            <p className="text-sm text-gray-600 mt-1">Appointments to pay</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                            <CardDescription className="text-gray-600">Manage your health</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a href="/patient/appointments" className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                                <h3 className="font-semibold text-gray-900">View My Appointments</h3>
                                <p className="text-sm text-gray-600 mt-1">See and manage your appointments</p>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
