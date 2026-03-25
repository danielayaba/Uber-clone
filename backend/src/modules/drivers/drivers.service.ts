import { Injectable } from '@nestjs/common';

@Injectable()
export class DriversService {
  async getDriverDetails(driverId: string) {
    // Return driver from DB
    return { id: driverId, status: 'online', rating: 4.8 };
  }
}
