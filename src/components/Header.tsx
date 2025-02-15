import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../store";

interface HeaderProps {
  classNames?: string;
}
export function Header({ classNames = "" }: HeaderProps) {
  const { theme, toggleTheme } = useTheme((state) => state);

  const renderThemeButton = () => {
    return (
      <div
        className="flex align-middle "
        title={`Enable ${theme === "dark" ? "Light" : "Dark"} Mode`}
      >
        <button
          onClick={toggleTheme}
          className="hover:text-gray-800 dark:hover:text-gray-300 text-xl self-stretch w-full py-1 cursor-pointer"
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    );
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-200 dark:bg-gray-900  z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="h-8 w-8 pt-0.5">
            <img
              src="images/inno-news.svg"
              alt="Logo"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <span
            className={`self-center text-2xl font-semibold whitespace-nowrap ${classNames}`}
          >
            Inno News
          </span>
        </div>
        <ul className="font-medium flex flex-col gap-2 items-end">
          <li>{renderThemeButton()}</li>
        </ul>
      </div>
    </nav>
  );
}
