export type ContestType = "RUN" | "TRIATHLON" | "SWIM" | "CYCLING" | "DUATHLON" | "TRAIL" | "OTHER";
export type DistanceUnit = "KM" | "M" | "YARD" | "MI";
export type ContestStatus = "DRAFT" | "UPCOMING" | "LIVE" | "FINISHED" | "CANCELLED";
export type ResultSourceProvider = "RACE_RESULT" | "TRUERACE" | "5BIB" | "RAW_JSON" | "CSV" | "MANUAL" | "OTHER";
export type ResultSourceType = "URL" | "RAW_JSON" | "FILE" | "WEBHOOK";
export type ResultSourceAuthType = "NONE" | "BEARER" | "BASIC" | "API_KEY" | "CUSTOM";
export type ResultSourceStatus = "ACTIVE" | "INACTIVE" | "ERROR";

export interface Contest {
  id: number | string;
  eventId: number | string;
  eventName?: string | null;
  name: string | null;
  slug: string | null;
  type?: ContestType | null;
  distanceValue?: string | null;
  distanceUnit?: DistanceUnit | null;
  startTime?: string | Date | null;
  endTime?: string | Date | null;
  cutoffTime?: string | Date | null;
  status?: ContestStatus | string | null;
  order?: number | null;
  metadata?: Record<string, any> | null;
  logo?: string | null;
  logoUrl?: string | null;
  banner?: string | null;
  bannerUrl?: string | null;
  createdAt?: string | Date | null;
  updatedAt?: string | Date | null;
  categoriesCount?: number | null;
  participantsCount?: number | null;
  participantCount?: number | null;
  // Result source fields
  resultSourceProvider?: ResultSourceProvider | null;
  resultSourceType?: ResultSourceType | null;
  resultSourceName?: string | null;
  resultEndpointUrl?: string | null;
  resultAuthType?: ResultSourceAuthType | null;
  resultAuthConfig?: Record<string, any> | string | null;
  resultRawData?: string | null;
  resultExternalEventId?: string | null;
  resultExternalListId?: string | null;
  resultExternalToken?: string | null;
  resultMappingConfig?: Record<string, any> | string | null;
  resultTransformConfig?: Record<string, any> | string | null;
  resultFilterConfig?: Record<string, any> | string | null;
  resultCacheEnabled?: boolean | null;
  resultCacheTtlSeconds?: number | null;
  resultStaleTtlSeconds?: number | null;
  resultSourceStatus?: ResultSourceStatus | string | null;
  resultPriority?: number | null;
  resultLastFetchedAt?: string | Date | null;
  resultLastSuccessAt?: string | Date | null;
  resultLastErrorAt?: string | Date | null;
  resultLastErrorMessage?: string | null;
  autoDetect?: boolean | null;
  resultSseEnabled?: boolean | null;
  resultAutoSyncEnabled?: boolean | null;
  certificateConfig?: any;
  certificateEnabled?: boolean | null;
  weatherInfo?: Record<string, any> | string | null;
}

export interface CreateContestParams {
  eventId: string;
  name: string;
  slug?: string;
  type?: ContestType;
  distanceValue?: string;
  distanceUnit?: DistanceUnit;
  startTime?: string;
  endTime?: string;
  cutoffTime?: string;
  status?: ContestStatus;
  order?: number;
  metadata?: string;
  logo?: File | null;
  banner?: File | null;
  certificateConfig?: string;
  // Result source fields
  resultSourceProvider?: ResultSourceProvider;
  resultSourceType?: ResultSourceType;
  resultSourceName?: string;
  resultEndpointUrl?: string;
  resultAuthType?: ResultSourceAuthType;
  resultAuthConfig?: string;
  resultRawData?: string;
  resultExternalEventId?: string;
  resultExternalListId?: string;
  resultExternalToken?: string;
  resultMappingConfig?: string;
  resultTransformConfig?: string;
  resultFilterConfig?: string;
  resultCacheEnabled?: boolean;
  resultCacheTtlSeconds?: number;
  resultStaleTtlSeconds?: number;
  resultSourceStatus?: ResultSourceStatus;
  resultPriority?: number;
  autoDetect?: boolean;
  resultSseEnabled?: boolean;
  resultAutoSyncEnabled?: boolean;
  certificateEnabled?: boolean;
}

export interface UpdateContestParams {
  eventId?: string;
  name?: string;
  slug?: string | null;
  type?: ContestType;
  distanceValue?: string | null;
  distanceUnit?: DistanceUnit;
  startTime?: string | null;
  endTime?: string | null;
  cutoffTime?: string | null;
  status?: ContestStatus;
  order?: number;
  metadata?: string;
  logo?: File | null;
  banner?: File | null;
  certificateConfig?: string;
  // Result source fields
  resultSourceProvider?: ResultSourceProvider | null;
  resultSourceType?: ResultSourceType | null;
  resultSourceName?: string | null;
  resultEndpointUrl?: string | null;
  resultAuthType?: ResultSourceAuthType | null;
  resultAuthConfig?: string | null;
  resultRawData?: string | null;
  resultExternalEventId?: string | null;
  resultExternalListId?: string | null;
  resultExternalToken?: string | null;
  resultMappingConfig?: string | null;
  resultTransformConfig?: string | null;
  resultFilterConfig?: string | null;
  resultCacheEnabled?: boolean | null;
  resultCacheTtlSeconds?: number | null;
  resultStaleTtlSeconds?: number | null;
  resultSourceStatus?: ResultSourceStatus | null;
  resultPriority?: number | null;
  autoDetect?: boolean | null;
  resultSseEnabled?: boolean | null;
  resultAutoSyncEnabled?: boolean | null;
  certificateEnabled?: boolean | null;
}

export interface UpdateContestStatusParams {
  status: ContestStatus;
}

export interface ContestFilter {
  page?: number;
  limit?: number;
  search?: string | string[];
  eventId?: string;
  seriesId?: string;
  eventSlug?: string;
  seriesSlug?: string;
  name?: string;
  slug?: string;
  type?: ContestType | string;
  distanceUnit?: DistanceUnit | string;
  status?: ContestStatus | string;
  startTimeFrom?: string;
  startTimeTo?: string;
  createdFrom?: string;
  createdTo?: string;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
}

export interface ContestPaginationResponse {
  data: Contest[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  limitPerPage: number;
  message?: string;
}

export interface ContestTemplate {
  type: ContestType;
  fields: {
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: { value: string; label: string }[];
  }[];
}
