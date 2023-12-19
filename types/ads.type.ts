import { ADMIN_TYPE } from "./admin.type";

export type ADS_TYPE = {
  id: string;
  title: string;
  content: string;
  company: string;
  startDate: Date;
  endDate: Date;
  createdBy: ADMIN_TYPE;
  imageUrl: string;
  destinationUrl: string;
  type: string;
  companyEmail: string;
  clicks: number;
  price: number;
  status: number;
};

export type BODY_CREATE_ADS = {
  title: string;
  content: string;
  company: string;
  companyEmail: string;
  price: number;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  destinationUrl: string;
  type: string;
};

export const LIST_TYPE_ADS = [
  {
    value: "popup",
    label: "Popup",
  },
  {
    value: "dashboard",
    label: "Trang chủ",
  },
];

export type ADS_FORM_REQUEST = {
  method: "CREATE" | "UPDATE";
  data: ADS_TYPE | null;
};
