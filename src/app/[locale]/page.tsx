
import { Link } from "next-view-transitions";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";
import { serviceCategories } from "@/src/libs/services";

export const metadata: Metadata = {
  title: "danidevcol | Desarrollo Web en Colombia y Optimización Global",
  description:
    "Desarrollador web freelance en Colombia especializado en desarrollo, rediseño y optimización web para empresas globales. SOLUCIONES PROFESIONALES multi-idioma para potenciar tu presencia digital.",
  keywords: [
    "danidevcol",
    "Desarrollo web Colombia",
    "Desarrollador web freelance",
    "Optimización web internacional",
    "Desarrollo web global",
    "Optimización de páginas web",
    "Rediseño web",
    "Sitios web para negocios",
    "Contratar desarrollador web",
    "Mejorar página web",
    "Editar sitio web",
    "Colombia"
  ],
  openGraph: {
    title: "danidevcol | Desarrollo Web en Colombia y Optimización Global",
    description:
      "Soluciones profesionales de desarrollo y optimización web para empresas. Desarrollador freelance con soporte global y multi-idioma.",
    type: "website",
    locale: "es_CO",
    url: "https://danidevcol.com",
    siteName: "danidevcol"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("HomePage");
  const tServices = await getTranslations("Services");

  return (
    <div className="w-full bg-background overflow-hidden">
      {/* Hero Section */}
      <section>


        <div className="relative py-12 bg-gray-900 sm:py-16 lg:py-20 xl:pt-32 xl:pb-44">
          <div className="absolute inset-0 hidden lg:block">
            <img className="object-cover object-bottom-right w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/background.png" alt="" />
          </div>

          <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-xl mx-auto text-center lg:max-w-md xl:max-w-lg lg:text-left lg:mx-0">
              <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-full">
                <span className="flex h-2 w-2 rounded-full bg-teal-400 mr-2 animate-pulse"></span>
                {t("hero.location")}
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl xl:leading-tight">{t("hero.title")}</h1>
              <p className="mt-8 text-base font-normal leading-7 text-gray-400 lg:max-w-md xl:pr-0 lg:pr-16">{t("hero.subtitle")}</p>

              <div className="flex items-center justify-center mt-8 space-x-5 xl:mt-16 lg:justify-start">
                <Link
                  href={`/${locale}/contacto`}
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-3
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-gray-900
                            transition-all
                            duration-200
                            bg-white
                            border border-transparent
                            rounded-md
                            sm:px-6
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                            hover:bg-gray-200
                        "
                  role="button"
                >
                  {t("hero.cta")}
                </Link>

                <Link
                  href={`/${locale}/servicios`}
                  className="
                            inline-flex
                            items-center
                            justify-center
                            px-2
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-white
                            transition-all
                            duration-200
                            bg-transparent
                            border border-transparent
                            rounded-md
                            sm:px-4
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-700
                            hover:bg-gray-700
                        "
                  role="button"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/1/bg.png" alt="" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-teal-50/50 dark:bg-[#0b111a]/50 border-y border-teal-100/50 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-600 dark:text-teal-400 uppercase bg-teal-100 dark:bg-teal-900/30 rounded-full mb-2">
              {t("features.location")}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300">
              {t("features.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-teal-100/20 dark:border-white/10 hover:border-teal-300/50 dark:hover:border-teal-400/50 transition-all duration-300 group hover:shadow-lg hover:shadow-teal-500/10"
              >
                <div className="w-14 h-14 rounded-lg bg-linear-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {["✨", "⚡", "🔒", "📈", "🎨", "🛠️"][i - 1]}
                </div>
                <h3 className="text-xl font-bold text-teal-800 dark:text-teal-300 mb-3">
                  {t(`features.feature${i}.title`)}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`features.feature${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300">
            {t("services.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((service) => {
            const slug = tServices(`${service.key}.slug`);
            const title = tServices(`${service.key}.title`);
            const description = tServices(`${service.key}.description`);

            return (
              <Link
                key={service.key}
                href={`/${locale}/services/${slug}`}
                className="group relative rounded-2xl overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-teal-100/20 dark:border-white/10 hover:border-teal-300/50 dark:hover:border-teal-400/50 transition-all duration-300 p-8 hover:shadow-xl hover:shadow-teal-500/10"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-lg bg-linear-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                    {service.key === "existingProjects" ? "🚀" : "💡"}
                  </div>
                  <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-300 group-hover:text-teal-600 dark:group-hover:text-teal-200 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {description}
                  </p>
                  <div className="flex items-center text-teal-600 dark:text-teal-400 group-hover:gap-2 gap-0 transition-all">
                    <span className="font-semibold">{t("footer.seeMore")}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-900 dark:to-emerald-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            {t("stats.title")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">20+</div>
              <p className="text-teal-100">{t("stats.projects")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">10+</div>
              <p className="text-teal-100">{t("stats.clients")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">4+</div>
              <p className="text-teal-100">{t("stats.experience")}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">99.9%</div>
              <p className="text-teal-100">{t("stats.uptime")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-teal-50/50 dark:bg-[#0b111a]/50">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-800 dark:text-teal-300">
              {t("cta.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t("cta.subtitle")}
            </p>
          </div>

          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center justify-center px-10 py-5 bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
