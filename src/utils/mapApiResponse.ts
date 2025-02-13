// src/utils/mapApiResponse.ts
import { NYTIMES_URL } from "../constants";
import { Article } from "../types/Article";

export const mapNewsAPIResponse = (data: any): Article[] => {
  return (
    data.articles?.map((article: any) => ({
      title: article.title || "No title available",
      description: article.description || "No description",
      url: article.url || "#",
      articleImage: article.urlToImage || "",
      publishedAt: article.publishedAt || new Date().toISOString(),
      source: { name: article.source?.name || "Unknown Source" },
    })) || []
  );
};

export const mapGuardianResponse = (data: any): Article[] => {
  return (
    data.response?.results?.map((result: any) => ({
      title: result.webTitle || "No title available",
      description: result.fields.bodyText,
      url: result.webUrl || "#",
      articleImage: result.fields.thumbnail || "",
      publishedAt: result.webPublicationDate || new Date().toISOString(),
      source: { name: "The Guardian" },
    })) || []
  );
};

export const mapNYTimesResponse = (data: any): Article[] => {
  return (
    data.response?.docs?.map((doc: any) => ({
      title: doc.headline?.main || "No title available",
      description: doc.abstract || "No description",
      url: doc.web_url || "#",
      articleImage: `${NYTIMES_URL}${doc.multimedia[0]?.url}` || "",
      publishedAt: doc.pub_date || new Date().toISOString(),
      source: { name: "The New York Times" },
    })) || []
  );
};
