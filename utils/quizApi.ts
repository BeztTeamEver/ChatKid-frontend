import { BODY_CREATE_QUIZ } from "@/types/quiz.type";

import { get, patch, post } from "./config/ApiCaller";

export const QuizApi = {
  getListQuiz: async (
    pageNumber: number,
    pageSize: number,
    search: String = "",
    status: String = "",
  ) => {
    return await get({
      endpoint: `/quizzes?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}&status=${status}` : ""
      }`,
    });
  },

  getDetailQuiz: async (id: String) => {
    return await get({
      endpoint: `/quizzes/${id}`,
    });
  },

  createQuiz: async (body: BODY_CREATE_QUIZ) => {
    return await post({ endpoint: "/quizzes", body });
  },

  updateQuiz: async (id: string, body: BODY_CREATE_QUIZ) => {
    return await patch({ endpoint: `/quizzes/${id}`, body });
  },

  hideQuiz: async (id: string) => {
    return await patch({ endpoint: `/quizzes/${id}`, body: { status: "UNAVAILABLE" } });
  },

  showQuiz: async (id: string) => {
    return await patch({ endpoint: `/quizzes/${id}`, body: { status: "AVAILABLE" } });
  },
};
