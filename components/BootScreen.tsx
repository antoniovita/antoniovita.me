"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/** Pacing of a real load: quick start, a slow middle, a quick finish. */
const PACE: [number, number][] = [[0, 0], [0.16, 0.34], [0.5, 0.6], [0.8, 0.88], [1, 1]];
const DURATION = 2400;
/** Past this the page is treated as ready, so a stalled request never traps the visitor. */
const GIVE_UP = 6000;
const HOLD = 450;
const FADE = 500;

function pace(t: number) {
  for (let i = 1; i < PACE.length; i++) {
    if (t <= PACE[i][0]) {
      const [t0, p0] = PACE[i - 1];
      const [t1, p1] = PACE[i];
      const k = (t - t0) / (t1 - t0);
      return p0 + (p1 - p0) * (k * k * (3 - 2 * k));
    }
  }
  return 1;
}

/** `at` is the progress where the line starts typing, `len` its length in characters. */
const lines: { text: string; at: number; len: number; tone?: "dim" | "ok"; prompt?: boolean }[] = [
  { text: "~/antoniovita.me", at: 0, len: 16, tone: "dim" },
  { text: "git init", at: 0.04, len: 10, prompt: true },
  { text: 'git commit -m "first commit"', at: 0.2, len: 30, prompt: true },
  { text: "[main 8f2a1c0] Hello, World", at: 0.4, len: 27, tone: "dim" },
  { text: "npm run build", at: 0.5, len: 15, prompt: true },
];

/** Terminal loader, shown once per browser session. The English copy is intentional: it is not translated. */
export default function BootScreen() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const html = document.documentElement;
    if (!el) return;
    // The head script already marked returning visitors (and reduced-motion ones) as booted; CSS hides the overlay.
    if (html.dataset.booted !== undefined) return;

    const pct = el.querySelector("[data-boot-pct]");
    let ready = false;
    let raf = 0;
    const timers: number[] = [];
    const start = performance.now();

    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    Promise.all([loaded, document.fonts?.ready]).then(() => {
      ready = true;
    });

    function paint(p: number) {
      el!.style.setProperty("--p", p.toFixed(4));
      if (pct) pct.textContent = String(Math.round(p * 100));
    }

    function finish() {
      paint(1);
      timers.push(
        window.setTimeout(() => {
          el!.dataset.leaving = "";
          timers.push(
            window.setTimeout(() => {
              html.dataset.booted = "";
              try {
                sessionStorage.setItem("boot", "1");
              } catch {
                // Blocked storage: the loader just shows again on the next full page load.
              }
              setDone(true);
            }, FADE),
          );
        }, HOLD),
      );
    }

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / DURATION);
      if (t >= 1 && (ready || elapsed > GIVE_UP)) {
        finish();
        return;
      }
      // Hold just short of the end until the page has really finished loading.
      paint(t >= 1 ? 0.96 : Math.min(pace(t), 0.96));
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="boot" role="status" aria-label="Loading antoniovita.me">
      <div className="boot-term" aria-hidden="true">
        {lines.map((line) => (
          <p
            key={line.text}
            className={`boot-t ${line.tone === "dim" ? "boot-dim" : ""}`}
            style={{ "--at": line.at, "--len": line.len } as CSSProperties}
          >
            {line.prompt && <i>$ </i>}
            {line.text}
          </p>
        ))}
        <div className="boot-bar">
          <span>
            <i />
          </span>
          <b>
            <span data-boot-pct>0</span>%
          </b>
        </div>
        <p className="boot-t boot-ok" style={{ "--at": 0.82, "--len": 34 } as CSSProperties}>
          ✓ ready for the first customer
        </p>
        <p>
          <i>$ </i>
          <span className="boot-cursor" />
        </p>
      </div>
    </div>
  );
}
