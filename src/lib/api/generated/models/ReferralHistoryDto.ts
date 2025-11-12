/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { ReferralSource } from './ReferralSource';
import type { ReferralStatus } from './ReferralStatus';
export type ReferralHistoryDto = {
    id?: string | null;
    refereeName?: string | null;
    refereeEmail?: string | null;
    status?: ReferralStatus;
    source?: ReferralSource;
    rewardAmount?: number | null;
    createdAt?: string | null;
    qualifiedAt?: string | null;
};

