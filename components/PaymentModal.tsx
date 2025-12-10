"use client"

import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm"
import { toast } from "sonner"

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder")

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    appointment: {
        id: number
        date: string
        doctor: { name: string }
    } | null
}

export function PaymentModal({ isOpen, onClose, appointment }: PaymentModalProps) {
    const [clientSecret, setClientSecret] = useState("")
    const amount = 50.00 // Fixed consultation fee for demo

    useEffect(() => {
        if (isOpen && appointment) {
            // Create PaymentIntent as soon as the modal opens
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    appointmentId: appointment.id,
                    doctorName: appointment.doctor.name
                }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret))
                .catch((error) => {
                    console.error("Error:", error)
                    toast.error("Failed to initialize payment")
                })
        }
    }, [isOpen, appointment])

    const handleSuccess = () => {
        onClose()
        // In a real app, you might want to refresh the appointment list here
        // or redirect to a success page
    }

    if (!appointment) return null

    const appearance = {
        theme: 'stripe' as const,
    }
    const options = {
        clientSecret,
        appearance,
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="text-gray-900">Pay Invoice</DialogTitle>
                    <DialogDescription className="text-gray-700">
                        Consultation with {appointment.doctor.name} on {new Date(appointment.date).toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="mb-6 text-center">
                        <span className="text-3xl font-bold text-gray-900">${amount.toFixed(2)}</span>
                    </div>

                    {clientSecret ? (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm amount={amount} onSuccess={handleSuccess} />
                        </Elements>
                    ) : (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
