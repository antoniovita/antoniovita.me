"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { cn } from "@/lib/cn";
import { Signature } from "./Signature";

type Phase = "idle" | "playing" | "ended" | "unavailable";

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverTrue = () => true;

/**
 * The hero portrait being signed. The film (rendered by Remotion into public/media/genesis.*)
 * starts on the bare photo, writes the signature and stays on its last frame.
 * Without the film (reduced motion, missing file) the photo shows a static signature.
 */
export default function GenesisPortrait({ alt, replayLabel, className }: { alt: string; replayLabel: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, serverTrue);
  const [phase, setPhase] = useState<Phase>("idle");
  const film = !reduced && phase !== "unavailable";

  // Start the film when the portrait is on screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!film || !wrap || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.paused && video.currentTime === 0) {
          video.play().catch(() => setPhase("unavailable"));
        }
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [film]);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => setPhase("unavailable"));
  };

  return (
    <div ref={wrapRef} className={cn("relative overflow-hidden rounded-[22px] bg-raised", className)}>
      <Image src="/me.jpeg" alt={alt} fill priority sizes="(min-width: 1024px) 560px, 92vw" className="object-cover contrast-[1.08] grayscale" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,14,.66)_0%,rgba(11,11,14,.3)_24%,rgba(11,11,14,0)_46%)]" />

      {!film && <Signature className="sig-shadow absolute text-white bottom-[6%] left-[6%] w-[84%] -rotate-6" />}

      {film && (
        <video
          ref={videoRef}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", phase === "idle" ? "opacity-0" : "opacity-100")}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPhase("playing")}
          onEnded={() => setPhase("ended")}
          onError={() => setPhase("unavailable")}
        >
          <source src="/media/genesis.webm" type="video/webm" />
          <source src="/media/genesis.mp4" type="video/mp4" onError={() => setPhase("unavailable")} />
        </video>
      )}

      <AnimatePresence>
        {phase === "ended" && (
          <motion.button
            type="button"
            onClick={replay}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-surface/90 px-3.5 py-2 text-[13px] font-medium text-fg backdrop-blur"
          >
            <PiArrowCounterClockwiseBold size={13} />
            {replayLabel}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
