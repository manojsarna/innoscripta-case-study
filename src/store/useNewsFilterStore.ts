// // store/newsFilterStore.ts
// import { create } from "zustand";

// interface NewsFilterState {
//   selectedSource: string | null;
//   selectedDate: [string, string] | null; // Store as tuple of startDate and endDate
//   setSource: (source: string | null) => void;
//   setDate: (date: [string, string] | null) => void;
//   resetFilters: () => void;
// }

// export const useNewsFilterStore = create<NewsFilterState>((set) => ({
//   selectedSource: null,
//   selectedDate: null,
//   setSource: (source) => set({ selectedSource: source }),
//   setDate: (date) => set({ selectedDate: date }),
//   resetFilters: () => set({ selectedSource: null, selectedDate: null }),
// }));

import { create } from "zustand";

interface NewsFilterState {
  selectedSource: string | null;
  setSelectedSource: (source: string | null) => void;
  sources: string[];
  setSources: (sources: string[]) => void;

  selectedCategory: string | null;
  setSelectedCategory: (categories: string | null) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;

  selectedDate: [string | null, string | null] | null;
  setSelectedDate: (date: [string | null, string | null] | null) => void;

  resetFilters: () => void;
}

export const useNewsFilterStore = create<NewsFilterState>((set) => ({
  selectedSource: null,
  setSelectedSource: (source) => set({ selectedSource: source }),
  sources: [],
  setSources: (sources) => set({ sources }),

  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  categories: [],
  setCategories: (categories) => set({ categories }),

  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  resetFilters: () =>
    set({ selectedSource: null, selectedDate: null, selectedCategory: null }),
}));
