import { usePreferencesStore } from "../store";

const sources = ["CNN", "BBC", "NYTimes", "TechCrunch"];
const categories = ["Technology", "Health", "Sports", "Business"];
//const authors = ["John Doe", "Jane Smith", "Alex Brown"];

export function Preferences() {
  const {
    selectedSources,
    setSelectedSources,
    selectedCategories,
    setSelectedCategories,
    //selectedAuthors,
    //setSelectedAuthors,
  } = usePreferencesStore();

  const handleSourceChange = (source: string) => {
    const updatedSources = selectedSources.includes(source)
      ? selectedSources.filter((s) => s !== source)
      : [...selectedSources, source];

    setSelectedSources(updatedSources);
  };

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  //   const handleAuthorChange = (author: string) => {
  //     const updatedAuthors = selectedAuthors.includes(author)
  //       ? selectedAuthors.filter((a) => a !== author)
  //       : [...selectedAuthors, author];

  //     setSelectedAuthors(updatedAuthors);
  //   };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Customize Your Feed</h2>

      {/* Select Sources */}
      <div className="mb-4">
        <h3 className="font-medium">Preferred Sources:</h3>
        <div className="flex gap-2 flex-wrap">
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => handleSourceChange(source)}
              className={`px-3 py-1 border rounded ${
                selectedSources.includes(source)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Select Categories */}
      <div className="mb-4">
        <h3 className="font-medium">Preferred Categories:</h3>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 border rounded ${
                selectedCategories.includes(category)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Select Authors */}
      {/* <div className="mb-4">
        <h3 className="font-medium">Preferred Authors:</h3>
        <div className="flex gap-2 flex-wrap">
          {authors.map((author) => (
            <button
              key={author}
              onClick={() => handleAuthorChange(author)}
              className={`px-3 py-1 border rounded ${
                selectedAuthors.includes(author)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {author}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
}
