export const isProduction: boolean = process.env.NODE_ENV === "production";

function getDriversLicense(cc: number) {
    if (cc <= 125) {
        return "A1";
    }
    if (cc <= 500) {
        return "A2";
    } else {
        return "A";
    }
}
export const checkDriversLicense = function (vehicles: any) {
    const test = vehicles.map((vehicle: { toObject: () => any }) => {
        const vehicleObj = vehicle.toObject();
        if (vehicleObj.type === "moto") {
            vehicleObj.driversLicense = getDriversLicense(vehicleObj.cc);
        }
        return vehicleObj;
    });
    return test;
};
