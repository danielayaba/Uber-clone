import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class DriversService {
  constructor(private usersService: UsersService) {}

  async getDriverDetails(driverId: string) {
    // Return driver from DB
    return this.usersService.updateOnlineStatus(driverId, true); // Placeholder/Temporary
  }

  async updateStatus(driverId: string, isOnline: boolean) {
    return this.usersService.updateOnlineStatus(driverId, isOnline);
  }
}
