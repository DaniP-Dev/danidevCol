"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { contactCta } from "@/src/libs/constants";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>;
  }
}

type ContactCTAProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  location: string;
  locale: string;
};

function pushContactCtaEvent(location: string, locale: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: contactCta.eventName,
    location,
    locale,
    channel: contactCta.channel,
  });
}

export default function ContactCTA({
  location,
  locale,
  onClick,
  ...anchorProps
}: ContactCTAProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    pushContactCtaEvent(location, locale);
    onClick?.(event);
  };

  return (
    <a
      href={contactCta.href}
      target={contactCta.target}
      rel={contactCta.rel}
      onClick={handleClick}
      {...anchorProps}
    />
  );
}
