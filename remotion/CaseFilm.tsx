import type React from "react";
import { createContext, useContext } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { cases, localize, type CaseStudy, type FlowEdge, type FlowNode } from "../data/cases";
import { getProject, splitTitle, type FeaturedSlug } from "../data/content";
import type { Locale } from "../data/site";
import { Grifo, Signature, colors, dotGrid } from "./brand";
import { DISPLAY_TRACKING, fonts } from "./fonts";

export type CaseFilmProps = { slug: FeaturedSlug; locale: Locale; theme?: "light" | "dark" };

export const CASE_FILM = { durationInFrames: 210, fps: 30, width: 1920, height: 1080 } as const;

/** Strictly black and white. A blocked flow is dashed grey, not red. */
type FilmPalette = {
  bg: string;
  card: string;
  ink: string;
  dim: string;
  line: string;
  /** Solid accent: core node border, chip dots, signature, travelling dot. */
  accent: string;
  blocked: string;
  grid: { rgb: string; opacity: number };
  boxFill: string;
  boxStroke: string;
  edge: string;
  arrow: string;
  blockedBorder: string;
  actorBorder: string;
  blockedNodeBorder: string;
  coreGlow: string;
  highlightBorder: string;
  highlightShadow: string;
  dotTrail: string;
  dotShadow: string;
};

const DARK: FilmPalette = {
  bg: colors.bg,
  card: colors.card,
  ink: colors.ink,
  dim: colors.dim,
  line: colors.line,
  accent: "#FFFFFF",
  blocked: "#8A8A8A",
  grid: { rgb: "163,163,163", opacity: 0.14 },
  boxFill: "rgba(255,255,255,0.025)",
  boxStroke: "rgba(163,163,163,0.5)",
  edge: "rgba(163,163,163,0.6)",
  arrow: "rgba(163,163,163,0.8)",
  blockedBorder: "rgba(138,138,138,.45)",
  actorBorder: "rgba(163,163,163,.75)",
  blockedNodeBorder: "rgba(163,163,163,.45)",
  coreGlow: "0 0 40px rgba(255,255,255,.08)",
  highlightBorder: "#FFFFFF",
  highlightShadow: "0 0 32px rgba(255,255,255,.28), inset 0 0 16px rgba(255,255,255,.08)",
  dotTrail: "#B5B5B5",
  dotShadow: "0 0 14px 4px rgba(255,255,255,.7), 0 0 40px 12px rgba(255,255,255,.18)",
};

const LIGHT: FilmPalette = {
  bg: "#FFFFFF",
  card: "#F4F4F4",
  ink: "#0A0A0A",
  dim: "#5E5E5E",
  line: "#E3E3E3",
  accent: "#0A0A0A",
  blocked: "#8A8A8A",
  grid: { rgb: "10,10,10", opacity: 0.04 },
  boxFill: "rgba(10,10,10,0.02)",
  boxStroke: "rgba(94,94,94,0.45)",
  edge: "rgba(94,94,94,0.55)",
  arrow: "rgba(94,94,94,0.8)",
  blockedBorder: "rgba(138,138,138,.5)",
  actorBorder: "rgba(94,94,94,.7)",
  blockedNodeBorder: "rgba(94,94,94,.4)",
  coreGlow: "0 8px 24px rgba(10,10,10,.08)",
  highlightBorder: "#0A0A0A",
  highlightShadow: "0 6px 22px rgba(10,10,10,.16)",
  dotTrail: "#8A8A8A",
  dotShadow: "0 2px 10px 2px rgba(10,10,10,.22), 0 0 26px 8px rgba(10,10,10,.08)",
};

const PaletteContext = createContext<FilmPalette>(DARK);
const usePalette = () => useContext(PaletteContext);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const out = Easing.bezier(0.16, 1, 0.3, 1);

const MARGIN = 96;
const CARD_W = 270;
const CARD_H = 84;
/** Space left between a card and the start/end of an edge. */
const EDGE_GAP = 10;
const ARROW = 12;

