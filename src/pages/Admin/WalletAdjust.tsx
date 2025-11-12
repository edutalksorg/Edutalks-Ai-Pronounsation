import React, { useState } from "react";
import { AdminPaymentsAPI } from "../../lib/api/types/adminPayments";

const WalletAdjust: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"Credit" | "Debit">("Credit");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || amount === "") {
      alert("Provide userId and amount");
      return;
    }
    setLoading(true);
    try {
      await AdminPaymentsAPI.adjustWalletBalance({
        userId,
        amount: Number(amount),
        type,
        reason,
      });
      alert("Wallet adjusted");
      setUserId("");
      setAmount("");
      setReason("");
    } catch (err) {
      console.error(err);
      alert("Adjust failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded">
      <h3 className="text-lg font-semibold mb-4">Adjust Wallet Balance</h3>
      <form onSubmit={submit} className="space-y-3">
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="w-full p-2 border rounded" />
        <input value={amount} onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Amount" type="number" className="w-full p-2 border rounded" />
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full p-2 border rounded">
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
        </select>
        <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason" className="w-full p-2 border rounded" />
        <button disabled={loading} className="w-full p-2 bg-indigo-600 text-white rounded">{loading ? "Processing..." : "Adjust"}</button>
      </form>
    </div>
  );
};

export default WalletAdjust;
