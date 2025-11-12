import axiosClient from "./axiosClient";

// ========== REGISTER ==========
export interface RegisterRequest {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  role?: string;
  referralCode?: string;
  referralSource?: string;
  instructorBio?: string;
  instructorExpertise?: string[];
}

export const registerUser = async (data: RegisterRequest) => {
  const res = await axiosClient.post("/api/v1/auth/register", data);
  return res.data;
};

// ========== LOGIN ==========
export interface LoginRequest {
  identifier: string;
  password: string;
  deviceId?: string;
  rememberMe?: boolean;
}

export const loginUser = async (data: LoginRequest) => {
  const res = await axiosClient.post("/api/v1/auth/login", data);
  return res.data;
};

// ========== CONFIRM EMAIL ==========
export const confirmEmail = async (userId: string, token: string) => {
  const res = await axiosClient.get("/api/v1/auth/confirm-email", {
    params: { userId, token },
  });
  return res.data;
};

// ========== FORGOT PASSWORD ==========
export const forgotPassword = async (email: string) => {
  const res = await axiosClient.post("/api/v1/auth/forgot-password", { email });
  return res.data;
};

// ========== CHANGE PASSWORD ==========
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (data: ChangePasswordRequest) => {
  const res = await axiosClient.put("/api/v1/auth/change-password", data);
  return res.data;
};

// ========== LOGOUT ==========
export interface LogoutRequest {
  refreshToken: string;
  logoutFromAllDevices?: boolean;
}

export const logoutUser = async (data: LogoutRequest) => {
  const res = await axiosClient.post("/api/v1/auth/logout", data);
  return res.data;
};

// ========== RESEND EMAIL CONFIRMATION ==========
export const resendEmailConfirmation = async (email: string) => {
  const res = await axiosClient.post("/api/v1/auth/resend-email-confirmation", { email });
  return res.data;
};

// ========== REFRESH TOKEN ==========
export const refreshToken = async (refreshToken: string) => {
  const res = await axiosClient.post("/api/v1/auth/refresh-token", { refreshToken });
  return res.data;
};

// ✅ ADD THIS DEFAULT EXPORT (Fixes your import issue)
const AuthAPI = {
  registerUser,
  loginUser,
  confirmEmail,
  forgotPassword,
  changePassword,
  logoutUser,
  resendEmailConfirmation,
  refreshToken,
};

export default AuthAPI;
