"use client";

import { useEffect, useState } from "react";

/** Current time in Rio de Janeiro, updated while the page is open. */
export default function LocalClock({ timeZone, locale, className }: { timeZone: string; locale: string; className?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const format = new Intl.DateTimeFormat(locale, { timeZone, hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [locale, timeZone]);

  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
