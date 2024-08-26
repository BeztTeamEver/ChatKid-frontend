import { BODY_CREATE_TOPIC, BODY_UPDATE_TOPIC } from "@/types/topic.type";

import { get, patch, post } from "./config/ApiCaller";

export const TopicApi = {
  getListTopic: async (pageNumber: number, pageSize: number) => {
    return await get({
      endpoint: `/topics/system?page-number=${pageNumber}&page-size=${pageSize}`,
    });
  },

  updateTopic: async (body: BODY_UPDATE_TOPIC, id: string) => {
    return await patch({ endpoint: `/topics/${id}/`, body });
  },

  createTopic: async (body: BODY_CREATE_TOPIC) => {
    return await post({ endpoint: "/topics", body });
  },
};
