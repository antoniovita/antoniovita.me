import Image from "next/image";
import { Reveal } from "./motion/Reveal";

export default function ArticleCover({ cover, className = "", priority = false }: {
  cover: { src: string; alt: string };
  className?: string;
  priority?: boolean;
}) {
  return (
    <Reveal y={16} delay={0.12} viewport={{ once: true, amount: "some" }} className={`relative aspect-[3/2] overflow-hidden rounded-2xl bg-raised ${className}`}>
      <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} className="object-cover" />
    </Reveal>
  );
}
