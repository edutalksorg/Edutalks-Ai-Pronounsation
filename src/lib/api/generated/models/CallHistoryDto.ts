/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CallStatus } from './CallStatus';
export type CallHistoryDto = {
    callId?: string | null;
    otherPartyId?: string | null;
    otherPartyName?: string | null;
    isIncoming?: boolean;
    initiatedAt?: string;
    durationSeconds?: number | null;
    status?: CallStatus;
    topicTitle?: string | null;
    callQualityRating?: number | null;
};

