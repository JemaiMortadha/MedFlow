import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText } from "lucide-react"

import { prisma } from "@/lib/db"

export default async function DoctorDashboard() {
    const session = await getSession()

    if (!session || session.role !== "DOCTOR") {
        redirect("/login")
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayAppointments = await prisma.appointment.count({
        where: {
            doctorId: session.userId,
            date: {
                gte: today,
                lt: tomorrow
            }
        }
    })

    const completedAppointments = await prisma.appointment.count({
        where: {
            doctorId: session.userId,
            status: "completed"
        }
    })

    return (
        <DashboardLayout session={session}>
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome back, Dr. {session.name.split(" ")[1] || session.name}</h1>
                <p className="text-gray-700 mb-8 text-base">Here's your schedule for today.</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">Today's Appointments</CardTitle>
                            <Calendar className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{todayAppointments}</div>
                            <p className="text-sm text-gray-600 mt-1">Scheduled for today</p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-gray-700">Completed Appointments</CardTitle>
                            <FileText className="h-5 w-5 text-indigo-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{completedAppointments}</div>
                            <p className="text-sm text-gray-600 mt-1">Total completed</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8">
                    <Card className="border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
                            <CardDescription className="text-gray-600">Manage your appointments</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <a href="/doctor/appointments" className="block p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-300 transition">
                                <h3 className="font-semibold text-gray-900">View Appointments</h3>
                                <p className="text-sm text-gray-600 mt-1">See your schedule and manage appointments</p>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}
