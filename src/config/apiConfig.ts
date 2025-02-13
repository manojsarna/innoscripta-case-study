import { AxiosRequestConfig } from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYTIMES_API_KEY = import.meta.env.VITE_NEW_YORK_TIMES_API_KEY;

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 5;

/**
 * NewsAPI Configuration
 */
export const getNewsAPIConfig = (
  query: string,
  filters: { date?: string; category?: string; source?: string },
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
): AxiosRequestConfig => ({
  method: "GET",
  url: "https://newsapi.org/v2/everything",
  params: {
    q: query,
    from: filters.date,
    category: filters.category,
    sources: filters.source,
    apiKey: NEWS_API_KEY,
    page,
    pageSize,
  },
});

/**
 * The Guardian API Configuration
 */
export const getGuardianAPIConfig = (
  query: string,
  filters: { date?: string; category?: string },
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
): AxiosRequestConfig => ({
  method: "GET",
  url: "https://content.guardianapis.com/search",
  params: {
    q: query,
    "from-date": filters.date,
    section: filters.category,
    "show-tags": "contributor",
    "show-fields": "bodyText,thumbnail",
    "api-key": GUARDIAN_API_KEY,
    page,
    "page-size": pageSize,
  },
});

/**
 * The New York Times API Configuration
 */
export const getNYTimesAPIConfig = (
  query: string,
  filters: { date?: string; category?: string },
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
): AxiosRequestConfig => ({
  method: "GET",
  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  params: {
    q: query,
    begin_date: filters.date ? filters.date.replace(/-/g, "") : undefined,
    fq: filters.category ? `section_name:("${filters.category}")` : undefined,
    "api-key": NYTIMES_API_KEY,
    page,
    "page-size": pageSize,
  },
});
