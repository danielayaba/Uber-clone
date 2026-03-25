import { RatingsService } from './ratings.service';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    submitRating(body: {
        tripId: string;
        raterId: string;
        ratedId: string;
        rating: number;
        comment: string;
    }): Promise<{
        success: boolean;
        tripId: string;
        rating: number;
    }>;
}
