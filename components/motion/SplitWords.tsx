"use client";

import { motion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

type Line = { text: string; className?: string };

/** Headline whose words rise out of a mask, line by line. Screen readers get the plain text. */
export function SplitWords({ lines, className, delay = 0.1 }: { lines: Line[]; className?: string; delay?: number }) {
  let index = 0;
  return (
    <span className={className}>
      <span className="sr-only">{lines.map((l) => l.text).join(" ")}</span>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={`block ${line.className ?? ""}`}>
          {line.text.split(" ").map((word, wi) => {
            const i = index++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease, delay: delay + i * 0.06 }}
                >
                  {word}
                  {wi < line.text.split(" ").length - 1 ? " " : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
