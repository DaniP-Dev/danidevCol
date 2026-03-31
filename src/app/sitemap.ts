import { MetadataRoute } from "next";
import { routing } from "@/src/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://danidevcol.com";
  const locales = routing.locales;
  const pages = ["", "/services", "/portfolio", "/curriculum"];
  
  // Dynamic service slugs based on translations
  const serviceSlugs = [
    "mejoras-web-sitios", // es
    "existing-projects", // en
    "melhorias-web-sites", // pt
    "improve-websites", // ar (placeholder if not known)
    "desarrollo-desde-cero", // es
    "new-projects", // en
    "desenvolvimento-do-zero", // pt
    "build-from-scratch" // ar (placeholder)
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    });
    
    // Add specific service pages
    // Since we don't have all slugs here, we just add the base locale ones for now or use the translated keys
    // In a real scenario, we would use a more dynamic way if possible
  });

  return sitemapEntries;
}
