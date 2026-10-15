"use client";

import { useEffect } from "react";

/** Client redirect for old URLs (a static export has no server redirects). */
export default function Redirect({ to, message, linkLabel }: { to: string; message: string; linkLabel: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="card pad grid min-h-[60vh] place-content-center gap-3 text-center">
      <p className="text-dim">{message}</p>
      <a href={to} className="font-display text-2xl tracking-[-0.02em] underline decoration-fg underline-offset-4">
        {linkLabel}
      </a>
    </div>
  );
}
