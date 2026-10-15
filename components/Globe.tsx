"use client";

import { useEffect, useRef, useState } from "react";
import { geoEquirectangular, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";

type GlobeProps = {
  /** Accessible description of the globe. */
  label: string;
  /** Marker coordinates. */
  marker: { lat: number; lng: number; name: string };
  className?: string;
};

type Dot = { lng: number; sinLat: number; cosLat: number; brazil: boolean };

// Where the globe rests: Brazil in front, slightly from the south.
const HOME = { lng: -50, lat: -14 };
const DOT_COUNT = 22000;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    bg: v("--bg"),
    surface: v("--surface"),
    raised: v("--raised"),
    fg: v("--fg"),
  };
}

/** Points spread evenly over the sphere, kept only where there is land. */
function buildDots(land: FeatureCollection | Feature, brazil: Feature): Dot[] {
  const W = 1440;
  const H = 720;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  const projection = geoEquirectangular().scale(W / (2 * Math.PI)).translate([W / 2, H / 2]);
  const path = geoPath(projection, ctx);
  ctx.fillStyle = "#00f";
  ctx.beginPath();
  path(land);
  ctx.fill();
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  path(brazil);
  ctx.fill();
  const pixels = ctx.getImageData(0, 0, W, H).data;

  const dots: Dot[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < DOT_COUNT; i++) {
    const y = 1 - (i / (DOT_COUNT - 1)) * 2;
    const lat = Math.asin(y);
    const lng = ((i * golden) % (2 * Math.PI)) - Math.PI;
    const px = Math.min(W - 1, Math.max(0, Math.round(((lng + Math.PI) / (2 * Math.PI)) * W)));
    const py = Math.min(H - 1, Math.max(0, Math.round(((Math.PI / 2 - lat) / Math.PI) * H)));
    const o = (py * W + px) * 4;
    const r = pixels[o];
    const b = pixels[o + 2];
    if (r < 128 && b < 128) continue;
    const isBrazil = r >= 128;
    dots.push({
      lng,
      sinLat: Math.sin(lat),
      cosLat: Math.cos(lat),
      brazil: isBrazil
    });
  }
  return dots;
}

