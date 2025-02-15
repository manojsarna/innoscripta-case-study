interface SkeletonProps {
  classNames?: string;
  count?: number; // Allows setting the number of skeleton cards
}

const SkeletonCard = () => (
  <div className="w-full">
    <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>
    <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
    <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
  </div>
);

export function Skeleton({ classNames = "", count = 8 }: SkeletonProps) {
  return (
    <section className={`bg-gray-100 dark:bg-gray-800 w-full ${classNames}`}>
      <div className="container w-full px-5 py-5 animate-pulse">
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
