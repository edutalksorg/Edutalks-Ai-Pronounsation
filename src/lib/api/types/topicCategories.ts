// src/lib/api/topicCategories.ts
import axiosClient from "./axiosClient";

export const TopicCategoriesAPI = {
  /** GET /api/v1/topics/categories */
  getAll: async () => {
    const { data } = await axiosClient.get("/topics/categories");
    return data;
  },

  /** POST /api/v1/topics/categories */
  create: async (payload: any) => {
    const { data } = await axiosClient.post("/topics/categories", payload);
    return data;
  },

  /** PUT /api/v1/topics/categories/{id} */
  update: async (id: string, payload: any) => {
    const { data } = await axiosClient.put(`/topics/categories/${id}`, payload);
    return data;
  },

  /** DELETE /api/v1/topics/categories/{id} */
  remove: async (id: string) => {
    const { data } = await axiosClient.delete(`/topics/categories/${id}`);
    return data;
  },
};

export default TopicCategoriesAPI;
