import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/session"

// PATCH /api/appointments/[id] - Update appointment status
export async function PATCH(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { status } = await req.json()
        const params = await context.params
        const appointmentId = parseInt(params.id)

        const appointment = await prisma.appointment.update({
            where: { id: appointmentId },
            data: { status },
            include: {
                doctor: true,
                patient: true,
            },
        })

        return NextResponse.json(appointment)
    } catch (error) {
        console.error("Error updating appointment:", error)
        return NextResponse.json(
            { error: "Failed to update appointment" },
            { status: 500 }
        )
    }
}
