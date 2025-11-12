/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
export type UpdateReferralSettingsCommand = {
    referrerRewardAmount?: number;
    refereeRewardAmount?: number;
    refereeDiscountPercentage?: number;
    currency?: string | null;
    bonusTier1Count?: number;
    bonusTier1Amount?: number;
    bonusTier2Count?: number;
    bonusTier2Amount?: number;
    bonusTier3Count?: number;
    bonusTier3Amount?: number;
    requireEmailVerification?: boolean;
    requireFirstPayment?: boolean;
    rewardPendingPeriodHours?: number;
    referralExpiryDays?: number;
    maxReferralsPerDay?: number;
    maxReferralsPerMonth?: number;
    enableIpTracking?: boolean;
    enableDeviceFingerprinting?: boolean;
    isActive?: boolean;
    allowTrialCompletionReward?: boolean;
    trialCompletionRewardMultiplier?: number;
};

