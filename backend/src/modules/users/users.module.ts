import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SavedPlace } from './saved-place.entity';
import { Driver } from '../drivers/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, SavedPlace, Driver])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
