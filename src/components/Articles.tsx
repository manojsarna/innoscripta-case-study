import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "../services/newsService";
import { useNewsFilterStore, useNewsStore } from "../store";
import { Article as ArticleComponent } from "./Article";
import { Skeleton } from "./Skeleton";
import { Error } from "./Error";
import { useCallback, useEffect, useRef, useState } from "react";
import { Article } from "../types/Article";
import { FaArrowUp } from "react-icons/fa";

interface ArticlesProps {
  classNames?: string;
}

export function Articles({ classNames = "" }: ArticlesProps) {
  const { query } = useNewsStore();
  const { selectedSource, selectedDate, selectedCategory } =
    useNewsFilterStore();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastArticleElementRef = useRef<HTMLDivElement | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Article[], Error>({
    queryKey: ["news", query, selectedSource, selectedDate],
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

  // Track scroll position to show the "Scroll to Top" button
  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 300);
  }, []);

  // Track scrolling for showing the scroll-to-top button
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Show loading skeleton when fetching data
  if (isLoading) {
    return <Skeleton />;
  }

  // Filter articles based on source and date
  const filteredArticles = (data?.pages.flat() ?? []).filter((article) => {
    const articleDate = article.publishedAt?.split("T")[0]; // Extract YYYY-MM-DD
    const [startDate, endDate] = selectedDate ?? [null, null];

    if (selectedSource && article.source?.name !== selectedSource) return false;

    if (selectedCategory && article?.category !== selectedCategory)
      return false;

    if (startDate && endDate && articleDate) {
      return articleDate >= startDate && articleDate <= endDate;
    }

    return true; // If no date range is selected, show all articles
  });

  console.log(filteredArticles);

  if (error || filteredArticles.length === 0) {
    const errorMessage = error
      ? error?.message.includes("404")
        ? `No articles found for "${query}". Try a different search.`
        : "Something went wrong. Please try again later."
      : `No articles found for "${query}". Try another topic.`;
    return <Error errorMessage={errorMessage} />;
  }

  return (
    <div
      className={`p-4 mx-auto lg:max-w-screen-xl sm:max-w-screen-xl md:max-w-full scroll-smooth snap-y snap-mandatory ${classNames}`}
    >
      <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredArticles.map((item: Article, index) => (
          <ArticleComponent
            key={item.publishedAt}
            {...item}
            ref={
              index === filteredArticles.length - 1
                ? lastArticleElementRef
                : null
            }
          />
        ))}
      </div>
      {isFetchingNextPage && <Skeleton />}
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
