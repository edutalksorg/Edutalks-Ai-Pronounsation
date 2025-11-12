import axiosClient from "./axiosClient";

// ========================== DAILY TOPICS MODULE ==========================

// ---------- Types ----------
export interface TopicRequest {
  title: string;
  description: string;
  categoryId: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  discussionPoints: string[];
  vocabularyList: string[];
  estimatedDurationMinutes: number;
  author?: string;
}

export interface UpdateTopicRequest {
  topicId: string;
  title: string;
  description: string;
  categoryId: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  discussionPoints: string[];
  vocabularyList: string[];
  estimatedDurationMinutes: number;
}

export interface UpdateTopicStatusRequest {
  topicId: string;
  status: "Draft" | "Published" | "Archived";
}

// ---------- API Methods ----------
export const DailyTopicsAPI = {
  // ========== GET ALL TOPICS ==========
  list: async (params?: {
    CategoryId?: string;
    Difficulty?: string;
    SearchTerm?: string;
    PageNumber?: number;
    PageSize?: number;
  }) => {
    const res = await axiosClient.get("/api/v1/topics", { params });
    return res.data;
  },

  // ========== CREATE NEW TOPIC ==========
  create: async (data: TopicRequest) => {
    const res = await axiosClient.post("/api/v1/topics", data);
    return res.data;
  },

  // ========== GET TOPIC BY ID ==========
  getById: async (id: string) => {
    const res = await axiosClient.get(`/api/v1/topics/${id}`);
    return res.data;
  },

  // ========== UPDATE TOPIC ==========
  update: async (id: string, data: UpdateTopicRequest) => {
    const res = await axiosClient.put(`/api/v1/topics/${id}`, data);
    return res.data;
  },

  // ========== DELETE TOPIC ==========
  delete: async (id: string) => {
    const res = await axiosClient.delete(`/api/v1/topics/${id}`);
    return res.data;
  },

  // ========== UPDATE FEATURED STATUS ==========
  toggleFeatured: async (id: string, isFeatured: boolean) => {
    const res = await axiosClient.patch(`/api/v1/topics/${id}/featured`, null, {
      params: { isFeatured },
    });
    return res.data;
  },

  // ========== ADD TO FAVORITES ==========
  addFavorite: async (id: string) => {
    const res = await axiosClient.post(`/api/v1/topics/${id}/favorite`);
    return res.data;
  },

  // ========== REMOVE FROM FAVORITES ==========
  removeFavorite: async (id: string) => {
    const res = await axiosClient.delete(`/api/v1/topics/${id}/favorite`);
    return res.data;
  },

  // ========== GET FAVORITE TOPICS ==========
  getFavorites: async () => {
    const res = await axiosClient.get("/api/v1/topics/favorites");
    return res.data;
  },

  // ========== UPDATE TOPIC STATUS ==========
  updateStatus: async (id: string, data: UpdateTopicStatusRequest) => {
    const res = await axiosClient.patch(`/api/v1/topics/${id}/status`, data);
    return res.data;
  },
};
