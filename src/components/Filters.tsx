import { useState, useCallback } from "react";
import { useNewsFilterStore } from "../store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
// import { MdKeyboardArrowUp } from "react-icons/md";
// import { MdKeyboardArrowDown } from "react-icons/md";

interface FiltersProps {
  onClose: () => void;
}

export function Filters({ onClose }: FiltersProps) {
  const {
    selectedSource,
    setSelectedSource,
    //sources,
    selectedCategory,
    setSelectedCategory,
    //categories,
    selectedDate,
    setSelectedDate,
    resetFilters,
  } = useNewsFilterStore();

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => [
    selectedDate && selectedDate[0] ? new Date(selectedDate[0]) : null,
    selectedDate && selectedDate[1] ? new Date(selectedDate[1]) : null,
  ]);

  const [startDate, endDate] = dateRange;

  // Handle source selection change
  const handleSourceChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSource(e.target.value || null);
      onClose();
    },
    [setSelectedSource, onClose]
  );

  // Handle categories selection change
  const handleCategoriesChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // const values = Array.from(
      //   e.target.selectedOptions,
      //   (option) => option.value
      // );
      setSelectedCategory(e.target.value || null);
      onClose();
    },
    [setSelectedCategory, onClose]
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
        onClose();
      } else {
        setSelectedDate(null);
      }
    },
    [setSelectedDate, onClose]
  );

  // Reset filters and clear the state
  const handleReset = useCallback(() => {
    resetFilters();
    setDateRange([null, null]);
    setSelectedDate(null);
    onClose();
  }, [resetFilters, setSelectedDate, onClose]);

  //const [isOpen, setIsOpen] = useState(false);

  //const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="w-full px-4 border-gray-300 rounded-md dark:bg-gray-800 dark:text-white mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full">
      {/* <button
        onClick={toggleAccordion}
        className="p-2 border border-gray-300 rounded w-full text-left cursor-pointer"
      >
        <span className="flex justify-between items-center">
          <span>Filters</span>
          <span className="text-2xl">
            {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </span>
        </span>
      </button>
      {isOpen && (
       
      )} */}
      <div className="mt-4 w-full flex flex-wrap gap-4 justify-between bg-gray-100 dark:bg-gray-800 rounded-lg">
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
          <option value="Politics">Politics</option>
          <option value="Podcasts">Podcasts</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
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
          isClearable={true}
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
    </div>
  );
}
