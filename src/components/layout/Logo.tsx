"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Link } from "@/src/i18n/navigation";

export default function Logo() {
  const locale = useLocale();

  return (
    <Link href="/" locale={locale} className="flex items-center justify-center ">
      <Image
        src="/yo.png"
        alt="DaniDev"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        priority
      />
      <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
        DaniDev
      </span>
    </Link>
  );
}
