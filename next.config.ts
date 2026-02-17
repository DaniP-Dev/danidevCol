import type { NextConfig } from "next";
import createNextIntl from "next-intl/plugin";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
};

const withNextIntl = createNextIntl();
export default withFlowbiteReact(withNextIntl(nextConfig));