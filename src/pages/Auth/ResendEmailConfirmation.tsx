import React, { useState } from "react";
import { resendEmailConfirmation } from "../../lib/api/types/auth";

const ResendEmailConfirmation: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");
    setLoading(true);
    try {
      const res = await resendEmailConfirmation(email);
      alert("Confirmation link sent successfully.");
      console.log(res);
      setEmail("");
    } catch (err: any) {
      alert(err?.message ?? "Failed to resend confirmation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Resend Email Confirmation</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white p-2 rounded"
        >
          {loading ? "Sending..." : "Resend Confirmation"}
        </button>
      </form>
    </div>
  );
};

export default ResendEmailConfirmation;
