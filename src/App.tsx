import { useEffect, useState } from "react";
import "./App.css";
import { Container } from "./components";
import { Article } from "./types/Article";
import { fetchNews } from "./services/newsService";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("technology");

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await fetchNews(query);
        setArticles(news);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [query]);
  console.log(articles);

  return (
    <Container>
      <div className="pt-4">App Body</div>
    </Container>
  );
}

export default App;
