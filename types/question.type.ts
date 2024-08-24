export type QUESTION_TYPE = {
  text: string;
  answerOptions: string[];
  correctAnswer: string;
  illustratedImageUrl: string;
  status: "AVAILABLE" | "UNAVAILABLE";
};
export type BODY_CREATE_QUESTION = {
  text: string;
  answerOptions: string[];
  correctAnswer: string;
  illustratedImageUrl: string;
  status: "AVAILABLE" | "UNAVAILABLE";
};

export type BODY_UPDATE_QUESTION = {
  id: string;
  text: string;
  answerOptions: string[];
  correctAnswer: string;
  illustratedImageUrl: string;
  status: "AVAILABLE" | "UNAVAILABLE";
};
