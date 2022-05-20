export type PaginatedResult<T> = {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  results: T[];
};
