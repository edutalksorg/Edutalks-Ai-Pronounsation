import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

// ---------- Public ----------
import Index from "@/pages/Index";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ChangePassword from "@/pages/Auth/ChangePassword";
import ConfirmEmail from "./pages/Auth/ConfirmEmail";
import ResendEmailConfirmation from "./pages/Auth/ResendEmailConfirmation";

// ---------- Admin (First 4 modules wired) ----------
import AdminTransactions from "@/pages/Admin/AdminTransactions";
import AdminWithdrawals from "@/pages/Admin/AdminWithdrawals";
import AdminRefunds from "@/pages/Admin/AdminRefunds";
import AdminInstructorReview from "@/pages/Admin/AdminInstructorReview";
import WalletAdjust from "@/pages/Admin/WalletAdjust";
import SubscriptionsAdmin from "@/pages/Admin/Subscriptions";
import TopicCategoriesAdmin from "@/pages/Admin/TopicCategoriesAdmin";
import UsersAdmin from "@/pages/Admin/Users";

// ---------- Extras ----------
import ApiSmoke from "@/pages/ApiSmoke";
import Applications from "@/pages/Applications";
import { useAuth } from "@/contexts/AuthContext";

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
    return <div className="p-6">Unauthorized</div>;
  }
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/resend-email-confirmation" element={<ResendEmailConfirmation />} />

        {/* Admin */}
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
        <Route path="/admin/refunds" element={<AdminRefunds />} />
        <Route path="/admin/instructor-review" element={<AdminInstructorReview />} />
        <Route path="/admin/wallet-adjust" element={<WalletAdjust />} />
        <Route path="/admin/subscriptions" element={<RequireAdmin><SubscriptionsAdmin /></RequireAdmin>} />
        <Route path="/admin/topic-categories" element={<RequireAdmin><TopicCategoriesAdmin /></RequireAdmin>} />
        <Route path="/admin/users" element={<RequireAdmin><UsersAdmin /></RequireAdmin>} />
        <Route path="/admin/applications" element={<RequireAdmin><Applications /></RequireAdmin>} />

        {/* Utilities */}
        <Route path="/api-smoke" element={<ApiSmoke />} />

        {/* Fallback */}
        <Route path="*" element={<div className="p-6">Page not found.</div>} />
      </Routes>
    </BrowserRouter>
  );
}
