import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { name, email, password } = body

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            )
        }

        // Create user and patient record in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the User
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password, // In a real app, hash this password!
                    role: "PATIENT",
                },
            })

            // 2. Create the Patient profile linked to the user
            const patient = await tx.patient.create({
                data: {
                    name,
                    email,
                    user: {
                        connect: { id: user.id },
                    },
                },
            })

            // 3. Update user with patientId
            await tx.user.update({
                where: { id: user.id },
                data: { patientId: patient.id },
            })

            return user
        })

        return NextResponse.json(
            { message: "User registered successfully", userId: result.id },
            { status: 201 }
        )
    } catch (error) {
        console.error("Registration error:", error)
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 500 }
        )
    }
}
