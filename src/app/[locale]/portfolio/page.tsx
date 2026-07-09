import PortfolioGrid from "@/src/components/portfolioPage/PortfolioGrid";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { Link } from "@/src/i18n/navigation";
import { buildPageAlternates } from "@/src/libs/seo";
import { siteConfig } from "@/src/libs/constants";
import ContactCTA from "@/src/components/layout/ContactCTA";

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
      "web design examples",
    ],
    alternates: buildPageAlternates(locale, "/portfolio"),
  };
}
export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PortfolioPage" });
  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const whatsappMessage = tContact("whatsappMessage.clientGeneric", {
    page: "Portfolio",
  });
  const portfolioUrl = `${siteConfig.url}/portfolio`;

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
            "url": portfolioUrl,
            "creator": {
              "@type": "Person",
              "name": "Daniel Pérez Guzman",
              "url": siteConfig.url
            }
          })
        }}
      />
      <section className="w-full py-10 px-4 flex flex-col items-center bg-teal-50/50 dark:bg-[#0b111a]">
        <h1 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">{t("title")}</h1>
        <PortfolioGrid projects={projects} />

        <div className="mt-14 w-full max-w-3xl rounded-3xl bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-900 p-8 md:p-10 text-center text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{t("finalCta.title")}</h2>
          <p className="text-base md:text-lg text-white/90 mb-8">{t("finalCta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactCTA
              location="portfolio_final"
              locale={locale}
              message={whatsappMessage}
              className="px-8 py-4 bg-white text-teal-800 dark:text-teal-900 font-bold rounded-lg hover:bg-teal-50 transition-all duration-300"
            >
              {t("finalCta.whatsapp")}
            </ContactCTA>
            <Link
              href="/services"
              locale={locale}
              className="px-8 py-4 bg-white/20 text-white font-bold rounded-lg border-2 border-white/40 hover:bg-white/30 transition-all duration-300 text-center"
            >
              {t("finalCta.services")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
