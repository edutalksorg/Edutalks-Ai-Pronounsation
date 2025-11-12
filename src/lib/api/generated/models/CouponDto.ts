/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CouponApplicability } from './CouponApplicability';
import type { CouponStatus } from './CouponStatus';
import type { DiscountType } from './DiscountType';
export type CouponDto = {
    id?: string | null;
    code?: string | null;
    description?: string | null;
    discountType?: DiscountType;
    discountValue?: number;
    maxDiscountAmount?: number | null;
    minimumPurchaseAmount?: number;
    applicableTo?: CouponApplicability;
    specificQuizIds?: Array<string> | null;
    specificPlanIds?: Array<string> | null;
    maxTotalUsage?: number | null;
    maxUsagePerUser?: number | null;
    currentUsageCount?: number;
    startDate?: string;
    expiryDate?: string;
    status?: CouponStatus;
    createdBy?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    readonly remainingUsage?: number;
};

