import Image from "next/image";
import { cn } from "@/lib/cn";
import { Signature } from "./Signature";

/** Portrait and CSS signature animation, with no generated video dependency. */
export default function Portrait({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[22px] bg-raised", className)}>
      <Image src="/me.png" alt={alt} fill priority sizes="(min-width: 1024px) 560px, 92vw" className="object-cover contrast-[1.08]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,14,.66)_0%,rgba(11,11,14,.3)_24%,rgba(11,11,14,0)_46%)]" />
      <div className="sig-writing absolute bottom-[6%] right-[6%] w-[55%] -rotate-6">
        <Signature className="sig-shadow text-white" />
      </div>
    </div>
  );
}
