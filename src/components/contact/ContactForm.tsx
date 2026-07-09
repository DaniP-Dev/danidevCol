"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { contactCta } from "@/src/libs/constants";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>;
  }
}

type ContactIntent = "project" | "hiring";

type ContactFormProps = {
  intent: ContactIntent;
  locale: string;
  location: string;
  className?: string;
  /** Solid white card in light mode (e.g. curriculum). Dark styles stay the same. */
  elevated?: boolean;
};

type FormStatus = "idle" | "loading" | "success" | "error";

function pushFormEvent(location: string, locale: string, intent: ContactIntent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: contactCta.formEventName,
    location,
    locale,
    channel: "discord_form",
    intent,
  });
}

export default function ContactForm({
  intent,
  locale,
  location,
  className = "",
  elevated = false,
}: ContactFormProps) {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const surfaceClass = elevated
    ? "border border-teal-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-white/5 dark:shadow-none"
    : "border border-teal-100/60 bg-white/80 p-6 dark:border-white/10 dark:bg-white/5";

  const successSurfaceClass = elevated
    ? "border border-teal-200 bg-white p-6 shadow-lg dark:border-teal-800 dark:bg-teal-950/40 dark:shadow-none"
    : "border border-teal-200 bg-teal-50/80 p-6 dark:border-teal-800 dark:bg-teal-950/40";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrorKey(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          intent,
          locale,
          page: location,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setErrorKey(data?.error === "webhook_missing" ? "unavailable" : "generic");
        return;
      }

      pushFormEvent(location, locale, intent);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorKey("generic");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl text-center ${successSurfaceClass} ${className}`}
        role="status"
      >
        <p className="text-lg font-semibold text-teal-800 dark:text-teal-200">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative space-y-4 rounded-2xl ${surfaceClass} ${className}`}
      noValidate
    >
      <div>
        <h3 className="text-lg font-bold text-teal-800 dark:text-teal-300">
          {t("title")}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`website-${location}`}>
          Website
          <input
            id={`website-${location}`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("name")}
          <input
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t("email")}
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {t("message")}
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={4}
          className="mt-1 w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </label>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
          {errorKey === "unavailable" ? t("unavailable") : t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-teal-600 to-emerald-600 dark:from-teal-700 dark:to-emerald-700 px-6 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-teal-500/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
