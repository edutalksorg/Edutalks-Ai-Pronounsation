import axiosClient from "./axiosClient";

export interface ReferralSettings {
  referrerRewardAmount: number;
  refereeRewardAmount: number;
  refereeDiscountPercentage: number;
  currency: string;
  bonusTier1Count: number;
  bonusTier1Amount: number;
  bonusTier2Count: number;
  bonusTier2Amount: number;
  bonusTier3Count: number;
  bonusTier3Amount: number;
  requireEmailVerification: boolean;
  requireFirstPayment: boolean;
  rewardPendingPeriodHours: number;
  referralExpiryDays: number;
  maxReferralsPerDay: number;
  maxReferralsPerMonth: number;
  enableIpTracking: boolean;
  enableDeviceFingerprinting: boolean;
  isActive: boolean;
  allowTrialCompletionReward: boolean;
  trialCompletionRewardMultiplier: number;
}

export const AdminReferralsAPI = {
  /**
   * 🔹 Get current referral settings
   * GET /api/v1/admin/referrals/settings
   */
  getSettings: async () => {
    const response = await axiosClient.get(
      `/api/v1/admin/referrals/settings`
    );
    return response.data;
  },

  /**
   * 🔹 Update referral system settings
   * PUT /api/v1/admin/referrals/settings
   */
  updateSettings: async (data: ReferralSettings) => {
    const response = await axiosClient.put(
      `/api/v1/admin/referrals/settings`,
      data
    );
    return response.data;
  },
};
