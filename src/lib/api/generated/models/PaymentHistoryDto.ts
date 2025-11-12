/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { PaymentStatus } from './PaymentStatus';
import type { TransactionDto } from './TransactionDto';
export type PaymentHistoryDto = {
    id?: string | null;
    transactionId?: string | null;
    paymentProvider?: string | null;
    paymentProviderTransactionId?: string | null;
    receiptUrl?: string | null;
    amount?: number;
    currency?: string | null;
    status?: PaymentStatus;
    paymentMethodType?: string | null;
    last4?: string | null;
    brand?: string | null;
    failureCode?: string | null;
    failureMessage?: string | null;
    stripeEventId?: string | null;
    merchantOrderId?: string | null;
    createdAt?: string | null;
    completedAt?: string | null;
    transaction?: TransactionDto;
};

