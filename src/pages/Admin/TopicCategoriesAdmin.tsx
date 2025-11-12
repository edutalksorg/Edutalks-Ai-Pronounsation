import React, { useEffect, useState } from "react";
import TopicCategoriesAPI from "@/lib/api/types/topicCategories";

type Category = {
  id?: string;
  categoryId?: string;
  name: string;
  displayOrder?: number;
  isActive?: boolean;
};

const TopicCategoriesAdmin: React.FC = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await TopicCategoriesAPI.getAll();
      const data = (res as any)?.data ?? (res as any);
      setItems(Array.isArray(data) ? data : data?.data ?? []);
    } catch {
      alert("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => setEditing({ name: "", displayOrder: 0, isActive: true });

  const save = async () => {
    if (!editing) return;
    setLoading(true);
    try {
      const id = editing.id || editing.categoryId;
      if (id) {
        await TopicCategoriesAPI.update(id, {
          categoryId: id,
          name: editing.name,
          displayOrder: Number(editing.displayOrder ?? 0),
          isActive: !!editing.isActive,
        });
      } else {
        await TopicCategoriesAPI.create({
          name: editing.name,
          displayOrder: Number(editing.displayOrder ?? 0),
        });
      }
      setEditing(null);
      load();
    } catch {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete category?")) return;
    try {
      await TopicCategoriesAPI.remove(id);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Topic Categories</h2>
        <div className="space-x-2">
          <button className="px-3 py-2 border rounded" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Reload"}
          </button>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={startCreate}>
            New Category
          </button>
        </div>
      </div>

      {editing && (
        <div className="mb-6 p-4 border rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input className="p-2 border rounded" placeholder="Name" value={editing.name}
                   onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <input type="number" className="p-2 border rounded" placeholder="Display Order" value={editing.displayOrder ?? 0}
                   onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!editing.isActive}
                     onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
              Active
            </label>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={save} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button className="px-3 py-2 border rounded" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Order</th>
              <th className="p-2">Active</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c) => {
              const id = c.id || c.categoryId!;
              return (
                <tr key={id}>
                  <td className="p-2">{c.name}</td>
                  <td className="p-2">{c.displayOrder ?? 0}</td>
                  <td className="p-2">{c.isActive ? "Yes" : "No"}</td>
                  <td className="p-2 space-x-2">
                    <button className="px-2 py-1 border rounded" onClick={() => setEditing(c)}>Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => remove(id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicCategoriesAdmin;


