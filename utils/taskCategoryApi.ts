import { get } from "./config/ApiCaller";

export const TaskCategoryApi = {
  getListTaskCategory: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/task-types?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}}` : ""
      }`,
    });
  },
};
