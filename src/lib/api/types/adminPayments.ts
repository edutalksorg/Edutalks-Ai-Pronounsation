import axiosClient from "./axiosClient";

/* ======================================================
   Admin Payments API
   Handles all admin-side payment, withdrawal, and refund operations
====================================================== */

/** ---------- TYPES ---------- **/

// For Transactions List
export interface AdminTransactionFilter {
  pageNumber?: number;
  pageSize?: number;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

// For Withdrawals
export interface WithdrawalFilter {
  pageNumber?: number;
  pageSize?: number;
  status?: string;
}

export interface ApproveWithdrawalRequest {
  processorReference: string;
}

export interface RejectWithdrawalRequest {
  rejectionReason: string;
}

export interface CompleteWithdrawalRequest {
  bankTransferReference: string;
}

// For Refunds
export interface RefundFilter {
  pageNumber?: number;
  pageSize?: number;
  status?: string;
}

export interface ApproveRefundRequest {
  adminNotes: string;
}

export interface RejectRefundRequest {
  rejectionReason: string;
}

// Wallet Adjustments
export interface AdjustWalletBalanceRequest {
  userId: string;
  amount: number;
  type: "Credit" | "Debit";
  reason: string;
}

/** ---------- API IMPLEMENTATION ---------- **/

export const AdminPaymentsAPI = {
  // ==================== TRANSACTIONS ====================
  getTransactions: async (params?: AdminTransactionFilter) => {
    const response = await axiosClient.get("/api/v1/admin/payments/transactions", { params });
    return response.data;
  },

  // ==================== WITHDRAWALS ====================
  getPendingWithdrawals: async (params?: WithdrawalFilter) => {
    const response = await axiosClient.get("/api/v1/admin/payments/withdrawals/pending", { params });
    return response.data;
  },

  approveWithdrawal: async (withdrawalId: string, data: ApproveWithdrawalRequest) => {
    const response = await axiosClient.post(
      `/api/v1/admin/payments/withdrawals/${withdrawalId}/approve`,
      data
    );
    return response.data;
  },

  rejectWithdrawal: async (withdrawalId: string, data: RejectWithdrawalRequest) => {
    const response = await axiosClient.post(
      `/api/v1/admin/payments/withdrawals/${withdrawalId}/reject`,
      data
    );
    return response.data;
  },

  completeWithdrawal: async (withdrawalId: string, data: CompleteWithdrawalRequest) => {
    const response = await axiosClient.post(
      `/api/v1/admin/payments/withdrawals/${withdrawalId}/complete`,
      data
    );
    return response.data;
  },

  // ==================== REFUNDS ====================
  getPendingRefunds: async (params?: RefundFilter) => {
    const response = await axiosClient.get("/api/v1/admin/payments/refunds/pending", { params });
    return response.data;
  },

  approveRefund: async (refundId: string, data: ApproveRefundRequest) => {
    const response = await axiosClient.post(
      `/api/v1/admin/payments/refunds/${refundId}/approve`,
      data
    );
    return response.data;
  },

  rejectRefund: async (refundId: string, data: RejectRefundRequest) => {
    const response = await axiosClient.post(
      `/api/v1/admin/payments/refunds/${refundId}/reject`,
      data
    );
    return response.data;
  },

  // ==================== WALLET ADJUSTMENTS ====================
  adjustWalletBalance: async (data: AdjustWalletBalanceRequest) => {
    const response = await axiosClient.post("/api/v1/admin/payments/wallets/adjust-balance", data);
    return response.data;
  },
};
