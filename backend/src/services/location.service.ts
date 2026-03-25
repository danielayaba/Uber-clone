import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class LocationService {
  constructor(private readonly redisService: RedisService) {}

  async updateDriverLocation(driverId: string, lat: number, lng: number) {
    await this.redisService.setDriverLocation(driverId, lng, lat);
    // Also broadcast location to Redis Pub/Sub or emit event for Socket.IO
  }

  async findNearestDrivers(lat: number, lng: number, radius: number = 5) {
    const nearbyDrivers = await this.redisService.getNearestDrivers(lng, lat, radius);
    return nearbyDrivers;
  }
}
