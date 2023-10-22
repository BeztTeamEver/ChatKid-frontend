import { ADMIN_TYPE } from "./admin.type";

export type BLOG_TYPE = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  voiceUrl: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  typeBlogId: string;
  typeBlog: {
    id: string;
    name: string;
  };
  createAdmin: ADMIN_TYPE;
};

export type BODY_CREATE_BLOG = {
  title: string;
  content: string;
  imageUrl: string;
  voiceUrl: string;
  typeBlogId: string;
};

export type LIST_TYPE = {
  id: string;
  name: string;
};

export type BLOG_FORM_REQUEST = {
  method: "CREATE" | "UPDATE";
  data: BLOG_TYPE | null;
};
