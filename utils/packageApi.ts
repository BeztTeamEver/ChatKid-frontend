import { get } from "./config/ApiCaller";

export const PackageApi = {
  getListPackage: async () => {
    return await get({
      endpoint: `/packages`,
    });
  },
};
