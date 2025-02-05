// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import VehicleRoutes from "./Routes/VehicleRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/", VehicleRoutes);
//Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//handle unknown routes
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

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
