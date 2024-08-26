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

export const promptType = [
  {
    value: "Lĩnh vực không trả lời",
    label: "Lĩnh vực không trả lời",
  },
  {
    value: "Mô tả đối tượng nhận",
    label: "Mô tả đối tượng nhận",
  },
  {
    value: "Yêu cầu về hình thức câu trả lời",
    label: "Yêu cầu về hình thức câu trả lời",
  },
  {
    value: "Không dùng từ",
    label: "Không dùng từ",
  },
  {
    value: "Yêu cầu về câu văn",
    label: "Yêu cầu về câu văn",
  },
];
