import { BODY_CREATE_ADMIN } from "@/types/admin.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const AdminApi = {
  getListAdmin: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/admin?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  getDetailAdmin: async (id: string) => {
    return await get({
      endpoint: `/admin/${id}`,
    });
  },

  createAdmin: async (body: BODY_CREATE_ADMIN) => {
    return await post({ endpoint: "/admin", body });
  },

  removeAdmin: async (id: string) => {
    return await remove({ endpoint: `/admin/${id}` });
  },

  unbanAdmin: async (id: string) => {
    return await put({ endpoint: `/admin/${id}`, body: { status: 1 } });
  },
};
