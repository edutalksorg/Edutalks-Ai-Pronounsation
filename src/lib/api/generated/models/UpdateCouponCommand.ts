/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
 
import type { CouponStatus } from './CouponStatus';
export type UpdateCouponCommand = {
    id?: string | null;
    description?: string | null;
    maxDiscountAmount?: number | null;
    minimumPurchaseAmount?: number;
    maxTotalUsage?: number | null;
    maxUsagePerUser?: number | null;
    expiryDate?: string;
    status?: CouponStatus;
};

