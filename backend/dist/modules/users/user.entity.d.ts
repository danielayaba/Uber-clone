import { SavedPlace } from './saved-place.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
    profilePhoto: string;
    isVerified: boolean;
    createdAt: Date;
    savedPlaces: SavedPlace[];
}
