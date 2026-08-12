import { getRequest, postRequest, putRequest } from "../utils/apiUtils";
import { Stage } from "../types/stage.type";

export interface GetTournamentsParams {
  page?: number;
  limit?: number;
  q?: string;
  district?: string;
  status?: string;
  format?: string;
  level?: string;
  sort?: string;
}

export interface CreateTournamentParams {
  name: string;
  organizer: string;
  location: string;
  district?: string;
  dateRange?: string;
  startDate?: string;
  endDate?: string;
  level?: string;
  prizePool?: string;
  feePerPlayer?: number;
  maxParticipants?: number;
  description?: string;
}

const TournamentHandler = {
  /**
   * Lấy danh sách giải đấu từ API Gateway (/api/v1/user/tournaments)
   */
  getTournaments: async (
    params?: GetTournamentsParams
  ): Promise<Stage<any>> => {
    return getRequest<any>("/api/v1/user/tournaments", params);
  },

  /**
   * Lấy chi tiết giải đấu theo ID (/api/v1/user/tournaments/:id)
   */
  getTournamentById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/tournaments/${id}`);
  },

  /**
   * Lấy lịch thi đấu của giải đấu (/api/v1/user/tournaments/:id/schedule)
   */
  getTournamentSchedule: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/tournaments/${id}/schedule`);
  },

  /**
   * Lấy thông tin chi tiết hạng mục thi đấu (/api/v1/user/divisions/:id)
   */
  getDivisionById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/divisions/${id}`);
  },

  /**
   * Lấy sơ đồ nhánh đấu (/api/v1/user/brackets/:id)
   */
  getBracketById: async (id: string): Promise<Stage<any>> => {
    return getRequest<any>(`/api/v1/user/brackets/${id}`);
  },

  /**
   * Đăng ký tạo giải đấu mới (Dashboard - /api/v1/dashboard/tournaments)
   */
  createTournament: async (
    data: CreateTournamentParams
  ): Promise<Stage<any>> => {
    return postRequest<any>("/api/v1/dashboard/tournaments", data);
  },

  /**
   * Cập nhật thông tin giải đấu (Dashboard - /api/v1/dashboard/tournaments/:id)
   */
  updateTournament: async (
    id: string,
    data: Partial<CreateTournamentParams>
  ): Promise<Stage<any>> => {
    return putRequest<any>(`/api/v1/dashboard/tournaments/${id}`, data);
  },
};

export default TournamentHandler;
