import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Driver } from './driver.entity';
import { DriverAvailability } from './driver-availability.entity';
import { DriverLocation } from './driver-location.entity';
import { DriverLocationHistory } from './driver-location-history.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(DriverAvailability)
    private availabilityRepository: Repository<DriverAvailability>,
    @InjectRepository(DriverLocation)
    private locationRepository: Repository<DriverLocation>,
    @InjectRepository(DriverLocationHistory)
    private historyRepository: Repository<DriverLocationHistory>,
    private usersService: UsersService,
  ) {}

  async getDriverDetails(userId: string) {
    const driver = await this.driverRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user']
    });
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async updateStatus(userId: string, isAvailable: boolean) {
    const driver = await this.getDriverDetails(userId);
    
    // 1. Update Driver Status (online/offline)
    driver.status = isAvailable ? 'online' : 'offline';
    await this.driverRepository.save(driver);

    // 2. Update Driver Availability
    let availability = await this.availabilityRepository.findOne({
      where: { driverId: driver.id }
    });

    if (!availability) {
      availability = this.availabilityRepository.create({
        driverId: driver.id,
        isAvailable
      });
    } else {
      availability.isAvailable = isAvailable;
    }
    
    await this.availabilityRepository.save(availability);

    // 3. Update User isOnline (Implicitly keep consistent for now)
    await this.usersService.updateOnlineStatus(userId, isAvailable);

    return { status: driver.status, isAvailable };
  }

  async updateLocation(userId: string, data: any) {
    const driver = await this.getDriverDetails(userId);

    // 1. Update Latest Location
    let location = await this.locationRepository.findOne({
      where: { driverId: driver.id }
    });

    if (!location) {
      location = this.locationRepository.create({
        driverId: driver.id,
        latitude: data.latitude,
        longitude: data.longitude,
        heading: data.heading,
        speed: data.speed,
        accuracy: data.accuracy,
      } as Partial<DriverLocation>);
    } else {
      Object.assign(location, data);
    }
    await this.locationRepository.save(location);

    // 2. Add to History
    await this.historyRepository.insert({
      driverId: driver.id,
      latitude: data.latitude,
      longitude: data.longitude,
      heading: data.heading,
    });

    return { success: true };
  }
}
