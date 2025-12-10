"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { CreditCard } from "lucide-react"
import { PaymentModal } from "./PaymentModal"

interface Appointment {
    id: number
    date: string
    status: string
    doctor: { id: number; name: string }
}

export function PatientAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

    useEffect(() => {
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

    const handlePayment = (appointment: Appointment) => {
        setSelectedAppointment(appointment)
        setPaymentDialogOpen(true)
    }

    const processPayment = () => {
        toast.success("Payment processed successfully! Invoice sent to your email.")
        setPaymentDialogOpen(false)
        setSelectedAppointment(null)
    }

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-700">View and manage your appointments</p>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="border rounded-lg border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold text-gray-700">Doctor</TableHead>
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
                                        <TableCell className="font-medium text-gray-900">{appointment.doctor.name}</TableCell>
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
                                            {appointment.status === "completed" && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handlePayment(appointment)}
                                                >
                                                    <CreditCard className="mr-1 h-4 w-4" />
                                                    Pay Now
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <PaymentModal
                isOpen={paymentDialogOpen}
                onClose={() => {
                    setPaymentDialogOpen(false)
                    setSelectedAppointment(null)
                }}
                appointment={selectedAppointment}
            />
        </div>
    )
}
