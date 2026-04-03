"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface CardPortfolioProps {
  id: number;
  name: string;
  description: string;
  image?: string;
  isTrending?: boolean;
  onOpenModal: (projectId: number) => void;
}

const CardPortfolio = ({
  id,
  name,
  description,
  image = "/docs/images/blog/image-1.jpg",
  isTrending = false,
  onOpenModal,
}: CardPortfolioProps) => {
  const t = useTranslations("PortfolioPage");

  return (
    <div
      onClick={() => onOpenModal(id)}
      className="bg-neutral-primary-soft block max-w-sm border border-default rounded-base shadow-xs cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <a href="#" onClick={(e) => e.preventDefault()} className="block">
        <img
          className="rounded-t-base"
          src={image}
          alt={name}
        />
      </a>
      <div className="p-6 text-center">
        {isTrending && (
          <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
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
        <a href="#" onClick={(e) => e.preventDefault()} className="block">
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
            {name}
          </h5>
        </a>
        <p className="mb-6 text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(id);
          }}
          className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none transition-colors"
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
