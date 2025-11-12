import React, { useState } from "react";
import { changePassword } from "../../lib/api/types/auth";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword)
      return alert("New passwords do not match.");
    setLoading(true);
    try {
      const res = await changePassword(form);
      alert("Password changed successfully.");
      console.log(res);
    } catch (err: any) {
      alert(err?.message ?? "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={onChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
