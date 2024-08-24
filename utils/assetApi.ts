import { BODY_CREATE_ASSET, BODY_UPDATE_ASSET } from "@/types/asset.type";

import { get, patch, post } from "./config/ApiCaller";

export const AssetApi = {
  getListAsset: async (
    pageNumber: number,
    pageSize: number,
    search: String = "",
    status: String = "",
    type: String = "",
  ) => {
    console.log(
      `/assets/manage?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }${status?.trim() ? `&status=${status}` : ""}${type?.trim() ? `&type=${type}` : ""}`,
    );
    return await get({
      endpoint: `/assets/manage?page-number=${pageNumber}&page-size=${pageSize}${
        search?.trim() ? `&search=${search}` : ""
      }${status?.trim() ? `&status=${status}` : ""}${type?.trim() ? `&type=${type}` : ""}`,
    });
  },

  getDetailAsset: async (id: string) => {
    return await get({ endpoint: `/assets/manage/${id}/` });
  },

  updateAsset: async (body: BODY_UPDATE_ASSET, id: string) => {
    return await patch({ endpoint: `/assets/${id}/`, body });
  },

  createAsset: async (body: BODY_CREATE_ASSET) => {
    return await post({ endpoint: "/assets", body });
  },

  inactiveAsset: async (id: string) => {
    return await patch({ endpoint: `/assets/${id}/`, body: { status: "Inactive" } });
  },

  activeAsset: async (id: string) => {
    return await patch({ endpoint: `/assets/${id}/`, body: { status: "Active" } });
  },
};
