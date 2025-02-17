import { create } from "zustand";

interface PreferencesState {
  selectedSources: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
  setSelectedSources: (sources: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedAuthors: (authors: string[]) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => {
  // Load saved preferences from localStorage
  const storedPreferences = JSON.parse(
    localStorage.getItem("userPreferences") || "{}"
  );

  return {
    selectedSources: storedPreferences.selectedSources || [],
    selectedCategories: storedPreferences.selectedCategories || [],
    selectedAuthors: storedPreferences.selectedAuthors || [],

    setSelectedSources: (sources) => {
      set((state) => {
        const updatedPreferences = {
          ...state,
          selectedSources: sources,
        };
        localStorage.setItem(
          "userPreferences",
          JSON.stringify(updatedPreferences)
        );
        return updatedPreferences;
      });
    },

    setSelectedCategories: (categories) => {
      set((state) => {
        const updatedPreferences = {
          ...state,
          selectedCategories: categories,
        };
        localStorage.setItem(
          "userPreferences",
          JSON.stringify(updatedPreferences)
        );
        return updatedPreferences;
      });
    },

    setSelectedAuthors: (authors) => {
      set((state) => {
        const updatedPreferences = {
          ...state,
          selectedAuthors: authors,
        };
        localStorage.setItem(
          "userPreferences",
          JSON.stringify(updatedPreferences)
        );
        return updatedPreferences;
      });
    },
  };
});
