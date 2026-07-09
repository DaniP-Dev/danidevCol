import type { Metadata } from "next";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/src/components/layout/Footer";
import NavBar from "@/src/components/layout/navBar/NavBar";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import Header from "@/src/components/layout/Header";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { siteConfig, socialLinks } from "@/src/libs/constants";
import Script from "next/script";
import { cookies, headers } from "next/headers";
import LanguageSuggestionModal from "@/src/components/layout/LanguageSuggestionModal";
import {
  getSuggestedLocale,
  LOCALE_PREFERENCE_COOKIE,
  LOCALE_SUGGESTION_DISMISSED_COOKIE,
  type LocaleSuggestionMessages,
} from "@/src/i18n/localePreference";

const GTM_ID_REGEX = /^GTM-[A-Z0-9]+$/i;

const getGtmId = () => {
  const rawId = process.env.GTM_ID ?? process.env.NEXT_PUBLIC_GTM_ID;
  if (!rawId) return null;

  const sanitizedId = rawId.trim();
  return GTM_ID_REGEX.test(sanitizedId) ? sanitizedId : null;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.author} | Desarrollador Full Stack`,
    template: `%s | ${siteConfig.author}`
  },
  description: siteConfig.description,
  keywords: [
    "Desarrollador Full Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Portafolio",
    "Optimización",
    "Soluciones web",
    "Daniel Pérez Guzman",
    "danidevcol",
    "Colombia"
  ],
  authors: [{ name: siteConfig.author, url: "https://github.com/DaniP-Dev" }],
  openGraph: {
    title: `${siteConfig.author} | Desarrollador Full Stack`,
    description: siteConfig.description,
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    siteName: siteConfig.name
  },
  robots: {
    index: true,
    follow: true
  }
};

type Props = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const gtmId = getGtmId();

  if (!hasLocale(routing.locales, locale)) return notFound();

  const headerStore = await headers();
  const cookieStore = await cookies();
  const clientLocale = getSuggestedLocale({
    currentLocale: locale,
    acceptLanguageHeader: headerStore.get("accept-language"),
    preferredLocaleCookie: cookieStore.get(LOCALE_PREFERENCE_COOKIE)?.value,
    dismissedSuggestionCookie: cookieStore.get(LOCALE_SUGGESTION_DISMISSED_COOKIE)?.value,
  });

  const suggestionMessages: LocaleSuggestionMessages | null = clientLocale
    ? (await import(`../../../messages/${clientLocale}.json`)).default
        .LocaleSuggestion
    : null;

  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {gtmId ? (
            <>
              <Script id="gtm-base" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
              </Script>
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
                />
              </noscript>
            </>
          ) : null}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              {/* Structured Data JSON-LD */}
              <Script
                id="json-ld-person"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "@id": siteConfig.url,
                    "name": siteConfig.author,
                    "url": siteConfig.url,
                    "image": siteConfig.ogImage,
                    "description": "Desarrollador Full Stack especializado en Next.js, React y TypeScript. Ubicado en Colombia, atendiendo clientes a nivel global.",
                    "givenName": "Daniel",
                    "familyName": "Pérez Guzman",
                    "email": "danidevcol@gmail.com",
                    "jobTitle": "Full Stack Developer",
                    "worksFor": {
                      "@type": "Organization",
                      "name": siteConfig.name,
                      "url": siteConfig.url
                    },
                    "knowsAbout": [
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Web Development",
                      "SEO Optimization",
                      "UI/UX Design",
                      "API Development",
                      "Firebase",
                      "Tailwind CSS"
                    ],
                    "sameAs": [
                      socialLinks.github,
                      socialLinks.linkedin,
                      socialLinks.instagram,
                      socialLinks.x,
                      socialLinks.tiktok,
                      socialLinks.youtube
                    ],
                    "nationality": "Colombian",
                    "areaServed": "Worldwide"
                  })
                }}
              />
              <Script
                id="json-ld-organization"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    "name": siteConfig.name,
                    "url": siteConfig.url,
                    "image": siteConfig.ogImage,
                    "description": "Agencia de desarrollo web especializada en soluciones digitales personalizadas con Next.js, React y optimización SEO.",
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "contactType": "customer service",
                      "email": "danidevcol@gmail.com",
                      "availableLanguage": ["es", "en", "pt", "ar"]
                    },
                    "areaServed": "Worldwide",
                    "serviceType": [
                      "Web Design",
                      "Web Development",
                      "SEO Optimization",
                      "Custom Software",
                      "Digital Consulting"
                    ]
                  })
                }}
              />
              {/* Header siempre visible */}
              <Header />
              <LanguageSuggestionModal
                clientLocale={clientLocale}
                messages={suggestionMessages}
              />

              {/* Grid container para Desktop */}
              <div className="md:grid md:grid-cols-[250px_1fr] md:h-[calc(100vh-80px)]">
                {/* Sidebar Desktop - Fixed con scroll interno */}
                <aside className="hidden md:block md:overflow-y-auto md:border-r md:border-gray-200 md:dark:border-gray-700 bg-custom dark:bg-gray-800">
                  <NavBar typeDisplay="desktop" />
                </aside>

                {/* Main content con scroll */}
                <main className="md:overflow-y-auto pb-16 md:pb-0">
                  <div className="bg-white dark:bg-black min-h-screen ">
                    {children}
                  </div>
                  <Footer />
                </main>
              </div>

              {/* Bottom Nav Mobile - Fixed */}
              <div className="md:hidden">
                <NavBar typeDisplay="mobile" />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
