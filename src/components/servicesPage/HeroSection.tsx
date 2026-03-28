import "./servicePage.css";
import { Link } from "@/src/i18n/navigation";

export default function HeroSection() {
  return (
    <header className="hero-background bg-brand-dynamic transition-colors duration-300 py-20 lg:py-32 rounded-3xl overflow-hidden shadow-2xl relative border border-white/10 dark:border-white/5" role="banner">
      <div className="hero-text flex flex-col items-center justify-center h-full gap-6 px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-sm max-w-4xl">
          Servicios profesionales de <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">
            desarrollo web y software
          </span>
        </h1>
        <p className="text-lg md:text-xl font-medium max-w-2xl opacity-80">
          Soluciones digitales a medida para potenciar tu negocio. Experiencia en diseño, desarrollo y escalabilidad.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="#cta-section" className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1">
            Empieza tu proyecto
          </Link>
          <Link href="#beneficios" className="px-8 py-3.5 bg-white/20 hover:bg-white/30 dark:bg-gray-800/40 dark:hover:bg-gray-800/60 font-semibold rounded-full transition-all backdrop-blur-md border border-white/20 dark:border-white/10">
            Conoce más
          </Link>
        </div>
      </div>
      {/* Bolas animadas para fondo visual usando Tailwind para definir colores adaptables */}
      <span className="ball bg-teal-500/30 dark:bg-teal-500/10 text-teal-500/30 dark:text-teal-500/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-emerald-500/30 dark:bg-emerald-500/10 text-emerald-500/30 dark:text-emerald-500/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-cyan-500/30 dark:bg-cyan-500/10 text-cyan-500/30 dark:text-cyan-500/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-teal-400/30 dark:bg-teal-400/5 text-teal-400/30 dark:text-teal-400/5 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-emerald-400/30 dark:bg-emerald-400/5 text-emerald-400/30 dark:text-emerald-400/5 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-teal-600/30 dark:bg-teal-600/10 text-teal-600/30 dark:text-teal-600/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-cyan-600/30 dark:bg-cyan-600/10 text-cyan-600/30 dark:text-cyan-600/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
      <span className="ball bg-emerald-600/30 dark:bg-emerald-600/10 text-emerald-600/30 dark:text-emerald-600/10 shadow-[0_0_40px_20px_currentColor]" aria-hidden="true"></span>
    </header>
  );
}
