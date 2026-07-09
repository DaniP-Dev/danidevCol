"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CardPortfolioProps {
  id: number;
  name: string;
  description: string;
  image?: string;
  isTrending?: boolean;
  priority?: boolean;
  onOpenModal: (projectId: number) => void;
}

const CardPortfolio = ({
  id,
  name,
  description,
  image = "/docs/images/blog/image-1.jpg",
  isTrending = false,
  priority = false,
  onOpenModal,
}: CardPortfolioProps) => {
  const t = useTranslations("PortfolioPage");

  return (
    <div
      onClick={() => onOpenModal(id)}
      className="group block max-w-sm overflow-hidden rounded-2xl border border-teal-200 bg-white shadow-lg shadow-teal-900/10 ring-1 ring-teal-900/5 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-600/20 dark:border-teal-700/50 dark:bg-[#121a24] dark:shadow-black/50 dark:ring-white/5 dark:hover:border-teal-400/70 dark:hover:shadow-teal-500/20"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(id);
        }}
        className="block w-full overflow-hidden"
        aria-label={t("labels.viewMore")}
      >
        <Image
          className="rounded-t-2xl object-cover transition-transform duration-300 group-hover:scale-105"
          src={image}
          alt={`Portafolio de danidevcol: ${name}`}
          width={600}
          height={340}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={80}
        />
      </button>
      <div className="p-6 text-center">
        {isTrending && (
          <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700 dark:border-teal-800 dark:bg-teal-900/40 dark:text-teal-200">
            <svg
              className="w-3 h-3 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
              />
            </svg>
            {t("labels.trending")}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(id);
          }}
          className="block w-full text-left"
          aria-label={`${t("labels.viewMore")}: ${name}`}
        >
          <h5 className="mt-3 mb-4 text-2xl font-bold tracking-tight text-teal-800 dark:text-teal-300">
            {name}
          </h5>
        </button>
        <p className="mb-6 text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(id);
          }}
          className="inline-flex items-center rounded-lg bg-linear-to-r from-teal-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-500/40 dark:from-teal-700 dark:to-emerald-700"
        >
          {t("labels.viewMore")}
          <svg
            className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardPortfolio;
