import { routing } from "@/src/i18n/routing";
import { sitemapLastModified } from "@/src/libs/constants";
import {
  buildLanguageAlternates,
  buildObjectiveLanguageAlternates,
  buildServiceLanguageAlternates,
} from "@/src/libs/seo";
import {
  getServiceCombinations,
  serviceObjectiveKeys,
} from "@/src/libs/services";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildHreflangLinks(languages: Record<string, string>): string[] {
  return Object.entries(languages).map(
    ([hreflang, href]) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${escapeXml(href)}" />`,
  );
}

function buildUrlEntry(options: {
  url: string;
  lastMod: string;
  changefreq: string;
  priority: string;
  languages?: Record<string, string>;
}): string {
  const alternateLinks = options.languages
    ? buildHreflangLinks(options.languages).join("\n")
    : "";

  return [
    "  <url>",
    `    <loc>${escapeXml(options.url)}</loc>`,
    alternateLinks,
    `    <lastmod>${options.lastMod}</lastmod>`,
    `    <changefreq>${options.changefreq}</changefreq>`,
    `    <priority>${options.priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const homeAlternates = buildLanguageAlternates("/");
  const servicesAlternates = buildLanguageAlternates("/services");
  const portfolioAlternates = buildLanguageAlternates("/portfolio");
  const curriculumAlternates = buildLanguageAlternates("/curriculum");
  const objectiveEntries = await Promise.all(
    serviceObjectiveKeys.map(async (objectiveKey) => ({
      key: objectiveKey,
      alternates: await buildObjectiveLanguageAlternates(objectiveKey),
    })),
  );
  const serviceEntries = await Promise.all(
    getServiceCombinations().map(async ({ objective, scenario }) => ({
      alternates: await buildServiceLanguageAlternates(objective, scenario),
    })),
  );

  const sitemapParts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const locale of routing.locales) {
    sitemapParts.push(
      buildUrlEntry({
        url: homeAlternates[locale],
        lastMod: sitemapLastModified.home,
        changefreq: "weekly",
        priority: "1.0",
        languages: homeAlternates,
      }),
    );
  }

  const sectionEntries: Array<{
    lastMod: string;
    changefreq: string;
    priority: string;
    languages: Record<string, string>;
  }> = [
    {
      lastMod: sitemapLastModified.services,
      changefreq: "weekly",
      priority: "0.9",
      languages: servicesAlternates,
    },
    {
      lastMod: sitemapLastModified.portfolio,
      changefreq: "weekly",
      priority: "0.9",
      languages: portfolioAlternates,
    },
    {
      lastMod: sitemapLastModified.curriculum,
      changefreq: "weekly",
      priority: "0.9",
      languages: curriculumAlternates,
    },
  ];

  for (const section of sectionEntries) {
    for (const locale of routing.locales) {
      sitemapParts.push(
        buildUrlEntry({
          url: section.languages[locale],
          lastMod: section.lastMod,
          changefreq: section.changefreq,
          priority: section.priority,
          languages: section.languages,
        }),
      );
    }
  }

  for (const objective of objectiveEntries) {
    for (const locale of routing.locales) {
      sitemapParts.push(
        buildUrlEntry({
          url: objective.alternates[locale],
          lastMod: sitemapLastModified.serviceObjectives,
          changefreq: "monthly",
          priority: "0.8",
          languages: objective.alternates,
        }),
      );
    }
  }

  for (const service of serviceEntries) {
    for (const locale of routing.locales) {
      sitemapParts.push(
        buildUrlEntry({
          url: service.alternates[locale],
          lastMod: sitemapLastModified.serviceScenarios,
          changefreq: "monthly",
          priority: "0.7",
          languages: service.alternates,
        }),
      );
    }
  }

  sitemapParts.push("</urlset>");

  return new Response(sitemapParts.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
