/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CouponApplicability } from './CouponApplicability';
import type { DiscountType } from './DiscountType';
export type CreateCouponCommand = {
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
    startDate?: string;
    expiryDate?: string;
};

