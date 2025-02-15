import { useState, useMemo, forwardRef } from "react";
import { formatDate } from "../utils/formatDate";
import { DEFAULT_IMAGE } from "../constants";

interface ArticleProps {
  title: string;
  description: string;
  url: string;
  articleImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
  author?: string;
}

export const Article = forwardRef<HTMLDivElement, ArticleProps>(
  (
    { title, description, url, articleImage, publishedAt, source, author },
    ref
  ) => {
    const formattedDate = useMemo(() => formatDate(publishedAt), [publishedAt]);
    const [imageSrc, setImageSrc] = useState(articleImage || DEFAULT_IMAGE);

    return (
      <article
        ref={ref}
        className="flex flex-col gap-4 group rounded-xl shadow-xl dark:shadow-2xl overflow-hidden transition-opacity duration-500 opacity-0 animate-fadeIn"
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={imageSrc}
            alt={`Image for ${title}`}
            className="w-full aspect-[16/9] object-cover transition-transform duration-300 ease-out group-hover:scale-105 opacity-0 animate-fadeIn"
            loading="lazy"
            width={800}
            height={450}
            onError={() => setImageSrc(DEFAULT_IMAGE)}
          />
          <div className="p-3 flex flex-col gap-1">
            <p className="uppercase font-semibold text-xs text-purple-600">
              {formattedDate}
            </p>
            <h2 className="text-lg font-bold leading-5 text-black dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400">
              {title}
            </h2>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              Source: {source.name}
            </span>
            <p className="text-gray-700 dark:text-gray-300">
              {description?.length > 160
                ? `${description.slice(0, 157)}...`
                : description}
            </p>
            {author && (
              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                Author: {author}
              </span>
            )}
            <span className="text-sm font-medium underline text-purple-600 dark:text-purple-400">
              Read More
            </span>
          </div>
        </a>
      </article>
    );
  }
);

Article.displayName = "Article";
