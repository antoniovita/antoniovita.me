"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { PiArrowUpRightBold } from "react-icons/pi";

export type WorkRow = { href: string; name: string; meta: string; year: string; image: string };

/** Project list with edge-to-edge dividers. On hover, a preview of the project follows the cursor. */
export default function WorkRows({ rows, big }: { rows: WorkRow[]; big?: boolean }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 300, damping: 30, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div ref={boxRef} className="relative" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ul>
        {rows.map((row, i) => (
          <li key={row.href} className="bleed rule">
            <Link
              href={row.href}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto]"
            >
              <span
                className={`font-display font-semibold tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 ${big ? "text-[clamp(28px,4vw,44px)] leading-none" : "text-[24px]"}`}
              >
                {row.name}
              </span>
              <span className="order-3 col-span-2 text-[15px] text-dim md:order-none md:col-span-1">{row.meta}</span>
              <span className="inline-flex items-center gap-2 font-mono text-[13px] text-dim">
                {row.year}
                <span className="grid h-8 w-8 place-items-center rounded-full bg-raised text-fg transition-all duration-300 group-hover:rotate-45 group-hover:bg-fg group-hover:text-surface">
                  <PiArrowUpRightBold size={14} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            key="preview"
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[170px] w-[260px] overflow-hidden rounded-2xl shadow-(--shadow-pop) md:block"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          >
            {rows.map((row, i) => (
              <motion.div key={row.href} className="absolute inset-0" animate={{ opacity: i === hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
                <Image src={row.image} alt="" fill sizes="260px" className="object-cover" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
