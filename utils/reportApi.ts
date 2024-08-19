import { get } from "./config/ApiCaller";

export const ReportApi = {
  getListReport: async (
    pageNumber: number,
    pageSize: number,
    search: String = "",
    status: String = "",
  ) => {
    return await get({
      endpoint: `/bot-questions/reports?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }${status?.trim() ? `&status=${status}` : ""}`,
    });
  },
};
