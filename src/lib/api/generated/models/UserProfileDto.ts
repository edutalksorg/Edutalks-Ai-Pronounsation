/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { SubscriptionInfoDto } from './SubscriptionInfoDto';
export type UserProfileDto = {
    userId?: string | null;
    fullName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    learningGoals?: Array<string> | null;
    preferredLanguage?: string | null;
    timeZone?: string | null;
    country?: string | null;
    city?: string | null;
    dateOfBirth?: string | null;
    age?: number | null;
    subscription?: SubscriptionInfoDto;
    walletBalance?: number | null;
    referralCode?: string | null;
};

