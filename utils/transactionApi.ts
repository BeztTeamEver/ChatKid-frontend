import { get } from "./config/ApiCaller";

export const TransactionApi = {
  getListTransaction: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/transactions?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },
};
