export type USER_TYPE = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  gmail: string;
  phone: string;
  age: number;
  yearOfBirth: string;
  gender: string;
  avatarUrl: string;
  role: "ADMIN" | "PARENT" | "CHILD";
  familyRole: string;
};
