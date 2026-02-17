import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { serviceCategories } from "@/src/libs/services";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ service: string; locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { service } = await params;
  const t = await getTranslations("Services");

  const category = serviceCategories.find(
    (c) => t(`${c.key}.slug`) === service,
  );

  if (!category) {
    return { title: "Service Not Found" };
  }
  {/* METADATA */}
  return {
    title: t(`${category.key}.title`),
    description: t(`${category.key}.description`),
  };
}

export default async function Page({ params }: PageProps) {
  const { service } = await params;
  const t = await getTranslations("Services");

  const category = serviceCategories.find(
    (c) => t(`${c.key}.slug`) === service,
  );

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1>{t(`${category.key}.title`)}</h1>
    </div>
  );
}
