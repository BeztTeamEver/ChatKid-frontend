import { BODY_CREATE_PROMPT, BODY_UPDATE_PROMPT } from "@/types/prompt.type";

import { get, patch, post } from "./config/ApiCaller";

export const PromptApi = {
  getListPrompt: async (
    pageNumber: number,
    pageSize: number,
    search: String = "",
    status: String = "",
  ) => {
    return await get({
      endpoint: `/prompts?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }${status?.trim() ? `&status=${status}` : ""}`,
    });
  },

  updatePrompt: async (body: BODY_UPDATE_PROMPT, id: string) => {
    return await patch({ endpoint: `/prompts/${id}/`, body });
  },

  createPrompt: async (body: BODY_CREATE_PROMPT) => {
    return await post({ endpoint: "/prompts", body });
  },

  inactivePrompt: async (id: string) => {
    return await patch({ endpoint: `/prompts/${id}/`, body: { status: "INACTIVE" } });
  },

  activePrompt: async (id: string) => {
    return await patch({ endpoint: `/prompts/${id}/`, body: { status: "ACTIVE" } });
  },
};
