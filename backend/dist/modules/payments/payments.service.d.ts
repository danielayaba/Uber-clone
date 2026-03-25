export declare class PaymentsService {
    processPayment(tripId: string, amount: number, method: 'cash' | 'card' | 'wallet'): Promise<{
        success: boolean;
        transactionId: string;
        method: "card" | "cash" | "wallet";
        amount: number;
    }>;
}
