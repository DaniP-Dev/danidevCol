import { MetadataRoute } from "next";
import { siteConfig } from "@/src/libs/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // Preemptive
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
