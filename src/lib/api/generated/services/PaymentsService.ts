/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InitiateRefundCommand } from '../models/InitiateRefundCommand';
import type { PaymentHistoryDto } from '../models/PaymentHistoryDto';
import type { PaymentStatusDto } from '../models/PaymentStatusDto';
import type { ProcessPaymentCommand } from '../models/ProcessPaymentCommand';
import type { ProcessPaymentResponseDto } from '../models/ProcessPaymentResponseDto';
import type { RefundRequestDto } from '../models/RefundRequestDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * Process payment for course/subscription
     * @param requestBody
     * @returns ProcessPaymentResponseDto OK
     * @throws ApiError
     */
    public static postApiV1PaymentsProcess(
        requestBody?: ProcessPaymentCommand,
    ): CancelablePromise<ProcessPaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/process',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Check payment status by transaction ID
     * @param transactionId Transaction ID to check
     * @returns PaymentStatusDto Returns payment status details
     * @throws ApiError
     */
    public static getApiV1PaymentsStatus(
        transactionId: string,
    ): CancelablePromise<PaymentStatusDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/payments/{transactionId}/status',
            path: {
                'transactionId': transactionId,
            },
            errors: {
                404: `Transaction not found`,
            },
        });
    }
    /**
     * Get payment history
     * @param pageNumber
     * @param pageSize
     * @returns PaymentHistoryDto OK
     * @throws ApiError
     */
    public static getApiV1PaymentsHistory(
        pageNumber: number = 1,
        pageSize: number = 20,
    ): CancelablePromise<Array<PaymentHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/payments/history',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * Initiate refund request (admin approval required)
     * @param transactionId
     * @param requestBody
     * @returns RefundRequestDto OK
     * @throws ApiError
     */
    public static postApiV1PaymentsRefund(
        transactionId: string,
        requestBody?: InitiateRefundCommand,
    ): CancelablePromise<RefundRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/{transactionId}/refund',
            path: {
                'transactionId': transactionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * PhonePe webhook endpoint
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1PaymentsPhonepeCallback(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/phonepe/callback',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * PhonePe redirect URL endpoint (public)
     * After payment completion, user is redirected here from PhonePe
     * @param formData
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1PaymentsPhonepeRedirect(
        formData?: {
            transactionId?: string;
            status?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/phonepe/redirect',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                302: `Redirects to frontend payment status page`,
            },
        });
    }
}
