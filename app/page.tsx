import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"

export default async function HomePage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const dashboardMap: Record<string, string> = {
    ADMIN: "/admin",
    DOCTOR: "/doctor",
    RECEPTIONIST: "/receptionist",
    PATIENT: "/patient",
  }

  redirect(dashboardMap[session.role] || "/login")
}
