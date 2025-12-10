"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { FileText, CheckCircle } from "lucide-react"

import { PDFDownloadLink } from "@react-pdf/renderer"
import PrescriptionPDF from "./PrescriptionPDF"

interface Appointment {
    id: number
    date: string
    status: string
    patient: { id: number; name: string; email: string }
    doctor: { id: number; name: string }
}

export function DoctorAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
        fetchAppointments()
    }, [])

    const fetchAppointments = async () => {
        try {
            const res = await fetch("/api/appointments")
            if (res.ok) {
                const data = await res.json()
                setAppointments(data)
            }
        } catch (error) {
            toast.error("Failed to fetch appointments")
        } finally {
            setLoading(false)
        }
    }

    const generatePrescription = async (appointment: Appointment) => {
        toast.success(`Prescription for ${appointment.patient.name} would be generated here (PDF feature)`)
        // Placeholder for PDF generation
    }

    const markComplete = async (id: number) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            })

            if (res.ok) {
                toast.success("Appointment marked as completed")
                fetchAppointments() // Refresh the list
            } else {
                toast.error("Failed to update appointment")
            }
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-700">Manage your patient appointments</p>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="border rounded-lg border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold text-gray-700">Patient</TableHead>
                                <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
                                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                                <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        No appointments found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell className="font-medium text-gray-900">{appointment.patient.name}</TableCell>
                                        <TableCell className="text-gray-700">
                                            {new Date(appointment.date).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === "completed" ? "bg-green-100 text-green-800" :
                                                appointment.status === "cancelled" ? "bg-red-100 text-red-800" :
                                                    "bg-blue-100 text-blue-800"
                                                }`}>
                                                {appointment.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {isClient && (
                                                    <PDFDownloadLink
                                                        document={
                                                            <PrescriptionPDF
                                                                patientName={appointment.patient.name}
                                                                doctorName={appointment.doctor.name}
                                                                date={new Date(appointment.date)}
                                                                appointmentId={appointment.id}
                                                            />
                                                        }
                                                        fileName={`prescription-${appointment.id}.pdf`}
                                                    >
                                                        {({ loading }) => (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                disabled={loading}
                                                            >
                                                                <FileText className="mr-1 h-4 w-4" />
                                                                {loading ? "Generating..." : "Prescription"}
                                                            </Button>
                                                        )}
                                                    </PDFDownloadLink>
                                                )}
                                                {appointment.status === "scheduled" && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => markComplete(appointment.id)}
                                                    >
                                                        <CheckCircle className="mr-1 h-4 w-4" />
                                                        Complete
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}