const TRAVEL_START = 116;
const TRAVEL_END = 166;
const OUTRO = 150;

const caseWord: Record<Locale, string> = { en: "Case", pt: "Case", it: "Caso" };

type Point = { x: number; y: number };

/** Where the segment from the centre of `from` towards `to` leaves the card around `from`. */
const exitPoint = (from: Point, to: Point, gap = EDGE_GAP): Point => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const hw = CARD_W / 2 + gap;
  const hh = CARD_H / 2 + gap;
  const s = Math.min(dx === 0 ? Infinity : hw / Math.abs(dx), dy === 0 ? Infinity : hh / Math.abs(dy));
  return { x: from.x + dx * s, y: from.y + dy * s };
};

const lerp = (a: Point, b: Point, t: number): Point => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const dist = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

const edgeStart = (a: FlowNode, b: FlowNode) => Math.max(a.delay, b.delay) + 6;
const EDGE_DRAW = 16;

export const CaseFilm: React.FC<CaseFilmProps> = ({ slug, locale, theme = "dark" }) => {
  const study = cases[slug];
  const pal = theme === "light" ? LIGHT : DARK;
  const byId = new Map(study.nodes.map((n) => [n.id, n]));

  return (
    <PaletteContext.Provider value={pal}>
      <AbsoluteFill style={{ backgroundColor: pal.bg, color: pal.ink, overflow: "hidden" }}>
        <AbsoluteFill style={dotGrid(40, pal.grid.opacity, pal.grid.rgb)} />
        {study.box ? <Box box={study.box} locale={locale} /> : null}
        <Edges study={study} byId={byId} locale={locale} />
        <TravelDot study={study} byId={byId} />
        {study.nodes.map((node) => (
          <NodeCard key={node.id} node={node} locale={locale} study={study} />
        ))}
        <TitleBlock slug={slug} locale={locale} />
        <Outro slug={slug} locale={locale} />
        <Signoff />
      </AbsoluteFill>
    </PaletteContext.Provider>
  );
};

const TitleBlock: React.FC<CaseFilmProps> = ({ slug, locale }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const { fps } = useVideoConfig();
  const project = getProject(locale, slug);
  const name = project ? splitTitle(project.title).name : slug;
  const study = cases[slug];

  const enter = spring({ frame, fps, delay: 4, config: { damping: 18, stiffness: 110 } });
  const dock = interpolate(frame, [44, 66], [0, 1], { ...clamp, easing: inOut });
  const at = (from: number, to: number) => interpolate(dock, [0, 1], [from, to]);

  return (
    <div style={{ position: "absolute", left: MARGIN, top: at(343, 64), right: MARGIN }}>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: at(30, 22),
          lineHeight: 1.2,
          letterSpacing: "0.04em",
          color: pal.dim,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
        }}
      >
        {`${caseWord[locale]} · ${localize(study.area, locale)} · ${project?.date ?? ""}`}
      </div>
      <div
        style={{
          marginTop: at(28, 12),
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: at(260, 96),
          lineHeight: 0.92,
          letterSpacing: DISPLAY_TRACKING,
          whiteSpace: "nowrap",
          opacity: Math.min(1, enter * 1.4),
          translate: `0px ${(1 - enter) * 90}px`,
        }}
      >
        <Grifo>{name}</Grifo>
      </div>
      <div
        style={{
          marginTop: at(30, 12),
          fontFamily: fonts.sans,
          fontSize: at(48, 32),
          lineHeight: 1.25,
          color: pal.dim,
          opacity: interpolate(frame, [14, 30], [0, 1], clamp),
          translate: `0px ${interpolate(frame, [14, 30], [20, 0], { ...clamp, easing: out })}px`,
        }}
      >
        {study.tagline[locale]}
      </div>
    </div>
  );
};

