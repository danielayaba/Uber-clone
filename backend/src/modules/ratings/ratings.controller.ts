import { Controller, Post, Body } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  submitRating(@Body() body: { tripId: string; raterId: string; ratedId: string; rating: number; comment: string }) {
    return this.ratingsService.submitRating(body.tripId, body.raterId, body.ratedId, body.rating, body.comment);
  }
}
