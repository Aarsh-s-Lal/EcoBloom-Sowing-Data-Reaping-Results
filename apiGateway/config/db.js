import mongoose from "mongoose";

function connectDB() {
    const url = process.env.MONGODB_URI;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err));
        }
        export default connectDB; 