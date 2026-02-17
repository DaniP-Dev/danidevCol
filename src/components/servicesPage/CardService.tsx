import { Card } from "flowbite-react";
import { Link } from "@/src/i18n/navigation";

export interface CardServiceProps {
  slug: string;
  title: string;
  description: string;
}

export default function CardService({
  slug,
  title,
  description,
}: CardServiceProps) {
  return (
    <Link href={`/services/${slug}`} className="block">
      <Card className="max-w-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <h5 className="text-xl font-semibold tracking-tight text-inherit">
          {title}
        </h5>
        <p className="text-inherit">
          {description}
        </p>
      </Card>
    </Link>
  );
}
