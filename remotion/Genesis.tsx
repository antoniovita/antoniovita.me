import type React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SIGNATURE_RATIO, Signature, sheenSweep, useInkProfile } from "./brand";

// The film takes no props: the portrait being signed is the same in every locale.
export type GenesisProps = Record<string, never>;

export const GENESIS = { durationInFrames: 150, fps: 30, width: 1080, height: 1350 } as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const W = GENESIS.width;
const H = GENESIS.height;

// White signature over the bottom of the photo: left 6%, bottom 6%, width 84%, rotated -6deg.
const SIG_W = W * 0.84;
const SIG_H = SIG_W * SIGNATURE_RATIO;

const WRITE_START = 12;
const WRITE_END = 90;
const SHEEN_START = 96;
const SHEEN_DURATION = 40;

/** Pen-like pace: quick start, steady middle, gentle lift-off. */
const writeEase = Easing.bezier(0.4, 0.05, 0.45, 1);

export const Genesis: React.FC<GenesisProps> = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [WRITE_START, WRITE_END], [0, 1], { ...clamp, easing: writeEase });

  return (
    <AbsoluteFill style={{ backgroundColor: "#050505", overflow: "hidden" }}>
      <Portrait />
      <div
        style={{
          position: "absolute",
          left: W * 0.06,
          bottom: H * 0.06,
          width: SIG_W,
          height: SIG_H,
          rotate: "-6deg",
        }}
      >
        <Signature
          width={SIG_W}
          color="#FFFFFF"
          sheen={sheenSweep(frame, SHEEN_START, SHEEN_DURATION)}
          sheenColor="rgba(170,170,170,.35)"
          reveal={reveal}
          filter="drop-shadow(0 1px 1.5px rgba(0,0,0,.55)) drop-shadow(0 6px 18px rgba(0,0,0,.5))"
        />
        <PenTip reveal={reveal} />
      </div>
    </AbsoluteFill>
  );
};

/** Small white glow riding the reveal edge, at the height of the ink under it. */
const PenTip: React.FC<{ reveal: number }> = ({ reveal }) => {
  const frame = useCurrentFrame();
  const ink = useInkProfile();
  const opacity = interpolate(frame, [WRITE_START, WRITE_START + 6, WRITE_END - 6, WRITE_END + 4], [0, 1, 1, 0], clamp);
  if (!ink || opacity <= 0) return null;

  const x = reveal * SIG_W;
  const y = ink(reveal) * SIG_H;
  const size = 16;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#FFFFFF",
        opacity,
        boxShadow: "0 0 12px 4px rgba(255,255,255,.9), 0 0 34px 12px rgba(255,255,255,.45), 0 0 70px 24px rgba(200,200,200,.25)",
      }}
    />
  );
};

const Portrait: React.FC = () => (
  <AbsoluteFill>
    <Img
      src={staticFile("me.jpeg")}
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.08)" }}
    />
    {/* shade under the signature so the white ink reads on the light pavement */}
    <AbsoluteFill
      style={{
        background: "linear-gradient(to top, rgba(5,5,5,.66) 0%, rgba(5,5,5,.3) 24%, rgba(5,5,5,0) 46%)",
      }}
    />
  </AbsoluteFill>
);
