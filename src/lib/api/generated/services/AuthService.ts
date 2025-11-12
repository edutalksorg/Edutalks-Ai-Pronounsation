/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordRequest } from '../models/ChangePasswordRequest';
import type { ForgotPasswordRequest } from '../models/ForgotPasswordRequest';
import type { IResult } from '../models/IResult';
import type { LoginRequest } from '../models/LoginRequest';
import type { LogoutRequest } from '../models/LogoutRequest';
import type { RefreshTokenRequest } from '../models/RefreshTokenRequest';
import type { RegisterRequest } from '../models/RegisterRequest';
import type { ResendConfirmationEmailRequest } from '../models/ResendConfirmationEmailRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register a new user or instructor
     * @param requestBody
     * @returns IResult Created
     * @throws ApiError
     */
    public static postApiV1AuthRegister(
        requestBody?: RegisterRequest,
    ): CancelablePromise<IResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Login with email/phone and password
     * @param requestBody
     * @returns IResult OK
     * @throws ApiError
     */
    public static postApiV1AuthLogin(
        requestBody?: LoginRequest,
    ): CancelablePromise<IResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Confirm email address
     * @param userId
     * @param token
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1AuthConfirmEmail(
        userId?: string,
        token?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/auth/confirm-email',
            query: {
                'userId': userId,
                'token': token,
            },
        });
    }
    /**
     * Request password reset
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AuthForgotPassword(
        requestBody?: ForgotPasswordRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Change password (authenticated)
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1AuthChangePassword(
        requestBody?: ChangePasswordRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Logout (revoke tokens)
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AuthLogout(
        requestBody?: LogoutRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns IResult OK
     * @throws ApiError
     */
    public static postApiV1AuthResendEmailConfirmation(
        requestBody?: ResendConfirmationEmailRequest,
    ): CancelablePromise<IResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/resend-email-confirmation',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1AuthRefreshToken(
        requestBody?: RefreshTokenRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
