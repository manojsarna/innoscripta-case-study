import { create } from "zustand";
import { Article } from "../types/Article";
import { fetchNews } from "../services/newsService";

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  query: string;
  setQuery: (query: string) => void;
  // loadNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  loading: false,
  error: null,
  query: "technology",
  setQuery: (query: string) => {
    set({ query });
    //get().loadNews();
  },
  // loadNews: async () => {
  //   set({ loading: true, error: null });
  //   try {
  //     const news = await fetchNews(get().query);
  //     set({ articles: news });
  //   } catch (err) {
  //     set({ error: (err as Error).message });
  //   } finally {
  //     set({ loading: false });
  //   }
  // },
}));
