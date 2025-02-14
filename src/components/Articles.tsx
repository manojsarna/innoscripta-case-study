import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "../services/newsService";
import { useNewsStore } from "../store";
import { Article as ArticleComponent } from "./Article";
import { Skeleton } from "./Skeleton";
import { Error } from "./Error";
import { useEffect, useRef } from "react";
import { Article } from "../types/Article";

interface ArticlesProps {
  classNames?: string;
}

export function Articles({ classNames = "" }: ArticlesProps) {
  const { query } = useNewsStore();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastArticleElementRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Article[], Error>({
    queryKey: ["news", query],
    queryFn: ({ pageParam = 1 }) =>
      fetchNews({ query, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage && lastPage.length > 0 ? pages.length + 1 : undefined,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Retry once on failure
  });

  // Intersection Observer: Load more articles when the last one is visible
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage().catch((err) =>
          console.error("Error fetching next page:", err)
        );
      }
    });

    if (lastArticleElementRef.current) {
      observerRef.current.observe(lastArticleElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isFetchingNextPage, fetchNextPage, hasNextPage]);

  // Show loading skeleton when fetching data
  if (isLoading) {
    return <Skeleton />;
  }

  // Handle error cases
  const articles = data?.pages.flat() ?? [];

  console.log("Infinite Query Data:", data);
  console.log("Flattened Articles:", articles);
  console.log("Page Params:", data?.pageParams);

  if (error || articles.length === 0) {
    const errorMessage = error
      ? error.message.includes("404")
        ? `No articles found for "${query}". Try a different search.`
        : "Something went wrong. Please try again later."
      : `No articles found for "${query}". Try another topic.`;
    return <Error errorMessage={errorMessage} />;
  }

  return (
    <div
      className={`p-4 mx-auto lg:max-w-screen-xl sm:max-w-screen-xl md:max-w-full ${classNames}`}
    >
      <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((item: Article, index) => (
          <ArticleComponent
            key={item.publishedAt}
            {...item}
            ref={index === articles.length - 1 ? lastArticleElementRef : null}
          />
        ))}
      </div>
      {isFetchingNextPage && <Skeleton />}
    </div>
  );
}
