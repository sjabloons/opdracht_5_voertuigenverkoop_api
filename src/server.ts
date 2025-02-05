// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Database connection
try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connection OK");
} catch (err) {
    console.error(err);
    process.exit(1);
}

// Server Listening
const connectDB = async () => {
    try {
        console.log("ok");
        await mongoose.connect(process.env.MONGO_URI!);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Database connection successful");
        });
    } catch (error) {
        console.log(error);
    }
};

connectDB();
