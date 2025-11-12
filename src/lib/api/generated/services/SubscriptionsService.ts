/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddFeatureToPlanCommand } from '../models/AddFeatureToPlanCommand';
import type { CancelSubscriptionCommand } from '../models/CancelSubscriptionCommand';
import type { ChangePlanCommand } from '../models/ChangePlanCommand';
import type { CreateSubscriptionPlanCommand } from '../models/CreateSubscriptionPlanCommand';
import type { RenewSubscriptionCommand } from '../models/RenewSubscriptionCommand';
import type { SubscribeCommand } from '../models/SubscribeCommand';
import type { UpdateFeatureCommand } from '../models/UpdateFeatureCommand';
import type { UpdateSubscriptionPlanCommand } from '../models/UpdateSubscriptionPlanCommand';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubscriptionsService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1SubscriptionsPlans(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Subscriptions/plans',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1SubscriptionsPlans(
        requestBody?: CreateSubscriptionPlanCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Subscriptions/plans',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param planId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1SubscriptionsPlans(
        planId: string,
        requestBody?: UpdateSubscriptionPlanCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/Subscriptions/plans/{planId}',
            path: {
                'planId': planId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param planId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiV1SubscriptionsPlans(
        planId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/Subscriptions/plans/{planId}',
            path: {
                'planId': planId,
            },
        });
    }
    /**
     * @param planId
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1SubscriptionsPlansFeatures(
        planId: string,
        requestBody?: AddFeatureToPlanCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Subscriptions/plans/{planId}/features',
            path: {
                'planId': planId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param planId
     * @param featureKey
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1SubscriptionsPlansFeatures(
        planId: string,
        featureKey: string,
        requestBody?: UpdateFeatureCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/Subscriptions/plans/{planId}/features/{featureKey}',
            path: {
                'planId': planId,
                'featureKey': featureKey,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param planId
     * @param featureKey
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiV1SubscriptionsPlansFeatures(
        planId: string,
        featureKey: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/Subscriptions/plans/{planId}/features/{featureKey}',
            path: {
                'planId': planId,
                'featureKey': featureKey,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1SubscriptionsSubscribe(
        requestBody?: SubscribeCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Subscriptions/subscribe',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiV1SubscriptionsCurrent(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/Subscriptions/current',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static putApiV1SubscriptionsChangePlan(
        requestBody?: ChangePlanCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/Subscriptions/change-plan',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1SubscriptionsCancel(
        requestBody?: CancelSubscriptionCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Subscriptions/cancel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static postApiV1SubscriptionsRenew(
        requestBody?: RenewSubscriptionCommand,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/Subscriptions/renew',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
