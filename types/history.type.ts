import { EXPERT_TYPE } from "./expert.type";

export type HISTORY_TYPE = {
  id: string;
  userId: string;
  serviceName: string;
  createdTime: Date;
  content: string;
  answer: string;
  voiceUrl: string;
  expert: EXPERT_TYPE;
};
