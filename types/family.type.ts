import { USER_TYPE } from "./user.type";

export type FAMILY_TYPE = {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUrl: string;
  status: Number;
  createdAt: Date;
  updatedAt: Date;
  members: USER_TYPE[];
};
