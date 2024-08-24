import { PACKAGE_TYPE } from "./package.type";

export type TRANSACTION_TYPE = {
  id: string;
  packageId: String;
  memberId: String;
  createdAt: Date;
  status: String;
  identifier: String;
  member: {
    id: String;
    avatarUrl: String;
    name: String;
    password: String;
    role: String;
    status: Number;
    familyId: String;
    deviceToken: String;
    gender: String;
    updated: Number;
    familyRole: String;
    dateOfBirth: String;
  };
  package: PACKAGE_TYPE;
};
