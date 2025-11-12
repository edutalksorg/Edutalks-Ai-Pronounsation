import React, { useEffect, useState } from "react";
import { AdminPaymentsAPI, RefundFilter } from "../../lib/api/types/adminPayments";

type Refund = {
  id: string;
  userId?: string;
  transactionId?: string;
  amount?: number;
  status?: string;
  createdAt?: string;
  rejectionReason?: string;
};

const AdminRefunds: React.FC = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<RefundFilter>({ pageNumber: 1, pageSize: 20 });

  const load = async () => {
    setLoading(true);
    try {
      const res: any = await AdminPaymentsAPI.getPendingRefunds(filters);
      const data = res?.data ?? res;
      setRefunds(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error(err);
      alert("Failed to load refunds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status]);

  const approve = async (id: string) => {
    const notes = prompt("Admin notes (optional)") ?? "";
    try {
      await AdminPaymentsAPI.approveRefund(id, { adminNotes: notes });
      alert("Refund approved");
      load();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  };

  const reject = async (id: string) => {
    const reason = prompt("Rejection reason") ?? "";
    try {
      await AdminPaymentsAPI.rejectRefund(id, { rejectionReason: reason });
      alert("Refund rejected");
      load();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Pending Refunds</h3>
      {/* Filters */}
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
          <option>Failed</option>
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
          {refunds.map((r) => (
            <tr key={r.id}>
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.userId}</td>
              <td className="p-2">{r.amount}</td>
              <td className="p-2">{r.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => approve(r.id)} className="px-2 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => reject(r.id)} className="px-2 py-1 bg-red-600 text-white rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRefunds;
