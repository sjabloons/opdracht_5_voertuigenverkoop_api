const mongoose = require("mongoose");

type IVehicle = {
    brand: string;
    model: string;
    yearConstruction: number;
    price: number;
    type: "car" | "moto";
    cc?: number; // Alleen vereist voor moto
};
function isMoto(this: IVehicle): boolean {
    return this.type === "moto";
}
const vehicleSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    yearConstruction: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ["car", "moto"], required: true },
    cc: {
        type: Number,
        required: isMoto,
    },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
