/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { AddFundsCommand } from '../models/AddFundsCommand';
import type { AddFundsResponseDto } from '../models/AddFundsResponseDto';
import type { RequestWithdrawalCommand } from '../models/RequestWithdrawalCommand';
import type { TransactionDto } from '../models/TransactionDto';
import type { TransactionStatus } from '../models/TransactionStatus';
import type { TransactionType } from '../models/TransactionType';
import type { WalletBalanceDto } from '../models/WalletBalanceDto';
import type { WithdrawalRequestDto } from '../models/WithdrawalRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WalletService {
    /**
     * Get current wallet balance and pending transactions
     * @returns WalletBalanceDto OK
     * @throws ApiError
     */
    public static getApiV1WalletBalance(): CancelablePromise<WalletBalanceDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/wallet/balance',
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * Top-up wallet
     * @param requestBody
     * @returns AddFundsResponseDto OK
     * @throws ApiError
     */
    public static postApiV1WalletAddFunds(
        requestBody?: AddFundsCommand,
    ): CancelablePromise<AddFundsResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/wallet/add-funds',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get transaction history with pagination and filters
     * @param pageNumber
     * @param pageSize
     * @param startDate
     * @param endDate
     * @param type
     * @param status
     * @returns TransactionDto OK
     * @throws ApiError
     */
    public static getApiV1WalletTransactions(
        pageNumber: number = 1,
        pageSize: number = 20,
        startDate?: string,
        endDate?: string,
        type?: TransactionType,
        status?: TransactionStatus,
    ): CancelablePromise<Array<TransactionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/wallet/transactions',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'startDate': startDate,
                'endDate': endDate,
                'type': type,
                'status': status,
            },
        });
    }
    /**
     * Request withdrawal to bank account
     * @param requestBody
     * @returns WithdrawalRequestDto OK
     * @throws ApiError
     */
    public static postApiV1WalletWithdraw(
        requestBody?: RequestWithdrawalCommand,
    ): CancelablePromise<WithdrawalRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/wallet/withdraw',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                402: `Payment Required`,
            },
        });
    }
}
