import { create } from "zustand";
import { STORED_THEME_KEY } from "../constants";

interface ThemeStateProps {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
}

export const useTheme = create<ThemeStateProps>((set, get) => ({
  theme: "dark",
  setTheme: (theme: string) => set({ theme }),
  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    localStorage.setItem(STORED_THEME_KEY, newTheme);
    set({ theme: newTheme });
  },
}));
