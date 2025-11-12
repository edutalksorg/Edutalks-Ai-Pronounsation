import axiosClient from "./axiosClient";

// ---------- Pronunciation Module APIs ----------
export const PronunciationAPI = {
  getParagraphs: async () => {
    const { data } = await axiosClient.get("/pronunciation/paragraphs");
    return data;
  },

  createParagraph: async (payload: any) => {
    const { data } = await axiosClient.post("/pronunciation/paragraphs", payload);
    return data;
  },

  getParagraphById: async (id: string) => {
    const { data } = await axiosClient.get(`/pronunciation/paragraphs/${id}`);
    return data;
  },

  updateParagraph: async (id: string, payload: any) => {
    const { data } = await axiosClient.put(`/pronunciation/paragraphs/${id}`, payload);
    return data;
  },

  deleteParagraph: async (id: string) => {
    const { data } = await axiosClient.delete(`/pronunciation/paragraphs/${id}`);
    return data;
  },

  assessAudio: async (payload: any) => {
    const { data } = await axiosClient.post("/pronunciation/assess", payload);
    return data;
  },

  getAssessmentHistory: async () => {
    const { data } = await axiosClient.get("/pronunciation/history");
    return data;
  },

  getAssessmentAttempt: async (id: string) => {
    const { data } = await axiosClient.get(`/pronunciation/attempts/${id}`);
    return data;
  },
};

export default PronunciationAPI;
