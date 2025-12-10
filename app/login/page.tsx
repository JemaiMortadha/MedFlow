"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            setLoading(true)
            setError("")

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                setError("Invalid email or password")
                return
            }

            const { user } = await res.json()

            // Redirect based on role
            const dashboardMap: Record<string, string> = {
                ADMIN: "/admin",
                DOCTOR: "/doctor",
                RECEPTIONIST: "/receptionist",
                PATIENT: "/patient",
            }

            router.push(dashboardMap[user.role] || "/admin")
        } catch (err) {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
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
                            <span className="text-2xl font-bold text-indigo-600">MedFlow</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-900">Sign in to MedFlow</CardTitle>
                    <CardDescription className="text-center text-gray-700">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                disabled={loading}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                disabled={loading}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>

                        <div className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <a href="/register" className="text-indigo-600 hover:underline font-medium">
                                Create an account
                            </a>
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-semibold text-blue-900 mb-2">Demo Accounts:</p>
                            <div className="text-xs text-blue-700 space-y-1">
                                <p>• admin@medflow.com / password</p>
                                <p>• dr.smith@medflow.com / password</p>
                                <p>• reception@medflow.com / password</p>
                                <p>• patient1@medflow.com / password</p>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
