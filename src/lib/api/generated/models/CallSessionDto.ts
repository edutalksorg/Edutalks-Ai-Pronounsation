/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CallStatus } from './CallStatus';
export type CallSessionDto = {
    callId?: string | null;
    callerId?: string | null;
    callerName?: string | null;
    calleeId?: string | null;
    calleeName?: string | null;
    status?: CallStatus;
    initiatedAt?: string;
    acceptedAt?: string | null;
    endedAt?: string | null;
    durationSeconds?: number | null;
    topicId?: string | null;
    topicTitle?: string | null;
    callQualityRating?: number | null;
    remainingSeconds?: number;
};

