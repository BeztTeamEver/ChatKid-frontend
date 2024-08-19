export type REPORT_TYPE = {
  id: string;
  content: string;
  voiceUrl: string;
  answer: string;
  reasons: string[];
  familyEmail: string;
  status: "PENDING" | "REJECTED" | "ACCEPTED";
  createdAt: string;
};

export const reportData = [
  {
    value: "",
    label: "Tất cả trạng thái",
  },
  {
    value: "PENDING",
    label: "Chờ duyệt",
  },
  {
    value: "ACCEPTED",
    label: "Đã xác nhận",
  },
  {
    value: "REJECTED",
    label: "Đã từ chối",
  },
];
