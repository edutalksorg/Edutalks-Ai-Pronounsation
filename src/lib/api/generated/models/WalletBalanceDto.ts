/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { PendingTransactionDto } from './PendingTransactionDto';
export type WalletBalanceDto = {
    readonly balance?: number;
    readonly currency?: string | null;
    readonly frozenAmount?: number;
    readonly availableBalance?: number;
    readonly totalEarnings?: number;
    readonly totalSpent?: number;
    readonly pendingTransactions?: Array<PendingTransactionDto> | null;
};

