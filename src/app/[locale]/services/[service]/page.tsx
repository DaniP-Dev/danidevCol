import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import { notFound, redirect } from "next/navigation";
import ContactCTA from "@/src/components/layout/ContactCTA";
import {
  getObjectiveSlug,
  getScenarioSlug,
  resolveLegacyServiceSlug,
  resolveObjectiveKeyBySlug,
  serviceScenarioKeys,
} from "@/src/libs/services";
import { buildObjectiveAlternates, buildServiceAlternates } from "@/src/libs/seo";

interface PageProps {
  params: Promise<{ service: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const objectiveKey = await resolveObjectiveKeyBySlug(service);

  if (!objectiveKey) {
    const legacy = await resolveLegacyServiceSlug(service);
    if (legacy) {
      const legacyPath = `matrix.${legacy.objective}.${legacy.scenario}`;

      return {
        title: t(`${legacyPath}.title`),
        description: t(`${legacyPath}.description`),
        keywords: [
          t(`objectives.${legacy.objective}.title`),
          t(`scenarios.${legacy.scenario}.title`),
          t("objectivePage.metadata.keywords.webSolutions"),
          t("objectivePage.metadata.keywords.digitalGrowth"),
        ],
        alternates: await buildServiceAlternates(
          locale,
          legacy.objective,
          legacy.scenario,
        ),
      };
    }

    return { title: t("objectivePage.metadata.notFoundTitle") };
  }

  return {
    title: t("objectivePage.metadata.title", {
      objective: t(`objectives.${objectiveKey}.title`),
    }),
    description: t(`objectives.${objectiveKey}.description`),
    keywords: [
      t(`objectives.${objectiveKey}.title`),
      t("objectivePage.metadata.keywords.webSolutions"),
      t("objectivePage.metadata.keywords.digitalGrowth"),
    ],
    alternates: await buildObjectiveAlternates(locale, objectiveKey),
  };
}

export default async function Page({ params }: PageProps) {
  const { service, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  const objectiveKey = await resolveObjectiveKeyBySlug(service);

  if (!objectiveKey) {
    const legacy = await resolveLegacyServiceSlug(service);
    if (legacy) {
      const objectiveSlug = await getObjectiveSlug(locale, legacy.objective);
      const scenarioSlug = await getScenarioSlug(locale, legacy.scenario);
      redirect(`/services/${objectiveSlug}/${scenarioSlug}`);
    }
    notFound();
  }

  const objectiveSlug = await getObjectiveSlug(locale, objectiveKey);
  const tContact = await getTranslations({ locale, namespace: "Contact" });
  const whatsappMessage = tContact("whatsappMessage.clientObjective", {
    objective: t(`objectives.${objectiveKey}.title`),
  });
  const scenarios = await Promise.all(
    serviceScenarioKeys.map(async (scenarioKey) => {
      const scenarioSlug = await getScenarioSlug(locale, scenarioKey);
      return {
        key: scenarioKey,
        href: `/services/${objectiveSlug}/${scenarioSlug}`,
        title: t(`scenarios.${scenarioKey}.title`),
        description: t(`scenarios.${scenarioKey}.description`),
      };
    }),
  );

  return (
    <div className="w-full bg-background">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300 mb-4 leading-tight">
            {t(`objectives.${objectiveKey}.title`)}
          </h1>
          <p className="text-xl text-teal-700 dark:text-teal-400 font-semibold mb-6">
            {t(`objectives.${objectiveKey}.subtitle`)}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t(`objectives.${objectiveKey}.description`)}
          </p>
        </div>
      </section>

      <section className="w-full bg-teal-50/50 dark:bg-[#0b111a]/50 py-16 md:py-24 border-y border-teal-100/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-300 mb-3">
              {t("objectivePage.scenariosTitle")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("objectivePage.scenariosSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <Link
                key={scenario.key}
                href={scenario.href}
                locale={locale}
                className="rounded-2xl bg-white/70 dark:bg-white/5 p-7 border border-teal-100/40 dark:border-white/10 hover:border-teal-400/50 dark:hover:border-teal-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10"
              >
                <p className="inline-flex px-3 py-1 mb-4 text-xs font-semibold tracking-wide uppercase rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-200">
                  {t(`scenarios.${scenario.key}.label`)}
                </p>
                <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-300 mb-2">
                  {scenario.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {scenario.description}
                </p>
                <div className="flex items-center text-teal-600 dark:text-teal-300 font-semibold">
                  {t("objectivePage.viewService")}
                  <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-300 mb-4">
            {t("objectivePage.bottomTitle")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {t("objectivePage.bottomDescription")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ContactCTA
              location="objective_bottom"
              locale={locale}
              message={whatsappMessage}
              className="inline-flex px-8 py-4 bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300"
            >
              {t("objectivePage.whatsappButton")}
            </ContactCTA>
            <Link
              href="/services"
              locale={locale}
              className="inline-flex px-8 py-4 bg-white/80 dark:bg-white/10 text-teal-800 dark:text-teal-200 font-bold rounded-lg border border-teal-200 dark:border-white/20 hover:bg-teal-50 dark:hover:bg-white/15 transition-all duration-300"
            >
              {t("objectivePage.backToObjectives")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
