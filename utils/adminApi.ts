import { BODY_CREATE_ADMIN } from "@/types/admin.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const AdminApi = {
  getListAdmin: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/admins?page-number=${pageNumber}&page-size=${pageSize}&search=${search}`,
    });
  },

  createAdmin: async (body: BODY_CREATE_ADMIN) => {
    return await post({ endpoint: "/admins", body });
  },

  removeAdmin: async (id: string) => {
    return await remove({ endpoint: `/admins/${id}` });
  },

  unbanAdmin: async (id: string) => {
    return await put({ endpoint: `/admins/${id}`, body: { status: 1 } });
  },
};
