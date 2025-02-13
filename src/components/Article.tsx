import { useState } from "react";
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

export function Article({
  title,
  description,
  url,
  articleImage,
  publishedAt,
  source,
}: ArticleProps) {
  const formattedDate = formatDate(publishedAt);
  const [imageSrc, setImageSrc] = useState(articleImage || DEFAULT_IMAGE);
  return (
    <article className="flex flex-col gap-4">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden group rounded-xl shadow-lg"
      >
        <img
          src={imageSrc}
          alt={`Image for ${title}`}
          className="object-cover w-full h-56 transition-transform duration-300 ease-out sm:h-64 group-hover:scale-110"
          loading="lazy"
          onError={() => setImageSrc(DEFAULT_IMAGE)}
        />
      </a>
      <div className="flex flex-col gap-2">
        <p className="uppercase font-semibold text-xs text-purple-600">
          {formattedDate}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:underline"
        >
          <h2 className="text-xl font-bold leading-5 text-black dark:text-white hover:text-purple-700 dark:hover:text-purple-400">
            {title}
          </h2>
        </a>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {`By - ${source.name}`}
        </span>
        <p className="text-gray-700 dark:text-gray-300 w-full">
          {description?.length > 160
            ? `${description.slice(0, 157)}...`
            : description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline text-purple-600 dark:text-purple-400"
        >
          Read More
        </a>
      </div>
    </article>
  );
}
