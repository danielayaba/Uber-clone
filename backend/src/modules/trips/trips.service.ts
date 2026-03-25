import { Injectable, BadRequestException } from '@nestjs/common';
import { LocationService } from '../../services/location.service';
@Injectable()
export class TripsService {
  constructor(private readonly locationService: LocationService) {}

  // requested, driver_assigned, driver_arriving, waiting_code, in_progress, completed, cancelled
  
  async requestRide(riderId: string, pickupLat: number, pickupLng: number, dropLat: number, dropLng: number) {
    // 1. Find nearest drivers using Redis
    const nearbyDrivers = await this.locationService.findNearestDrivers(pickupLat, pickupLng, 5); // 5km radius
    
    if (!nearbyDrivers || nearbyDrivers.length === 0) {
      throw new BadRequestException('No drivers available nearby');
    }

    // 2. Create Trip in database (pseudo-code)
    // const trip = await this.tripRepository.save({ ... })
    
    // 3. Generate 6-digit ride code
    const tripCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Notify nearest driver via Socket.IO
    // Emit 'ride_requested' event (handled in Gateway)

    return {
      message: 'Ride requested successfully',
      status: 'requested',
      tripCode,
      notifiedDrivers: nearbyDrivers,
    };
  }

  async acceptRide(driverId: string, tripId: string) {
    // Update trip status to 'driver_assigned' and 'driver_arriving'
    return { status: 'driver_arriving', tripId, driverId };
  }

  async verifyRideCode(tripId: string, code: string) {
    // Check code in DB matching trip
    // If match, change status to 'in_progress'
    return { status: 'in_progress', tripId };
  }

  async completeRide(tripId: string) {
    // Change status to 'completed'
    // Trigger Payment logic
    return { status: 'completed', tripId };
  }
}
