import express from "express";
import cors from "cors";
import { corsConfig, dbUrl } from "models-aryan";
import { LoginController } from "./controllers/login.js";
import { signUpController } from "./controllers/signUp.js";
import { getProfile, isAuthenticatedMiddleware } from "./controllers/getProfile.js";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();
const PORT = 5001;


(async () => {
    try {
        await mongoose.connect(dbUrl)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
})() // IIVF
app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan("dev"));

app.use('/login', LoginController);
app.use('/signup', signUpController);
app.use('/profile', isAuthenticatedMiddleware, getProfile)

// Start Auth Service
app.listen(PORT, () => console.log(`✅ Auth Service running on port ${PORT}`));
