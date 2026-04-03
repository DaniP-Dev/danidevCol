"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    image: string;
    link: string;
    isTrending: boolean;
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const t = useTranslations("PortfolioPage");

  if (!isOpen || !project) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative">
            <img
              src={project.image}
              alt={`Trabajo de danidevcol: ${project.name}`}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              aria-label={t("labels.closeModal")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title and Badge */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.name}
                </h2>
                {project.isTrending && (
                  <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-2 py-1 rounded-sm">
                    <svg
                      className="w-3 h-3 me-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {t("labels.trending")}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t("labels.technologies")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-brand-softer text-fg-brand-strong text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium font-medium rounded-base py-2.5 transition-colors"
              >
                <svg
                  className="w-4 h-4 me-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {t("labels.viewProject")}
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-base hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                {t("labels.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
