import React, { useState } from "react";
import { registerUser } from "../../lib/api/types/auth";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await registerUser({
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,
        confirmPassword: form.confirmPassword,
        fullName: form.fullName,
      });
      console.log("Registration response:", response);
      alert("Registration successful. Please verify email/login.");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage = 
        err?.response?.data?.message || 
        err?.response?.data?.detail ||
        err?.message || 
        "Registration failed. Please check your connection and try again.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="fullName" value={form.fullName} onChange={onChange} placeholder="Full name" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="w-full p-2 border rounded" required />
        <input name="phoneNumber" value={form.phoneNumber} onChange={onChange} placeholder="Phone" className="w-full p-2 border rounded" />
        <input name="password" value={form.password} onChange={onChange} placeholder="Password" type="password" className="w-full p-2 border rounded" required />
        <input name="confirmPassword" value={form.confirmPassword} onChange={onChange} placeholder="Confirm password" type="password" className="w-full p-2 border rounded" required />
        <button type="submit" disabled={loading} className="w-full p-2 bg-green-600 text-white rounded">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
