"use client";

import Link from "next/link";
import { useEffect } from "react";

// The root has no content of its own: send visitors to their language, English by default.
export default function RootRedirect() {
  useEffect(() => {
    const lang = (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase();
    const locale = lang.startsWith("pt") ? "pt" : lang.startsWith("it") ? "it" : "en";
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#09090B", color: "#A1A1AF", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
          <p>
            <Link href="/en/" style={{ color: "#F2F2F5" }}>
              antoniovita.me
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
