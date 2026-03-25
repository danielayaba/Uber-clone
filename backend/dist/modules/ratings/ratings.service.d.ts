export declare class RatingsService {
    submitRating(tripId: string, raterId: string, ratedId: string, rating: number, comment: string): Promise<{
        success: boolean;
        tripId: string;
        rating: number;
    }>;
}
