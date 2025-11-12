import React, { useEffect, useState } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  addFeature,
  updateFeature,
  deleteFeature,
} from "@/lib/api/types/subscriptions";

type Plan = {
  planId?: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingCycle: "Monthly" | "Yearly" | string;
  features?: Record<string, string>;
  isActive?: boolean;
  displayOrder?: number;
  trialDays?: number;
  isMostPopular?: boolean;
  marketingTagline?: string;
};

const SubscriptionsAdmin: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [featureKey, setFeatureKey] = useState("");
  const [featureValue, setFeatureValue] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getPlans();
      const data = (res as any)?.data ?? (res as any);
      setPlans(Array.isArray(data) ? data : data?.data ?? []);
    } catch (e) {
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startCreate = () => {
    setEditing({
      name: "",
      description: "",
      price: 0,
      currency: "USD",
      billingCycle: "Monthly",
      features: {},
      isActive: true,
      displayOrder: 0,
      trialDays: 0,
      isMostPopular: false,
      marketingTagline: "",
    });
  };

  const savePlan = async () => {
    if (!editing) return;
    setLoading(true);
    try {
      const payload = {
        name: editing.name,
        description: editing.description,
        price: Number(editing.price),
        currency: editing.currency,
        billingCycle: editing.billingCycle,
        features: editing.features ?? {},
        isActive: !!editing.isActive,
        displayOrder: Number(editing.displayOrder ?? 0),
        trialDays: Number(editing.trialDays ?? 0),
        isMostPopular: !!editing.isMostPopular,
        marketingTagline: editing.marketingTagline,
      };
      const id = editing.planId || editing.id;
      if (id) {
        await updatePlan(id, { planId: id, ...payload, replaceAllFeatures: true });
      } else {
        await createPlan(payload);
      }
      setEditing(null);
      load();
    } catch (e) {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const removePlan = async (id: string) => {
    if (!confirm("Delete plan?")) return;
    try {
      await deletePlan(id);
      load();
    } catch {
      alert("Delete failed");
    }
  };

  const addOrUpdateFeature = async (p: Plan, isUpdate = false) => {
    const id = p.planId || (p as any).id;
    if (!id || !featureKey) return;
    try {
      if (isUpdate) {
        await updateFeature(id, featureKey, { planId: id, featureKey, isEnabled: true, value: featureValue });
      } else {
        await addFeature(id, { planId: id, featureKey, value: featureValue });
      }
      setFeatureKey("");
      setFeatureValue("");
      load();
    } catch {
      alert("Feature save failed");
    }
  };

  const removeFeature = async (p: Plan, key: string) => {
    const id = p.planId || (p as any).id;
    if (!id) return;
    try {
      await deleteFeature(id, key);
      load();
    } catch {
      alert("Feature delete failed");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Subscription Plans</h2>
        <div className="space-x-2">
          <button className="px-3 py-2 border rounded" onClick={load} disabled={loading}>
            {loading ? "Loading..." : "Reload"}
          </button>
          <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={startCreate}>
            New Plan
          </button>
        </div>
      </div>

      {/* Editor */}
      {editing && (
        <div className="mb-6 p-4 border rounded">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input className="p-2 border rounded" placeholder="Name" value={editing.name}
                   onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            <input className="p-2 border rounded" placeholder="Description" value={editing.description}
                   onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            <input type="number" className="p-2 border rounded" placeholder="Price" value={editing.price}
                   onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
            <input className="p-2 border rounded" placeholder="Currency" value={editing.currency}
                   onChange={(e) => setEditing({ ...editing, currency: e.target.value })} />
            <select className="p-2 border rounded" value={editing.billingCycle}
                    onChange={(e) => setEditing({ ...editing, billingCycle: e.target.value })}>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
            <input type="number" className="p-2 border rounded" placeholder="Display Order" value={editing.displayOrder ?? 0}
                   onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
            <input type="number" className="p-2 border rounded" placeholder="Trial Days" value={editing.trialDays ?? 0}
                   onChange={(e) => setEditing({ ...editing, trialDays: Number(e.target.value) })} />
            <input className="p-2 border rounded" placeholder="Marketing Tagline" value={editing.marketingTagline ?? ""}
                   onChange={(e) => setEditing({ ...editing, marketingTagline: e.target.value })} />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!editing.isActive}
                     onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
              Active
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!editing.isMostPopular}
                     onChange={(e) => setEditing({ ...editing, isMostPopular: e.target.checked })} />
              Most Popular
            </label>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="px-3 py-2 bg-green-600 text-white rounded" onClick={savePlan} disabled={loading}>
              {loading ? "Saving..." : "Save Plan"}
            </button>
            <button className="px-3 py-2 border rounded" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Plans Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Cycle</th>
              <th className="p-2">Active</th>
              <th className="p-2">Features</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => {
              const id = (p as any).planId || (p as any).id;
              return (
                <tr key={id}>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.price} {p.currency}</td>
                  <td className="p-2">{p.billingCycle}</td>
                  <td className="p-2">{p.isActive ? "Yes" : "No"}</td>
                  <td className="p-2">
                    <div className="space-y-1">
                      {p.features && Object.entries(p.features).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between gap-2">
                          <span className="text-sm">{k}: {v as any}</span>
                          <button className="text-red-600 text-xs" onClick={() => removeFeature(p, k)}>Remove</button>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-2">
                        <input className="p-1 border rounded" placeholder="featureKey" value={featureKey}
                               onChange={(e) => setFeatureKey(e.target.value)} />
                        <input className="p-1 border rounded" placeholder="value" value={featureValue}
                               onChange={(e) => setFeatureValue(e.target.value)} />
                        <button className="px-2 py-1 border rounded" onClick={() => addOrUpdateFeature(p, false)}>Add</button>
                        <button className="px-2 py-1 border rounded" onClick={() => addOrUpdateFeature(p, true)}>Update</button>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 space-x-2">
                    <button className="px-2 py-1 border rounded" onClick={() => setEditing(p)}>Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => removePlan(id)}>Delete</button>
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

export default SubscriptionsAdmin;


