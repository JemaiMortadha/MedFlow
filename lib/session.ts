import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "medflow-secret-key")

export async function createSession(userId: number, role: string, name: string, email: string) {
    const token = await new SignJWT({ userId, role, name, email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret)

    const cookieStore = await cookies()
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
    })

    return token
}

export async function getSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return null

    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as { userId: number; role: string; name: string; email: string }
    } catch {
        return null
    }
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}
