/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { AttemptDto } from '../models/AttemptDto';
import type { AttemptDtoPaginatedResult } from '../models/AttemptDtoPaginatedResult';
import type { CreateParagraphCommand } from '../models/CreateParagraphCommand';
import type { ParagraphDto } from '../models/ParagraphDto';
import type { ParagraphDtoPaginatedResult } from '../models/ParagraphDtoPaginatedResult';
import type { UpdateParagraphCommand } from '../models/UpdateParagraphCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PronunciationService {
    /**
     * GET /api/v1/pronunciation/paragraphs - List practice paragraphs
     * @param difficulty
     * @param language
     * @param pageNumber
     * @param pageSize
     * @returns ParagraphDtoPaginatedResult OK
     * @throws ApiError
     */
    public static getApiV1PronunciationParagraphs(
        difficulty?: string,
        language?: string,
        pageNumber: number = 1,
        pageSize: number = 10,
    ): CancelablePromise<ParagraphDtoPaginatedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/pronunciation/paragraphs',
            query: {
                'difficulty': difficulty,
                'language': language,
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * POST /api/v1/pronunciation/paragraphs - Create paragraph (Instructor/Admin)
     * @param requestBody
     * @returns string Created
     * @throws ApiError
     */
    public static postApiV1PronunciationParagraphs(
        requestBody?: CreateParagraphCommand,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/pronunciation/paragraphs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * GET /api/v1/pronunciation/paragraphs/{id} - Get single paragraph
     * @param id
     * @returns ParagraphDto OK
     * @throws ApiError
     */
    public static getApiV1PronunciationParagraphs1(
        id: string,
    ): CancelablePromise<ParagraphDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/pronunciation/paragraphs/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }
    /**
     * PUT /api/v1/pronunciation/paragraphs/{id} - Update paragraph (Instructor/Admin)
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putApiV1PronunciationParagraphs(
        id: string,
        requestBody?: UpdateParagraphCommand,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/pronunciation/paragraphs/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * DELETE /api/v1/pronunciation/paragraphs/{id} - Delete paragraph (Instructor/Admin)
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1PronunciationParagraphs(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/pronunciation/paragraphs/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * POST /api/v1/pronunciation/assess - Submit audio for assessment
     * @param formData
     * @returns string Accepted
     * @throws ApiError
     */
    public static postApiV1PronunciationAssess(
        formData?: {
            ParagraphId?: string;
            AudioFile?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/pronunciation/assess',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                402: `Payment Required`,
                422: `Unprocessable Content`,
            },
        });
    }
    /**
     * GET /api/v1/pronunciation/history - Get user's assessment history
     * @param pageNumber
     * @param pageSize
     * @returns AttemptDtoPaginatedResult OK
     * @throws ApiError
     */
    public static getApiV1PronunciationHistory(
        pageNumber: number = 1,
        pageSize: number = 10,
    ): CancelablePromise<AttemptDtoPaginatedResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/pronunciation/history',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * GET /api/v1/pronunciation/attempts/{id} - Get detailed assessment result
     * @param id
     * @returns AttemptDto OK
     * @throws ApiError
     */
    public static getApiV1PronunciationAttempts(
        id: string,
    ): CancelablePromise<AttemptDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/pronunciation/attempts/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
