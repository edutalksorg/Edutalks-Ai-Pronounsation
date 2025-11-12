/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
export type RefundRequestDetailsDto = {
    id?: string | null;
    userId?: string | null;
    transactionId?: string | null;
    amount?: number;
    currency?: string | null;
    reason?: string | null;
    reasonDescription?: string | null;
    status?: string | null;
    destination?: string | null;
    stripeRefundId?: string | null;
    rejectionReason?: string | null;
    createdAt?: string;
    processedAt?: string | null;
    processedBy?: string | null;
};

