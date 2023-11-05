import { get } from "./config/ApiCaller";

export const HistoryApi = {
  getListHistory: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/history?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },
  getHistoryById: async (id: string) => {
    return await get({
      endpoint: `/history/${id}`,
    });
  },
};
