import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { corsConfig } from "models-aryan";
import Stripe from "stripe";
const stripe = new Stripe('sk_test_51QqCYBGbArLeXveHf2HeAuDFzDvkahXfsAopObJsFXw71xp7jf5RIhfscsmrucxzZIxBIUYwQc9R3QxrsIeoccsr00e12edFmW');
const app = express();
// app.use(express.json({limit:"50mb"}));
app.use(cors(corsConfig));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP
    message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

const services = {
    auth: "http://localhost:5001",
    users: "http://localhost:5002",
    donations: "http://localhost:5003",
    tasks: "http://localhost:5004",
    inventory: "http://localhost:5005",
};

Object.entries(services).forEach(([route, target]) => {
    app.use(`/${route}`, createProxyMiddleware({ target, changeOrigin: true }));
});

app.use((err, req, res, next) => {
    console.error("Proxy Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});
app.use(express.json())
app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            automatic_payment_methods: { enabled: true }, // Enables multiple payment methods (UPI, Wallets, etc.)
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API Gateway running on port ${PORT}`));
