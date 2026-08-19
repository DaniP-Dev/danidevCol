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

export function getPreferredLocaleFromNavigator(
  languages: readonly string[] | null | undefined,
): SupportedLocale | null {
  if (!languages?.length) return null;

  for (const language of languages) {
    const locale = normalizeToSupportedLocale(language);
    if (locale) return locale;
  }

  return null;
}

interface SuggestedLocaleOptions {
  currentLocale: string;
  navigatorLanguages?: readonly string[] | null;
  preferredLocaleCookie?: string | null;
  dismissedSuggestionCookie?: string | null;
}

export function getSuggestedLocale({
  currentLocale,
  navigatorLanguages,
  preferredLocaleCookie,
  dismissedSuggestionCookie,
}: SuggestedLocaleOptions): SupportedLocale | null {
  const current = normalizeToSupportedLocale(currentLocale);
  if (!current) return null;

  const preferredFromCookie = normalizeToSupportedLocale(preferredLocaleCookie);
  const preferredLocale =
    preferredFromCookie ?? getPreferredLocaleFromNavigator(navigatorLanguages);

  if (!preferredLocale || preferredLocale === current) {
    return null;
  }

  const dismissedLocale = normalizeToSupportedLocale(dismissedSuggestionCookie);
  if (dismissedLocale && dismissedLocale === preferredLocale) {
    return null;
  }

  return preferredLocale;
}

export function readClientCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const prefix = `${encodeURIComponent(name)}=`;
  const match = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
  if (!match) return null;

  return decodeURIComponent(match.slice(prefix.length));
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
