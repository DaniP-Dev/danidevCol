import { routing } from "@/src/i18n/routing";

export const serviceObjectiveKeys = [
  "presenciaImpacto",
  "autogestionContenido",
  "ecommerce",
  "automatizacionInterna",
] as const;

export type ServiceObjectiveKey = (typeof serviceObjectiveKeys)[number];

export const serviceScenarioKeys = ["fromScratch", "existingProject"] as const;
export type ServiceScenarioKey = (typeof serviceScenarioKeys)[number];

type LegacyServiceKey = "existingProjects" | "newProjects";

export interface ServiceCatalogEntry {
  key: ServiceObjectiveKey;
  icon: string;
  scenarios: readonly ServiceScenarioKey[];
}

export const serviceCatalog: readonly ServiceCatalogEntry[] = [
  {
    key: "presenciaImpacto",
    icon: "🌐",
    scenarios: serviceScenarioKeys,
  },
  {
    key: "autogestionContenido",
    icon: "🧩",
    scenarios: serviceScenarioKeys,
  },
  {
    key: "ecommerce",
    icon: "🛒",
    scenarios: serviceScenarioKeys,
  },
  {
    key: "automatizacionInterna",
    icon: "⚙️",
    scenarios: serviceScenarioKeys,
  },
] as const;

type ServiceMessageShape = {
  Services: {
    objectives: Record<ServiceObjectiveKey, { slug: string }>;
    scenarios: Record<ServiceScenarioKey, { slug: string }>;
  } & Partial<Record<LegacyServiceKey, { slug: string }>>;
};

const legacyScenarioMapping: Record<
  LegacyServiceKey,
  { objective: ServiceObjectiveKey; scenario: ServiceScenarioKey }
> = {
  existingProjects: {
    objective: "presenciaImpacto",
    scenario: "existingProject",
  },
  newProjects: {
    objective: "presenciaImpacto",
    scenario: "fromScratch",
  },
};

function normalizeSlug(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

async function getServicesMessages(locale: string): Promise<ServiceMessageShape["Services"]> {
  const messages = (await import(`../../messages/${locale}.json`))
    .default as ServiceMessageShape;
  return messages.Services;
}

export async function getObjectiveSlug(
  locale: string,
  objectiveKey: ServiceObjectiveKey,
): Promise<string> {
  const services = await getServicesMessages(locale);
  return services.objectives[objectiveKey].slug;
}

export async function getScenarioSlug(
  locale: string,
  scenarioKey: ServiceScenarioKey,
): Promise<string> {
  const services = await getServicesMessages(locale);
  return services.scenarios[scenarioKey].slug;
}

export async function resolveObjectiveKeyBySlug(
  rawSlug: string,
): Promise<ServiceObjectiveKey | undefined> {
  const target = normalizeSlug(rawSlug);

  const keyMatch = serviceObjectiveKeys.find(
    (objectiveKey) => normalizeSlug(objectiveKey) === target,
  );
  if (keyMatch) {
    return keyMatch;
  }

  for (const locale of routing.locales) {
    const services = await getServicesMessages(locale);
    const matched = serviceObjectiveKeys.find(
      (objectiveKey) =>
        normalizeSlug(services.objectives[objectiveKey].slug) === target,
    );

    if (matched) {
      return matched;
    }
  }

  return undefined;
}

export async function resolveScenarioKeyBySlug(
  rawSlug: string,
): Promise<ServiceScenarioKey | undefined> {
  const target = normalizeSlug(rawSlug);

  const keyMatch = serviceScenarioKeys.find(
    (scenarioKey) => normalizeSlug(scenarioKey) === target,
  );
  if (keyMatch) {
    return keyMatch;
  }

  for (const locale of routing.locales) {
    const services = await getServicesMessages(locale);
    const matched = serviceScenarioKeys.find(
      (scenarioKey) =>
        normalizeSlug(services.scenarios[scenarioKey].slug) === target,
    );

    if (matched) {
      return matched;
    }
  }

  return undefined;
}

export async function resolveLegacyServiceSlug(rawSlug: string): Promise<
  | { objective: ServiceObjectiveKey; scenario: ServiceScenarioKey }
  | undefined
> {
  const target = normalizeSlug(rawSlug);

  const canonicalLegacy = Object.keys(legacyScenarioMapping).find(
    (legacyKey) => normalizeSlug(legacyKey) === target,
  ) as LegacyServiceKey | undefined;

  if (canonicalLegacy) {
    return legacyScenarioMapping[canonicalLegacy];
  }

  for (const locale of routing.locales) {
    const services = await getServicesMessages(locale);

    for (const legacyKey of Object.keys(legacyScenarioMapping) as LegacyServiceKey[]) {
      const localeSlug = services[legacyKey]?.slug;
      if (localeSlug && normalizeSlug(localeSlug) === target) {
        return legacyScenarioMapping[legacyKey];
      }
    }
  }

  return undefined;
}

export function isValidObjectiveScenarioCombination(
  objective: ServiceObjectiveKey,
  scenario: ServiceScenarioKey,
): boolean {
  const entry = serviceCatalog.find((item) => item.key === objective);
  return Boolean(entry?.scenarios.includes(scenario));
}

export function getServiceCombinations(): Array<{
  objective: ServiceObjectiveKey;
  scenario: ServiceScenarioKey;
}> {
  return serviceCatalog.flatMap((entry) =>
    entry.scenarios.map((scenario) => ({
      objective: entry.key,
      scenario,
    })),
  );
}