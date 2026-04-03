import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="flex items-center justify-center ">
      <Image
        src="/yo.png"
        alt="DaniDev"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
        priority
      />
      <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
        DaniDev
      </span>
    </a>
  );
}
