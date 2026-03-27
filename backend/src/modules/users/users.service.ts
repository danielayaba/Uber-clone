import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SavedPlace } from './saved-place.entity';
import { Driver } from '../drivers/driver.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SavedPlace)
    private savedPlaceRepository: Repository<SavedPlace>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userDto: any): Promise<User> {
    const existingUser = await this.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException("L'adresse email est deja utilisee.");
    }
    const newUser = this.userRepository.create(userDto as User);
    const savedUser = await this.userRepository.save(newUser);

    if (savedUser.role === 'driver') {
      const driver = this.driverRepository.create({ user: savedUser });
      await this.driverRepository.save(driver);
    }

    return savedUser;
  }

  async getSavedPlaces(userId: string): Promise<SavedPlace[]> {
    return this.savedPlaceRepository.find({ where: { user: { id: userId } } });
  }

  async addSavedPlace(userId: string, placeData: Partial<SavedPlace>): Promise<SavedPlace> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    const newPlace = this.savedPlaceRepository.create({ ...placeData, user });
    return this.savedPlaceRepository.save(newPlace);
  }

  async updateOnlineStatus(userId: string, isOnline: boolean): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    user.isOnline = isOnline;
    return this.userRepository.save(user);
  }
}
