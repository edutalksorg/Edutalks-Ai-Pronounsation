import axiosClient from "./axiosClient";

// ========================== ADMIN MODULE ==========================

// ---------- REVIEW INSTRUCTOR ----------
export interface ReviewInstructorRequest {
  applicationId: string;
  approve: boolean;
  notes: string;
}

/**
 * POST /api/v1/Admin/instructors/{id}/review
 * Review an instructor's application (approve or reject)
 * @param id - Instructor ID (path parameter)
 * @param data - Request body with applicationId, approve, and notes
 * @returns Response data
 */
export const reviewInstructor = async (id: string, data: ReviewInstructorRequest) => {
  const res = await axiosClient.post(`/api/v1/Admin/instructors/${id}/review`, data);
  return res.data;
};

// ---------- APPLICATIONS (ADMIN REVIEW) ----------
/**
 * GET /api/v1/admin/applications
 * Get paginated list of applications
 * @param params - Query parameters with page and pageSize
 * @returns Response data
 */
export const getApplications = async (params: { page?: number; pageSize?: number } = {}) => {
  const res = await axiosClient.get("/api/v1/admin/applications", {
    params: { page: params.page ?? 1, pageSize: params.pageSize ?? 10 },
  });
  return res.data;
};

/**
 * PATCH /api/v1/admin/applications/{id}
 * Approve or reject an application
 * @param id - Application ID
 * @param payload - Status update payload
 * @returns Response data
 */
export const approveApplication = async (id: string, payload: { status: "Approved" | "Rejected" }) => {
  const res = await axiosClient.patch(`/api/v1/admin/applications/${id}`, payload);
  return res.data;
};

// ✅ DEFAULT EXPORT
const AdminAPI = {
  reviewInstructor,
  getApplications,
  approveApplication,
};

export default AdminAPI;
