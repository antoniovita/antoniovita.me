import { cn } from "@/lib/cn";
import { Signature } from "./Signature";

type SealProps = {
  /** Unique id for the circular text path. */
  id: string;
  text: string;
  className?: string;
};

/** Round holographic seal with rotating text, the site's mark of authorship. */
export function Seal({ id, text, className }: SealProps) {
  return (
    <div className={cn("seal", className)} aria-hidden="true">
      <svg className="seal-ring" viewBox="0 0 120 120">
        <defs>
          <path id={id} d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="290" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Signature className="w-[58%] text-[var(--seal-ink)]" />
    </div>
  );
}
