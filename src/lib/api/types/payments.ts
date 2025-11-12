// src/lib/api/payments.ts
import axiosClient from "./axiosClient";

/* ====== 🔹 USER PAYMENTS API ====== */

export interface ProcessPaymentPayload {
  amount: number;
  currency?: string;
  entityType?: string;
  entityId?: string;
  idempotencyKey?: string;
  phoneNumber?: string;
}

const PaymentsAPI = {
  /** ✅ Process payment for course/subscription */
  processPayment: async (payload: ProcessPaymentPayload) => {
    const res = await axiosClient.post("/payments/process", payload);
    return res.data;
  },

  /** ✅ Check payment status */
  getPaymentStatus: async (transactionId: string) => {
    const res = await axiosClient.get(`/payments/${transactionId}/status`);
    return res.data;
  },

  /** ✅ Get user’s payment history */
  getPaymentHistory: async () => {
    const res = await axiosClient.get("/payments/history");
    return res.data;
  },

  /** ✅ Initiate refund request */
  initiateRefund: async (transactionId: string) => {
    const res = await axiosClient.post(`/payments/${transactionId}/refund`);
    return res.data;
  },

  /** ✅ PhonePe callback / redirect (mostly backend-triggered) */
  phonePeCallback: async (data: any) => {
    const res = await axiosClient.post("/payments/phonepe/callback", data);
    return res.data;
  },

  phonePeRedirect: async (data: any) => {
    const res = await axiosClient.post("/payments/phonepe/redirect", data);
    return res.data;
  },
};

export default PaymentsAPI;
