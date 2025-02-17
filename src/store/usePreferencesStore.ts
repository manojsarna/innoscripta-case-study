import { create } from "zustand";

interface PreferencesState {
  selectedSources: string[];
  selectedCategories: string[];
  selectedAuthors: string[];
  setSelectedSources: (sources: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedAuthors: (authors: string[]) => void;
}

// Helper function to update localStorage for a specific key
const updateLocalStorage = (key: string, value: any) => {
  const storedPreferences = JSON.parse(
    localStorage.getItem("userPreferences") || "{}"
  );
  storedPreferences[key] = value;
  localStorage.setItem("userPreferences", JSON.stringify(storedPreferences));
};

export const usePreferencesStore = create<PreferencesState>((set) => {
  const storedPreferences = JSON.parse(
    localStorage.getItem("userPreferences") || "{}"
  );

  return {
    selectedSources: storedPreferences.selectedSources || [],
    selectedCategories: storedPreferences.selectedCategories || [],
    selectedAuthors: storedPreferences.selectedAuthors || [],

    setSelectedSources: (sources) => {
      set(() => {
        updateLocalStorage("selectedSources", sources);
        return { selectedSources: sources };
      });
    },

    setSelectedCategories: (categories) => {
      set(() => {
        updateLocalStorage("selectedCategories", categories);
        return { selectedCategories: categories };
      });
    },

    setSelectedAuthors: (authors) => {
      set(() => {
        updateLocalStorage("selectedAuthors", authors);
        return { selectedAuthors: authors };
      });
    },
  };
});
