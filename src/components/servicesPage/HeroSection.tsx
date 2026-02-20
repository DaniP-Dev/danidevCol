import "./servicePage.css";

export default function HeroSection() {
  return (
    <section className="background">
      <div className="hero-text flex flex-col items-center justify-center h-full gap-2">
        <h1 className="text-4xl font-bold text-white mb-2 flowbite-heading">Texto Encima del Fondo Animado</h1>
        <p className="text-lg text-white/80 flowbite-paragraph">Puedes poner aquí cualquier contenido.</p>
      </div>
      <span className="ball"></span>
      <span className="ball"></span>
      <span className="ball"></span>
      <span className="ball"></span>
      <span className="ball"></span>
      <span className="ball"></span>
    </section>
  );
}
