/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdjustWalletBalanceRequest } from '../models/AdjustWalletBalanceRequest';
import type { ApproveRefundRequest } from '../models/ApproveRefundRequest';
import type { ApproveWithdrawalRequest } from '../models/ApproveWithdrawalRequest';
import type { CompleteWithdrawalRequest } from '../models/CompleteWithdrawalRequest';
import type { RefundRequestDetailsDtoPaginatedResult } from '../models/RefundRequestDetailsDtoPaginatedResult';
import type { RefundStatus } from '../models/RefundStatus';
import type { RejectRefundRequest } from '../models/RejectRefundRequest';
import type { RejectWithdrawalRequest } from '../models/RejectWithdrawalRequest';
import type { TransactionDtoPaginatedResult } from '../models/TransactionDtoPaginatedResult';
import type { TransactionStatus } from '../models/TransactionStatus';
import type { TransactionType } from '../models/TransactionType';
import type { WithdrawalRequestDetailsDtoPaginatedResult } from '../models/WithdrawalRequestDetailsDtoPaginatedResult';
import type { WithdrawalStatus } from '../models/WithdrawalStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminPaymentsService {
    /**
     * Get all transactions with filters (Admin)
     * @param pageNumber
     * @param pageSize
     * @param type
     * @param status
     * @param startDate
     * @param endDate
     * @returns TransactionDtoPaginatedResult OK
     * @throws ApiError
     */
    public static getApiV1AdminPaymentsTransactions(
        pageNumber: number = 1,
        pageSize: number = 50,
        type?: TransactionType,
        status?: TransactionStatus,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<TransactionDtoPaginatedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/payments/transactions',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'type': type,
                'status': status,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Get pending withdrawal requests
     * @param pageNumber
     * @param pageSize
     * @param status
     * @returns WithdrawalRequestDetailsDtoPaginatedResult OK
     * @throws ApiError
     */
    public static getApiV1AdminPaymentsWithdrawalsPending(
        pageNumber: number = 1,
        pageSize: number = 20,
        status?: WithdrawalStatus,
    ): CancelablePromise<WithdrawalRequestDetailsDtoPaginatedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/payments/withdrawals/pending',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'status': status,
            },
        });
    }
    /**
     * Approve withdrawal request
     * @param withdrawalId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsWithdrawalsApprove(
        withdrawalId: string,
        requestBody?: ApproveWithdrawalRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/withdrawals/{withdrawalId}/approve',
            path: {
                'withdrawalId': withdrawalId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Reject withdrawal request
     * @param withdrawalId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsWithdrawalsReject(
        withdrawalId: string,
        requestBody?: RejectWithdrawalRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/withdrawals/{withdrawalId}/reject',
            path: {
                'withdrawalId': withdrawalId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Complete withdrawal (after bank transfer)
     * @param withdrawalId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsWithdrawalsComplete(
        withdrawalId: string,
        requestBody?: CompleteWithdrawalRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/withdrawals/{withdrawalId}/complete',
            path: {
                'withdrawalId': withdrawalId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get pending refund requests
     * @param pageNumber
     * @param pageSize
     * @param status
     * @returns RefundRequestDetailsDtoPaginatedResult OK
     * @throws ApiError
     */
    public static getApiV1AdminPaymentsRefundsPending(
        pageNumber: number = 1,
        pageSize: number = 20,
        status?: RefundStatus,
    ): CancelablePromise<RefundRequestDetailsDtoPaginatedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/payments/refunds/pending',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'status': status,
            },
        });
    }
    /**
     * Approve refund request
     * @param refundId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsRefundsApprove(
        refundId: string,
        requestBody?: ApproveRefundRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/refunds/{refundId}/approve',
            path: {
                'refundId': refundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reject refund request
     * @param refundId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsRefundsReject(
        refundId: string,
        requestBody?: RejectRefundRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/refunds/{refundId}/reject',
            path: {
                'refundId': refundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Manual wallet balance adjustment
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AdminPaymentsWalletsAdjustBalance(
        requestBody?: AdjustWalletBalanceRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/payments/wallets/adjust-balance',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
