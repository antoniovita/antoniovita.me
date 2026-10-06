"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.location.replace("/en/");
  }, []);

  return (
    <main>
      <p>
        Redirecting to <a href="/en/">the English version</a>…
      </p>
    </main>
  );
}
