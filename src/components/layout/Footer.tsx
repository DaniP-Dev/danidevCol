import { Link } from "@/src/i18n/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom dark:bg-custom text-white py-10 mt-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        {/* Columnas del Footer */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 pb-8">
          
          <div className="flex-1 min-w-[200px]">
            <div className="mb-4">
              <span className="font-bold text-lg">DaniDevCol</span>
              <p className="text-xs text-gray-300 mt-2">
                Desarrollo web y optimización SEO.
              </p>
            </div>
            <div className="flex space-x-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 fill-current text-white hover:text-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
              </a>
              <a href="mailto:contacto@danidevcol.com" aria-label="Enviar email a DaniDevCol" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M1.5 4.5h21a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-21a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zm10.5 8.25l-9-6.75v12.5h18v-12.5l-9 6.75zm0-2.25l8.25-6.25h-16.5l8.25 6.25z" />
                </svg>
              </a>
            </div>
          </div>

          <nav aria-label="Navegación de Servicios" className="flex-1 min-w-[200px]">
            <h3 className="font-semibold mb-3 uppercase text-xs">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/services" className="hover:text-white transition-colors">Diseño Web</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Optimización SEO</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Software a Medida</Link></li>
            </ul>
          </nav>

          <nav aria-label="Navegación de la Empresa" className="flex-1 min-w-[200px]">
            <h3 className="font-semibold mb-3 uppercase text-xs">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portafolio</Link></li>
              <li><Link href="/curriculum" className="hover:text-white transition-colors">Currículum</Link></li>
              <li><a href="mailto:contacto@danidevcol.com" className="hover:text-white transition-colors break-all">contacto@danidevcol.com</a></li>
            </ul>
          </nav>

          <address className="not-italic flex-1 min-w-[200px]">
            <h3 className="font-semibold mb-3 uppercase text-xs">Ubicación</h3>
            <p className="text-sm text-gray-300 flex items-center gap-1">
              <span aria-hidden="true">📍</span> Colombia (Atención Global)
            </p>
          </address>
          
        </div>

        <div className="pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-400">
          <p>&copy; {currentYear} DaniDevCol. Todos los derechos reservados.</p>
          <p>
            Construido con enfoque en <span className="text-gray-300 font-medium whitespace-nowrap">Rendimiento y SEO</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
