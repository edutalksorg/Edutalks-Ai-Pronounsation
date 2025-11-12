/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { BooleanResult } from '../models/BooleanResult';
import type { ReferralCodeDtoResult } from '../models/ReferralCodeDtoResult';
import type { ReferralHistoryDto } from '../models/ReferralHistoryDto';
import type { ReferralStatsDtoResult } from '../models/ReferralStatsDtoResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReferralsService {
    /**
     * Get authenticated user's referral code and shareable URL
     * @returns ReferralCodeDtoResult OK
     * @throws ApiError
     */
    public static getApiV1ReferralsMyCode(): CancelablePromise<ReferralCodeDtoResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/referrals/my-code',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get referral statistics for authenticated user
     * @returns ReferralStatsDtoResult OK
     * @throws ApiError
     */
    public static getApiV1ReferralsStats(): CancelablePromise<ReferralStatsDtoResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/referrals/stats',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get referral history with pagination
     * @param page
     * @param pageSize
     * @returns ReferralHistoryDto OK
     * @throws ApiError
     */
    public static getApiV1ReferralsHistory(
        page: number = 1,
        pageSize: number = 20,
    ): CancelablePromise<Array<ReferralHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/referrals/history',
            query: {
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Validate if a referral code exists (public endpoint)
     * @param code
     * @returns BooleanResult OK
     * @throws ApiError
     */
    public static getApiV1ReferralsValidate(
        code: string,
    ): CancelablePromise<BooleanResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/referrals/validate/{code}',
            path: {
                'code': code,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
