import {
  BODY_CANCEL_DISCOUNT,
  BODY_CREATE_DISCOUNT,
  BODY_UPDATE_DISCOUNT,
} from "@/types/discount.type";

import { get, patch, post, remove } from "./config/ApiCaller";

export const DiscountApi = {
  getListDiscount: async (
    pageNumber: number,
    pageSize: number,
    packageType: string,
    status: string,
  ) => {
    return await get({
      endpoint: `/discounts?page-number=${pageNumber}&page-size=${pageSize}${
        packageType?.trim() ? `&package=${packageType}` : ""
      }${status?.trim() ? `&status=${status}` : ""}`,
    });
  },

  createDiscount: async (body: BODY_CREATE_DISCOUNT) => {
    return await post({ endpoint: `/discounts`, body });
  },

  updateDiscount: async (body: BODY_UPDATE_DISCOUNT, id: string) => {
    return await patch({ endpoint: `/discounts/${id}`, body });
  },

  cancelDiscount: async (body: BODY_CANCEL_DISCOUNT, id: string) => {
    return await patch({ endpoint: `/discounts/${id}`, body });
  },

  deleteDiscount: async (id: string) => {
    return await remove({
      endpoint: `/discounts/${id}`,
    });
  },
};
