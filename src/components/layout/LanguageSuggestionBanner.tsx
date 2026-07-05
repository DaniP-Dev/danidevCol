"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import {
  clearLocaleSuggestionDismissedCookie,
  setLocalePreferenceCookie,
  setLocaleSuggestionDismissedCookie,
  type SupportedLocale,
} from "@/src/i18n/localePreference";

type LanguageSuggestionBannerProps = {
  suggestedLocale: SupportedLocale | null;
};

const languageNameKeys: Record<
  SupportedLocale,
  "languageNames.es" | "languageNames.en" | "languageNames.pt" | "languageNames.ar"
> = {
  es: "languageNames.es",
  en: "languageNames.en",
  pt: "languageNames.pt",
  ar: "languageNames.ar",
};

export default function LanguageSuggestionBanner({
  suggestedLocale,
}: LanguageSuggestionBannerProps) {
  const [isHidden, setIsHidden] = useState(false);
  const t = useTranslations("LocaleSuggestion");
  const router = useRouter();
  const pathname = usePathname();

  if (!suggestedLocale || isHidden) {
    return null;
  }

  const suggestedLanguageLabel = t(languageNameKeys[suggestedLocale]);

  const handleChangeLanguage = () => {
    setLocalePreferenceCookie(suggestedLocale);
    clearLocaleSuggestionDismissedCookie();
    router.replace(pathname, { locale: suggestedLocale });
  };

  const handleDismiss = () => {
    setLocaleSuggestionDismissedCookie(suggestedLocale);
    setIsHidden(true);
  };

  return (
    <div className="border-b border-blue-200/70 bg-blue-50/80 dark:border-blue-900/60 dark:bg-blue-950/50 px-4 py-3">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-blue-900 dark:text-blue-100">
          <span className="font-semibold">{t("title")}</span>{" "}
          {t("description", { language: suggestedLanguageLabel })}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleChangeLanguage}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {t("switchButton")}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-md border border-blue-300 bg-transparent px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100 dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900/40"
          >
            {t("dismissButton")}
          </button>
        </div>
      </div>
    </div>
  );
}
