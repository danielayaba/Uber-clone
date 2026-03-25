import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    processPayment(body: {
        tripId: string;
        amount: number;
        method: 'cash' | 'card' | 'wallet';
    }): Promise<{
        success: boolean;
        transactionId: string;
        method: "card" | "cash" | "wallet";
        amount: number;
    }>;
}
