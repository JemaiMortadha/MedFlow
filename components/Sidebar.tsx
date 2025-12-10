import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface NavItem {
    label: string
    href: string
    icon: React.ReactNode
}

interface SidebarProps {
    role: string
    userName: string
}

export function Sidebar({ role, userName }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    const navItems = React.useMemo((): NavItem[] => {
        const baseItems = {
            ADMIN: [
                { label: "Dashboard", href: "/admin", icon: <HomeIcon /> },
                { label: "Patients", href: "/admin/patients", icon: <UsersIcon /> },
                { label: "Appointments", href: "/admin/appointments", icon: <CalendarIcon /> },
            ],
            DOCTOR: [
                { label: "Dashboard", href: "/doctor", icon: <HomeIcon /> },
                { label: "Appointments", href: "/doctor/appointments", icon: <CalendarIcon /> },
            ],
            RECEPTIONIST: [
                { label: "Dashboard", href: "/receptionist", icon: <HomeIcon /> },
                { label: "Patients", href: "/receptionist/patients", icon: <UsersIcon /> },
                { label: "Appointments", href: "/receptionist/appointments", icon: <CalendarIcon /> },
            ],
            PATIENT: [
                { label: "Dashboard", href: "/patient", icon: <HomeIcon /> },
                { label: "My Appointments", href: "/patient/appointments", icon: <CalendarIcon /> },
            ],
        }

        return baseItems[role as keyof typeof baseItems] || []
    }, [role])

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" })
        router.push("/login")
    }

    return (
        <div className="flex h-screen w-64 flex-col bg-white border-r">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <div className="flex items-center gap-2">
                    <svg
                        className="h-8 w-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <span className="text-xl font-bold text-indigo-600">MedFlow</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User menu */}
            <div className="border-t p-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-semibold">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col items-start text-sm">
                                    <span className="font-medium text-gray-900">{userName}</span>
                                    <span className="text-xs text-gray-500">{role}</span>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={handleLogout} className="text-gray-900 font-medium cursor-pointer">
                            <LogOutIcon className="mr-2 h-4 w-4" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

// Icon Components
function HomeIcon() {
    return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    )
}

function UsersIcon() {
    return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
    )
}

function LogOutIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
    )
}

// Missing React import
import * as React from "react"
