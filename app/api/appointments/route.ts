import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/session"

// GET /api/appointments - List appointments
export async function GET(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const searchParams = req.nextUrl.searchParams
        const doctorId = searchParams.get("doctorId")
        const patientId = searchParams.get("patientId")

        const where = {
            ...(doctorId && { doctorId: parseInt(doctorId) }),
            ...(patientId && { patientId: parseInt(patientId) }),
        }

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                doctor: true,
                patient: true,
            },
            orderBy: { date: "asc" },
        })

        return NextResponse.json(appointments)
    } catch (error) {
        console.error("Error fetching appointments:", error)
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        )
    }
}

// POST /api/appointments - Create new appointment
export async function POST(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session || (session.role !== "ADMIN" && session.role !== "RECEPTIONIST")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { patientId, doctorId, date } = body

        const appointment = await prisma.appointment.create({
            data: {
                patientId,
                doctorId,
                date: new Date(date),
                status: "scheduled",
            },
            include: {
                doctor: true,
                patient: true,
            },
        })

        return NextResponse.json(appointment, { status: 201 })
    } catch (error) {
        console.error("Error creating appointment:", error)
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        )
    }
}
