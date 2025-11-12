import React, { useEffect, useState } from "react";
import { AdminPaymentsAPI, AdminTransactionFilter } from "../../lib/api/types/adminPayments";

type Transaction = {
  id: string;
  type: string;
  status: string;
  amount: number;
  currency?: string;
  description?: string;
  createdAt?: string;
  failureReason?: string;
};

const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AdminTransactionFilter>({ pageNumber: 1, pageSize: 20 });

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const params: AdminTransactionFilter = { ...filters, pageNumber: p };
      const res: any = await AdminPaymentsAPI.getTransactions(params);
      // response structure: res.data is the array per your swagger shape
      const data = res?.data ?? res;
      setTransactions(Array.isArray(data) ? data : data?.data ?? []);
    } catch (err) {
      console.error(err);
      alert("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters.type, filters.status, filters.startDate, filters.endDate]);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4">Transactions</h3>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <select
          className="p-2 border rounded"
          value={filters.type ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value || undefined }))}
        >
          <option value="">All Types</option>
          <option>Credit</option>
          <option>Debit</option>
          <option>Refund</option>
          <option>Withdrawal</option>
          <option>Fee</option>
          <option>ReferralReward</option>
          <option>CoursePayment</option>
          <option>SubscriptionPayment</option>
        </select>

        <select
          className="p-2 border rounded"
          value={filters.status ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value || undefined }))}
        >
          <option value="">All Statuses</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Failed</option>
          <option>Cancelled</option>
          <option>Refunded</option>
        </select>

        <input
          type="datetime-local"
          className="p-2 border rounded"
          value={filters.startDate ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value || undefined }))}
        />
        <input
          type="datetime-local"
          className="p-2 border rounded"
          value={filters.endDate ?? ""}
          onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value || undefined }))}
        />
      </div>
      {loading ? <div>Loading...</div> : null}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Type</th>
            <th className="p-2">Status</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="p-2">{t.id}</td>
              <td className="p-2">{t.type}</td>
              <td className="p-2">{t.status}</td>
              <td className="p-2">{t.amount} {t.currency}</td>
              <td className="p-2">{t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <div className="px-3 py-1 border rounded">Page {page}</div>
        <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminTransactions;
