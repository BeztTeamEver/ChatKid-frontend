export type BLOG_TYPE = {
  id: string;
  title: string;
  content: string;
  type: string;
  imageUrl: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  status: number;
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
