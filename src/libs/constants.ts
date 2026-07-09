export const socialLinks = {
  instagram: "https://www.instagram.com/danidevcol",
  tiktok: "https://www.tiktok.com/@danidevcol",
  linkedin: "https://www.linkedin.com/in/danidevcol",
  youtube: "https://www.youtube.com/@danidevcol",
  x: "https://x.com/danidevcol",
  github: "https://github.com/DaniP-Dev",
  whatsapp: "https://wa.me/573016328564",
};

export const contactCta = {
  href: socialLinks.whatsapp,
  target: "_blank",
  rel: "noopener noreferrer",
  eventName: "contact_cta_click",
  formEventName: "contact_form_submit",
  channel: "whatsapp",
} as const;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function buildWhatsAppHref(message?: string): string {
  if (!message?.trim()) {
    return socialLinks.whatsapp;
  }

  return `${socialLinks.whatsapp}?text=${encodeURIComponent(message.trim())}`;
}

export const siteConfig = {
  name: "DaniDevCol",
  author: "Daniel Pérez Guzman",
  description: "Desarrollo y optimización web profesional con alcance global.",
  url: "https://www.danidevcol.com",
  ogImage: "https://www.danidevcol.com/og-image.png",
  email: "danidevcol@gmail.com"
};
