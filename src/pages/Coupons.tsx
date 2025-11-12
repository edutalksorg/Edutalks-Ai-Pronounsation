import React, { useState, useEffect } from "react";
import { CouponsAPI } from "../lib/api/types/coupons";

// ==============================
// Type definitions (match Swagger)
// ==============================
type DiscountType = "Percentage" | "FixedAmount";
type ApplicableTo = "Both" | "Quiz" | "Subscription";
type CouponStatus = "Active" | "Inactive" | "Expired" | "Draft";

interface CreateCouponForm {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount: number;
  minimumPurchaseAmount: number;
  applicableTo: ApplicableTo;
  specificQuizIds: string[];
  specificPlanIds: string[];
  maxTotalUsage: number;
  maxUsagePerUser: number;
  startDate: string;
  expiryDate: string;
}

interface UpdateCouponForm {
  id: string;
  description: string;
  maxDiscountAmount: number;
  minimumPurchaseAmount: number;
  maxTotalUsage: number;
  maxUsagePerUser: number;
  expiryDate: string;
  status: CouponStatus;
}

// ==============================
// Coupon Management Page
// ==============================
const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);

  const [form, setForm] = useState<CreateCouponForm>({
    code: "",
    description: "",
    discountType: "Percentage",
    discountValue: 0,
    maxDiscountAmount: 0,
    minimumPurchaseAmount: 0,
    applicableTo: "Both",
    specificQuizIds: [],
    specificPlanIds: [],
    maxTotalUsage: 1,
    maxUsagePerUser: 1,
    startDate: "",
    expiryDate: "",
  });

  const [updateForm, setUpdateForm] = useState<UpdateCouponForm>({
    id: "",
    description: "",
    maxDiscountAmount: 0,
    minimumPurchaseAmount: 0,
    maxTotalUsage: 0,
    maxUsagePerUser: 0,
    expiryDate: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // ---------- Fetch Coupons ----------
  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await CouponsAPI.list({ page, pageSize, searchTerm: search });
      setCoupons(res); // ✅ FIXED (no .data)
    } catch (err: any) {
      console.error(err);
      alert("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [page, search]);

  // ---------- Handle Form ----------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        ["discountValue", "maxDiscountAmount", "minimumPurchaseAmount", "maxTotalUsage", "maxUsagePerUser"].includes(
          name
        )
          ? Number(value)
          : value,
    }));
  };

  // ---------- Handle Update Form ----------
  const handleUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]:
        ["maxDiscountAmount", "minimumPurchaseAmount", "maxTotalUsage", "maxUsagePerUser"].includes(
          name
        )
          ? Number(value)
          : value,
    }));
  };

  // ---------- Create Coupon ----------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.description) {
      alert("Code and description are required");
      return;
    }

    setLoading(true);
    try {
      await CouponsAPI.create({
        ...form,
        discountType: form.discountType,
        applicableTo: form.applicableTo,
      });
      alert("✅ Coupon created successfully!");
      setForm({
        code: "",
        description: "",
        discountType: "Percentage",
        discountValue: 0,
        maxDiscountAmount: 0,
        minimumPurchaseAmount: 0,
        applicableTo: "Both",
        specificQuizIds: [],
        specificPlanIds: [],
        maxTotalUsage: 1,
        maxUsagePerUser: 1,
        startDate: "",
        expiryDate: "",
      });
      fetchCoupons();
    } catch (err: any) {
      console.error(err);
      alert("Failed to create coupon");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Start Editing ----------
  const handleEdit = (coupon: any) => {
    setEditingCouponId(coupon.id);
    setUpdateForm({
      id: coupon.id,
      description: coupon.description,
      maxDiscountAmount: coupon.maxDiscountAmount,
      minimumPurchaseAmount: coupon.minimumPurchaseAmount,
      maxTotalUsage: coupon.maxTotalUsage,
      maxUsagePerUser: coupon.maxUsagePerUser,
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split("T")[0] : "",
      status: coupon.status || "Active",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- Update Coupon ----------
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateForm.id) return;

    setLoading(true);
    try {
      await CouponsAPI.update(updateForm.id, updateForm);
      alert("✅ Coupon updated successfully!");
      setEditingCouponId(null);
      setUpdateForm({
        id: "",
        description: "",
        maxDiscountAmount: 0,
        minimumPurchaseAmount: 0,
        maxTotalUsage: 0,
        maxUsagePerUser: 0,
        expiryDate: "",
        status: "Active",
      });
      fetchCoupons();
    } catch (err: any) {
      console.error(err);
      alert("Failed to update coupon");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Delete Coupon ----------
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await CouponsAPI.delete(id);
      alert("🗑️ Coupon deleted successfully!");
      fetchCoupons();
    } catch (err) {
      console.error(err);
      alert("Failed to delete coupon");
    }
  };

  // ---------- Validate Coupon ----------
  const [validateForm, setValidateForm] = useState({
    couponCode: "",
    amount: 0,
    itemType: "Quiz",
    itemId: "",
  });
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await CouponsAPI.validate(validateForm);
      setValidationResult(res);
      alert("✅ Coupon validated successfully!");
    } catch (err: any) {
      console.error(err);
      alert("❌ Invalid or expired coupon");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-indigo-700">
        🎟️ Coupon Management
      </h1>

      {/* ---------- Create / Edit Coupon Form ---------- */}
      <section className="mb-8 border p-4 rounded">
        <h2 className="text-xl font-medium mb-3">
          {editingCouponId ? "Update Coupon" : "Create New Coupon"}
        </h2>

        <form
          onSubmit={editingCouponId ? handleUpdate : handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          {!editingCouponId && (
            <input
              type="text"
              name="code"
              placeholder="Coupon Code"
              value={form.code}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          )}

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={editingCouponId ? updateForm.description : form.description}
            onChange={editingCouponId ? handleUpdateChange : handleChange}
            className="p-2 border rounded"
          />

          {!editingCouponId && (
            <>
              <select
                name="discountType"
                value={form.discountType}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    discountType: e.target.value as DiscountType,
                  }))
                }
                className="p-2 border rounded"
              >
                <option value="Percentage">Percentage</option>
                <option value="FixedAmount">Fixed Amount</option>
              </select>

              <input
                type="number"
                name="discountValue"
                placeholder="Discount Value"
                value={form.discountValue}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </>
          )}

          <input
            type="number"
            name="maxDiscountAmount"
            placeholder="Max Discount Amount"
            value={
              editingCouponId
                ? updateForm.maxDiscountAmount
                : form.maxDiscountAmount
            }
            onChange={editingCouponId ? handleUpdateChange : handleChange}
            className="p-2 border rounded"
          />

          <input
            type="number"
            name="minimumPurchaseAmount"
            placeholder="Minimum Purchase Amount"
            value={
              editingCouponId
                ? updateForm.minimumPurchaseAmount
                : form.minimumPurchaseAmount
            }
            onChange={editingCouponId ? handleUpdateChange : handleChange}
            className="p-2 border rounded"
          />

          {!editingCouponId && (
            <>
              <select
                name="applicableTo"
                value={form.applicableTo}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    applicableTo: e.target.value as ApplicableTo,
                  }))
                }
                className="p-2 border rounded"
              >
                <option value="Both">Both</option>
                <option value="Quiz">Quiz</option>
                <option value="Subscription">Subscription</option>
              </select>

              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </>
          )}

          <input
            type="datetime-local"
            name="expiryDate"
            value={
              editingCouponId ? updateForm.expiryDate : form.expiryDate
            }
            onChange={editingCouponId ? handleUpdateChange : handleChange}
            className="p-2 border rounded"
          />

          {editingCouponId && (
            <select
              name="status"
              value={updateForm.status}
              onChange={handleUpdateChange}
              className="p-2 border rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Expired">Expired</option>
              <option value="Draft">Draft</option>
            </select>
          )}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading
              ? "Saving..."
              : editingCouponId
              ? "Update Coupon"
              : "Create Coupon"}
          </button>
        </form>
      </section>

      {/* ---------- Coupons List ---------- */}
      <section className="mb-8">
        <h2 className="text-xl font-medium mb-3">All Coupons</h2>
        <div className="flex items-center justify-between mb-3">
          <input
            type="text"
            placeholder="Search by code or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-1/2"
          />
        </div>

        {loading ? (
          <p>Loading coupons...</p>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length > 0 ? (
                coupons.map((c) => (
                  <tr key={c.id}>
                    <td className="p-2 border">{c.code}</td>
                    <td className="p-2 border">{c.discountType}</td>
                    <td className="p-2 border">{c.discountValue}</td>
                    <td className="p-2 border">{c.status}</td>
                    <td className="p-2 border text-center space-x-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border text-center" colSpan={5}>
                    No coupons found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>

      {/* ---------- Validate Coupon ---------- */}
      <section>
        <h2 className="text-xl font-medium mb-3">Validate Coupon (User Test)</h2>
        <form onSubmit={handleValidate} className="grid grid-cols-2 gap-4 mb-3">
          <input
            type="text"
            name="couponCode"
            placeholder="Coupon Code"
            value={validateForm.couponCode}
            onChange={(e) =>
              setValidateForm({ ...validateForm, couponCode: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Original Amount"
            value={validateForm.amount}
            onChange={(e) =>
              setValidateForm({ ...validateForm, amount: Number(e.target.value) })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="itemType"
            placeholder="Item Type (Quiz/Subscription)"
            value={validateForm.itemType}
            onChange={(e) =>
              setValidateForm({ ...validateForm, itemType: e.target.value })
            }
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="itemId"
            placeholder="Item ID"
            value={validateForm.itemId}
            onChange={(e) =>
              setValidateForm({ ...validateForm, itemId: e.target.value })
            }
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Validate Coupon
          </button>
        </form>

        {validationResult && (
          <div className="p-4 bg-gray-50 border rounded">
            <h3 className="font-semibold mb-2">Validation Result:</h3>
            <p>Discount Amount: ₹{validationResult.discountAmount}</p>
            <p>Final Price: ₹{validationResult.finalPrice}</p>
            <p>Discount Percentage: {validationResult.discountPercentage}%</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Coupons;