export default function Globe({ label, marker, className }: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const tag = labelRef.current;
    if (!wrap || !canvas || !tag) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors();
    let dots: Dot[] = [];
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    let disposed = false;

    // View state, in degrees.
    let lng0 = HOME.lng;
    let lat0 = HOME.lat;
    let vLng = 0;
    let vLat = 0;
    let dragging = false;
    let lastInput = -Infinity;
    let lastX = 0;
    let lastY = 0;

    const rad = Math.PI / 180;
    const mLng = marker.lng * rad;
    const mSin = Math.sin(marker.lat * rad);
    const mCos = Math.cos(marker.lat * rad);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      size = Math.max(1, Math.floor(Math.min(rect.width, rect.height || rect.width)));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      if (reduced) draw(performance.now());
    };

    const draw = (time: number) => {
      const R = size * 0.48;
      const cx = size / 2;
      const cy = size / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // A barely shaded sphere: no outline, no glow.
      const shade = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      shade.addColorStop(0, colors.surface);
      shade.addColorStop(1, colors.raised);
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Dots: orthographic projection by hand, faster than d3 for thousands of points.
      const l0 = lng0 * rad;
      const s0 = Math.sin(lat0 * rad);
      const c0 = Math.cos(lat0 * rad);
      const landSize = Math.max(0.7, size / 520);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dl = d.lng - l0;
        const cosDl = Math.cos(dl);
        const z = s0 * d.sinLat + c0 * d.cosLat * cosDl;
        if (z <= 0) continue;
        const x = cx + R * d.cosLat * Math.sin(dl);
        const y = cy - R * (c0 * d.sinLat - s0 * d.cosLat * cosDl);
        ctx.fillStyle = colors.fg;
        if (d.brazil) {
          ctx.globalAlpha = 0.55 + 0.45 * z;
          ctx.beginPath();
          ctx.arc(x, y, landSize * 1.35, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.18 + 0.32 * z;
          ctx.fillRect(x - landSize * 0.6, y - landSize * 0.6, landSize * 1.2, landSize * 1.2);
        }
      }
      ctx.globalAlpha = 1;

      // Marker on Rio de Janeiro.
      const dl = mLng - l0;
      const cosDl = Math.cos(dl);
      const z = s0 * mSin + c0 * mCos * cosDl;
      if (z > 0) {
        const x = cx + R * mCos * Math.sin(dl);
        const y = cy - R * (c0 * mSin - s0 * mCos * cosDl);
        const phase = reduced ? 0.5 : (time / 1600) % 1;
        ctx.beginPath();
        ctx.arc(x, y, 4 + phase * 16, 0, Math.PI * 2);
        ctx.strokeStyle = colors.fg;
        ctx.globalAlpha = (1 - phase) * 0.6 * z;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = colors.surface;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = colors.fg;
        ctx.fill();
        tag.style.opacity = String(Math.min(1, z * 2.5));
        tag.style.transform = `translate(${x + 12}px, ${y - 30}px)`;
      } else {
        tag.style.opacity = "0";
      }
    };

    const tick = (time: number) => {
      raf = 0;
      if (disposed) return;
      const idle = !dragging && time - lastInput > 2600;
      if (dragging) {
        // position is set by pointer events
      } else if (idle && !reduced) {
        // Drift back home with a slow sway so Brazil stays in view.
        const target = HOME.lng + 16 * Math.sin(time / 7000);
        vLng += (target - lng0) * 0.0025;
        vLat += (HOME.lat - lat0) * 0.0025;
        vLng *= 0.9;
        vLat *= 0.9;
      } else {
        vLng *= 0.94;
        vLat *= 0.94;
      }
      if (!dragging) {
        lng0 += vLng;
        lat0 = Math.max(-70, Math.min(70, lat0 + vLat));
      }
      draw(time);
      if (visible && (!reduced || dragging || Math.abs(vLng) + Math.abs(vLat) > 0.01)) {
        raf = requestAnimationFrame(tick);
      }
    };
    const start = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      vLng = 0;
      vLat = 0;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const k = 160 / Math.max(200, size);
      const dx = (e.clientX - lastX) * k;
      const dy = (e.clientY - lastY) * k;
      lastX = e.clientX;
      lastY = e.clientY;
      lng0 -= dx;
      lat0 = Math.max(-70, Math.min(70, lat0 + dy));
      vLng = -dx;
      vLat = dy;
      lastInput = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      lastInput = performance.now();
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      start();
    };
    const onKey = (e: KeyboardEvent) => {
      const step = 6;
      if (e.key === "ArrowLeft") vLng += step * 0.3;
      else if (e.key === "ArrowRight") vLng -= step * 0.3;
      else if (e.key === "ArrowUp") vLat -= step * 0.3;
      else if (e.key === "ArrowDown") vLat += step * 0.3;
      else return;
      e.preventDefault();
      lastInput = performance.now();
      start();
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("keydown", onKey);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(wrap);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (!raf) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    Promise.all([
      fetch("/geo/land.json").then((r) => r.json() as Promise<FeatureCollection<Geometry>>),
      fetch("/geo/brazil.json").then((r) => r.json() as Promise<Feature<Geometry>>),
    ])
      .then(([land, br]) => {
        if (disposed) return;
        dots = buildDots(land, br);
        setReady(true);
        draw(performance.now());
        start();
      })
      .catch(() => {
        // Without the map data the globe still renders as a shaded sphere with the marker.
        if (!disposed) start();
      });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKey);
    };
  }, [marker.lat, marker.lng]);

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        tabIndex={0}
        className={`absolute inset-0 cursor-grab touch-none rounded-full transition-opacity duration-700 active:cursor-grabbing ${ready ? "opacity-100" : "opacity-60"}`}
      />
      <span
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-fg px-2.5 py-1 text-[12px] font-medium text-surface opacity-0"
      >
        {marker.name}
      </span>
    </div>
  );
}
