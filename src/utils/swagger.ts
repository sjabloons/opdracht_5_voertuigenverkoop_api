import swaggerJSDoc from "swagger-jsdoc";
import { isProduction } from "../utils/helpers";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Voertuigenverkoop API",
            version: "1.0.0",
            description: "API voor het verkopen van voertuigen",
        },
        servers: [
            process.env.NODE_ENV !== "production"
                ? {
                      url: "http://localhost:3000/api/v1",
                      description: "Development server",
                  }
                : {
                      url: "https://opdracht-5-voertuigenverkoop-api.onrender.com",
                      description: "Production server",
                  },
        ],
        components: {
            schemas: {
                Vehicle: {
                    type: "object",
                    required: ["type", "merk", "model", "bouwjaar", "prijs"],
                    properties: {
                        id: { type: "string", description: "Voertuig ID" },
                        type: {
                            type: "string",
                            enum: ["auto", "moto"],
                            description: "Type voertuig",
                        },
                        merk: {
                            type: "string",
                            description: "Merk van het voertuig",
                        },
                        model: {
                            type: "string",
                            description: "Model van het voertuig",
                        },
                        bouwjaar: { type: "number", description: "Bouwjaar" },
                        prijs: { type: "number", description: "Prijs in euro" },
                        cc: {
                            type: "number",
                            description: "Cilinderinhoud (alleen voor moto's)",
                        },
                    },
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"], // Zorg dat je de juiste locatie gebruikt
};

export const swaggerSpec = swaggerJSDoc(options);
