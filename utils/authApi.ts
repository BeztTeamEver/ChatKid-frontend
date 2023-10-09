import { get, post } from "./config/ApiCaller";

export const AuthApi = {
  login: async (accessToken: string) => {
    return await post({ endpoint: "/auth/google-auth", body: { accessToken } }).then((res) => res);
  },

  getInfoUser: async () => {
    return await get({
      endpoint: "/admin/admin-info",
    }).then((res) => res);
  },
};
