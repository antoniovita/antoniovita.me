import TopBar from "./TopBar";
import { Reveal } from "./motion/Reveal";
import { SplitWords } from "./motion/SplitWords";

/** Opening card of inner pages: a short animated title and one line of context. */
export function PageHeader({ title, subtitle, note }: { title: string; subtitle?: string; note?: string }) {
  return (
    <header className="card pad grid gap-x-14 gap-y-5 md:grid-cols-[1.2fr_1fr] md:items-end">
      <TopBar className="mb-6 md:col-span-2 md:mb-8" />
      <h1 className="font-display text-[clamp(40px,5.6vw,80px)] font-semibold leading-[0.95] tracking-[-0.05em]">
        <SplitWords lines={[{ text: title }]} />
      </h1>
      {(subtitle || note) && (
        <Reveal delay={0.25} className="grid gap-2 md:pb-1.5">
          {subtitle && <p className="max-w-[46ch] text-[18px] text-dim">{subtitle}</p>}
          {note && <p className="text-[14px] text-faint">{note}</p>}
        </Reveal>
      )}
    </header>
  );
}
