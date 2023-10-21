import { BODY_CREATE_BLOG } from "@/types/blog.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const BlogApi = {
  getListBlog: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/blogs?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  getListTypeBlog: async () => {
    return await get({
      endpoint: `/blogs/blog-types`,
    });
  },

  createBlog: async (body: BODY_CREATE_BLOG) => {
    return await post({ endpoint: "/blogs", body });
  },

  hideBlog: async (id: string) => {
    return await remove({ endpoint: `/blogs/${id}` });
  },

  showBlog: async (id: string) => {
    return await put({ endpoint: `/blogs/${id}`, body: { status: 1 } });
  },
};
