import axios, { AxiosHeaders } from "axios";
import LocalStorage from "utils/localStore";

type METHOD_TYPE = "GET" | "POST" | "PUT" | "DELETE";

const defaultURL = process.env.NEXT_PUBLIC_API_URL;

type ApiCallerType = {
  method: METHOD_TYPE;
  endpoint: string;
  headers?: AxiosHeaders;
  params?: Object;
  body?: Object;
};

// This is config default for axios caller
const ApiCaller = ({ method, endpoint, headers, params = {}, body = {} }: ApiCallerType) => {
  return axios({
    method,
    url: defaultURL + endpoint,
    headers,
    params,
    data: body,
  });
};

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${LocalStorage.get("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Below are all methods we can call. If you want another method, create it likes them.
// When you call an api, if any part that you don't need, just skip it or pass an empty object {}.
// for example: post(endpoint, {}, { username, password })
export const get = ({ endpoint, params, headers }: Omit<ApiCallerType, "method" | "body">) => {
  return ApiCaller({ method: "GET", endpoint, headers, params });
};

export const post = ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return ApiCaller({ method: "POST", endpoint, headers, params, body });
};

export const put = ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return ApiCaller({ method: "PUT", endpoint, headers, params, body });
};

export const remove = ({ endpoint, body, params, headers }: Omit<ApiCallerType, "method">) => {
  return ApiCaller({ method: "DELETE", endpoint, headers, params, body });
};
