export type TOPIC_TYPE = {
  id: string;
  name: string;
  imageUrl: string;
  status: "AVAILABLE";
};

export type BODY_CREATE_TOPIC = {
  name: string;
  imageUrl: string;
};

export type BODY_UPDATE_TOPIC = {
  name: string;
  imageUrl: string;
};
