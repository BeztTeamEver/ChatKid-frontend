import { BLOG_TYPE } from "./blog.type";
import { BODY_UPDATE_QUESTION, QUESTION_TYPE } from "./question.type";

export type QUIZ_TYPE = {
  id: string;
  title: string;
  topic: string;
  ageGroup: string;
  status: string;
  createdAt: string;
  illustratedImageUrl: string;
  questionTimeLimit: string;
  questions: QUESTION_TYPE[];
  blog: BLOG_TYPE;
};

export type BODY_CREATE_QUIZ = {
  title: string;
  topicId: string;
  questionTimeLimit: number;
  illustratedImageUrl: string;
  ageGroup: string;
  questions: QUESTION_TYPE[];
};

export type BODY_UPDATE_QUIZ = {
  title: string;
  topicId: string;
  questionTimeLimit: number;
  illustratedImageUrl: string;
  ageGroup: string;
  questions: BODY_UPDATE_QUESTION[];
  status: "AVAILABLE" | "UNAVAILABLE";
};

export type QUIZ_FORM_REQUEST = {
  method: "CREATE" | "UPDATE";
  data: QUIZ_TYPE | null;
};
