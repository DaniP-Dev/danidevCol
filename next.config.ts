import type { NextConfig } from "next";
import createNextIntl from "next-intl/plugin";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source:
          "/es/services/:legacy(existing-projects|mejoras-web-sitios|melhorias-web-sites|تحسين-المواقع-الحالية)",
        destination: "/es/services/presencia-impacto/proyecto-existente",
        permanent: true,
      },
      {
        source:
          "/pt/services/:legacy(existing-projects|mejoras-web-sitios|melhorias-web-sites|تحسين-المواقع-الحالية)",
        destination: "/pt/services/presenca-impacto/projeto-existente",
        permanent: true,
      },
      {
        source:
          "/en/services/:legacy(existing-projects|mejoras-web-sitios|melhorias-web-sites|تحسين-المواقع-الحالية)",
        destination: "/en/services/presence-impact/existing-project",
        permanent: true,
      },
      {
        source:
          "/ar/services/:legacy(existing-projects|mejoras-web-sitios|melhorias-web-sites|تحسين-المواقع-الحالية)",
        destination: "/ar/services/حضور-وتأثير/مشروع-قائم",
        permanent: true,
      },
      {
        source:
          "/es/services/:legacy(new-projects|desarrollo-desde-cero|desenvolvimento-do-zero|تطوير-مواقع-من-الصفر)",
        destination: "/es/services/presencia-impacto/desde-cero",
        permanent: true,
      },
      {
        source:
          "/pt/services/:legacy(new-projects|desarrollo-desde-cero|desenvolvimento-do-zero|تطوير-مواقع-من-الصفر)",
        destination: "/pt/services/presenca-impacto/do-zero",
        permanent: true,
      },
      {
        source:
          "/en/services/:legacy(new-projects|desarrollo-desde-cero|desenvolvimento-do-zero|تطوير-مواقع-من-الصفر)",
        destination: "/en/services/presence-impact/from-scratch",
        permanent: true,
      },
      {
        source:
          "/ar/services/:legacy(new-projects|desarrollo-desde-cero|desenvolvimento-do-zero|تطوير-مواقع-من-الصفر)",
        destination: "/ar/services/حضور-وتأثير/من-الصفر",
        permanent: true,
      },
      {
        source:
          "/services/:legacy(existing-projects|mejoras-web-sitios|melhorias-web-sites|تحسين-المواقع-الحالية)",
        destination: "/services/presencia-impacto/proyecto-existente",
        permanent: true,
      },
      {
        source:
          "/services/:legacy(new-projects|desarrollo-desde-cero|desenvolvimento-do-zero|تطوير-مواقع-من-الصفر)",
        destination: "/services/presencia-impacto/desde-cero",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntl();
export default withFlowbiteReact(withNextIntl(nextConfig));