import React, { useState } from "react";
import { loginUser } from "../../lib/api/types/auth";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: any = await loginUser({ identifier, password });
      // assume res contains accessToken / refreshToken
      if (res?.accessToken || res?.token) {
        const token = res.accessToken ?? res.token;
        localStorage.setItem("access_token", token);
      }
      if (res?.refreshToken) localStorage.setItem("refresh_token", res.refreshToken);
      alert("Login successful");
      navigate("/"); // adjust route
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or phone"
          className="w-full p-2 border rounded"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
