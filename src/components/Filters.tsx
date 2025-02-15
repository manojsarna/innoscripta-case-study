import { useState, useCallback } from "react";
import { useNewsFilterStore, useNewsStore } from "../store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export function Filters() {
  const {
    selectedSource,
    setSelectedSource,
    //sources,
    selectedCategory,
    setSelectedCategory,
    //categories,
    setSelectedDate,
    resetFilters,
  } = useNewsFilterStore();
  const { setQuery } = useNewsStore();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, endDate] = dateRange;

  // Handle source selection change
  const handleSourceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSource(e.target.value || null);
    },
    [setSelectedSource]
  );

  // Handle categories selection change
  const handleCategoriesChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // const values = Array.from(
      //   e.target.selectedOptions,
      //   (option) => option.value
      // );
      setSelectedCategory(e.target.value || null);
    },
    [setSelectedCategory]
  );

  // Handle date selection
  const handleDateChange = useCallback(
    (update: [Date | null, Date | null]) => {
      if (update[0] && update[1] && update[0] > update[1]) {
        console.error(
          "Invalid date range: start date cannot be after end date."
        );
        return;
      }
      setDateRange(update);

      // Ensure both dates exist before setting them in Zustand store
      if (update[0] && update[1]) {
        setSelectedDate([
          format(update[0], "yyyy-MM-dd"),
          format(update[1], "yyyy-MM-dd"),
        ]);
      } else {
        setSelectedDate(null);
      }
    },
    [setSelectedDate]
  );

  // Reset filters and clear the state
  const handleReset = useCallback(() => {
    resetFilters();
    setDateRange([null, null]);
    setSelectedDate(null);
    setQuery("");
  }, [resetFilters, setSelectedDate, setQuery]);

  return (
    <div className="w-full flex flex-wrap px-4 gap-4 justify-between bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* Source Filter */}
      <select
        value={selectedSource || ""}
        onChange={handleSourceChange}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white transition-all"
        aria-label="Select News Source"
      >
        <option value="">All Sources</option>
        <option value="The News API">The News API</option>
        <option value="The Guardian">The Guardian</option>
        <option value="The New York Times">The New York Times</option>
        {/* {sources.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))} */}
      </select>

      {/* Categories Filter */}
      <select
        value={selectedCategory || ""}
        onChange={handleCategoriesChange}
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white transition-all"
        aria-label="Select News Source"
      >
        <option value="">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Sports">Sports</option>
        <option value="Health">Health</option>
        <option value="Science">Science</option>
        <option value="Podcasts">Podcasts</option>
        <option value="Business">Business</option>
        <option value="Finance">Finance</option>
        <option value="Artificial Intelligence">Artificial Intelligence</option>
        {/* {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))} */}
      </select>

      {/* Date Range Picker */}
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        isClearable
        className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white transition-all"
        placeholderText="Select Date Range"
      />

      {/* Reset Filters Button */}
      <button
        onClick={handleReset}
        className="bg-purple-600 hover:bg-purple-700 shadow-lg text-white p-2 rounded transition-all cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
}
