import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://reddyashok9:OhCMFBvqiT47T2Xk@mydemo.piofkut.mongodb.net/?retryWrites=true&w=majority&appName=mydemo");
        console.log("MongoDB connected");   
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}