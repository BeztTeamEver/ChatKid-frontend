import { PAYMENT_METHOD_TYPE } from "./paymentMethod.type";
import { SUBSCRIPTION_TYPE } from "./subscription.type";

export type TRANSACTION_TYPE = {
  id: string;
  subscriptionId: String;
  memberId: String;
  paymentMethodId: String;
  createdAt: Date;
  status: String;
  identifier: String;
  paymentMethod: PAYMENT_METHOD_TYPE;
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
  subcription: SUBSCRIPTION_TYPE;
};
