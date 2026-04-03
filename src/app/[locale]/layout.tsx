import type { Metadata } from "next";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/src/components/layout/Footer";
import NavBar from "@/src/components/layout/navBar/NavBar";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import PromotionCard from "@/src/components/layout/PromotionCard";
import Header from "@/src/components/layout/Header";
import Logo from "@/src/components/layout/Logo";
import { ThemeProvider } from "@/src/components/providers/ThemeProvider";
import { siteConfig, socialLinks } from "@/src/libs/constants";
import Script from "next/script";

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
  alternates: {
    canonical: "./",
    languages: {
      "es-CO": "/es",
      "en-US": "/en",
      "pt-BR": "/pt",
      "ar-SA": "/ar"
    }
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

  if (!hasLocale(routing.locales, locale)) return notFound();
  return (
    <ViewTransitions>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
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
