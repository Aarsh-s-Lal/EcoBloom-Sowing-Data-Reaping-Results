import User from "./model/User.js";
import Report from "./model/Report.js";
export {User , Report};
export const corsConfig = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    maxAge: 3600,
    credentials: true,
}
export const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
    retryWrites: true,
}
export const dbUrl = "mongodb+srv://aryan:Aryan123@cluster0.ym6ob.mongodb.net/pms?retryWrites=true&w=majority&appName=Cluster0"
export const ADMIN_SECRET = "ADMIN"
export const USER_SECRET = "USER"
export const MEMBER_SECRET = "MEMBER"