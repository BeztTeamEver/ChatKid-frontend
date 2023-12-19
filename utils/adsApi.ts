import { BODY_CREATE_ADS } from "@/types/ads.type";

import { get, post, put, remove } from "./config/ApiCaller";

export const AdsApi = {
  getListAds: async (pageNumber: number, pageSize: number, search: String = "") => {
    return await get({
      endpoint: `/advertisings?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }`,
    });
  },

  // getListTypeAds: async () => {
  //   return await get({
  //     endpoint: `/advertising-types`,
  //   });
  // },

  getDetailAds: async (id: string) => {
    return await get({
      endpoint: `/advertisings/${id}`,
    });
  },

  createAds: async (body: BODY_CREATE_ADS) => {
    return await post({ endpoint: "/advertisings", body });
  },

  updateAds: async (id: string, body: BODY_CREATE_ADS) => {
    return await put({ endpoint: `/advertisings/${id}`, body });
  },

  hideAds: async (id: string) => {
    return await remove({ endpoint: `/advertisings/${id}` });
  },

  showAds: async (id: string) => {
    return await put({ endpoint: `/advertisings/${id}`, body: { status: 1 } });
  },
};
