import HeroSection from "@/src/components/servicesPage/HeroSection";
import PhraseService from "@/src/components/servicesPage/PhraseService";
import { serviceCategories } from "@/src/libs/services";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import CardService from "@/src/components/servicesPage/CardService";

export default async function page() {
  const t = await getTranslations("Services");

  return (
    <div className="grid grid-rows-[auto_auto_auto_auto_auto] gap-3">
      <div className="border border-red-500 h-50 w-full">
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
      <div className="border border-red-500">convencer a elegirnos</div>
      <div className="border border-red-500">CTA</div>
    </div>
  );
}
