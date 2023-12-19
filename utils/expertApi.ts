import { BODY_CREATE_EXPERT } from "@/types/expert.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const ExpertApi = {
  getListExpert: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/expert?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  getDetailExpert: async (id: string) => {
    return await get({
      endpoint: `/expert/${id}`,
    });
  },

  createExpert: async (body: BODY_CREATE_EXPERT) => {
    return await post({ endpoint: "/expert", body });
  },

  removeExpert: async (id: string) => {
    return await remove({ endpoint: `/expert/${id}` });
  },

  unbanExpert: async (id: string) => {
    return await put({ endpoint: `/expert/${id}`, body: { status: 1 } });
  },
};
