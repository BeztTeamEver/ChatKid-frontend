export type EXPERT_TYPE = {
  id: string;
  firstName: string;
  lastName: string;
  gmail: string;
  phone: string;
  age: number;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  status: number;
  avatarUrl: string;
};

export type BODY_CREATE_EXPERT = {
  firstName: string;
  lastName: string;
  gmail: string;
  phone: string;
  age: number;
  dateOfBirth: Date;
  gender: "male" | "female";
};
