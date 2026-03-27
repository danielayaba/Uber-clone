import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Driver } from './driver.entity';
import { DriverAvailability } from './driver-availability.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(DriverAvailability)
    private availabilityRepository: Repository<DriverAvailability>,
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
}
