"use client"

import { Sidebar } from "@/components/Sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
    session: {
        userId: number
        role: string
        name: string
        email: string
    }
}

export function DashboardLayout({ children, session }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar role={session.role} userName={session.name} />
            <main className="flex-1 overflow-y-auto bg-gray-50">
                {children}
            </main>
        </div>
    )
}
