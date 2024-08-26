import { PACKAGE_TYPE } from "./package.type";

export type TRANSACTION_TYPE = {
  id: string;
  packageId: string;
  memberId: string;
  createdAt: Date;
  status: string;
  actualPrice: number;
  price: number;
  identifier: string;
  member: {
    id: string;
    avatarUrl: string;
    name: string;
    password: string;
    role: string;
    status: Number;
    familyId: string;
    deviceToken: string;
    gender: string;
    updated: Number;
    familyRole: string;
    dateOfBirth: string;
  };
  package: PACKAGE_TYPE;
};
