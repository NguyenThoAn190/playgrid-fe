import { PaginatedResponse } from "../services/utils/responseFormat.type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createEmptyPaginatedResponse<T>(): PaginatedResponse<T> {
  return {
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    limitPerPage: 10,
  };
}
