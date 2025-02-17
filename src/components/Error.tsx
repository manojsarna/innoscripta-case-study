import Lottie from "lottie-react";
import errorLottie from "../lottie/error404.json";
import { useNewsFilterStore } from "../store";
import { Navigate } from "react-router-dom";

interface ErrorProps {
  errorMessage: string;
  classNames?: string;
  from?: string;
}
export function Error({ errorMessage, classNames = "", from }: ErrorProps) {
  const { resetFilters } = useNewsFilterStore();
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 ${classNames}`}
    >
      <div className="w-full max-w-lg lg:max-w-4xl">
        <Lottie animationData={errorLottie} loop={true} />
      </div>
      <p className="text-center text-red-600 dark:text-red-400">
        {errorMessage}
      </p>
      {from === "Articles" ? (
        <span
          className="text-sm font-medium underline text-purple-600 dark:text-purple-400 cursor-pointer"
          onClick={resetFilters}
        >
          Reset Filters
        </span>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
}
