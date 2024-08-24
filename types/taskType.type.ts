import { TASK_CATEGORY } from "./taskCategory.type";

export type TASK_TYPE_TYPE = {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  imageHomeUrl: string | null | undefined;
  taskCategory: TASK_CATEGORY;
  hintQuestions: string[];
  createdAt: string;
};

export type BODY_CREATE_TASK_TYPE = {
  name: string;
  imageUrl: string | null | undefined;
  imageHomeUrl: string | null | undefined;
  hintQuestions: string[];
  taskCategoryId: string;
};

export const DataReceiver = [
  {
    value: "6f9353a2-e1be-44f3-870e-f5aad2a365c5",
    label: "Học tập",
  },
  {
    value: "e134ca22-7b1a-44db-a125-01f98103385a",
    label: "Sinh hoạt",
  },
  {
    value: "a31e27d9-1184-44d7-aac1-4cacd90b369f",
    label: "Thể thao - Giải trí",
  },
  {
    value: "a91579a4-9e57-4cb1-bde5-924b6240844f",
    label: "Việc nhà",
  },
];

export const DataSearchReceiver = [
  {
    value: "",
    label: "Tất cả phân loại",
  },
  {
    value: "6f9353a2-e1be-44f3-870e-f5aad2a365c5",
    label: "Học tập",
  },
  {
    value: "e134ca22-7b1a-44db-a125-01f98103385a",
    label: "Sinh hoạt",
  },
  {
    value: "a31e27d9-1184-44d7-aac1-4cacd90b369f",
    label: "Thể thao - Giải trí",
  },
  {
    value: "a91579a4-9e57-4cb1-bde5-924b6240844f",
    label: "Việc nhà",
  },
];
