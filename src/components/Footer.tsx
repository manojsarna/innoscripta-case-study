interface FooterProps {
  classNames?: string;
}
export function Footer({ classNames = "" }: FooterProps) {
  return (
    <footer className={`bg-gray-200 dark:bg-gray-900  ${classNames}`}>
      <div className="max-w-screen-xl flex flex-col md:flex-row flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-8 px-4 md:px-0 text-sm font-medium">
          {/* <div className="hover:text-gray-800  block py-1">Home</div> */}
        </div>
        <div className="flex p-4 md:p-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} Inno News</p>
        </div>
      </div>
    </footer>
  );
}
