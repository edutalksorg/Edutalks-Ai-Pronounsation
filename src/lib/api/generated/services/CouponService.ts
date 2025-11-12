/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplyCouponCommand } from '../models/ApplyCouponCommand';
import type { CouponDto } from '../models/CouponDto';
import type { CouponUsageDto } from '../models/CouponUsageDto';
import type { CreateCouponCommand } from '../models/CreateCouponCommand';
import type { UpdateCouponCommand } from '../models/UpdateCouponCommand';
import type { ValidateCouponQuery } from '../models/ValidateCouponQuery';
import type { ValidateCouponResultDto } from '../models/ValidateCouponResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CouponService {
    /**
     * @param requestBody
     * @returns CouponDto Created
     * @throws ApiError
     */
    public static postApiV1Coupons(
        requestBody?: CreateCouponCommand,
    ): CancelablePromise<CouponDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                409: `Conflict`,
            },
        });
    }
    /**
     * @param page
     * @param pageSize
     * @param status
     * @param applicableTo
     * @param startDateFrom
     * @param startDateTo
     * @param searchTerm
     * @returns CouponDto OK
     * @throws ApiError
     */
    public static getApiV1Coupons(
        page: number = 1,
        pageSize: number = 20,
        status?: number,
        applicableTo?: number,
        startDateFrom?: string,
        startDateTo?: string,
        searchTerm?: string,
    ): CancelablePromise<Array<CouponDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coupons',
            query: {
                'page': page,
                'pageSize': pageSize,
                'status': status,
                'applicableTo': applicableTo,
                'startDateFrom': startDateFrom,
                'startDateTo': startDateTo,
                'searchTerm': searchTerm,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param code
     * @returns CouponDto OK
     * @throws ApiError
     */
    public static getApiV1Coupons1(
        code: string,
    ): CancelablePromise<CouponDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/coupons/{code}',
            path: {
                'code': code,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ValidateCouponResultDto OK
     * @throws ApiError
     */
    public static postApiV1CouponsValidate(
        requestBody?: ValidateCouponQuery,
    ): CancelablePromise<ValidateCouponResultDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/validate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                429: `Too Many Requests`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns CouponUsageDto Created
     * @throws ApiError
     */
    public static postApiV1CouponsApply(
        requestBody?: ApplyCouponCommand,
    ): CancelablePromise<CouponUsageDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/coupons/apply',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                422: `Unprocessable Content`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns CouponDto OK
     * @throws ApiError
     */
    public static putApiV1Coupons(
        id: string,
        requestBody?: UpdateCouponCommand,
    ): CancelablePromise<CouponDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/coupons/{id}',
            path: {
                'id': id,
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
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiV1Coupons(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/coupons/{id}',
            path: {
                'id': id,
            },
        });
    }
}
