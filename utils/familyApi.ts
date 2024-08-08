import { get, patch } from "./config/ApiCaller";

export const FamilyApi = {
  getListFamily: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/families?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },
  getFamilyById: async (id: string) => {
    return await get({
      endpoint: `/families/${id}`,
    });
  },
  banFamily: async (id: string) => {
    return await patch({ endpoint: `/families/${id}`, body: { status: 0 } });
  },
  unBanFamily: async (id: string) => {
    return await patch({ endpoint: `/families/${id}`, body: { status: 1 } });
  },
};
