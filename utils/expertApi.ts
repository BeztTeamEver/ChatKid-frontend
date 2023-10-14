import { BODY_CREATE_EXPERT } from "@/types/expert.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const ExpertApi = {
  getListExpert: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/experts?page-number=${pageNumber}&page-size=${pageSize}&search=${search}`,
    });
  },

  createExpert: async (body: BODY_CREATE_EXPERT) => {
    return await post({ endpoint: "/experts", body });
  },

  removeExpert: async (id: string) => {
    return await remove({ endpoint: `/experts/${id}` });
  },

  unbanExpert: async (id: string) => {
    return await put({ endpoint: `/experts/${id}`, body: { status: 1 } });
  },
};
