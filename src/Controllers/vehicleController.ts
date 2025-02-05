import { Request, Response } from "express";
import { Vehicle } from "../Models/VehicleModel";
import { checkDriversLicense } from "../utils/helpers";

export const getVehicle = async (req: Request, res: Response) => {
    try {
        if (Object.keys(req.query).length === 0) {
            try {
                console.log("alles");
                const vehicles = await Vehicle.find();
                const checkVehicle = checkDriversLicense(vehicles);
                console.log("getVehicle");
                res.status(200).json(checkVehicle);
            } catch (error) {
                res.status(404).json({
                    message: "fout in de functie GetVehicle alles",
                });
            }
        } else {
            try {
                const { type, minPrijs, maxPrijs, minBouwjaar, maxBouwjaar } =
                    req.query;
                let filter: any = {};
                if (type && (type === "auto" || type === "moto"))
                    filter.type = type;
                if (minPrijs)
                    filter.prijs = { ...filter.prijs, $gte: Number(minPrijs) };
                if (maxPrijs)
                    filter.prijs = { ...filter.prijs, $lte: Number(maxPrijs) };
                if (minBouwjaar)
                    filter.bouwjaar = {
                        ...filter.bouwjaar,
                        $gte: Number(minBouwjaar),
                    };
                if (maxBouwjaar)
                    filter.bouwjaar = {
                        ...filter.bouwjaar,
                        $lte: Number(maxBouwjaar),
                    };

                const vehicles = await Vehicle.find(filter);
                const checkVehicle = checkDriversLicense(vehicles);
                console.log("filterVehicle");
                res.status(200).json(checkVehicle);
            } catch (error) {
                res.status(404).json({
                    message: "fout in de functie GetVehicle_filter",
                });
            }
        }
    } catch (error) {
        res.status(404).json({ message: "fout in de functie GetVehicle" });
    }
};

export const getVehicleById = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        const array = [];
        array.push(vehicle);
        const checkVehicle = checkDriversLicense(array);
        console.log("getVehicleById");
        res.status(200).json(checkVehicle);
    } catch (error) {
        res.status(404).json({ message: "fout in de functie GetVehicleById" });
    }
};

export const postVehicle = async (req: Request, res: Response) => {
    try {
        const { type, merk, model, bouwjaar, prijs, cc } = req.body;
        console.log(req.body);
        const vehicle = await Vehicle.create({
            type,
            merk,
            model,
            bouwjaar,
            prijs,
            cc,
        });

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(404).json({ message: "fout in de functie PostVehicle" });
    }
};

export const putVehicleById = async (req: Request, res: Response) => {
    try {
        const { type, merk, model, bouwjaar, prijs, cc } = req.body;
        console.log(req.body);
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, {
            type,
            merk,
            model,
            bouwjaar,
            prijs,
            cc,
        });

        res.status(201).json(vehicle);
    } catch (error) {
        res.status(404).json({ message: error });
    }
};

export const deleteVehicleById = async (req: Request, res: Response) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        console.log("2", vehicle);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(404).json({ message: "fout in de functie DeleteVehicle" });
    }
};
