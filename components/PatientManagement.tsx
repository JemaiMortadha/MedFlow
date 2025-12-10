"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { patientSchema, type PatientInput } from "@/lib/validations"
import { toast } from "sonner"
import { Plus } from "lucide-react"

export function PatientManagement() {
    const [patients, setPatients] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PatientInput>({
        resolver: zodResolver(patientSchema),
    })

    useEffect(() => {
        fetchPatients()
    }, [])

    const fetchPatients = async () => {
        try {
            const res = await fetch("/api/patients")
            if (res.ok) {
                const data = await res.json()
                setPatients(data)
            }
        } catch (error) {
            toast.error("Failed to fetch patients")
        } finally {
            setLoading(false)
        }
    }

    const onSubmit = async (data: PatientInput) => {
        try {
            const res = await fetch("/api/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (res.ok) {
                toast.success("Patient added successfully")
                reset()
                setDialogOpen(false)
                fetchPatients()
            } else {
                toast.error("Failed to add patient")
            }
        } catch (error) {
            toast.error("An error occurred")
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Patients</h1>
                    <p className="text-gray-600">Manage patient records</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Patient
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Patient</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="text-gray-900 font-medium">Name *</Label>
                                <Input id="name" {...register("name")} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-gray-900 font-medium">Email *</Label>
                                <Input id="email" type="email" {...register("email")} />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="phone" className="text-gray-900 font-medium">Phone</Label>
                                <Input id="phone" {...register("phone")} />
                            </div>

                            <div>
                                <Label htmlFor="birthDate" className="text-gray-900 font-medium">Birth Date</Label>
                                <Input id="birthDate" type="date" {...register("birthDate")} />
                            </div>

                            <div>
                                <Label htmlFor="medicalHistory" className="text-gray-900 font-medium">Medical History</Label>
                                <Input id="medicalHistory" {...register("medicalHistory")} />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Adding..." : "Add Patient"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Birth Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-gray-500">
                                        No patients found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                patients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium text-gray-900">{patient.name}</TableCell>
                                        <TableCell className="text-gray-700">{patient.email}</TableCell>
                                        <TableCell className="text-gray-700">{patient.phone || "-"}</TableCell>
                                        <TableCell>
                                            {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : "-"}
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
