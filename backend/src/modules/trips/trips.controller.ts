import { Controller, Post, Body, Param } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post('request')
  requestRide(@Body() body: { riderId: string; pickupLat: number; pickupLng: number; dropLat: number; dropLng: number }) {
    return this.tripsService.requestRide(body.riderId, body.pickupLat, body.pickupLng, body.dropLat, body.dropLng);
  }

  @Post(':id/accept')
  acceptRide(@Param('id') tripId: string, @Body('driverId') driverId: string) {
    return this.tripsService.acceptRide(driverId, tripId);
  }

  @Post(':id/verify')
  verifyRide(@Param('id') tripId: string, @Body('code') code: string) {
    return this.tripsService.verifyRideCode(tripId, code);
  }

  @Post(':id/complete')
  completeRide(@Param('id') tripId: string) {
    return this.tripsService.completeRide(tripId);
  }
}
