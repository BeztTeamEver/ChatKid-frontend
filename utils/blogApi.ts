import { BODY_CREATE_BLOG } from "@/types/blog.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const BlogApi = {
  getListBlog: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/blogs?page-number=${pageNumber}&page-size=${pageSize}&search=${search}`,
    });
  },

  createBlog: async (body: BODY_CREATE_BLOG) => {
    return await post({ endpoint: "/blogs", body });
  },

  removeBlog: async (id: string) => {
    return await remove({ endpoint: `/blogs/${id}` });
  },

  unbanBlog: async (id: string) => {
    return await put({ endpoint: `/blogs/${id}`, body: { status: 1 } });
  },
};
