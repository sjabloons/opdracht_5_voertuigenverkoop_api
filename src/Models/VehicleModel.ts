import mongoose from "mongoose";

type IVehicle = {
    merk: string;
    model: string;
    bouwjaar: number;
    prijs: number;
    type: "car" | "moto";
    cc?: number; // Alleen vereist voor moto
};
function isMoto(this: IVehicle): boolean {
    return this.type === "moto";
}
const vehicleSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ["car", "moto"], required: true },
        merk: { type: String, required: true },
        model: { type: String, required: true },
        bouwjaar: { type: Number, required: true },
        prijs: { type: Number, required: true },
        cc: {
            type: Number,
            required: isMoto,
        },
    },
    {
        timestamps: true,
    }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
