export declare class DriversService {
    getDriverDetails(driverId: string): Promise<{
        id: string;
        status: string;
        rating: number;
    }>;
}
