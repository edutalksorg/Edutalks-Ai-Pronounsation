import axiosClient from "./axiosClient";

// ========================== SUBSCRIPTIONS MODULE ==========================

// ---------- TYPES & INTERFACES ----------

export type BillingCycle = "Monthly" | "Yearly" | "Weekly" | "Daily";

export interface PlanFeatures {
  [key: string]: string;
}

export interface CreatePlanRequest {
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  features: PlanFeatures;
  isActive: boolean;
  displayOrder: number;
  trialDays: number;
  isMostPopular: boolean;
  marketingTagline: string;
}

export interface UpdatePlanRequest {
  planId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  features: PlanFeatures;
  isMostPopular: boolean;
  isActive: boolean;
  displayOrder: number;
  trialDays: number;
  replaceAllFeatures: boolean;
  marketingTagline: string;
}

export interface AddFeatureRequest {
  planId: string;
  featureKey: string;
  value: string;
}

export interface UpdateFeatureRequest {
  planId: string;
  featureKey: string;
  isEnabled: boolean;
  value: string;
}

export interface SubscribeRequest {
  planId: string;
  paymentMethodId: string;
  useFreeTrial: boolean;
  couponCode: string;
  userPhone: string;
}

export interface ChangePlanRequest {
  userId: string;
  newPlanId: string;
}

export interface CancelSubscriptionRequest {
  subscriptionId: string;
  reason: string;
}

export interface RenewSubscriptionRequest {
  subscriptionId: string;
  userPhone: string;
}

// ---------- API METHODS ----------

/**
 * GET /api/v1/Subscriptions/plans
 * Get all subscription plans
 * @returns Response data with plans list
 */
export const getPlans = async () => {
  const res = await axiosClient.get("/api/v1/Subscriptions/plans");
  return res.data;
};

/**
 * POST /api/v1/Subscriptions/plans
 * Create a new subscription plan
 * @param data - Plan creation data
 * @returns Response data
 */
export const createPlan = async (data: CreatePlanRequest) => {
  const res = await axiosClient.post("/api/v1/Subscriptions/plans", data);
  return res.data;
};

/**
 * PUT /api/v1/Subscriptions/plans/{planId}
 * Update an existing subscription plan
 * @param planId - Plan ID (path parameter)
 * @param data - Plan update data
 * @returns Response data
 */
export const updatePlan = async (planId: string, data: UpdatePlanRequest) => {
  const res = await axiosClient.put(`/api/v1/Subscriptions/plans/${planId}`, data);
  return res.data;
};

/**
 * DELETE /api/v1/Subscriptions/plans/{planId}
 * Delete a subscription plan
 * @param planId - Plan ID (path parameter)
 * @returns Response data
 */
export const deletePlan = async (planId: string) => {
  const res = await axiosClient.delete(`/api/v1/Subscriptions/plans/${planId}`);
  return res.data;
};

/**
 * POST /api/v1/Subscriptions/plans/{planId}/features
 * Add a feature to a subscription plan
 * @param planId - Plan ID (path parameter)
 * @param data - Feature data
 * @returns Response data
 */
export const addFeature = async (planId: string, data: AddFeatureRequest) => {
  const res = await axiosClient.post(`/api/v1/Subscriptions/plans/${planId}/features`, data);
  return res.data;
};

/**
 * PUT /api/v1/Subscriptions/plans/{planId}/features/{featureKey}
 * Update a feature in a subscription plan
 * @param planId - Plan ID (path parameter)
 * @param featureKey - Feature key (path parameter)
 * @param data - Feature update data
 * @returns Response data
 */
export const updateFeature = async (planId: string, featureKey: string, data: UpdateFeatureRequest) => {
  const res = await axiosClient.put(`/api/v1/Subscriptions/plans/${planId}/features/${featureKey}`, data);
  return res.data;
};

/**
 * DELETE /api/v1/Subscriptions/plans/{planId}/features/{featureKey}
 * Delete a feature from a subscription plan
 * @param planId - Plan ID (path parameter)
 * @param featureKey - Feature key (path parameter)
 * @returns Response data
 */
export const deleteFeature = async (planId: string, featureKey: string) => {
  const res = await axiosClient.delete(`/api/v1/Subscriptions/plans/${planId}/features/${featureKey}`);
  return res.data;
};

/**
 * POST /api/v1/Subscriptions/subscribe
 * Subscribe to a plan
 * @param data - Subscription data
 * @returns Response data
 */
export const subscribe = async (data: SubscribeRequest) => {
  const res = await axiosClient.post("/api/v1/Subscriptions/subscribe", data);
  return res.data;
};

/**
 * GET /api/v1/Subscriptions/current
 * Get current user's subscription
 * @returns Response data with current subscription
 */
export const getCurrentSubscription = async () => {
  const res = await axiosClient.get("/api/v1/Subscriptions/current");
  return res.data;
};

/**
 * PUT /api/v1/Subscriptions/change-plan
 * Change user's subscription plan
 * @param data - Change plan data
 * @returns Response data
 */
export const changePlan = async (data: ChangePlanRequest) => {
  const res = await axiosClient.put("/api/v1/Subscriptions/change-plan", data);
  return res.data;
};

/**
 * POST /api/v1/Subscriptions/cancel
 * Cancel a subscription
 * @param data - Cancel subscription data
 * @returns Response data
 */
export const cancelSubscription = async (data: CancelSubscriptionRequest) => {
  const res = await axiosClient.post("/api/v1/Subscriptions/cancel", data);
  return res.data;
};

/**
 * POST /api/v1/Subscriptions/renew
 * Renew a subscription
 * @param data - Renew subscription data
 * @returns Response data
 */
export const renewSubscription = async (data: RenewSubscriptionRequest) => {
  const res = await axiosClient.post("/api/v1/Subscriptions/renew", data);
  return res.data;
};

// ✅ DEFAULT EXPORT
const SubscriptionsAPI = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  addFeature,
  updateFeature,
  deleteFeature,
  subscribe,
  getCurrentSubscription,
  changePlan,
  cancelSubscription,
  renewSubscription,
};

export default SubscriptionsAPI;
