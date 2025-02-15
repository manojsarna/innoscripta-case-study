import { create } from "zustand";
import { STORED_THEME_KEY } from "../constants";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: "dark",
  setTheme: (theme: string) => set({ theme }),
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    localStorage.setItem(STORED_THEME_KEY, newTheme);
    set({ theme: newTheme });
  },
}));
