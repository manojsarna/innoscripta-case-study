interface HeaderProps {
  classNames?: string;
}
export function Header({ classNames }: HeaderProps) {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-200 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-2 pointer-events-none">
          <div className="h-8 w-8 pt-0.5">
            <img
              src="/src/icons/inno-news.svg"
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
          <li className="" title="Go To Home">
            Home
          </li>
        </ul>
      </div>
    </nav>
  );
}
