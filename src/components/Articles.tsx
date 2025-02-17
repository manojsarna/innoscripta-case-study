import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "../services/newsService";
import { useNewsFilterStore, useNewsStore } from "../store";
import { Article as ArticleComponent } from "./Article";
import { Skeleton } from "./Skeleton";
import { Error } from "./Error";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Article } from "../types/Article";
import { FaArrowUp, FaFilter } from "react-icons/fa";
import { FilterModal } from "./FilterModal";

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
  const [showFilterModal, setShowFilterModal] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Article[], Error>({
    queryKey: ["news", query, selectedSource, selectedDate, selectedCategory],
    queryFn: ({ pageParam = 1 }) =>
      fetchNews({ query, page: Number(pageParam) }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage && lastPage.length > 0 ? pages.length + 1 : undefined,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Retry once on failure
  });

  // Custom debounced function inside useCallback
  const debouncedFetchNextPage = useCallback(() => {
    if (debounceTimeout.current !== null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = window.setTimeout(() => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage().catch((err) =>
          console.error("Error fetching next page:", err)
        );
      }
    }, 300); // 300ms debounce delay
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Intersection Observer: Load more articles when the last one is visible
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    // Disconnect previous observer if it exists
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        debouncedFetchNextPage();
      }
    });

    if (lastArticleElementRef.current) {
      observerRef.current.observe(lastArticleElementRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [
    isFetchingNextPage,
    debouncedFetchNextPage,
    hasNextPage,
    query,
    selectedSource,
    selectedDate,
    selectedCategory,
  ]);

  // Track scroll position to show the "Scroll to Top" button
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setShowScrollTop(window.scrollY > 300);
    });
  }, []);

  // Track scrolling for showing the scroll-to-top button
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredArticles = useMemo(() => {
    return (data?.pages.flat() ?? []).filter((article) => {
      const articleDate = article.publishedAt?.split("T")[0];
      const [startDate, endDate] = selectedDate ?? [null, null];

      if (selectedSource && article.source?.name !== selectedSource)
        return false;
      if (selectedCategory && article?.category !== selectedCategory)
        return false;
      if (startDate && endDate && articleDate) {
        return articleDate >= startDate && articleDate <= endDate;
      }

      return true;
    });
  }, [data, selectedSource, selectedCategory, selectedDate]);

  const storedPreferences = JSON.parse(
    localStorage.getItem("userPreferences") || "{}"
  );

  console.log(storedPreferences);

  // Show loading skeleton when fetching data
  if (isLoading || filteredArticles.length === 0) {
    return <Skeleton />;
  }

  if (error) {
    const errorMessage = error
      ? error?.message.includes("404")
        ? `No articles found. Try a different search.`
        : "Something went wrong. Please try again later."
      : `No articles found. Try another topic.`;
    return <Error errorMessage={errorMessage} />;
  }

  return (
    <div
      className={`p-4 mx-auto lg:max-w-screen-xl sm:max-w-screen-xl md:max-w-full scroll-smooth snap-y snap-mandatory ${classNames}`}
    >
      <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredArticles.map((item: Article, index) => (
          <ArticleComponent
            key={`${item.publishedAt}${item.title}`}
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

      {/* Floating Buttons */}
      <div className="fixed bottom-5 right-5 flex flex-col space-y-3">
        {/* Filter Button */}
        <button
          onClick={() => setShowFilterModal(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          title="Click To Filter Articles"
        >
          <FaFilter className="w-5 h-5" />
        </button>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition duration-300 cursor-pointer"
            title="Scroll To Top"
          >
            <FaArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
      {/* Filter Modal */}
      {showFilterModal && (
        <FilterModal onClose={() => setShowFilterModal(false)} />
      )}
    </div>
  );
}
