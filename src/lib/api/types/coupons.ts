import axiosClient from "./axiosClient";

// ======================
// 📘 COUPONS MODULE API
// ======================

// -------- ENUM-LIKE TYPES --------
export type DiscountType = "Percentage" | "FixedAmount";
export type ApplicableTo = "Both" | "Quiz" | "Subscription";
export type CouponStatus = "Active" | "Inactive" | "Expired" | "Draft";

// -------- REQUEST TYPES --------

// ✅ Create Coupon
export interface CreateCouponRequest {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount: number;
  minimumPurchaseAmount: number;
  applicableTo: ApplicableTo;
  specificQuizIds: string[];
  specificPlanIds: string[];
  maxTotalUsage: number;
  maxUsagePerUser: number;
  startDate: string;
  expiryDate: string;
}

// ✅ Update Coupon
export interface UpdateCouponRequest {
  id: string;
  description: string;
  maxDiscountAmount: number;
  minimumPurchaseAmount: number;
  maxTotalUsage: number;
  maxUsagePerUser: number;
  expiryDate: string;
  status: CouponStatus;
}

// ✅ Validate Coupon
export interface ValidateCouponRequest {
  couponCode: string;
  amount: number;
  itemType: string;
  itemId: string;
}

// ✅ Apply Coupon
export interface ApplyCouponRequest {
  couponCode: string;
  originalAmount: number;
  itemType: string;
  itemId: string;
  orderId: string;
}

// -------- RESPONSE TYPES --------

export interface CouponResponse {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount: number;
  minimumPurchaseAmount: number;
  applicableTo: ApplicableTo;
  specificQuizIds: string[];
  specificPlanIds: string[];
  maxTotalUsage: number;
  maxUsagePerUser: number;
  currentUsageCount: number;
  startDate: string;
  expiryDate: string;
  status: CouponStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  remainingUsage: number;
}

// -------- QUERY PARAMETERS --------

export interface CouponQuery {
  page?: number;
  pageSize?: number;
  status?: string;
  applicableTo?: string;
  startDateFrom?: string;
  startDateTo?: string;
  searchTerm?: string;
}

// ======================
// 📘 API METHODS
// ======================

export const CouponsAPI = {
  // CREATE COUPON
  create: async (data: CreateCouponRequest): Promise<CouponResponse> => {
    const res = await axiosClient.post("/api/v1/coupons", data);
    return res.data;
  },

  // GET ALL COUPONS
  list: async (params?: CouponQuery): Promise<CouponResponse[]> => {
    const res = await axiosClient.get("/api/v1/coupons", { params });
    return res.data;
  },

  // GET BY CODE
  getByCode: async (code: string): Promise<CouponResponse> => {
    const res = await axiosClient.get(`/api/v1/coupons/${code}`);
    return res.data;
  },

  // VALIDATE COUPON
  validate: async (data: ValidateCouponRequest): Promise<{
    discountAmount: number;
    finalPrice: number;
    discountPercentage: number;
  }> => {
    const res = await axiosClient.post("/api/v1/coupons/validate", data);
    return res.data;
  },

  // APPLY COUPON
  apply: async (data: ApplyCouponRequest): Promise<any> => {
    const res = await axiosClient.post("/api/v1/coupons/apply", data);
    return res.data;
  },

  // UPDATE COUPON
  update: async (id: string, data: UpdateCouponRequest): Promise<CouponResponse> => {
    const res = await axiosClient.put(`/api/v1/coupons/${id}`, data);
    return res.data;
  },

  // DELETE COUPON
  delete: async (id: string): Promise<void> => {
    const res = await axiosClient.delete(`/api/v1/coupons/${id}`);
    return res.data;
  },
};
