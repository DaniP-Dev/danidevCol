import { navItems } from "./nav";
import { Link } from "@/src/i18n/navigation";

type Props = {
  typeDisplay?: "mobile" | "desktop";
};

export default function NavBar({ typeDisplay = "mobile" }: Props) {
  const isMobile = typeDisplay === "mobile";

  return (
    <nav
      className={`${isMobile ? "fixed bottom-0 left-0 z-50 w-full h-16 bg-custom border-t border-gray-200 dark:bg-custom dark:border-gray-600" : "h-full"}`}
    >
      <div
        className={
          isMobile
            ? "grid h-full max-w-lg mx-auto font-medium"
            : "flex flex-col gap-2"
        }
        style={
          isMobile
            ? {
                gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
              }
            : undefined
        }
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              isMobile
                ? "inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                : "flex items-center gap-3 p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg"
            }
          >
            {/* Icon logic by label */}
            {item.label === "Inicio" && (
              <svg
                className={
                  isMobile
                    ? "w-5 h-5 mb-2 text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    : "bg-none w-5 h-5 text-white dark:text-white shrink-0"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 003 11h1v6a1 1 0 001 1h3a1 1 0 001-1v-4h2v4a1 1 0 001 1h3a1 1 0 001-1v-6h1a1 1 0 00.707-1.707l-7-7z" />
              </svg>
            )}
            {item.label === "Curriculum" && (
              <svg
                className={
                  isMobile
                    ? "w-5 h-5 mb-2 text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    : "bg-none w-5 h-5 text-white dark:text-white shrink-0"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5zm2 2v2h8V7H6zm0 4v2h5v-2H6z" />
              </svg>
            )}
            {item.label === "Portafolio" && (
              <svg
                className={
                  isMobile
                    ? "w-5 h-5 mb-2 text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    : "bg-none w-5 h-5 text-white dark:text-white shrink-0"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6 2a2 2 0 00-2 2v2H3a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H6zm0 2h8v2H6V4zm12 4v8H2V8h16z" />
              </svg>
            )}
            {item.label === "Servicios" && (
              <svg
                className={
                  isMobile
                    ? "w-5 h-5 mb-2 text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500"
                    : "bg-none w-5 h-5 text-white dark:text-white shrink-0"
                }
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* Cloud with gear icon for digital services */}
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 18a4.5 4.5 0 0 1 0-9c.2 0 .4 0 .6.03A5.25 5.25 0 0 1 21 11.25c0 .13-.01.26-.02.39A3.75 3.75 0 0 1 17.25 18H7.5z" />
                <circle cx="16.5" cy="16.5" r="1.25" fill="currentColor" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 14.5v.5m0 2v.5m1.5-1.5h.5m-2 0h-.5m1.15-1.15l.35.35m-1.5 1.5l-.35.35m1.5 0l.35-.35m-1.5-1.5l-.35-.35" />
              </svg>
            )}
            <span
              className={
                isMobile
                  ? "text-sm text-white dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500"
                  : "text-sm font-medium text-white dark:text-white"
              }
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
