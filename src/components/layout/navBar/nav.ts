// config/nav.ts
import type { Route } from "next";

type NavItem<T> = {
  href: T;
  label: string;
  icon?: string;
};

export const navItems: NavItem<Route>[] = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/curriculum", label: "Curriculum", icon: "ℹ️" },
  { href: "/portfolio", label: "Portafolio", icon: "📧" },
  { href: "/services", label: "Servicios", icon: "⚙️" },
];
