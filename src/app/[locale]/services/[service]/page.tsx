import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { serviceCategories } from "@/src/libs/services";
import { getServiceBenefits, getServiceProcess } from "@/src/libs/serviceContent";
import { notFound } from "next/navigation";
import Link from "next/link";
import { routing } from "@/src/i18n/routing";

interface PageProps {
  params: Promise<{ service: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  const category = await findCategoryBySlug(service);

  if (!category) {
    return { title: "Service Not Found" };
  }
  
  return {
    title: t(`${category.key}.title`),
    description: t(`${category.key}.description`),
    keywords: [t(`${category.key}.title`), "web development", "digital solutions"],
  };
}

export default async function Page({ params }: PageProps) {
  const { service, locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });

  const category = await findCategoryBySlug(service);

  if (!category) {
    notFound();
  }

  const title = t(`${category.key}.title`);
  const subtitle = t(`${category.key}.subtitle`);
  const longDescription = t(`${category.key}.longDescription`);
  const benefits = getServiceBenefits(category.key, locale);
  const process = getServiceProcess(category.key, locale);
  const ctaText = t(`${category.key}.cta`);

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300 mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-teal-700 dark:text-teal-400 font-semibold mb-6">
              {subtitle}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {longDescription}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className="inline-block px-8 py-4 bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {ctaText}
            </Link>
          </div>
          
          {/* SVG Illustration */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-80 h-80 bg-linear-to-br from-teal-100 dark:from-teal-900/30 to-emerald-100 dark:to-emerald-900/30 rounded-3xl flex items-center justify-center text-6xl">
              {category.key === "existingProjects" ? "🚀" : "💡"}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="w-full bg-teal-50/50 dark:bg-[#0b111a]/50 py-16 md:py-24 border-y border-teal-100/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-300 mb-4">
              Beneficios Principales
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Lo que conseguirás con nuestro servicio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-teal-100/20 dark:border-white/10 hover:border-teal-300/50 dark:hover:border-teal-400/50 transition-all duration-300"
              >
                <div className="text-3xl mb-4">
                  {["✨", "⚡", "🔒", "📈", "🎨", "🛠️"][index]}
                </div>
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-300 mb-4">
              Nuestro Proceso
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Cómo trabajamos para asegurar tu éxito
            </p>
          </div>

          <div className="space-y-6">
            {process.map((item, index) => (
              <div
                key={index}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-emerald-500 text-white font-bold flex items-center justify-center text-lg">
                  {index + 1}
                </div>
                <div className="grow">
                  <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-2">
                    {item.step}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-800 dark:to-emerald-800 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contacto`}
              className="px-8 py-4 bg-white text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-all duration-300"
            >
              Agendar Consulta
            </Link>
            <Link
              href={`/${locale}/services`}
              className="px-8 py-4 bg-white/20 text-white font-bold rounded-lg border-2 border-white/40 hover:bg-white/30 transition-all duration-300"
            >
              Ver Otros Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-teal-50/30 dark:bg-[#0b111a]/50">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 dark:text-teal-300 mb-4">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Cuánto tiempo toma el proyecto?",
                a: "El timeline depende de la complejidad del proyecto. En promedio, proyectos nuevos toman entre 2-4 meses, mientras que mejoras pueden ser más rápidas."
              },
              {
                q: "¿Qué tecnologías utilizan?",
                a: "Usamos tecnologías modernas como React, Next.js, Node.js, TypeScript y otras herramientas que garantizan escalabilidad y mantenimiento."
              },
              {
                q: "¿Ofrecen soporte post-lanzamiento?",
                a: "Sí, incluimos soporte técnico continuo y actualización de seguridad. También ofrecemos planes de mantenimiento personalizados."
              },
              {
                q: "¿Cómo es el proceso de comunicación?",
                a: "Mantenemos comunicación constante mediante reuniones semanales, actualizaciones de progreso y un gestor de proyecto dedicado."
              }
            ].map((item, index) => (
              <details
                key={index}
                className="p-6 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-teal-100/20 dark:border-white/10 group cursor-pointer"
              >
                <summary className="font-bold text-teal-800 dark:text-teal-300 text-lg flex justify-between items-center">
                  {item.q}
                  <span className="text-teal-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function normalizeSlug(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

async function findCategoryBySlug(rawSlug: string) {
  const target = normalizeSlug(rawSlug);

  const byCanonical = serviceCategories.find((category) => {
    const canonicalSlug = category.url.split("/").filter(Boolean).pop() || "";
    return normalizeSlug(canonicalSlug) === target;
  });

  if (byCanonical) {
    return byCanonical;
  }

  for (const locale of routing.locales) {
    const t = await getTranslations({ locale, namespace: "Services" });

    const byLocaleSlug = serviceCategories.find((category) => {
      const translatedSlug = t(`${category.key}.slug`);
      return normalizeSlug(translatedSlug) === target;
    });

    if (byLocaleSlug) {
      return byLocaleSlug;
    }
  }

  return undefined;
}
