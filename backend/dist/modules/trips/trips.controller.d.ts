import { TripsService } from './trips.service';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    requestRide(body: {
        riderId: string;
        pickupLat: number;
        pickupLng: number;
        dropLat: number;
        dropLng: number;
    }): Promise<{
        message: string;
        status: string;
        tripCode: string;
        notifiedDrivers: string[];
    }>;
    acceptRide(tripId: string, driverId: string): Promise<{
        status: string;
        tripId: string;
        driverId: string;
    }>;
    verifyRide(tripId: string, code: string): Promise<{
        status: string;
        tripId: string;
    }>;
    completeRide(tripId: string): Promise<{
        status: string;
        tripId: string;
    }>;
}
