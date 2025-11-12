// src/lib/api/users.ts
import axiosClient from "./axiosClient";

/* ========= 🔹 USERS API MODULE 🔹 ========= */

export interface UpdateUserProfileCommand {
  fullName?: string;
  phoneNumber?: string;
  bio?: string;
  languagePreference?: string;
  avatarUrl?: string;
}

export interface ReviewInstructorPayload {
  status: "Approved" | "Rejected";
  comments?: string;
}

const UsersAPI = {
  /** ✅ Get instructors list */
  getInstructors: async () => {
    const res = await axiosClient.get(`/Admin/instructors`);
    return res.data;
  },
  

  /** ✅ Approve or reject instructor */
  approveInstructor: async (id: string, payload: ReviewInstructorPayload) => {
    const res = await axiosClient.post(`/Admin/instructors/${id}/review`, payload);
    return res.data;
  },

  /** ✅ Get authenticated user profile */
  getUserProfile: async () => {
    const res = await axiosClient.get(`/users/profile`);
    return res.data;
  },

  /** ✅ Update user profile */
  updateUserProfile: async (payload: UpdateUserProfileCommand) => {
    const res = await axiosClient.put(`/users/profile`, payload);
    return res.data;
  },

  /** ✅ Upload avatar */
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosClient.post(`/users/profile/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },
};

export default UsersAPI;
