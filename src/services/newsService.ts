import axios from "axios";
import {
  getNewsAPIConfig,
  getGuardianAPIConfig,
  getNYTimesAPIConfig,
} from "../config/apiConfig";
import {
  mapNewsAPIResponse,
  mapGuardianResponse,
  mapNYTimesResponse,
} from "../utils/mapApiResponse";
import { Article } from "../types/Article";
import { FetchNewsParams } from "../types/FetchNewsParams";

export const fetchNews = async ({
  query,
  filters = {},
  page = 1,
  pageSize = 10,
}: FetchNewsParams): Promise<Article[]> => {
  try {
    const [newsResponse, guardianResponse, nytResponse] =
      await Promise.allSettled([
        axios(getNewsAPIConfig(query, filters, page, pageSize)),
        axios(getGuardianAPIConfig(query, filters, page, pageSize)),
        axios(getNYTimesAPIConfig(query, filters, page, pageSize)),
      ]);

    const newsArticles =
      newsResponse.status === "fulfilled"
        ? mapNewsAPIResponse(newsResponse.value.data)
        : [];

    const guardianArticles =
      guardianResponse.status === "fulfilled"
        ? mapGuardianResponse(guardianResponse.value.data)
        : [];

    const nytArticles =
      nytResponse.status === "fulfilled"
        ? mapNYTimesResponse(nytResponse.value.data)
        : [];

    return [...newsArticles, ...guardianArticles, ...nytArticles];
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news. Please try again later.");
  }
};
