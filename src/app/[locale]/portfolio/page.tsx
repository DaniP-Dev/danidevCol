import PortfolioGrid from "@/src/components/portfolioPage/PortfolioGrid";
import { getTranslations } from "next-intl/server";
import Script from "next/script";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.portfolio" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "portafolio web",
      "proyectos Next.js",
      "React projects",
      "web development portfolio",
      "casos de éxito",
      "web design examples"
    ]
  };
}
export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PortfolioPage" });

  const projectKeys = [
    "somosCriteria",
    "womenOasix",
    "raicesDeOro",
    "certixion",
    "constructora0312",
    "servicrep"
  ] as const;

  const projects = projectKeys.map((key, index) => ({
    id: index + 1,
    name: t(`projects.${key}.name`),
    description: t(`projects.${key}.description`),
    fullDescription: t(`projects.${key}.fullDescription`),
    technologies: t(`projects.${key}.technologies`).split(", "),
    image: t(`projects.${key}.image`),
    link: t(`projects.${key}.link`),
    isTrending: t(`projects.${key}.isTrending`) === "true"
  }));

  return (
    <>
      <Script
        id="json-ld-portfolio"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Web Development Portfolio",
            "description": "Portfolio with 6+ web development projects showcasing Next.js, React, and digital solutions",
            "url": "https://danidevcol.com/portfolio",
            "creator": {
              "@type": "Person",
              "name": "Daniel Pérez Guzman",
              "url": "https://danidevcol.com"
            }
          })
        }}
      />
      <section className="py-10 px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">{t("title")}</h1>
      <PortfolioGrid projects={projects} />
    </section>
    </>
  );
}
