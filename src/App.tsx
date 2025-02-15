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
  }, [setTheme]);

  // const { loading, query, loadNews } = useNewsStore((state) => state);

  // useEffect(() => {
  //   loadNews();
  // }, [loadNews, query]);
  // const isFetching = useIsFetching();

  // Memoize queryClient to prevent recreation on every render
  const queryClient = useMemo(() => new QueryClient(), []);

  // useEffect(() => {
  //   queryClient.clear();
  // }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme === "dark" ? "dark" : "light"}>
        <Container>
          <SearchBar />
          {/* <Filters /> */}
          <Articles />
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
