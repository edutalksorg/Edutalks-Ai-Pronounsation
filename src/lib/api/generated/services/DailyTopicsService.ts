/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDailyTopicCommand } from '../models/CreateDailyTopicCommand';
import type { GetFavouritesQuery } from '../models/GetFavouritesQuery';
import type { UpdateTopicCommand } from '../models/UpdateTopicCommand';
import type { UpdateTopicStatusCommand } from '../models/UpdateTopicStatusCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DailyTopicsService {
    /**
     * @param categoryId
     * @param difficulty
     * @param searchTerm
     * @param pageNumber
     * @param pageSize
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Topics(
        categoryId?: string,
        difficulty?: string,
        searchTerm?: string,
        pageNumber?: number,
        pageSize?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics',
            query: {
                'CategoryId': categoryId,
                'Difficulty': difficulty,
                'SearchTerm': searchTerm,
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1Topics(
        requestBody?: CreateDailyTopicCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/topics',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Topics1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1Topics(
        id: string,
        requestBody?: UpdateTopicCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/topics/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiV1Topics(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/topics/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param isFeatured
     * @returns any OK
     * @throws ApiError
     */
    public static patchApiV1TopicsFeatured(
        id: string,
        isFeatured?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/topics/{id}/featured',
            path: {
                'id': id,
            },
            query: {
                'isFeatured': isFeatured,
            },
        });
    }
    /**
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TopicsFavorite(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/topics/{id}/favorite',
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
    public static deleteApiV1TopicsFavorite(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/topics/{id}/favorite',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param getFavouritesQuery
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1TopicsFavorites(
        getFavouritesQuery?: GetFavouritesQuery,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/favorites',
            query: {
                'getFavouritesQuery': getFavouritesQuery,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static patchApiV1TopicsStatus(
        id: string,
        requestBody?: UpdateTopicStatusCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/topics/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
