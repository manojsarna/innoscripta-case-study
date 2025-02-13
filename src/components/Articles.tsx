import { useNewsStore } from "../store";
import { Article } from "./Article";

interface ArticlesProps {
  classNames?: string;
}
export function Articles({ classNames = "" }: ArticlesProps) {
  const { articles } = useNewsStore((state) => state);
  return (
    <div
      className={`px-5 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full lg:py-20 sm:py-16 ${classNames}`}
    >
      <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map(
          (
            { title, description, url, articleImage, publishedAt, source },
            index
          ) => (
            <Article
              key={index}
              title={title}
              description={description}
              articleImage={articleImage}
              publishedAt={publishedAt}
              source={source}
              url={url}
            />
          )
        )}
      </div>
    </div>
  );
}
