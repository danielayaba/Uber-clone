import { RedisService } from './redis.service';
export declare class LocationService {
    private readonly redisService;
    constructor(redisService: RedisService);
    updateDriverLocation(driverId: string, lat: number, lng: number): Promise<void>;
    findNearestDrivers(lat: number, lng: number, radius?: number): Promise<string[]>;
}
