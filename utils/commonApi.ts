import { AxiosHeaders } from "axios";

import { post } from "./config/ApiCaller";

export const uploadApi = async (body) => {
  return await post({
    endpoint: "/file-upload/upload",
    body,
    headers: new AxiosHeaders({
      "Content-Type": "multipart/form-data",
    }),
  });
};
