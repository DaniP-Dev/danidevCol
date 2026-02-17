"use client";

import Logo from "./Logo";

export default function Header() {
  return (
    <header className="h-20 w-full bg-custom dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <Logo />
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mode Toggle (visual only) */}
        <button
          type="button"
          className="p-2 rounded-lg text-white bg-gray-700 dark:bg-gray-300 dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          {/* Sun/Moon icon (visual only) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
        {/* Language Switcher (visual only) */}
        <button
          type="button"
          className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          aria-label="Change language"
        >
          {/* Language icon (visual only) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.21 0 4 4.03 4 9s-1.79 9-4 9-4-4.03-4-9 1.79-9 4-9zm0 0v18"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
