/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { ReferralSettingsDtoResult } from '../models/ReferralSettingsDtoResult';
import type { UpdateReferralSettingsCommand } from '../models/UpdateReferralSettingsCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminReferralsService {
    /**
     * Update referral system settings
     * @param requestBody
     * @returns ReferralSettingsDtoResult OK
     * @throws ApiError
     */
    public static putApiV1AdminReferralsSettings(
        requestBody?: UpdateReferralSettingsCommand,
    ): CancelablePromise<ReferralSettingsDtoResult> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/admin/referrals/settings',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get current referral settings
     * @returns ReferralSettingsDtoResult OK
     * @throws ApiError
     */
    public static getApiV1AdminReferralsSettings(): CancelablePromise<ReferralSettingsDtoResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/admin/referrals/settings',
        });
    }
}
