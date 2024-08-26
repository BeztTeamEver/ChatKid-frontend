import { get } from "./config/ApiCaller";

export const TopicApi = {
  getListTopic: async () => {
    return await get({ endpoint: `/topics` });
  },
};
