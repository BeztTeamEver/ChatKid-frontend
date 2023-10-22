export type ADMIN_TYPE = {
  id: string;
  firstName: string;
  lastName: string;
  gmail: string;
  phone: string;
  age: number;
  gender: string;
  createdAt: string;
  status: number;
  role: string;
  avatar: string;
};

export type BODY_CREATE_ADMIN = {
  firstName: string;
  lastName: string;
  gmail: string;
  phone: string;
  age: number;
  gender: "male" | "female";
};
