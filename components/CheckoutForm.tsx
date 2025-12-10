"use client"

import { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CheckoutFormProps {
    amount: number
    onSuccess: () => void
}

export default function CheckoutForm({ amount, onSuccess }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL is required but we're handling it inline for this demo
                return_url: `${window.location.origin}/patient`,
            },
            redirect: "if_required", // Prevent redirect if not needed (e.g. card payments)
        })

        if (error) {
            setMessage(error.message || "An unexpected error occurred.")
            toast.error(error.message || "Payment failed")
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment succeeded!")
            toast.success("Payment successful!")
            onSuccess()
        } else {
            setMessage("Something went wrong.")
        }

        setIsLoading(false)
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

            {message && (
                <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-md">
                    {message}
                </div>
            )}

            <Button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
                <span id="button-text">
                    {isLoading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
                </span>
            </Button>
        </form>
    )
}