const Box: React.FC<{ box: NonNullable<CaseStudy["box"]>; locale: Locale }> = ({ box, locale }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const r = 28;
  const perimeter = 2 * (box.w + box.h) - 8 * r + 2 * Math.PI * r;
  const draw = interpolate(frame, [box.delay, box.delay + 30], [0, 1], { ...clamp, easing: inOut });
  const label = interpolate(frame, [box.delay + 10, box.delay + 24], [0, 1], clamp);

  return (
    <>
      <svg width={CASE_FILM.width} height={CASE_FILM.height} style={{ position: "absolute", inset: 0 }}>
        <rect
          x={box.x}
          y={box.y}
          width={box.w}
          height={box.h}
          rx={r}
          fill={pal.boxFill}
          fillOpacity={draw}
          stroke={pal.boxStroke}
          strokeWidth={2}
          strokeDasharray={`${perimeter} ${perimeter}`}
          strokeDashoffset={perimeter * (1 - draw)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: box.x + 36,
          top: box.y,
          translate: "0 -50%",
          padding: "2px 14px",
          backgroundColor: pal.bg,
          fontFamily: fonts.mono,
          fontSize: 22,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: pal.dim,
          opacity: label,
        }}
      >
        {box.label[locale]}
      </div>
    </>
  );
};

type DiagramProps = { study: CaseStudy; byId: Map<string, FlowNode>; locale: Locale };

const Edges: React.FC<DiagramProps> = ({ study, byId, locale }) => {
  const frame = useCurrentFrame();
  const edges = study.edges.flatMap((edge) => {
    const a = byId.get(edge.from);
    const b = byId.get(edge.to);
    return a && b ? [{ edge, a, b }] : [];
  });

  return (
    <>
      <svg width={CASE_FILM.width} height={CASE_FILM.height} style={{ position: "absolute", inset: 0 }}>
        {edges.map(({ edge, a, b }) => (
          <EdgeLine key={`${edge.from}-${edge.to}`} edge={edge} a={a} b={b} frame={frame} />
        ))}
      </svg>
      {edges.map(({ edge, a, b }) =>
        edge.label ? (
          <EdgeLabel key={`${edge.from}-${edge.to}`} edge={edge} a={a} b={b} frame={frame} locale={locale} />
        ) : null,
      )}
    </>
  );
};

type EdgeProps = { edge: FlowEdge; a: FlowNode; b: FlowNode; frame: number };

const EdgeLine: React.FC<EdgeProps> = ({ edge, a, b, frame }) => {
  const pal = usePalette();
  const start = edgeStart(a, b);
  const p0 = exitPoint(a, b);
  const p1 = exitPoint(b, a, EDGE_GAP + (edge.blocked ? 0 : 2));

  if (edge.blocked) {
    return (
      <line
        x1={p0.x}
        y1={p0.y}
        x2={p1.x}
        y2={p1.y}
        stroke={pal.blocked}
        strokeWidth={2.5}
        strokeDasharray="10 12"
        strokeLinecap="round"
        opacity={interpolate(frame, [start, start + 12], [0, 0.9], clamp)}
      />
    );
  }

  const len = dist(p0, p1);
  const draw = interpolate(frame, [start, start + EDGE_DRAW], [0, 1], { ...clamp, easing: inOut });
  const ux = (p1.x - p0.x) / len;
  const uy = (p1.y - p0.y) / len;
  // Chevron at the target end.
  const back = { x: p1.x - ux * ARROW, y: p1.y - uy * ARROW };
  const n = { x: -uy * ARROW * 0.6, y: ux * ARROW * 0.6 };

  return (
    <g>
      <line
        x1={p0.x}
        y1={p0.y}
        x2={p1.x}
        y2={p1.y}
        stroke={pal.edge}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={`${len} ${len}`}
        strokeDashoffset={len * (1 - draw)}
      />
      <path
        d={`M ${back.x + n.x} ${back.y + n.y} L ${p1.x} ${p1.y} L ${back.x - n.x} ${back.y - n.y}`}
        fill="none"
        stroke={pal.arrow}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={interpolate(draw, [0.85, 1], [0, 1], clamp)}
      />
    </g>
  );
};

