"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
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
  ar: { name: "العربية", flag: "🇸🇦" },
};

function LanguageTriggerButton({
  flag,
  disabled = false,
}: {
  flag: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
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
  const currentLocale = useLocale() as keyof typeof languageData;
  const router = useRouter();
  const pathname = usePathname();
  // Flowbite Dropdown generates unstable useId values across SSR/CSR.
  // Match ThemeToggle: render a stable placeholder until the client has hydrated.
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleLanguageChange = (newLocale: string) => {
    setLocalePreferenceCookie(newLocale);
    clearLocaleSuggestionDismissedCookie();
    router.replace(pathname, { locale: newLocale });
  };

  const flag = languageData[currentLocale]?.flag ?? "";

  if (!isHydrated) {
    return (
      <div className="flex items-center">
        <LanguageTriggerButton flag={flag} disabled />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Dropdown
        label=""
        dismissOnClick={true}
        renderTrigger={() => <LanguageTriggerButton flag={flag} />}
      >
        <DropdownHeader>
          <span className="block text-sm font-bold text-gray-900 dark:text-gray-100">
            Select Language
          </span>
        </DropdownHeader>
        {routing.locales.map((locale) => (
          <DropdownItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 ${
              currentLocale === locale ? "bg-blue-100 dark:bg-gray-600 font-bold" : ""
            }`}
          >
            <span className="text-xl">
              {languageData[locale as keyof typeof languageData]?.flag}
            </span>
            <span className="text-sm dark:text-gray-200">
              {languageData[locale as keyof typeof languageData]?.name}
            </span>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
}
