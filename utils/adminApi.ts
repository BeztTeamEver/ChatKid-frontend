import { get, post } from "./config/ApiCaller";

export const AdminApi = {
  getListAdmin: async (pageNumber: number, pageSize: number, searchString: String = "") => {
    return await get({
      endpoint: "/admin/pagination",
      params: {
        pageNumber,
        pageSize,
        searchString,
      },
    });
  },

  createAdmin: async (accessToken: string) => {
    return await post({ endpoint: "/auth/google-auth", body: { accessToken } }).then((res) => res);
  },
};
