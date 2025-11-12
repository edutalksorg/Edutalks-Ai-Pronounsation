import axiosClient from "./axiosClient";
import type { CreateQuizCommand } from "../generated/models/CreateQuizCommand";
import type { UpdateQuizCommand } from "../generated/models/UpdateQuizCommand";
import type { SubmitQuizRequest } from "../generated/models/SubmitQuizRequest";
import type { PublishQuizRequest } from "../generated/models/PublishQuizRequest";
import type { QuizDifficulty } from "../generated/models/QuizDifficulty";

// ========================== QUIZ API MODULE ==========================

/**
 * GET /api/v1/quizzes - Query Parameters Schema
 */
export interface GetQuizzesParams {
  Page?: number; // integer($int32) - Page number
  PageSize?: number; // integer($int32) - Page size
  SearchTerm?: string; // string - Search term
  Difficulty?: QuizDifficulty | "Beginner" | "Intermediate" | "Advanced";
}

/**
 * GET /api/v1/quizzes/{id}/attempts - Query Parameters Schema
 */
export interface GetQuizAttemptsParams {
  page?: number; // Page number (default: 1)
  pageSize?: number; // Page size (default: 10, max: 50)
  passedOnly?: boolean; // Filter to only passed attempts
}

// ========================== QUIZZES API ==========================

const QuizzesAPI = {
  /**
   * GET /api/v1/quizzes
   * Get paginated list of quizzes with unlock status
   */
  getQuizzes: async (params?: GetQuizzesParams) => {
    const res = await axiosClient.get("/api/v1/quizzes", { params });
    return res.data;
  },

  /**
   * POST /api/v1/quizzes
   * Create a new quiz with questions (Instructor/Admin only)
   */
  createQuiz: async (data: CreateQuizCommand) => {
    const res = await axiosClient.post("/api/v1/quizzes", data);
    return res.data;
  },

  /**
   * GET /api/v1/quizzes/{id}
   * Get quiz details with questions (only if unlocked or user is instructor/admin)
   */
  getQuizById: async (id: string) => {
    const res = await axiosClient.get(`/api/v1/quizzes/${id}`);
    return res.data;
  },

  /**
   * PUT /api/v1/quizzes/{id}
   * Update an existing quiz (Instructor/Admin only)
   */
  updateQuiz: async (id: string, data: UpdateQuizCommand) => {
    const res = await axiosClient.put(`/api/v1/quizzes/${id}`, data);
    return res.data;
  },

  /**
   * DELETE /api/v1/quizzes/{id}
   * Soft delete a quiz (Instructor/Admin only)
   */
  deleteQuiz: async (id: string) => {
    const res = await axiosClient.delete(`/api/v1/quizzes/${id}`);
    return res.data;
  },

  /**
   * POST /api/v1/quizzes/{id}/submit
   * Submit quiz answers for scoring
   */
  submitQuiz: async (id: string, data: SubmitQuizRequest) => {
    const res = await axiosClient.post(`/api/v1/quizzes/${id}/submit`, data);
    return res.data;
  },

  /**
   * POST /api/v1/quizzes/{id}/publish
   * Publish or unpublish a quiz
   */
  publishQuiz: async (id: string, data: PublishQuizRequest) => {
    const res = await axiosClient.post(`/api/v1/quizzes/${id}/publish`, data);
    return res.data;
  },

  /**
   * GET /api/v1/quizzes/{id}/attempts
   * Get user's attempt history for a specific quiz
   */
  getQuizAttempts: async (id: string, params?: GetQuizAttemptsParams) => {
    const res = await axiosClient.get(`/api/v1/quizzes/${id}/attempts`, { params });
    return res.data;
  },

  /**
   * GET /api/v1/quizzes/{id}/attempts/{attemptId}
   * Get detailed results for a specific quiz attempt
   */
  getQuizAttemptDetails: async (id: string, attemptId: string) => {
    const res = await axiosClient.get(`/api/v1/quizzes/${id}/attempts/${attemptId}`);
    return res.data;
  },
};

export default QuizzesAPI;
