export type USER_TYPE = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  gmail: string;
  phone: string;
  age: number;
  dateOfBirth: Date;
  gender: string;
  avatarUrl: string;
  role: "ADMIN" | "SUPER_ADMIN" | "EXPERT";
  familyRole: string;
};
