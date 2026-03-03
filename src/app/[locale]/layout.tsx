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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Daniel Pérez Guzman | Desarrollador Full Stack",
    template: "%s | Daniel Pérez Guzman"
  },
  description: "Portafolio profesional de Daniel Pérez Guzman, desarrollador Full Stack especializado en Next.js, React y TypeScript. Soluciones web para optimización y crecimiento empresarial.",
  keywords: [
    "Desarrollador Full Stack",
    "Next.js",
    "React",
    "TypeScript",
    "Portafolio",
    "Optimización",
    "Soluciones web",
    "Daniel Pérez Guzman",
    "Colombia"
  ],
  authors: [{ name: "Daniel Pérez Guzman", url: "https://github.com/danidevcol" }],
  openGraph: {
    title: "Daniel Pérez Guzman | Desarrollador Full Stack",
    description: "Portafolio profesional y proyectos de desarrollo web, optimización de procesos y soluciones tecnológicas.",
    type: "website",
    locale: "es_CO",
    url: "https://danidevcol.com",
    siteName: "Daniel Pérez Guzman"
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
      <html lang={locale} className="">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider>
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
        </body>
      </html>
    </ViewTransitions>
  );
}
