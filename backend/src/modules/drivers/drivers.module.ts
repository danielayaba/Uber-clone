import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [DriversService],
  controllers: [DriversController],
  exports: [DriversService],
})
export class DriversModule {}
