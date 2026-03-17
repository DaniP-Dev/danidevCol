// Simulación de proyectos (reemplaza por tu archivo luego)
const projects = [
  { id: 1, name: "Proyecto 1", description: "Descripción breve del proyecto 1" },
  { id: 2, name: "Proyecto 2", description: "Descripción breve del proyecto 2" },
  { id: 3, name: "Proyecto 3", description: "Descripción breve del proyecto 3" },
];

export default function page() {
  return (
    <section className="py-10 px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">Portafolio de Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-300">{project.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
