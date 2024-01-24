import { BODY_CREATE_BLOG } from "@/types/blog.type";

import { get, patch, post, remove } from "./config/ApiCaller";

export const BlogApi = {
  getListBlog: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/blogs?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  getListblogType: async () => {
    return await get({
      endpoint: `/blog-types`,
    });
  },

  getDetailBlog: async (id: string) => {
    return await get({
      endpoint: `/blogs/${id}`,
    });
  },

  createBlog: async (body: BODY_CREATE_BLOG) => {
    return await post({ endpoint: "/blogs", body });
  },

  updateBlog: async (id: string, body: BODY_CREATE_BLOG) => {
    return await patch({ endpoint: `/blogs/${id}`, body });
  },

  hideBlog: async (id: string) => {
    return await remove({ endpoint: `/blogs/${id}` });
  },

  showBlog: async (id: string) => {
    return await patch({ endpoint: `/blogs/${id}`, body: { status: 1 } });
  },
};
