import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { createSession } from "@/lib/session"

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()
        console.log('🔐 Login attempt:', { email, hasPassword: !!password })

        if (!email || !password) {
            console.log('❌ Missing credentials')
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        console.log('👤 User lookup:', user ? { id: user.id, email: user.email, role: user.role } : 'NOT FOUND')

        if (!user) {
            console.log('❌ User not found')
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        console.log('🔑 Password check:', { match: user.password === password })

        if (user.password !== password) {
            console.log('❌ Password mismatch')
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        console.log('✅ Creating session...')
        await createSession(user.id, user.role, user.name, user.email)

        console.log('✅ Login successful!')
        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        })
    } catch (error) {
        console.error("💥 Login error:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
