import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverAvailability } from './driver-availability.entity';
import { DriverLocation } from './driver-location.entity';
import { DriverLocationHistory } from './driver-location-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, DriverAvailability, DriverLocation, DriverLocationHistory]),
    UsersModule,
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
