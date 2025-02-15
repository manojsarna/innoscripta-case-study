export type FetchNewsParams = {
  query: string;
  filters?: { date?: string; category?: string; source?: string };
  page?: number;
  pageSize?: number;
};
