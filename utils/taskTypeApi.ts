import { BODY_CREATE_TASK_TYPE } from "@/types/taskType.type";

import { get, patch, post, remove } from "./config/ApiCaller";

export const TaskTypeApi = {
  getListTaskType: async (
    pageNumber: number,
    pageSize: number,
    search: String = "",
    taskCategoryId: String = "",
  ) => {
    // console.log("SEARCH:", search, " TASKID:", taskCategoryId);
    // console.log(`/task-types?page-number=${pageNumber}&page-size=${pageSize}${
    //     search?.trim() ? `&search=${search}` : ""
    //   }${taskCategoryId?.trim() ? `&taskCategoryId=${taskCategoryId}` : ""}`);
    return await get({
      endpoint: `/task-types?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }${taskCategoryId?.trim() ? `&taskCategoryId=${taskCategoryId}` : ""}`,
    });
  },

  getDetailTaskType: async (id: String) => {
    return await get({
      endpoint: `/task-types/${id}`,
    });
  },

  createTaskType: async (body: BODY_CREATE_TASK_TYPE) => {
    return await post({ endpoint: "/task-types/system", body });
  },

  updateTaskType: async (body: BODY_CREATE_TASK_TYPE, id: string) => {
    return await patch({ endpoint: `/task-types/${id}`, body });
  },

  deleteTaskType: async (id: string) => {
    return await remove({ endpoint: `/task-types/${id}` });
  },
};
