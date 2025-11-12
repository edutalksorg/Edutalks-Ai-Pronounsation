/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvailableUserDto } from '../models/AvailableUserDto';
import type { CallHistoryDto } from '../models/CallHistoryDto';
import type { CallSessionDto } from '../models/CallSessionDto';
import type { IceServerConfigDto } from '../models/IceServerConfigDto';
import type { InitiateCallCommand } from '../models/InitiateCallCommand';
import type { UpdateAvailabilityCommand } from '../models/UpdateAvailabilityCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VoiceCallService {
    /**
     * Get list of online users available for calls
     * @param preferredLanguage
     * @param search
     * @returns AvailableUserDto OK
     * @throws ApiError
     */
    public static getApiV1CallsAvailableUsers(
        preferredLanguage?: string,
        search?: string,
    ): CancelablePromise<Array<AvailableUserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/calls/available-users',
            query: {
                'preferredLanguage': preferredLanguage,
                'search': search,
            },
        });
    }
    /**
     * Search users by name and language preferences
     * @param searchTerm
     * @param language
     * @returns AvailableUserDto OK
     * @throws ApiError
     */
    public static getApiV1CallsSearchUsers(
        searchTerm?: string,
        language?: string,
    ): CancelablePromise<Array<AvailableUserDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/calls/search-users',
            query: {
                'searchTerm': searchTerm,
                'language': language,
            },
        });
    }
    /**
     * Update user's availability status (online/offline)
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1CallsAvailability(
        requestBody?: UpdateAvailabilityCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/calls/availability',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Initiate a voice call to another user
     * @param requestBody
     * @returns CallSessionDto OK
     * @throws ApiError
     */
    public static postApiV1CallsInitiate(
        requestBody?: InitiateCallCommand,
    ): CancelablePromise<CallSessionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/calls/initiate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                402: `Payment Required`,
            },
        });
    }
    /**
     * Respond to a call invitation (accept/reject)
     * @param callId
     * @param requestBody
     * @returns CallSessionDto OK
     * @throws ApiError
     */
    public static postApiV1CallsRespond(
        callId: string,
        requestBody?: boolean,
    ): CancelablePromise<CallSessionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/calls/{callId}/respond',
            path: {
                'callId': callId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                408: `Request Timeout`,
            },
        });
    }
    /**
     * End an active call
     * @param callId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1CallsEnd(
        callId: string,
        requestBody?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/calls/{callId}/end',
            path: {
                'callId': callId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Rate a completed call (1-5 stars)
     * @param callId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1CallsRate(
        callId: string,
        requestBody?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/calls/{callId}/rate',
            path: {
                'callId': callId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get call history with pagination and filters
     * @param pageNumber
     * @param pageSize
     * @param fromDate
     * @param toDate
     * @returns CallHistoryDto OK
     * @throws ApiError
     */
    public static getApiV1CallsHistory(
        pageNumber: number = 1,
        pageSize: number = 20,
        fromDate?: string,
        toDate?: string,
    ): CancelablePromise<Array<CallHistoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/calls/history',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
                'fromDate': fromDate,
                'toDate': toDate,
            },
        });
    }
    /**
     * Get WebRTC ICE server configuration (STUN only)
     * @returns IceServerConfigDto OK
     * @throws ApiError
     */
    public static getApiV1CallsWebrtcConfig(): CancelablePromise<IceServerConfigDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/calls/webrtc-config',
        });
    }
}
