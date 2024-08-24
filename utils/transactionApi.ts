import { get, patch } from "./config/ApiCaller";

export const TransactionApi = {
  getListTransaction: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/payment-transaction?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },
  approveTransaction: async (id: string) => {
    return await patch({ endpoint: `/payment-transaction/approve/${id}` });
  },
  disapproveTransaction: async (id: string) => {
    return await patch({ endpoint: `/payment-transaction/disapprove/${id}` });
  },
};
