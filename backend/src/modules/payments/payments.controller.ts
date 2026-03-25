import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  processPayment(@Body() body: { tripId: string; amount: number; method: 'cash' | 'card' | 'wallet' }) {
    return this.paymentsService.processPayment(body.tripId, body.amount, body.method);
  }
}
