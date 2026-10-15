"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

type Ui = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const UiContext = createContext<Ui | null>(null);

export function useUi() {
  const ui = useContext(UiContext);
  if (!ui) throw new Error("useUi must be used inside <MotionRoot>");
  return ui;
}

/** Smooth scrolling, shared motion settings and the search modal state. */
export default function MotionRoot({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, anchors: { offset: -100 } });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (searchOpen) lenisRef.current?.stop();
    else lenisRef.current?.start();
  }, [searchOpen]);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const value = useMemo(() => ({ searchOpen, openSearch, closeSearch }), [searchOpen, openSearch, closeSearch]);

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
      <UiContext.Provider value={value}>{children}</UiContext.Provider>
    </MotionConfig>
  );
}
