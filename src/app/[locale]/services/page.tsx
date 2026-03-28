export const generateMetadata = () => ({
  title: "Servicios profesionales de desarrollo web y software | DaniDevCol",
  description:
    "Soluciones digitales a medida: diseño, desarrollo, optimización SEO y consultoría para potenciar tu negocio."
});
import HeroSection from "@/src/components/servicesPage/HeroSection";
import PhraseService from "@/src/components/servicesPage/PhraseService";
import { serviceCategories } from "@/src/libs/services";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import CardService from "@/src/components/servicesPage/CardService";
import Benefits from "@/src/components/servicesPage/Benefits";

export default async function page() {
  const t = await getTranslations("Services");

  return (
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
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-stretch">
            {serviceCategories.map((category) => (
              <CardService
                key={category.key}
                slug={t(`${category.key}.slug`)}
                title={t(`${category.key}.title`)}
                description={t(`${category.key}.description`)}
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
      <div id="cta-section" className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-800 dark:to-[#0d211e] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-2xl md:text-3xl font-extrabold mb-4 tracking-tight">¿Listo para escalar tu proyecto?</h2>
             <p className="text-base md:text-lg font-medium mb-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
               Contáctanos hoy mismo y descubre cómo nuestras soluciones pueden transformar tu presencia digital.
             </p>
             <Link href="/contacto" className="inline-block px-6 py-3 bg-white text-teal-800 dark:text-teal-900 font-bold rounded-full hover:bg-teal-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
               Solicitar una consulta
             </Link>
           </div>
           {/* Decoraciones de fondo */}
           <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
           <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}
