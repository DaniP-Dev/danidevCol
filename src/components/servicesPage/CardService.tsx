import { Card } from "flowbite-react";
import { Link } from "@/src/i18n/navigation";

export interface CardServiceProps {
  slug: string;
  title: string;
  description: string;
}

// Puedes personalizar los íconos según el tipo de servicio
const icons = ["💻", "📱", "☁️", "🔒", "🛠️", "🎨", "🚀"];

export default function CardService({ slug, title, description }: CardServiceProps) {
  // Elegir un icono aleatorio para cada card
  const icon = icons[Math.floor(Math.random() * icons.length)];
  return (
    <Link href={`/services/${slug}`} className="block">
      <Card
        className="max-w-sm min-h-60 flex flex-col justify-between bg-linear-to-br from-teal-100 via-white to-teal-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl border-0 hover:scale-105 hover:-translate-y-1 transition-transform duration-300 group"
      >
        <div className="flex flex-col items-center mb-4">
          <span className="text-4xl mb-2 group-hover:rotate-12 transition-transform">{icon}</span>
          <h5 className="text-2xl font-bold tracking-tight text-teal-700 dark:text-teal-300 text-center mb-2">
            {title}
          </h5>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-center text-base leading-relaxed">
          {description}
        </p>
      </Card>
    </Link>
  );
}
