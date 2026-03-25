import { LocationService } from '../../services/location.service';
export declare class TripsService {
    private readonly locationService;
    constructor(locationService: LocationService);
    requestRide(riderId: string, pickupLat: number, pickupLng: number, dropLat: number, dropLng: number): Promise<{
        message: string;
        status: string;
        tripCode: string;
        notifiedDrivers: string[];
    }>;
    acceptRide(driverId: string, tripId: string): Promise<{
        status: string;
        tripId: string;
        driverId: string;
    }>;
    verifyRideCode(tripId: string, code: string): Promise<{
        status: string;
        tripId: string;
    }>;
    completeRide(tripId: string): Promise<{
        status: string;
        tripId: string;
    }>;
}
