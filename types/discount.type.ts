export type DISCOUNT_TYPE = {
  id: string;
  startTime: Date;
  endTime: Date;
  percent: number;
  packageName: string;
  price: number;
  status: string;
};

export type BODY_CREATE_DISCOUNT = {
  startTime: Date;
  endTime: Date;
  percent: number;
  packageId: string;
};

export type BODY_UPDATE_DISCOUNT = {
  startTime: Date;
  endTime: Date;
  percent: number;
  packageId: string;
};

export type BODY_CANCEL_DISCOUNT = {
  status: "INACTIVE";
};

export const DiscountPackageData = [
  {
    value: "",
    label: "Tất cả gói",
  },
  {
    value: "c1e71917-dd79-45f2-b7d3-ec3e40cd6914",
    label: "Bụi kim cương",
  },
  {
    value: "34cb2237-b316-4795-8592-4981830d8e74",
    label: "Túi kim cương",
  },
  {
    value: "a791c1d6-fc44-4b5f-addf-7a62714c6338",
    label: "Rương kim cương",
  },
];

export const DiscountPackageCreateData = [
  {
    value: "c1e71917-dd79-45f2-b7d3-ec3e40cd6914",
    label: "Bụi kim cương",
  },
  {
    value: "34cb2237-b316-4795-8592-4981830d8e74",
    label: "Túi kim cương",
  },
  {
    value: "a791c1d6-fc44-4b5f-addf-7a62714c6338",
    label: "Rương kim cương",
  },
];

export const DiscountStatusData = [
  {
    value: "",
    label: "Tất cả trạng thái",
  },
  {
    value: "INACTIVE",
    label: "Tạm dừng",
  },
  {
    value: "ACTIVE",
    label: "Đang diễn ra",
  },
];
