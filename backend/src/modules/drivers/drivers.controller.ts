import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get(':id')
  getDriver(@Param('id') id: string) {
    return this.driversService.getDriverDetails(id);
  }

  @Post('status')
  async toggleStatus(@Body() body: { isOnline: boolean }, @Request() req: any) {
    const driverId = body['driverId'] || req.user?.id; 
    return this.driversService.updateStatus(driverId, body.isOnline);
  }

  @Post('location')
  async updateLocation(@Body() body: any, @Request() req: any) {
    const driverId = body['driverId'] || req.user?.id;
    return this.driversService.updateLocation(driverId, body);
  }
}
