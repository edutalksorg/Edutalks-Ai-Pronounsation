/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTopicCategoryCommand } from '../models/CreateTopicCategoryCommand';
import type { GetTopicCategoriesQuery } from '../models/GetTopicCategoriesQuery';
import type { UpdateTopicCategoryCommand } from '../models/UpdateTopicCategoryCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TopicCategoriesService {
    /**
     * @param query
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1TopicsCategories(
        query?: GetTopicCategoriesQuery,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/topics/categories',
            query: {
                'query': query,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1TopicsCategories(
        requestBody?: CreateTopicCategoryCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/topics/categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1TopicsCategories(
        id: string,
        requestBody?: UpdateTopicCategoryCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/topics/categories/{id}',
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
    public static deleteApiV1TopicsCategories(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/topics/categories/{id}',
            path: {
                'id': id,
            },
        });
    }
}
