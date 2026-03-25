import { User } from './user.entity';
export declare class SavedPlace {
    id: string;
    user: User;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
}
