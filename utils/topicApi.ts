import { get } from "./config/ApiCaller";

export const TopicApi = {
  getListTopic: async () => {
    return await get({ endpoint: `/topics/system?page-number=0&page-size=1000` });
  },
};
