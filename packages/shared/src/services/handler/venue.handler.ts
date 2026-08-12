import { getRequest, postRequest, putRequest, postFormData } from "../utils/apiUtils";
import { Stage } from "../types/stage.type";

export interface GetVenuesParams {
  page?: number;
  limit?: number;
  q?: string;
  district?: string;
  city?: string;
  type?: string;
  status?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  sort?: string;
}

export interface GetAssetsParams {
  venue_id?: string;
  zone_id?: string;
  page?: number;
  limit?: number;
}

export interface CreateVenueParams {
  name: string;
  address: string;
  district?: string;
  city?: string;
  description?: string;
  priceFrom?: number;
  priceTo?: number;
  type?: string;
  phone?: string;
  operatingHours?: string;
}

const VenueHandler = {
  /**
   * Lấy danh sách sân thể thao (Venues) từ API Gateway (/api/v1/user/venues)
   */
  getVenues: async (params?: GetVenuesParams): Promise<Stage<any>> => {
    return getRequest<any>("/api/v1/user/venues", params);
  },

  /**
   * Lấy thông tin chi tiết một sân theo ID (/api/v1/user/venues/:id)
   */
  getVenueById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/venues/${id}`);
  },

  /**
   * Lấy danh sách sân nhỏ / tài sản trong cụm sân (/api/v1/user/assets)
   */
  getAssets: async (params?: GetAssetsParams): Promise<Stage<any>> => {
    return getRequest<any>("/api/v1/user/assets", params);
  },

  /**
   * Lấy chi tiết sân nhỏ theo ID (/api/v1/user/assets/:id)
   */
  getAssetById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/assets/${id}`);
  },

  /**
   * Lấy danh sách sân của chủ sân (Dashboard - /api/v1/dashboard/venues)
   */
  getDashboardVenues: async (
    params?: GetVenuesParams
  ): Promise<Stage<any>> => {
    return getRequest<any>("/api/v1/dashboard/venues", params);
  },

  /**
   * Lấy chi tiết sân trong Dashboard (/api/v1/dashboard/venues/:id)
   */
  getDashboardVenueById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/dashboard/venues/${id}`);
  },

  /**
   * Tạo mới sân thể thao (Dashboard - /api/v1/dashboard/venues)
   */
  createVenue: async (data: CreateVenueParams): Promise<Stage<any>> => {
    return postRequest<any>("/api/v1/dashboard/venues", data);
  },

  /**
   * Cập nhật thông tin sân (Dashboard - /api/v1/dashboard/venues/:id)
   */
  updateVenue: async (
    id: string,
    data: Partial<CreateVenueParams>
  ): Promise<Stage<any>> => {
    return putRequest<any>(`/api/v1/dashboard/venues/${id}`, data);
  },

  /**
   * Tải ảnh đại diện/bìa sân (Dashboard - /api/v1/dashboard/venues/:id/image)
   */
  uploadVenueImage: async (
    id: string,
    formData: FormData
  ): Promise<Stage<any>> => {
    return postFormData<any>(`/api/v1/dashboard/venues/${id}/image`, formData);
  },
};

export default VenueHandler;
