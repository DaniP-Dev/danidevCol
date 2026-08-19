"use client";

import { useState, useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { localeSuggestionMessages } from "@/src/i18n/localeSuggestionMessages";
import {
  clearLocaleSuggestionDismissedCookie,
  formatLocaleSuggestionDescription,
  getSuggestedLocale,
  LOCALE_PREFERENCE_COOKIE,
  LOCALE_SUGGESTION_DISMISSED_COOKIE,
  readClientCookie,
  setLocalePreferenceCookie,
  setLocaleSuggestionDismissedCookie,
} from "@/src/i18n/localePreference";

export default function LanguageSuggestionModal() {
  const currentLocale = useLocale();
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isHydrated || isHidden) {
    return null;
  }

  const clientLocale = getSuggestedLocale({
    currentLocale,
    navigatorLanguages: navigator.languages,
    preferredLocaleCookie: readClientCookie(LOCALE_PREFERENCE_COOKIE),
    dismissedSuggestionCookie: readClientCookie(LOCALE_SUGGESTION_DISMISSED_COOKIE),
  });

  if (!clientLocale) {
    return null;
  }

  const messages = localeSuggestionMessages[clientLocale];
  const languageLabel = messages.languageNames[clientLocale];
  const description = formatLocaleSuggestionDescription(
    messages.description,
    languageLabel,
  );

  const handleChangeLanguage = () => {
    setLocalePreferenceCookie(clientLocale);
    clearLocaleSuggestionDismissedCookie();
    router.replace(pathname, { locale: clientLocale });
  };

  const handleDismiss = () => {
    setLocaleSuggestionDismissedCookie(clientLocale);
    setIsHidden(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-label={messages.dismissButton}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="locale-suggestion-title"
        className="relative z-10 w-full max-w-md rounded-2xl border border-blue-100/80 bg-white p-6 shadow-2xl dark:border-blue-900/50 dark:bg-gray-900"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="locale-suggestion-title"
          className="text-xl font-bold text-blue-900 dark:text-blue-100"
        >
          {messages.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-lg border border-blue-300 px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900/40"
          >
            {messages.dismissButton}
          </button>
          <button
            type="button"
            onClick={handleChangeLanguage}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {messages.switchButton}
          </button>
        </div>
      </div>
    </div>
  );
}
