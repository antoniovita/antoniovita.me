import type React from "react";
import { useLayoutEffect, useState } from "react";
import { Easing, interpolate, staticFile, useDelayRender } from "remotion";

/** Film palette (dark). The identity is strictly black and white; red only marks a blocked flow. */
export const colors = {
  bg: "#0B0B0E",
  card: "#15151B",
  ink: "#F2F2F5",
  dim: "#8E8E9C",
  line: "#2C2C36",
  success: "#5FD49B",
  blocked: "#FF7A85",
} as const;

/** public/signature.svg viewBox is 0 0 689 205. */
export const SIGNATURE_RATIO = 205 / 689;

// The sheen layer is 300% wide: at background-position-x 104% its bright band sits left of the
// element, at -6% right of it. Anything outside that range is fully off-screen.
const SHEEN_OFF_LEFT = 104;
const SHEEN_OFF_RIGHT = -6;

/** One left→right sheen pass during [start, start + duration]; parked off-screen outside it. */
export const sheenSweep = (frame: number, start: number, duration: number) =>
  interpolate(frame, [start, start + duration], [SHEEN_OFF_LEFT, SHEEN_OFF_RIGHT], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.25, 1),
  });

/** Solid ink under an optional moving sheen band (`sheen` = background-position-x of the band). */
export const inkFill = (color: string, sheen?: number, sheenColor = "rgba(255,255,255,.55)"): React.CSSProperties =>
  sheen === undefined
    ? { backgroundColor: color }
    : {
        backgroundColor: color,
        backgroundImage: `linear-gradient(115deg, transparent 30%, ${sheenColor} 48%, transparent 66%)`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${sheen}% 0%`,
        backgroundRepeat: "no-repeat",
      };

const maskStyle = (url: string): React.CSSProperties => ({
  WebkitMaskImage: `url("${url}")`,
  maskImage: `url("${url}")`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

let signatureLoad: Promise<void> | null = null;

const preloadSignature = (src: string): Promise<void> => {
  if (!signatureLoad) {
    signatureLoad = new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        img.decode().then(
          () => resolve(),
          () => resolve(),
        );
      };
      img.onerror = () => {
        signatureLoad = null;
        reject(new Error(`Could not load ${src}`));
      };
      img.src = src;
    });
  }
  return signatureLoad;
};

/**
 * CSS masks are not tracked by Remotion, so the signature is decoded into the memory cache
 * behind a delayRender() before any frame that uses it is captured.
 */
const useSignatureSrc = (): string => {
  const src = staticFile("signature.svg");
  const { delayRender, continueRender, cancelRender } = useDelayRender();

  useLayoutEffect(() => {
    const handle = delayRender("Loading signature.svg mask");
    preloadSignature(src).then(
      () => continueRender(handle),
      (err: unknown) => cancelRender(err),
    );
    return () => continueRender(handle);
  }, [src, delayRender, continueRender, cancelRender]);

  return src;
};

type SignatureProps = {
  width: number;
  /** Ink colour. */
  color?: string;
  /** Sheen band position (see sheenSweep); omit for flat ink. */
  sheen?: number;
  sheenColor?: string;
  /** 0..1, clip-path reveal from left to right. */
  reveal?: number;
  /** CSS filter on a wrapper (e.g. a drop-shadow that follows the strokes). */
  filter?: string;
  style?: React.CSSProperties;
};

/** The handwritten signature (public/signature.svg used as a mask) in a solid ink. */
export const Signature: React.FC<SignatureProps> = ({
  width,
  color = "#FFFFFF",
  sheen,
  sheenColor,
  reveal = 1,
  filter,
  style,
}) => {
  const src = useSignatureSrc();
  const hidden = Math.min(100, Math.max(0, (1 - reveal) * 100));

  return (
    <div style={{ width, height: width * SIGNATURE_RATIO, filter, ...style }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          ...inkFill(color, sheen, sheenColor),
          ...maskStyle(src),
          clipPath: hidden > 0 ? `inset(0 ${hidden}% 0 0)` : undefined,
        }}
      />
    </div>
  );
};

/** Faint dot grid used as the film background texture. */
export const dotGrid = (gap: number, opacity: number, rgb = "142,142,156"): React.CSSProperties => ({
  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(${rgb},${opacity}) 1.2px, transparent 1.6px)`,
  backgroundSize: `${gap}px ${gap}px`,
});

let profileLoad: Promise<number[]> | null = null;
let inkProfileCache: number[] | null = null;

/** Rasterizes the signature and returns, per column of the 689px viewBox, the vertical centre of the ink (0..1). */
const loadInkProfile = (src: string): Promise<number[]> => {
  if (!profileLoad) {
    profileLoad = preloadSignature(src).then(
      () =>
        new Promise<number[]>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const w = 689;
            const h = 205;
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("No 2d context"));
            ctx.drawImage(img, 0, 0, w, h);
            const { data } = ctx.getImageData(0, 0, w, h);
            const raw: (number | null)[] = [];
            for (let x = 0; x < w; x++) {
              let sum = 0;
              let weight = 0;
              for (let y = 0; y < h; y++) {
                const a = data[(y * w + x) * 4 + 3];
                sum += a * y;
                weight += a;
              }
              raw.push(weight > 0 ? sum / weight / h : null);
            }
            // Fill gaps between strokes by carrying the nearest known value, then smooth.
            let last = raw.find((v) => v !== null) ?? 0.5;
            const filled = raw.map((v) => (v === null ? last : (last = v)));
            const smooth = filled.map((_, i) => {
              let acc = 0;
              let n = 0;
              for (let k = Math.max(0, i - 6); k <= Math.min(w - 1, i + 6); k++) {
                acc += filled[k];
                n++;
              }
              return acc / n;
            });
            resolve(smooth);
          };
          img.onerror = () => reject(new Error(`Could not rasterize ${src}`));
          img.src = src;
        }),
    );
  }
  return profileLoad;
};

/** Vertical ink centre of the signature per x (fraction 0..1 → 0..1), for a pen tip riding the reveal. */
export const useInkProfile = (): ((x: number) => number) | null => {
  const src = staticFile("signature.svg");
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [profile, setProfile] = useState<number[] | null>(() => inkProfileCache);
  const [handle] = useState<number | null>(() => (inkProfileCache ? null : delayRender("Measuring signature ink")));

  useLayoutEffect(() => {
    if (profile) return;
    let alive = true;
    loadInkProfile(src).then(
      (p) => {
        inkProfileCache = p;
        if (alive) setProfile(p);
      },
      (err: unknown) => cancelRender(err),
    );
    return () => {
      alive = false;
    };
  }, [profile, src, cancelRender]);

  // Release the frame only once the measured profile has been committed.
  useLayoutEffect(() => {
    if (profile && handle !== null) continueRender(handle);
  }, [profile, handle, continueRender]);

  if (!profile) return null;
  return (x: number) => {
    const i = Math.min(profile.length - 1, Math.max(0, Math.round(x * (profile.length - 1))));
    return profile[i];
  };
};
