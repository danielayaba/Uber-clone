import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { LocationService } from '../../services/location.service';
import { RedisService } from '../../services/redis.service';

@Module({
  providers: [TripsService, LocationService, RedisService],
  controllers: [TripsController],
  exports: [TripsService],
})
export class TripsModule {}
