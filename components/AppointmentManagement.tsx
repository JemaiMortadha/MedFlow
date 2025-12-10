"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema, type AppointmentInput } from "@/lib/validations"
import { toast } from "sonner"
import { Plus, Calendar } from "lucide-react"

interface Appointment {
    id: number
    date: string
    status: string
    doctor: { id: number; name: string }
    patient: { id: number; name: string }
}

interface Doctor {
    id: number
    name: string
}

interface Patient {
    id: number
    name: string
}

export function AppointmentManagement() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [patients, setPatients] = useState<Patient[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AppointmentInput>({
        resolver: zodResolver(appointmentSchema),
    })

    useEffect(() => {
        fetchAppointments()
        fetchDoctors()
        fetchPatients()
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

    const fetchDoctors = async () => {
        try {
            const res = await fetch("/api/doctors")
            if (res.ok) {
                const data = await res.json()
                setDoctors(data)
            }
        } catch (error) {
            console.error("Failed to fetch doctors")
        }
    }

    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/patients")
            if (res.ok) {
                const data = await res.json()
                setPatients(data)
            }
        } catch (error) {
            console.error("Failed to fetch patients")
        }
    }

    const onSubmit = async (data: AppointmentInput) => {
        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId: parseInt(data.patientId),
                    doctorId: parseInt(data.doctorId),
                    date: data.date,
                }),
            })

            if (res.ok) {
                toast.success("Appointment booked successfully")
                reset()
                setDialogOpen(false)
                fetchAppointments()
            } else {
                toast.error("Failed to book appointment")
            }
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-gray-700">Manage clinic appointments</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Book Appointment
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Book New Appointment</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="patientId" className="text-gray-900 font-medium">Patient *</Label>
                                <Controller
                                    name="patientId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select patient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {patients.map((patient) => (
                                                    <SelectItem key={patient.id} value={patient.id.toString()}>
                                                        {patient.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.patientId && <p className="text-sm text-red-500">{errors.patientId.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="doctorId" className="text-gray-900 font-medium">Doctor *</Label>
                                <Controller
                                    name="doctorId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select doctor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {doctors.map((doctor) => (
                                                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                                        {doctor.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.doctorId && <p className="text-sm text-red-500">{errors.doctorId.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="date" className="text-gray-900 font-medium">Date & Time *</Label>
                                <Input id="date" type="datetime-local" {...register("date")} />
                                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Booking..." : "Book Appointment"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="border rounded-lg border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-semibold text-gray-700">Patient</TableHead>
                                <TableHead className="font-semibold text-gray-700">Doctor</TableHead>
                                <TableHead className="font-semibold text-gray-700">Date & Time</TableHead>
                                <TableHead className="font-semibold text-gray-700">Status</TableHead>
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
                                        <TableCell className="text-gray-700">{appointment.doctor.name}</TableCell>
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
