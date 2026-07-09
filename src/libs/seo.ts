import type { Metadata } from "next";
import { getPathname } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import { siteConfig } from "@/src/libs/constants";
import {
  type ServiceObjectiveKey,
  type ServiceScenarioKey,
  getObjectiveSlug,
  getScenarioSlug,
} from "@/src/libs/services";

type Href = Parameters<typeof getPathname>[0]["href"];

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

export async function buildObjectiveLanguageAlternates(
  objectiveKey: ServiceObjectiveKey,
): Promise<Record<string, string>> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const objectiveSlug = await getObjectiveSlug(locale, objectiveKey);
    languages[locale] = absoluteUrl(
      getPathname({ locale, href: `/services/${objectiveSlug}` }),
    );
  }

  languages["x-default"] = languages[routing.defaultLocale];

  return languages;
}

export async function buildObjectiveAlternates(
  locale: string,
  objectiveKey: ServiceObjectiveKey,
): Promise<NonNullable<Metadata["alternates"]>> {
  const languages = await buildObjectiveLanguageAlternates(objectiveKey);

  return {
    canonical: languages[locale] ?? languages[routing.defaultLocale],
    languages,
  };
}

export async function buildServiceLanguageAlternates(
  objectiveKey: ServiceObjectiveKey,
  scenarioKey: ServiceScenarioKey,
): Promise<Record<string, string>> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const objectiveSlug = await getObjectiveSlug(locale, objectiveKey);
    const scenarioSlug = await getScenarioSlug(locale, scenarioKey);
    languages[locale] = absoluteUrl(
      getPathname({
        locale,
        href: `/services/${objectiveSlug}/${scenarioSlug}`,
      }),
    );
  }

  languages["x-default"] = languages[routing.defaultLocale];

  return languages;
}

export async function buildServiceAlternates(
  locale: string,
  objectiveKey: ServiceObjectiveKey,
  scenarioKey: ServiceScenarioKey,
): Promise<NonNullable<Metadata["alternates"]>> {
  const languages = await buildServiceLanguageAlternates(objectiveKey, scenarioKey);

  return {
    canonical: languages[locale] ?? languages[routing.defaultLocale],
    languages,
  };
}

type PageSocialMetadataInput = {
  title: string;
  description: string;
  url: string;
  locale: string;
};

export function buildPageOpenGraph({
  title,
  description,
  url,
  locale,
}: PageSocialMetadataInput): NonNullable<Metadata["openGraph"]> {
  return {
    title,
    description,
    type: "website",
    locale,
    url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        alt: title,
      },
    ],
  };
}

export function buildPageTwitter({
  title,
  description,
}: Pick<PageSocialMetadataInput, "title" | "description">): NonNullable<
  Metadata["twitter"]
> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [siteConfig.ogImage],
  };
}

export function resolveCanonicalUrl(
  alternates: NonNullable<Metadata["alternates"]>,
): string {
  if (typeof alternates.canonical === "string") {
    return alternates.canonical;
  }

  if (alternates.canonical instanceof URL) {
    return alternates.canonical.toString();
  }

  if (
    alternates.canonical &&
    typeof alternates.canonical === "object" &&
    "url" in alternates.canonical
  ) {
    return String(alternates.canonical.url);
  }

  return siteConfig.url;
}
