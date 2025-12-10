import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export const patientSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
    medicalHistory: z.string().optional(),
})

export const appointmentSchema = z.object({
    patientId: z.string().min(1, "Please select a patient"),
    doctorId: z.string().min(1, "Please select a doctor"),
    date: z.string().min(1, "Please select a date and time"),
})


export type LoginInput = z.infer<typeof loginSchema>
export type PatientInput = z.infer<typeof patientSchema>
export type AppointmentInput = z.infer<typeof appointmentSchema>
