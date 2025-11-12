import React, { useEffect, useState } from "react";
import UsersAPI from "@/lib/api/types/users";
import axiosClient from "@/lib/api/types/axiosClient";

type User = {
  id: string;
  userId?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  isLocked?: boolean;
};

const UsersAdmin: React.FC = () => {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/api/v1/users", {
        params: { Page: page, PageSize: pageSize },
      });
      const data = (res as any)?.data ?? (res as any);
      setItems(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const lock = async (id: string) => {
    try {
      await axiosClient.patch(`/api/v1/users/${id}/lock`);
      load();
    } catch {
      alert("Lock failed");
    }
  };
  const unlock = async (id: string) => {
    try {
      await axiosClient.patch(`/api/v1/users/${id}/unlock`);
      load();
    } catch {
      alert("Unlock failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="space-x-2">
          <button className="px-3 py-2 border rounded" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Reload"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((u) => {
              const id = u.id || u.userId!;
              return (
                <tr key={id}>
                  <td className="p-2">{u.fullName}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.phoneNumber}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2 space-x-2">
                    <button className="px-2 py-1 border rounded" onClick={() => lock(id)}>Lock</button>
                    <button className="px-2 py-1 border rounded" onClick={() => unlock(id)}>Unlock</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <div className="px-3 py-1 border rounded">Page {page}</div>
        <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UsersAdmin;


