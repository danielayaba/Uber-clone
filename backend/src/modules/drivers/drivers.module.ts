import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverAvailability } from './driver-availability.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Driver, DriverAvailability]),
    UsersModule,
  ],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
