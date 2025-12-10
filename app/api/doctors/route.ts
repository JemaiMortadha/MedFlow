import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getSession } from "@/lib/session"

// GET /api/doctors - List all doctors
export async function GET(req: NextRequest) {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const doctors = await prisma.user.findMany({
            where: { role: "DOCTOR" },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        return NextResponse.json(doctors)
    } catch (error) {
        console.error("Error fetching doctors:", error)
        return NextResponse.json(
            { error: "Failed to fetch doctors" },
            { status: 500 }
        )
    }
}
