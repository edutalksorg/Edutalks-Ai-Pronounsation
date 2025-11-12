// src/lib/api/voiceCall.ts
import axiosClient from "./axiosClient";

/** GET: list of online users available for calls */
export const getAvailableUsers = (params?: {
  preferredLanguage?: string;
  search?: string;
}) => axiosClient.get("/api/v1/calls/available-users", { params });

/** GET: search users by name/language */
export const searchUsers = (params: {
  searchTerm?: string;
  language?: string;
}) => axiosClient.get("/api/v1/calls/search-users", { params });

/** PUT: update your availability status */
export const setAvailability = (status: "Online" | "Offline") =>
  axiosClient.put("/api/v1/calls/availability", { status });

/** POST: initiate a call to another user */
export const initiateCall = (payload: {
  calleeId: string;
  topicId?: string;
}) => axiosClient.post("/api/v1/calls/initiate", payload);

/** POST: respond to call (body is boolean: true=accept, false=reject) */
export const respondToCall = (callId: string, accept: boolean) =>
  axiosClient.post(`/api/v1/calls/${callId}/respond`, accept);

/** POST: end an active call */
export const endCall = (callId: string, reason?: string) =>
  axiosClient.post(`/api/v1/calls/${callId}/end`, reason ?? "");

/** POST: rate a completed call (1–5) */
export const rateCall = (callId: string, rating: number) =>
  axiosClient.post(`/api/v1/calls/${callId}/rate`, rating);

/** GET: call history with pagination/filters */
export const getCallHistory = (params?: {
  pageNumber?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
}) => axiosClient.get("/api/v1/calls/history", { params });

/** GET: ICE / STUN server config for WebRTC (read-only) */
export const getWebrtcConfig = () =>
  axiosClient.get("/api/v1/calls/webrtc-config");
