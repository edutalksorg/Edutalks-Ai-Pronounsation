import React, { useEffect, useState } from "react";
import { AdminPaymentsAPI, WithdrawalFilter } from "../../lib/api/types/adminPayments";

type Withdrawal = {
  id: string;
  userId?: string;
  amount?: number;
  netAmount?: number;
  status?: string;
  bankName?: string;
  accountHolderName?: string;
  createdAt?: string;
  rejectionReason?: string;
};

const AdminWithdrawals: React.FC = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<WithdrawalFilter>({ pageNumber: 1, pageSize: 20 });

  const load = async () => {
    setLoading(true);
    try {
      const res: any = await AdminPaymentsAPI.getPendingWithdrawals(filters);
      const data = res?.data ?? res;
      setWithdrawals(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error(err);
      alert("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status]);

  const approve = async (id: string) => {
    const processorReference = prompt("Enter processor reference (optional)") ?? "";
    try {
      await AdminPaymentsAPI.approveWithdrawal(id, { processorReference });
      alert("Withdrawal approved");
      load();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const reject = async (id: string) => {
    const reason = prompt("Rejection reason") ?? "";
    try {
      await AdminPaymentsAPI.rejectWithdrawal(id, { rejectionReason: reason });
      alert("Withdrawal rejected");
      load();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  const complete = async (id: string) => {
    const ref = prompt("Bank transfer reference") ?? "";
    try {
      await AdminPaymentsAPI.completeWithdrawal(id, { bankTransferReference: ref });
      alert("Marked complete");
      load();
    } catch (err) {
      console.error(err);
      alert("Complete failed");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pending Withdrawals</h3>
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={filters.status ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value || undefined }))}
        >
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Rejected</option>
          <option>Cancelled</option>
          <option>Expired</option>
        </select>
      </div>

      {loading ? <div>Loading...</div> : null}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((w) => (
            <tr key={w.id}>
              <td className="p-2">{w.id}</td>
              <td className="p-2">{w.userId}</td>
              <td className="p-2">{w.amount}</td>
              <td className="p-2">{w.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => approve(w.id)} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => reject(w.id)} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
                <button onClick={() => complete(w.id)} className="px-2 py-1 border rounded">Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWithdrawals;
