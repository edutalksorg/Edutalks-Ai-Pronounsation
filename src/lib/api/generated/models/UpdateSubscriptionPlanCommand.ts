/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { BillingCycle } from './BillingCycle';
export type UpdateSubscriptionPlanCommand = {
    planId?: string | null;
    name?: string | null;
    description?: string | null;
    price?: number;
    currency?: string | null;
    billingCycle?: BillingCycle;
    features?: Record<string, string> | null;
    isMostPopular?: boolean;
    isActive?: boolean;
    displayOrder?: number;
    trialDays?: number | null;
    replaceAllFeatures?: boolean;
    marketingTagline?: string | null;
};

