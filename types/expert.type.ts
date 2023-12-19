export type DISCUSS_ROOM = {
  id: string;
  voiceUrl: string;
  createdTime: string;
  expertId: string;
};

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
  discussRooms: Array<DISCUSS_ROOM>;
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