const EdgeLabel: React.FC<EdgeProps & { locale: Locale }> = ({ edge, a, b, frame, locale }) => {
  const pal = usePalette();
  if (!edge.label) return null;
  const start = edgeStart(a, b);
  const mid = lerp(exitPoint(a, b), exitPoint(b, a), 0.5);
  const show = interpolate(frame, [start + 8, start + 18], [0, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: mid.x,
        top: mid.y,
        translate: "-50% -50%",
        scale: interpolate(show, [0, 1], [0.9, 1]),
        opacity: show,
        padding: "4px 14px",
        borderRadius: 999,
        backgroundColor: pal.bg,
        border: `1.5px solid ${edge.blocked ? pal.blockedBorder : pal.line}`,
        fontFamily: fonts.mono,
        fontSize: 20,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        color: edge.blocked ? pal.blocked : pal.dim,
      }}
    >
      {localize(edge.label, locale)}
    </div>
  );
};

/** Visible part of every travel hop (card edge to card edge). */
const travelHops = (study: CaseStudy, byId: Map<string, FlowNode>) => {
  const hops: { from: Point; to: Point }[] = [];
  for (let i = 0; i < study.travel.length - 1; i++) {
    const a = byId.get(study.travel[i]);
    const b = byId.get(study.travel[i + 1]);
    if (a && b) hops.push({ from: exitPoint(a, b), to: exitPoint(b, a) });
  }
  return hops;
};

const hopDuration = (study: CaseStudy) => (TRAVEL_END - TRAVEL_START) / Math.max(1, study.travel.length - 1);

const dotAt = (hops: { from: Point; to: Point }[], hop: number, t: number): Point | null => {
  if (hops.length === 0) return null;
  const elapsed = Math.min(Math.max(t - TRAVEL_START, 0), TRAVEL_END - TRAVEL_START);
  const i = Math.min(Math.floor(elapsed / hop), hops.length - 1);
  const local = Math.min(1, (elapsed - i * hop) / hop);
  return lerp(hops[i].from, hops[i].to, Easing.inOut(Easing.cubic)(local));
};

const TravelDot: React.FC<{ study: CaseStudy; byId: Map<string, FlowNode> }> = ({ study, byId }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  if (frame < TRAVEL_START - 4 || frame > TRAVEL_END + 10) return null;

  const hops = travelHops(study, byId);
  const hop = hopDuration(study);
  const visible = interpolate(frame, [TRAVEL_START - 4, TRAVEL_START, TRAVEL_END, TRAVEL_END + 8], [0, 1, 1, 0], clamp);
  const trail = [0, 1, 2, 3, 4, 5];

  return (
    <>
      {trail
        .slice()
        .reverse()
        .map((j) => {
          const p = dotAt(hops, hop, frame - j * 0.9);
          if (!p) return null;
          const size = j === 0 ? 20 : 14 - j * 1.6;
          return (
            <div
              key={j}
              style={{
                position: "absolute",
                left: p.x - size / 2,
                top: p.y - size / 2,
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: j === 0 ? pal.accent : pal.dotTrail,
                opacity: visible * (j === 0 ? 1 : 0.5 - j * 0.07),
                boxShadow: j === 0 ? pal.dotShadow : undefined,
              }}
            />
          );
        })}
    </>
  );
};

/** Mono label sized to fit inside a 270px card. */
const labelSize = (text: string) => Math.min(24, Math.floor((CARD_W - 30) / (text.length * 0.6)));

