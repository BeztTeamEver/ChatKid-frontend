export type USER_TYPE = {
  id: string;
  firstName: string;
  lastName: string;
  gmail: string;
  phone: string;
  age: number;
  gender: string;
  avatarUrl: string;
  role: "ADMIN" | "SUPER_ADMIN";
  position: string;
};
