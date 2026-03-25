import { Controller, Get, Param } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get(':id')
  getDriver(@Param('id') id: string) {
    return this.driversService.getDriverDetails(id);
  }
}
