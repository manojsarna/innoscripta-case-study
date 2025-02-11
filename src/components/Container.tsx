import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface ContainerProps {
  classNames?: string;
  children: ReactNode;
}
export function Container({ classNames, children }: ContainerProps) {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-gray-100 text-black">
      <Header />
      <div
        className={`flex-grow items-start max-w-screen-xl mx-auto mt-16 ${
          classNames ?? ""
        }`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
