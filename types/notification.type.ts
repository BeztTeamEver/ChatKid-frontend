export type NOTIFICATION_TYPE = {
  id: string;
  title: string;
  content: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
  scheduleTime: Date;
  creatorEmail: string;
  status: number;
};

export type BODY_CREATE_NOTIFICATION = {
  title: string;
  content: string;
  receiver: string;
  scheduleTime: Date;
};

export const DataReceiver = [
  {
    value: "PARENTS",
    label: "Phụ huynh",
  },
  {
    value: "CHILDRENT",
    label: "Trẻ",
  },
];
