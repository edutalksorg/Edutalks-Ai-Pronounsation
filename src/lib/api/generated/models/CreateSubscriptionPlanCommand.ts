/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { BillingCycle } from './BillingCycle';
export type CreateSubscriptionPlanCommand = {
    name?: string | null;
    description?: string | null;
    price?: number;
    currency?: string | null;
    billingCycle?: BillingCycle;
    features?: Record<string, string> | null;
    isActive?: boolean;
    displayOrder?: number;
    trialDays?: number | null;
    isMostPopular?: boolean;
    marketingTagline?: string | null;
};

