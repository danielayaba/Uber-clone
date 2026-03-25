import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class RedisService implements OnModuleInit, OnModuleDestroy {
    private client;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    setDriverLocation(driverId: string, lon: number, lat: number): Promise<void>;
    getNearestDrivers(lon: number, lat: number, radiusKm: number): Promise<string[]>;
}
