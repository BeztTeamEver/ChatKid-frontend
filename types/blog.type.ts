export type BLOG_TYPE = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  voiceUrl: string;
  status: number;
};

export type BODY_CREATE_BLOG = {
  title: string;
  content: string;
  imageUrl: string;
  voiceUrl: string;
  theme: string;
  quizId: string;
};
