/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { TransactionType } from './TransactionType';
export type AdjustWalletBalanceRequest = {
    userId?: string | null;
    amount?: number;
    type?: TransactionType;
    reason?: string | null;
};

