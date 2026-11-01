import { cn } from "@/lib/cn";

type SignatureProps = {
  className?: string;
  /** Blue holographic fill instead of the current text color. */
  holo?: boolean;
  /** Accessible name. Without it the signature is decorative. */
  label?: string;
};

/** Antonio's handwritten signature (public/signature.svg), used as a CSS mask so it can take any color. */
export function Signature({ className, holo, label }: SignatureProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("sig-mask block", holo ? "holo-fill" : "sig-ink", className)}
    />
  );
}
