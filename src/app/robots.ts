import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/admin/"], // Preemptive
    },
    sitemap: "https://www.danidevcol.com/sitemap.xml",
  };
}
