import { Filters } from "./Filters";
import { IoClose } from "react-icons/io5";

interface FilterModalProps {
  onClose: () => void;
}

export function FilterModal({ onClose }: FilterModalProps) {
  return (
    <div
      className="w-full fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-md pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-100 dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-3xl pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition cursor-pointer"
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Apply Filters
        </h2>

        {/* Filters Component */}
        <Filters onClose={onClose} />
      </div>
    </div>
  );
}
