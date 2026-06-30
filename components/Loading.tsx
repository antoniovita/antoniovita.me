"use client";
import { BarLoader } from "react-spinners";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type LoadingProps = {
  fullScreen?: boolean;
  active?: boolean;
  transitionMs?: number;
  width?: number;
  height?: number;
};

export default function Loading({
  fullScreen = true,
  active = true,
  transitionMs = 200,
  width = 220,
  height = 6,
}: LoadingProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const bgColor = isDark ? "rgba(0,0,0,0.92)" : "rgba(255,255,255,0.90)";
  const barColor = isDark ? "#9B9FA6" : "#111827";

  const content = (
    <div className="flex flex-col items-center gap-3">
      <Image src="/signature.png" width={180} height={100} alt="Home" className={isDark ? "invert" : ""} />
      <div aria-hidden="true">
        <BarLoader color={barColor} loading={active} width={width} height={height} />
      </div>
    </div>
  );

  if (!fullScreen) return content;

  return (
    <AnimatePresence>
      {active && (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center"
          style={{
            backgroundColor: bgColor,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            pointerEvents: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: transitionMs / 1000, ease: [0.4, 0, 0.2, 1] }}
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
