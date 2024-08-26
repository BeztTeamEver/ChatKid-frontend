import { get } from "./config/ApiCaller";

export const DashboardApi = {
  getDataDashboard: async (month: number, year: number) => {
    return await get({
      endpoint: `/dashboards?month=${month}&year=${year}`,
    });
  },
};
