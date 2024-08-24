export type ASSET_TYPE = {
  id: string;
  name: string;
  imageUrl: string | null | undefined;
  previewImageUrl: string | null | undefined;
  position: number;
  price: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

export type BODY_CREATE_ASSET = {
  name: string;
  imageUrl: string | null | undefined;
  previewImageUrl: string | null | undefined;
  position: number;
  price: number;
  type: string;
};

export type BODY_UPDATE_ASSET = {
  name: string;
  imageUrl: string | null | undefined;
  previewImageUrl: string | null | undefined;
  position: number;
  price: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  status: "Active" | "Inactive";
};

export const AssetTypeData = [
  {
    value: "",
    label: "Tất cả loại trang bị",
  },
  {
    value: "hat",
    label: "Nón",
  },
  {
    value: "necklace",
    label: "Vòng cổ",
  },
  {
    value: "background",
    label: "Phông nền",
  },
  {
    value: "emoji",
    label: "Cảm xúc",
  },
  {
    value: "ears",
    label: "Đôi tai",
  },
  {
    value: "eyes",
    label: "Mắt kính",
  },
  {
    value: "cloak",
    label: "Áo choàng",
  },
];

export const AssetStatusData = [
  {
    value: "",
    label: "Tất cả trạng thái",
  },
  {
    value: "Active",
    label: "Hiện",
  },
  {
    value: "Inactive",
    label: "Ẩn",
  },
];
