/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserRequest } from '../models/CreateUserRequest';
import type { UpdateUserProfileCommand } from '../models/UpdateUserProfileCommand';
import type { UploadAvatarResponse } from '../models/UploadAvatarResponse';
import type { UserProfileDto } from '../models/UserProfileDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @param pageSize
     * @param page
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Users(
        pageSize?: number,
        page?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
            query: {
                'PageSize': pageSize,
                'Page': page,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1Users(
        requestBody?: CreateUserRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get authenticated user's profile
     * @returns UserProfileDto OK
     * @throws ApiError
     */
    public static getApiV1UsersProfile(): CancelablePromise<UserProfileDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/profile',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Update user profile
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putApiV1UsersProfile(
        requestBody?: UpdateUserProfileCommand,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/profile',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Upload profile avatar
     * @param formData
     * @returns UploadAvatarResponse OK
     * @throws ApiError
     */
    public static postApiV1UsersProfileAvatar(
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<UploadAvatarResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/profile/avatar',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static patchApiV1UsersLock(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{id}/lock',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static patchApiV1UsersUnlock(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/users/{id}/unlock',
            path: {
                'id': id,
            },
        });
    }
}
