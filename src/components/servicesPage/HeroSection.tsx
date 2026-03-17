import "./servicePage.css";

export default function HeroSection() {
  return (
    <header className="background" role="banner">
      <div className="hero-text flex flex-col items-center justify-center h-full gap-2">
        <h1 className="text-4xl font-bold text-white mb-2 flowbite-heading">
          Servicios profesionales de desarrollo web y software
        </h1>
        <p className="text-lg text-white/80 flowbite-paragraph">
          Soluciones digitales a medida para potenciar tu negocio. Experiencia en diseño, desarrollo, y optimización SEO.
        </p>
      </div>
      {/* Bolas animadas para fondo visual */}
      <span className="ball" aria-hidden="true"></span>
      <span className="ball" aria-hidden="true"></span>
      <span className="ball" aria-hidden="true"></span>
      <span className="ball" aria-hidden="true"></span>
      <span className="ball" aria-hidden="true"></span>
      <span className="ball" aria-hidden="true"></span>
    </header>
  );
}
