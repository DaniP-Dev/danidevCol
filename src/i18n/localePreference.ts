import { hasLocale } from "next-intl";
import { routing } from "./routing";

export type SupportedLocale = (typeof routing.locales)[number];

export type LocaleSuggestionMessages = {
  title: string;
  description: string;
  switchButton: string;
  dismissButton: string;
  languageNames: Record<SupportedLocale, string>;
};

export function formatLocaleSuggestionDescription(
  template: string,
  language: string,
): string {
  return template.replace("{language}", language);
}

export const LOCALE_PREFERENCE_COOKIE = "ddc_locale_pref";
export const LOCALE_SUGGESTION_DISMISSED_COOKIE = "ddc_locale_suggestion_dismissed";

export const LOCALE_PREFERENCE_MAX_AGE = 60 * 60 * 24 * 90;
export const LOCALE_SUGGESTION_DISMISSED_MAX_AGE = 60 * 60 * 24 * 7;

function parseAcceptLanguage(headerValue: string): string[] {
  const weighted = headerValue
    .split(",")
    .map((entry, index) => {
      const [languageRange, ...params] = entry.trim().split(";");
      if (!languageRange) return null;

      const qParam = params.find((param) => param.trim().startsWith("q="));
      const qValue = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "1") : 1;

      return {
        languageRange,
        q: Number.isFinite(qValue) ? qValue : 1,
        index,
      };
    })
    .filter((entry): entry is { languageRange: string; q: number; index: number } => Boolean(entry))
    .sort((a, b) => {
      if (b.q !== a.q) return b.q - a.q;
      return a.index - b.index;
    });

  return weighted.map((entry) => entry.languageRange);
}

export function normalizeToSupportedLocale(locale: string | null | undefined): SupportedLocale | null {
  if (!locale) return null;

  const normalized = locale.trim().toLowerCase();
  if (!normalized) return null;

  if (hasLocale(routing.locales, normalized)) {
    return normalized as SupportedLocale;
  }

  const baseLocale = normalized.split("-")[0];
  if (hasLocale(routing.locales, baseLocale)) {
    return baseLocale as SupportedLocale;
  }

  return null;
}

export function getPreferredLocaleFromHeader(
  acceptLanguageHeader: string | null | undefined,
): SupportedLocale | null {
  if (!acceptLanguageHeader) return null;

  const seen = new Set<string>();

  for (const languageRange of parseAcceptLanguage(acceptLanguageHeader)) {
    const locale = normalizeToSupportedLocale(languageRange);
    if (!locale) continue;

    if (!seen.has(locale)) {
      seen.add(locale);
      return locale;
    }
  }

  return null;
}

interface SuggestedLocaleOptions {
  currentLocale: string;
  acceptLanguageHeader?: string | null;
  preferredLocaleCookie?: string | null;
  dismissedSuggestionCookie?: string | null;
}

export function getSuggestedLocale({
  currentLocale,
  acceptLanguageHeader,
  preferredLocaleCookie,
  dismissedSuggestionCookie,
}: SuggestedLocaleOptions): SupportedLocale | null {
  const current = normalizeToSupportedLocale(currentLocale);
  if (!current) return null;

  const preferredFromCookie = normalizeToSupportedLocale(preferredLocaleCookie);
  const preferredLocale = preferredFromCookie ?? getPreferredLocaleFromHeader(acceptLanguageHeader);

  if (!preferredLocale || preferredLocale === current) {
    return null;
  }

  const dismissedLocale = normalizeToSupportedLocale(dismissedSuggestionCookie);
  if (dismissedLocale && dismissedLocale === preferredLocale) {
    return null;
  }

  return preferredLocale;
}

function writeClientCookie(name: string, value: string, maxAge: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export function setLocalePreferenceCookie(locale: string) {
  const normalized = normalizeToSupportedLocale(locale);
  if (!normalized) return;
  writeClientCookie(LOCALE_PREFERENCE_COOKIE, normalized, LOCALE_PREFERENCE_MAX_AGE);
}

export function setLocaleSuggestionDismissedCookie(locale: string) {
  const normalized = normalizeToSupportedLocale(locale);
  if (!normalized) return;
  writeClientCookie(
    LOCALE_SUGGESTION_DISMISSED_COOKIE,
    normalized,
    LOCALE_SUGGESTION_DISMISSED_MAX_AGE,
  );
}

export function clearLocaleSuggestionDismissedCookie() {
  writeClientCookie(LOCALE_SUGGESTION_DISMISSED_COOKIE, "", 0);
}
