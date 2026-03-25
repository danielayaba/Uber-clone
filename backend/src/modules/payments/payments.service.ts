import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async processPayment(tripId: string, amount: number, method: 'cash' | 'card' | 'wallet') {
    // Process integration with Stripe/PayPal or handle cash
    return {
      success: true,
      transactionId: 'txn_' + Date.now(),
      method,
      amount,
    };
  }
}
