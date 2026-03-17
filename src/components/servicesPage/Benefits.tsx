export default function Benefits() {
    return (
        <section className="py-10 px-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">¿Por qué elegirnos?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <li className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <span className="text-4xl mb-2">🚀</span>
                    <h3 className="text-xl font-semibold mb-2">Soluciones a medida</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-center">Desarrollamos proyectos personalizados según tus necesidades y objetivos.</p>
                </li>
                <li className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <span className="text-4xl mb-2">💡</span>
                    <h3 className="text-xl font-semibold mb-2">Innovación y tecnología</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-center">Utilizamos las últimas tecnologías para garantizar resultados modernos y eficientes.</p>
                </li>
                <li className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
                    <span className="text-4xl mb-2">🤝</span>
                    <h3 className="text-xl font-semibold mb-2">Acompañamiento profesional</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-center">Te asesoramos en cada etapa del proyecto para asegurar tu éxito.</p>
                </li>
            </ul>
        </section>
    );
}