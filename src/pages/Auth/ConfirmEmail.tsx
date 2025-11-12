import React, { useState } from "react";
import { confirmEmail } from "../../lib/api/types/auth";

const ConfirmEmail: React.FC = () => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await confirmEmail(userId, token);
      alert("Email confirmed successfully.");
      console.log(res);
    } catch (err: any) {
      alert(err?.message ?? "Failed to confirm email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Confirm Email</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loading ? "Confirming..." : "Confirm Email"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmEmail;
