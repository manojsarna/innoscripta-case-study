import Lottie from "lottie-react";
import errorLottie from "../lottie/error404.json";

interface ErrorProps {
  errorMessage: string;
  classNames?: string;
}
export function Error({ errorMessage, classNames = "" }: ErrorProps) {
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
    </div>
  );
}
