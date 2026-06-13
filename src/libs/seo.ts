import type { Metadata } from "next";
import { getPathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import { siteConfig } from "@/src/libs/constants";

type Href = Parameters<typeof getPathname>[0]["href"];

type ServiceKey = "existingProjects" | "newProjects";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.url).toString();
}

export function buildLanguageAlternates(href: Href): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(getPathname({ locale, href })),
    ]),
  );

  languages["x-default"] = absoluteUrl(
    getPathname({ locale: routing.defaultLocale, href }),
  );

  return languages;
}

export function buildPageAlternates(
  locale: string,
  href: Href,
): NonNullable<Metadata["alternates"]> {
  const languages = buildLanguageAlternates(href);

  return {
    canonical: absoluteUrl(getPathname({ locale, href })),
    languages,
  };
}

async function getServiceSlug(
  locale: string,
  serviceKey: ServiceKey,
): Promise<string> {
  const messages = (await import(`../../messages/${locale}.json`)).default as {
    Services: Record<ServiceKey, { slug: string }>;
  };

  return messages.Services[serviceKey].slug;
}

export async function buildServiceLanguageAlternates(
  serviceKey: ServiceKey,
): Promise<Record<string, string>> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const slug = await getServiceSlug(locale, serviceKey);
    languages[locale] = absoluteUrl(
      getPathname({ locale, href: `/services/${slug}` }),
    );
  }

  languages["x-default"] = languages[routing.defaultLocale];

  return languages;
}

export async function buildServiceAlternates(
  locale: string,
  serviceKey: ServiceKey,
): Promise<NonNullable<Metadata["alternates"]>> {
  const languages = await buildServiceLanguageAlternates(serviceKey);

  return {
    canonical: languages[locale] ?? languages[routing.defaultLocale],
    languages,
  };
}
