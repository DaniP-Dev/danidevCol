import es from "@/messages/es.json";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import ar from "@/messages/ar.json";

const siteUrl = "https://danidevcol.com";
const lastMod = "2026-04-02";

const locales = ["es", "en", "pt", "ar"] as const;
type Locale = (typeof locales)[number];

type Messages = {
  Services: {
    existingProjects: { slug: string };
    newProjects: { slug: string };
  };
};

const messagesByLocale: Record<Locale, Messages> = {
  es: es as Messages,
  en: en as Messages,
  pt: pt as Messages,
  ar: ar as Messages,
};

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).toString();
}

function encodedPath(pathname: string): string {
  return pathname
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
    .replace(/%2F/g, "/");
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildUrlEntry(options: {
  url: string;
  changefreq: string;
  priority: string;
  alternates?: string[];
}): string {
  const alternateLinks = options.alternates
    ? options.alternates.join("\n")
    : "";

  return [
    "  <url>",
    `    <loc>${escapeXml(options.url)}</loc>`,
    alternateLinks,
    `    <lastmod>${lastMod}</lastmod>`,
    `    <changefreq>${options.changefreq}</changefreq>`,
    `    <priority>${options.priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildAlternates(pathByLocale: Record<Locale, string>): string[] {
  return locales.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(absoluteUrl(pathByLocale[locale]))}" />`,
  );
}

export async function GET() {
  const rootPaths: Record<Locale, string> = {
    es: "/es",
    en: "/en",
    pt: "/pt",
    ar: "/ar",
  };

  const sitemapParts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ];

  for (const locale of locales) {
    sitemapParts.push(
      buildUrlEntry({
        url: absoluteUrl(rootPaths[locale]),
        changefreq: "weekly",
        priority: "1.0",
        alternates: buildAlternates(rootPaths),
      }),
    );
  }

  const sectionPaths: Array<{ priority: string; paths: Record<Locale, string> }> = [
    {
      priority: "0.8",
      paths: {
        es: "/es/servicios",
        en: "/en/services",
        pt: "/pt/servicos",
        ar: "/ar/services",
      },
    },
    {
      priority: "0.9",
      paths: {
        es: "/es/portafolio",
        en: "/en/portfolio",
        pt: "/pt/portfolio",
        ar: "/ar/portfolio",
      },
    },
    {
      priority: "0.8",
      paths: {
        es: "/es/curriculum",
        en: "/en/curriculum",
        pt: "/pt/curriculum",
        ar: "/ar/curriculum",
      },
    },
  ];

  for (const section of sectionPaths) {
    for (const locale of locales) {
      sitemapParts.push(
        buildUrlEntry({
          url: absoluteUrl(section.paths[locale]),
          changefreq: "monthly",
          priority: section.priority,
        }),
      );
    }
  }

  for (const locale of locales) {
    const messages = messagesByLocale[locale];
    const serviceBasePath =
      locale === "es"
        ? "/es/servicios"
        : locale === "en"
          ? "/en/services"
          : locale === "pt"
            ? "/pt/servicos"
            : "/ar/services";

    sitemapParts.push(
      buildUrlEntry({
        url: absoluteUrl(encodedPath(`${serviceBasePath}/${messages.Services.existingProjects.slug}`)),
        changefreq: "monthly",
        priority: "0.7",
      }),
      buildUrlEntry({
        url: absoluteUrl(encodedPath(`${serviceBasePath}/${messages.Services.newProjects.slug}`)),
        changefreq: "monthly",
        priority: "0.7",
      }),
    );
  }

  sitemapParts.push("</urlset>");

  return new Response(sitemapParts.join("\n"), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}