import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id/saved-places')
  getSavedPlaces(@Param('id') id: string) {
    return this.usersService.getSavedPlaces(id);
  }

  @Post(':id/saved-places')
  addSavedPlace(@Param('id') id: string, @Body() body: any) {
    return this.usersService.addSavedPlace(id, body);
  }
}
