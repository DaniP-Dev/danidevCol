export default function Benefits() {
    return (
        <section id="beneficios" className="py-10 px-4 flex flex-col items-center max-w-7xl mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-teal-800 dark:text-teal-400 tracking-tight">
              ¿Por qué elegirnos?
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <li className="bg-white/80 dark:bg-[#162133]/90 backdrop-blur-md rounded-xl shadow-md border border-white/50 dark:border-white/5 p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-2xl mb-4 shadow-sm">
                      🚀
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Soluciones a medida</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                      Desarrollamos proyectos personalizados según tus necesidades y objetivos comerciales.
                    </p>
                </li>
                <li className="bg-white/80 dark:bg-[#162133]/90 backdrop-blur-md rounded-xl shadow-md border border-white/50 dark:border-white/5 p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-2xl mb-4 shadow-sm">
                      💡
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Innovación y tecnología</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                      Utilizamos las últimas tecnologías para garantizar resultados modernos, rápidos y eficientes.
                    </p>
                </li>
                <li className="bg-white/80 dark:bg-[#162133]/90 backdrop-blur-md rounded-xl shadow-md border border-white/50 dark:border-white/5 p-6 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/40 text-2xl mb-4 shadow-sm">
                      🤝
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">Soporte profesional</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                      Te asesoramos en cada etapa del proyecto y brindamos soporte continuo para asegurar tu éxito.
                    </p>
                </li>
            </ul>
        </section>
    );
}