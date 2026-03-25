import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://redis:6379',
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Connected to Redis');
  }

  async onModuleDestroy() {
    await this.client.disconnect();
  }

  // Set Geospatial Data
  async setDriverLocation(driverId: string, lon: number, lat: number) {
    await this.client.geoAdd('drivers_locations', {
      longitude: lon,
      latitude: lat,
      member: driverId,
    });
  }

  // Get nearest drivers within radius in km
  async getNearestDrivers(lon: number, lat: number, radiusKm: number) {
    return await this.client.geoSearch(
      'drivers_locations',
      { longitude: lon, latitude: lat },
      { radius: radiusKm, unit: 'km' },
    );
  }
}
