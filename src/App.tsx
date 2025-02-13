import { useEffect } from "react";
import "./App.css";
import { Articles, Container, Skeleton } from "./components";
import { STORED_THEME_KEY } from "./constants";
import { useNewsStore, useTheme } from "./store";

function App() {
  const { loading, query, loadNews } = useNewsStore((state) => state);

  useEffect(() => {
    loadNews();
  }, [loadNews, query]);

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

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <Container>{loading ? <Skeleton /> : <Articles />}</Container>
    </div>
  );
}

export default App;
