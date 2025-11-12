// src/lib/api/referrals.ts
import axiosClient from "./axiosClient";

/** Referral API for normal users */
const ReferralsAPI = {
  /** ✅ Get user's referral code and shareable URL */
  getMyReferralCode: async () => {
    const res = await axiosClient.get("/api/v1/referrals/my-code");
    return res.data;
  },

  /** ✅ Get referral statistics */
  getReferralStats: async () => {
    const res = await axiosClient.get("/api/v1/referrals/stats");
    return res.data;
  },

  /** ✅ Get referral history (paginated) */
  getReferralHistory: async (params?: { page?: number; pageSize?: number }) => {
    const res = await axiosClient.get("/api/v1/referrals/history", { params });
    return res.data;
  },

  /** ✅ Validate referral code (public endpoint) */
  validateReferralCode: async (code: string) => {
    const res = await axiosClient.get(`/api/v1/referrals/validate/${code}`);
    return res.data;
  },
};

export default ReferralsAPI;
