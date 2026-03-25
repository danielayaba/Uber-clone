import { DriversService } from './drivers.service';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
    getDriver(id: string): Promise<{
        id: string;
        status: string;
        rating: number;
    }>;
}
