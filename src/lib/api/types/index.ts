// src/lib/api/index.ts
export * from "./auth";
export * from "./admin";
export * from "./adminPayments";
export * from "./dailyTopics";
export * from "./payments";
export * from "./pronunciation";
export * from "./quizzes";
export * from "./subscriptions";
export * from "./topicCategories";
export * from "./users";
export * from "./voiceCall";
export * from "./wallet";

import axiosInstance from "./axiosClient";
export { axiosInstance };
