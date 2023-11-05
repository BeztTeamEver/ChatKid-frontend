import { BODY_CREATE_NOTIFICATION } from "@/types/notification.type";

import { get, post } from "./config/ApiCaller";

export const NotificationApi = {
  getListNotification: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/notifications?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  getDetailNotification: async (id: string) => {
    return await get({
      endpoint: `/notifications/${id}`,
    });
  },

  createNotification: async (body: BODY_CREATE_NOTIFICATION) => {
    return await post({ endpoint: "/notifications", body });
  },
};
