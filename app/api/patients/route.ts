import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/session"

// GET /api/patients - List all patients
export async function GET(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const patients = await prisma.patient.findMany({
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(patients)
    } catch (error) {
        console.error("Error fetching patients:", error)
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        )
    }
}

// POST /api/patients - Create new patient
export async function POST(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session || (session.role !== "ADMIN" && session.role !== "RECEPTIONIST")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { name, email, phone, birthDate, medicalHistory } = body

        const patient = await prisma.patient.create({
            data: {
                name,
                email,
                phone,
                birthDate: birthDate ? new Date(birthDate) : null,
                medicalHistory,
            },
        })

        return NextResponse.json(patient, { status: 201 })
    } catch (error) {
        console.error("Error creating patient:", error)
        return NextResponse.json(
            { error: "Failed to create patient" },
            { status: 500 }
        )
    }
}
