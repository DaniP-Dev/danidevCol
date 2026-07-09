import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import { notFound } from "next/navigation";
import ContactCTA from "@/src/components/layout/ContactCTA";
import {
  getObjectiveSlug,
  isValidObjectiveScenarioCombination,
  resolveObjectiveKeyBySlug,
  resolveScenarioKeyBySlug,
} from "@/src/libs/services";
import { buildServiceAlternates } from "@/src/libs/seo";

interface PageProps {
  params: Promise<{ service: string; scenario: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service, scenario, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const objectiveKey = await resolveObjectiveKeyBySlug(service);
  const scenarioKey = await resolveScenarioKeyBySlug(scenario);

  if (
    !objectiveKey ||
    !scenarioKey ||
    !isValidObjectiveScenarioCombination(objectiveKey, scenarioKey)
  ) {
    return { title: t("serviceDetail.metadata.notFoundTitle") };
  }

  const path = `matrix.${objectiveKey}.${scenarioKey}`;

  return {
    title: t(`${path}.title`),
    description: t(`${path}.description`),
    keywords: [
      t(`objectives.${objectiveKey}.title`),
      t(`scenarios.${scenarioKey}.title`),
      t("serviceDetail.metadata.keywords.webDevelopment"),
      t("serviceDetail.metadata.keywords.digitalSolutions"),
    ],
    alternates: await buildServiceAlternates(locale, objectiveKey, scenarioKey),
  };
}

export default async function Page({ params }: PageProps) {
  const { service, scenario, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const objectiveKey = await resolveObjectiveKeyBySlug(service);
  const scenarioKey = await resolveScenarioKeyBySlug(scenario);

  if (
    !objectiveKey ||
    !scenarioKey ||
    !isValidObjectiveScenarioCombination(objectiveKey, scenarioKey)
  ) {
    notFound();
  }

  const objectiveHref = `/services/${await getObjectiveSlug(locale, objectiveKey)}`;
  const contentPath = `matrix.${objectiveKey}.${scenarioKey}`;
  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const whatsappMessage = tContact("whatsappMessage.clientService", {
    objective: t(`objectives.${objectiveKey}.title`),
    scenario: t(`scenarios.${scenarioKey}.title`),
  });

  return (
    <div className="w-full bg-background">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl">
          <p className="inline-flex px-3 py-1 mb-5 text-xs font-semibold tracking-wide uppercase rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
            {t(`objectives.${objectiveKey}.title`)} ·{" "}
            {t(`scenarios.${scenarioKey}.label`)}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300 mb-4 leading-tight">
            {t(`${contentPath}.title`)}
          </h1>
          <p className="text-xl text-teal-700 dark:text-teal-400 font-semibold mb-6">
            {t(`${contentPath}.subtitle`)}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {t(`${contentPath}.longDescription`)}
          </p>
          <ContactCTA
            location="service_detail_hero"
            locale={locale}
            message={whatsappMessage}
            className="inline-block px-8 py-4 bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            {t(`${contentPath}.cta`)}
          </ContactCTA>
        </div>
      </section>

      <section className="w-full bg-teal-50/50 dark:bg-[#0b111a]/50 py-16 md:py-24 border-y border-teal-100/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="rounded-2xl bg-white/80 dark:bg-white/5 p-6 border border-teal-100/40 dark:border-white/10">
            <h2 className="text-lg font-bold text-teal-800 dark:text-teal-300 mb-3">
              {t("serviceDetail.labels.problem")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t(`${contentPath}.problem`)}
            </p>
          </article>
          <article className="rounded-2xl bg-white/80 dark:bg-white/5 p-6 border border-teal-100/40 dark:border-white/10">
            <h2 className="text-lg font-bold text-teal-800 dark:text-teal-300 mb-3">
              {t("serviceDetail.labels.solution")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t(`${contentPath}.solution`)}
            </p>
          </article>
          <article className="rounded-2xl bg-white/80 dark:bg-white/5 p-6 border border-teal-100/40 dark:border-white/10">
            <h2 className="text-lg font-bold text-teal-800 dark:text-teal-300 mb-3">
              {t("serviceDetail.labels.implementation")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t(`${contentPath}.implementation`)}
            </p>
          </article>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="rounded-3xl bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-800 p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              {t("serviceDetail.hookTitle")}
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-white/90">
              {t(`${contentPath}.hook`)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <ContactCTA
                location="service_detail_final"
                locale={locale}
                message={whatsappMessage}
                className="px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all duration-300"
              >
                {t("serviceDetail.cta.primaryButton")}
              </ContactCTA>
              <Link
                href={objectiveHref}
                locale={locale}
                className="px-8 py-4 bg-white/20 text-white font-bold rounded-lg border-2 border-white/40 hover:bg-white/30 transition-all duration-300 text-center"
              >
                {t("serviceDetail.cta.secondaryButton")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
