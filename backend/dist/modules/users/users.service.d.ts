import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SavedPlace } from './saved-place.entity';
export declare class UsersService {
    private userRepository;
    private savedPlaceRepository;
    constructor(userRepository: Repository<User>, savedPlaceRepository: Repository<SavedPlace>);
    findByEmail(email: string): Promise<User | undefined>;
    create(userDto: any): Promise<User>;
    getSavedPlaces(userId: string): Promise<SavedPlace[]>;
    addSavedPlace(userId: string, placeData: Partial<SavedPlace>): Promise<SavedPlace>;
}
