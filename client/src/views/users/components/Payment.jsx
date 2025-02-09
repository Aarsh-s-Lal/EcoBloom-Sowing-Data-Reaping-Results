import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// ✅ Use the correct **PUBLISHABLE** key
const stripePromise = loadStripe("pk_test_51QqCYBGbArLeXveHefqfFErqYr0KZ95lYpA9TE0SBc96c4h5RRJtYCqK9EasmOA8Q9Bbg36GUhQwXC4O9AfJHVOC00i3gRoidP");

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setMessage("Stripe is not fully loaded. Please try again.");
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:5173/",
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Payment successful!");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <PaymentElement />
            <button type="submit" disabled={!stripe || loading} style={{ marginTop: 20, padding: 10, width: "100%" }}>
                {loading ? "Processing..." : `Pay ₹${amount}`}
            </button>
            {message && <p style={{ color: "red", marginTop: 10 }}>{message}</p>}
        </form>
    );
};

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(10000); // Default ₹100.00

    const fetchPaymentIntent = (amt) => {
        if (!amt || amt < 100) return; // Minimum ₹1.00
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: amt * 100 }), // Convert to paisa
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("Error fetching clientSecret:", data);
                }
            })
            .catch((err) => console.error("Fetch error:", err));
    };

    useEffect(() => {
        fetchPaymentIntent(amount);
    }, [amount]);

    return (
        <div>
            <h2 className=" mx-8 text-start mt-5">Enter Donation Amount</h2>

            {/* Quick Suggestion Buttons */}
            <div className="mx-8 flex gap-2 -mb-4 mt-2 flex-col-reverse" >
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 10 }}>
                    {[100, 200, 500, 2000,10000].map((amt) => (
                        <button
                            key={amt}
                            onClick={() => setAmount(amt)}
                            style={{
                                padding: 10,
                                border: "1px solid #007bff",
                                background: amount === amt ? "#007bff" : "white",
                                color: amount === amt ? "white" : "#007bff",
                                borderRadius: 5,
                                cursor: "pointer",
                            }}
                        >
                            ₹{amt}
                        </button>
                    ))}
                </div>

                {/* Custom Amount Input */}
                <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter custom amount"
                    className="p-2 border"
                />
            </div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm amount={amount} />
                </Elements>
            ) : (
                <p>Loading payment options...</p>
            )}
        </div>
    );
};

export default Payment;
