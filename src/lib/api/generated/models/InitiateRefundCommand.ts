/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { RefundDestination } from './RefundDestination';
import type { RefundReason } from './RefundReason';
export type InitiateRefundCommand = {
    transactionId?: string | null;
    amount?: number | null;
    reason?: RefundReason;
    reasonDescription?: string | null;
    destination?: RefundDestination;
};

