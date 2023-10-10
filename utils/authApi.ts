import { get, post } from "./config/ApiCaller";

export const AuthApi = {
  login: async (accessToken: string) => {
    return await post({ endpoint: "/auth/google-auth", body: { accessToken } }).then((res) => res);
  },

  refreshToken: async () => {},

  getInfoUser: async () => {
    return await get({
      endpoint: "/admin/admin-info",
    });
  },
};
