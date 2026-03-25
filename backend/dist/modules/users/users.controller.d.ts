import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUser(email: string): Promise<import("./user.entity").User>;
    getSavedPlaces(id: string): Promise<import("./saved-place.entity").SavedPlace[]>;
    addSavedPlace(id: string, body: any): Promise<import("./saved-place.entity").SavedPlace>;
}