const NodeCard: React.FC<{ node: FlowNode; locale: Locale; study: CaseStudy }> = ({ node, locale, study }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, delay: node.delay, config: { damping: 14, stiffness: 160 } });
  if (frame < node.delay) return null;

  const text = localize(node.label, locale);
  const kind = node.kind;
  const radius = kind === "actor" ? CARD_H / 2 : 18;

  // Highlight when the travelling dot reaches this node.
  const k = study.travel.indexOf(node.id);
  const arrival = TRAVEL_START + k * hopDuration(study);
  const isLast = k === study.travel.length - 1;
  const glow =
    k < 0
      ? 0
      : interpolate(frame, [arrival - 3, arrival, arrival + 12, arrival + 34], [0, 1, 1, isLast ? 0.75 : 0.35], clamp);

  const base: React.CSSProperties = {
    position: "absolute",
    left: node.x - CARD_W / 2,
    top: node.y - CARD_H / 2,
    width: CARD_W,
    height: CARD_H,
    borderRadius: radius,
    boxSizing: "border-box",
  };

  const skin: React.CSSProperties =
    kind === "core"
      ? {
          border: `2px solid ${pal.accent}`,
          backgroundColor: pal.card,
          boxShadow: pal.coreGlow,
        }
      : kind === "actor"
        ? { border: `2px dashed ${pal.actorBorder}`, backgroundColor: pal.bg }
        : kind === "blocked"
          ? { border: `2px dashed ${pal.blockedNodeBorder}`, backgroundColor: pal.bg }
          : { border: `2px solid ${pal.line}`, backgroundColor: pal.card };

  return (
    <div style={{ ...base, scale: interpolate(pop, [0, 1], [0.7, 1]), opacity: Math.min(1, pop * 1.5) }}>
      <div
        style={{
          ...base,
          left: 0,
          top: 0,
          ...skin,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.mono,
          fontSize: labelSize(text),
          fontWeight: kind === "core" ? 500 : 400,
          whiteSpace: "nowrap",
          color: kind === "blocked" ? pal.dim : pal.ink,
          textDecoration: kind === "blocked" ? "line-through" : undefined,
          textDecorationColor: pal.blocked,
          textDecorationThickness: 2,
        }}
      >
        {text}
      </div>
      {glow > 0 ? (
        <div
          style={{
            ...base,
            left: 0,
            top: 0,
            border: `2px solid ${pal.highlightBorder}`,
            boxShadow: pal.highlightShadow,
            opacity: glow,
          }}
        />
      ) : null}
    </div>
  );
};

const Outro: React.FC<CaseFilmProps> = ({ slug, locale }) => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  const { fps } = useVideoConfig();
  if (frame < OUTRO - 2) return null;

  const project = getProject(locale, slug);
  const techs = project?.technologies.slice(0, 5) ?? [];
  const repo = project && project.github !== "#" ? project.github.replace(/^https?:\/\//, "") : null;
  const repoIn = interpolate(frame, [OUTRO, OUTRO + 16], [0, 1], { ...clamp, easing: out });

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: MARGIN,
          bottom: 64,
          display: "flex",
          gap: 14,
        }}
      >
        {techs.map((tech, i) => {
          const s = spring({ frame, fps, delay: OUTRO + i * 4, config: { damping: 15, stiffness: 170 } });
          return (
            <div
              key={tech}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                borderRadius: 999,
                backgroundColor: pal.card,
                border: `2px solid ${pal.line}`,
                fontFamily: fonts.mono,
                fontSize: 24,
                lineHeight: 1.25,
                color: pal.ink,
                whiteSpace: "nowrap",
                opacity: Math.min(1, s * 1.4),
                translate: `0px ${(1 - s) * 34}px`,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: pal.accent }} />
              {tech}
            </div>
          );
        })}
      </div>
      {repo ? (
        <div
          style={{
            position: "absolute",
            right: MARGIN,
            top: 66,
            fontFamily: fonts.mono,
            fontSize: 26,
            color: pal.dim,
            opacity: repoIn,
            translate: `${(1 - repoIn) * 24}px 0px`,
          }}
        >
          {repo}
        </div>
      ) : null}
    </>
  );
};

/** Small signature drawn bottom-right at the end. Always mounted so its mask is loaded early. */
const Signoff: React.FC = () => {
  const frame = useCurrentFrame();
  const pal = usePalette();
  return (
    <Signature
      width={230}
      color={pal.accent}
      reveal={interpolate(frame, [168, 192], [0, 1], { ...clamp, easing: inOut })}
      style={{ position: "absolute", right: MARGIN - 8, bottom: 58 }}
    />
  );
};
