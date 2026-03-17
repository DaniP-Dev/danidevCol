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
    <div className="grid grid-rows-[auto_auto_auto_auto_auto] gap-6">
      <div className=" h-50 w-full">
        <HeroSection />
      </div>
      <div>
        <PhraseService />
      </div>
      <div>
        <div className="flex flex-wrap gap-6 justify-center p-6">
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
      <Benefits />
      <div className="border border-red-500">CTA</div>
    </div>
  );
}
