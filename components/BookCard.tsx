"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// Soft spring for the pointer tilt, and one easing curve for everything that opens and closes.
const tilt = { stiffness: 90, damping: 20, mass: 0.8 };
const ease = { duration: 0.8, ease: [0.22, 1, 0.36, 1] } as const;

type BookCardProps = {
  cover: string;
  alt: string;
  index: number;
  children: React.ReactNode;
};

/** A book on a shelf: it leans toward the pointer and opens its cover a little on hover (tap on touch). */
export default function BookCard({ cover, alt, index, children }: BookCardProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Pointer position inside the card, from -0.5 to 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useTransform(useSpring(px, tilt), [-0.5, 0.5], [-24, -8]);
  const rotateX = useTransform(useSpring(py, tilt), [-0.5, 0.5], [6, -4]);

  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
    setOpen(false);
  }

  return (
    <div
      className="bk-card flex h-full flex-col"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerMove={track}
      onPointerLeave={(event) => event.pointerType === "mouse" && reset()}
      onPointerUp={(event) => event.pointerType !== "mouse" && setOpen((value) => !value)}
    >
      <div className="bk-stage relative aspect-[4/5]">
        <motion.span
          className="bk-shadow"
          aria-hidden="true"
          animate={{ scaleX: open ? 1.15 : 1, opacity: open ? 0.6 : 0.85 }}
          transition={ease}
        />

        <div className="bk-float" style={{ animationDelay: `${index * -1.3}s` }}>
          <motion.div
            className="bk-volume"
            style={{ rotateX, rotateY }}
            animate={{ y: open ? -8 : 0 }}
            transition={ease}
          >
            <span className="bk-back" aria-hidden="true" />
            <span className="bk-spine" aria-hidden="true" />
            <span className="bk-edge" aria-hidden="true" />
            <span className="bk-page" aria-hidden="true" />
            <motion.div
              className="bk-cover"
              style={{ z: 1 }}
              animate={{ rotateY: open && !reduce ? -32 : 0 }}
              transition={ease}
            >
              <div className="bk-cover-front">
                <Image src={cover} alt={alt} fill sizes="(max-width: 768px) 30vw, (max-width: 1280px) 20vw, 12vw" className="object-fill" />
              </div>
              <span className="bk-cover-inside" aria-hidden="true" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      {children}
    </div>
  );
}
