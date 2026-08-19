"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import {
  clearLocaleSuggestionDismissedCookie,
  setLocalePreferenceCookie,
} from "@/src/i18n/localePreference";

const languageData = {
  es: { name: "Español", flag: "🇪🇸" },
  en: { name: "English", flag: "🇺🇸" },
  pt: { name: "Português", flag: "🇧🇷" },
};

type LocaleKey = keyof typeof languageData;

function LanguageTriggerButton({
  flag,
  disabled = false,
  expanded = false,
  onClick,
}: {
  flag: string;
  disabled?: boolean;
  expanded?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={expanded}
      aria-haspopup="listbox"
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
      aria-label="Select Language"
    >
      <span className="mr-1 text-lg">{flag}</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export default function LanguageToggle() {
  const currentLocale = useLocale() as LocaleKey;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false);
    setLocalePreferenceCookie(newLocale);
    clearLocaleSuggestionDismissedCookie();
    router.replace(pathname, { locale: newLocale });
  };

  const flag = languageData[currentLocale]?.flag ?? "";

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isHydrated) {
    return (
      <div className="flex items-center">
        <LanguageTriggerButton flag={flag} disabled />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex items-center">
      <LanguageTriggerButton
        flag={flag}
        expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      />
      {isOpen ? (
        <div
          role="listbox"
          aria-label="Select Language"
          className="absolute right-0 top-full z-[60] mt-2 min-w-44 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-600 dark:bg-gray-700"
        >
          <p className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-gray-100">
            Select Language
          </p>
          {routing.locales.map((locale) => (
            <button
              key={locale}
              type="button"
              role="option"
              aria-selected={currentLocale === locale}
              onClick={() => handleLanguageChange(locale)}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left text-gray-900 hover:bg-blue-50 dark:text-gray-100 dark:hover:bg-gray-600 ${
                currentLocale === locale ? "bg-blue-100 font-bold dark:bg-gray-600" : ""
              }`}
            >
              <span className="text-xl">
                {languageData[locale as LocaleKey]?.flag}
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-100">
                {languageData[locale as LocaleKey]?.name}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
