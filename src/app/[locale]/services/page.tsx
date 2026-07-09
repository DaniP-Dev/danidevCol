import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { buildPageAlternates } from "@/src/libs/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "desarrollo web",
      "Next.js",
      "React",
      "SEO optimization",
      "web design",
      "diseño web",
      "servicio web",
    ],
    alternates: buildPageAlternates(locale, "/services"),
  };
}

import HeroSection from "@/src/components/servicesPage/HeroSection";
import PhraseService from "@/src/components/servicesPage/PhraseService";
import { getObjectiveSlug, serviceCatalog } from "@/src/libs/services";
import CardService from "@/src/components/servicesPage/CardService";
import Benefits from "@/src/components/servicesPage/Benefits";
import { siteConfig } from "@/src/libs/constants";
import ContactCTA from "@/src/components/layout/ContactCTA";
import ContactForm from "@/src/components/contact/ContactForm";

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("Services");
  const tContact = await getTranslations("Contact");
  const whatsappMessage = tContact("whatsappMessage.clientGeneric", {
    page: "Services",
  });
  const pageAlternates = buildPageAlternates(locale, "/services");
  const servicesUrl = typeof pageAlternates.canonical === "string"
    ? pageAlternates.canonical
    : pageAlternates.canonical?.toString() ?? `${siteConfig.url}/services`;
  const objectiveCards = await Promise.all(
    serviceCatalog.map(async (objective) => {
      const objectiveSlug = await getObjectiveSlug(locale, objective.key);
      return {
        key: objective.key,
        href: `/services/${objectiveSlug}`,
        icon: objective.icon,
        title: t(`objectives.${objective.key}.title`),
        description: t(`objectives.${objective.key}.description`),
      };
    }),
  );
  const serviceTypes = objectiveCards.map((objective) => objective.title);

  return (
    <>
      <Script
        id="json-ld-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": `${siteConfig.name} ${t("page.cardsTitle")}`,
            "description": t("page.highlight"),
            "url": servicesUrl,
            "areaServed": "Worldwide",
            "availableLanguage": ["es", "en", "pt", "ar"],
            "serviceType": serviceTypes
          })
        }}
      />
      <div className="flex flex-col w-full bg-background min-h-[calc(100vh-80px)]">
      {/* Hero Section Container */}
      <div className="w-full max-w-350 mx-auto px-4 md:px-8 mt-4 md:mt-6">
        <HeroSection />
      </div>
      
      {/* Phrase Spacer */}
      <div className="pt-10 pb-6">
        <PhraseService />
      </div>
      
      {/* Services Cards */}
      <div className="py-12 bg-teal-50/30 dark:bg-[#0b111a]/50 border-y border-teal-100/50 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-teal-800 dark:text-teal-400 tracking-tight">
            {t("page.cardsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
            {objectiveCards.map((objective) => (
              <CardService
                key={objective.key}
                href={objective.href}
                icon={objective.icon}
                title={objective.title}
                description={objective.description}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Benefits */}
      <div className="pt-6">
        <Benefits />
      </div>
      
      {/* CTA Section */}
      <div id="cta-section" className="w-full max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-800 dark:to-[#0d211e] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">{t("page.cta.title")}</h2>
             <p className="text-base md:text-lg font-medium mb-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
               {t("page.cta.description")}
             </p>
            <ContactCTA
              location="services_cta"
              locale={locale}
              message={whatsappMessage}
               className="inline-block px-6 py-3 bg-white text-teal-800 dark:text-teal-900 font-bold rounded-full hover:bg-teal-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
             >
               {t("page.cta.button")}
            </ContactCTA>
           </div>
           {/* Decoraciones de fondo */}
           <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
           <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <ContactForm
          intent="project"
          locale={locale}
          location="services_form"
          className="max-w-2xl mx-auto"
        />
      </div>
    </div>
    </>
  );
}
