import { useEffect, useMemo } from "react";
import "./App.css";
import { Articles, Container, SearchBar } from "./components";
import { STORED_THEME_KEY } from "./constants";
import { useTheme } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const { theme, setTheme } = useTheme((state) => state);

  function getInitialTheme() {
    const storedTheme = localStorage.getItem(STORED_THEME_KEY);
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    // Redirect any path except "/" to home "/"
    if (window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }, [setTheme]);

  // Memoize queryClient to prevent recreation on every render
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme === "dark" ? "dark" : "light"}>
        <Container>
          <SearchBar />
          <Articles />
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
