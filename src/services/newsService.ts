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

export const fetchNews = async (
  query: string,
  filters: { date?: string; category?: string; source?: string } = {},
  page: number = 1,
  pageSize: number = 5
): Promise<Article[]> => {
  try {
    const [newsResponse, guardianResponse, nytResponse] = await Promise.all([
      axios(getNewsAPIConfig(query, filters, page, pageSize)),
      axios(getGuardianAPIConfig(query, filters, page, pageSize)),
      axios(getNYTimesAPIConfig(query, filters, page, pageSize)),
    ]);

    const newsArticles = mapNewsAPIResponse(newsResponse.data);
    const guardianArticles = mapGuardianResponse(guardianResponse.data);
    const nytArticles = mapNYTimesResponse(nytResponse.data);

    return [...newsArticles, ...guardianArticles, ...nytArticles];
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news. Please try again later.");
  }
};
