import axiosClient from "./axiosClient";

const WalletAPI = {
  /** ✅ Get current user's wallet balance */
  getWalletBalance: async () => {
    const res = await axiosClient.get("/api/v1/wallet/balance");
    return res.data;
  },

  /** ✅ Add funds to wallet */
  addFunds: async (amount: number) => {
    const res = await axiosClient.post("/api/v1/wallet/add-funds", {
      amount,
    });
    return res.data;
  },

  /** ✅ Withdraw funds */
  withdrawFunds: async (amount: number) => {
    const res = await axiosClient.post("/api/v1/wallet/withdraw", {
      amount,
    });
    return res.data;
  },

  /** ✅ Get transaction history with filters */
  getTransactions: async (params: any) => {
    const res = await axiosClient.get("/api/v1/wallet/transactions", {
      params,
    });
    return res.data;
  },
};

export default WalletAPI;
