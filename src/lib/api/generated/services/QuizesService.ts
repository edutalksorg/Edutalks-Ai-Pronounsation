/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuizCommand } from '../models/CreateQuizCommand';
import type { PublishQuizRequest } from '../models/PublishQuizRequest';
import type { QuizDifficulty } from '../models/QuizDifficulty';
import type { SubmitQuizRequest } from '../models/SubmitQuizRequest';
import type { UpdateQuizCommand } from '../models/UpdateQuizCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuizesService {
    /**
     * Get paginated list of quizzes with unlock status
     * @param page
     * @param pageSize
     * @param searchTerm
     * @param difficulty
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Quizzes(
        page?: number,
        pageSize?: number,
        searchTerm?: string,
        difficulty?: QuizDifficulty,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/quizzes',
            query: {
                'Page': page,
                'PageSize': pageSize,
                'SearchTerm': searchTerm,
                'Difficulty': difficulty,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Create a new quiz with questions (Instructor/Admin only)
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Quizzes(
        requestBody?: CreateQuizCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/quizzes',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get quiz details with questions (only if unlocked or user is instructor/admin)
     * @param id
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1Quizzes1(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/quizzes/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Update an existing quiz (Instructor/Admin only)
     * @param id
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1Quizzes(
        id: string,
        requestBody?: UpdateQuizCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/quizzes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Soft delete a quiz (Instructor/Admin only)
     * @param id Quiz ID
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Quizzes(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/quizzes/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Submit quiz answers for scoring
     * @param id Quiz ID
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1QuizzesSubmit(
        id: string,
        requestBody?: SubmitQuizRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/quizzes/{id}/submit',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Publish or unpublish a quiz
     * @param id Quiz ID
     * @param requestBody Publish status
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1QuizzesPublish(
        id: string,
        requestBody?: PublishQuizRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/quizzes/{id}/publish',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get user's attempt history for a specific quiz
     * @param id Quiz ID
     * @param page Page number (default: 1)
     * @param pageSize Page size (default: 10, max: 50)
     * @param passedOnly Filter to only passed attempts (optional)
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1QuizzesAttempts(
        id: string,
        page: number = 1,
        pageSize: number = 10,
        passedOnly?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/quizzes/{id}/attempts',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
                'passedOnly': passedOnly,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * Get detailed results for a specific quiz attempt
     * @param id Quiz ID
     * @param attemptId Attempt ID
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1QuizzesAttempts1(
        id: string,
        attemptId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/quizzes/{id}/attempts/{attemptId}',
            path: {
                'id': id,
                'attemptId': attemptId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
