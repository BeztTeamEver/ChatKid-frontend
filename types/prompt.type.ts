export type PROMPT_TYPE = {
  id: string;
  component: string;
  keyword: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  characters: number;
};

export type BODY_CREATE_PROMPT = {
  component: string;
  keyword: string;
};

export type BODY_UPDATE_PROMPT = {
  component: string;
  keyword: string;
  status?: "ACTIVE" | "INACTIVE";
};

export const PromptStatusData = [
  {
    value: "",
    label: "Tất cả trạng thái",
  },
  {
    value: "ACTIVE",
    label: "Hiện",
  },
  {
    value: "INACTIVE",
    label: "Ẩn",
  },
];
