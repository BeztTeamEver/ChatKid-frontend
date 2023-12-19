export type DASHBOARD_TYPE = {
  totalSubcription: Number;
  totalAdvertising: Number;
  totalTransaction: Number;
  totalUser: Number;
  numberSubcriptions: Number;
  totalExpert: Number;
  percentSubcription: string;
  numberAdvertisings: Number;
  percentAdvertisings: string;
  subcriptionViewModels: [
    {
      advertising: Number;
      basicSubcription: Number;
      premiumSubcription: Number;
      premiumSuperSubcription: Number;
    },
  ];
  percentUser: string;
  percentExpert: string;
  mostViewedBlogs: [
    {
      id: string;
      title: string;
      content: string;
      imageUrl: string;
      voiceUrl: string;
      view: 0;
      createdAt: Date;
      updatedAt: Date;
      status: 0;
      typeBlog: {
        id: string;
        name: string;
        imageUrl: string;
      };
      createAdmin: {
        id: string;
        firstName: string;
        lastName: string;
        gmail: string;
        phone: string;
        age: 0;
        gender: string;
        role: string;
        avatarUrl: string;
        status: number;
        createdAt: string;
      };
    },
  ];
};
