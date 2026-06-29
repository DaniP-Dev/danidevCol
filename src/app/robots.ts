import { MetadataRoute } from "next";
import { siteConfig } from "@/src/libs/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/private", "/.next", "/node_modules"],
        crawlDelay: 1,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0.5,
      },
      {
        userAgent: ["Bingbot", "Slurp"],
        allow: "/",
        crawlDelay: 1,
      },
    ],
    host: siteConfig.url,
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
