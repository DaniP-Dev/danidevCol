import { useTranslations } from "next-intl";

export default function PhraseService() {
  const t = useTranslations("Services");

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto text-center">
      <p className="text-lg md:text-xl text-teal-800 dark:text-teal-300 font-semibold leading-relaxed">
        {t("page.highlight")}
      </p>
    </section>
  );
}
