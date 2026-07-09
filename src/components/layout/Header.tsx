"use client";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  return (
    <header className="h-20 w-full bg-chrome border-b border-chrome flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <Logo />
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mode Toggle */}
        <ThemeToggle />
        {/* Language Switcher */}
        <LanguageToggle />
      </div>
    </header>
  );
}
