import type { Locale } from "./site";
import type { FeaturedSlug } from "./content";

/** Text that changes with the locale. Plain strings are the same in every language. */
export type Localized = string | Record<Locale, string>;

export function localize(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

/** Node of the case film diagram. Coordinates are in the 1920×1080 composition space. */
export type FlowNode = {
  id: string;
  label: Localized;
  x: number;
  y: number;
  kind?: "actor" | "core" | "blocked";
  /** Frame at which the node springs in. */
  delay: number;
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: Localized;
  /** A connection that does not happen, drawn dashed in red. */
  blocked?: boolean;
};

export type CaseStudy = {
  slug: FeaturedSlug;
  area: Record<Locale, string>;
  tagline: Record<Locale, string>;
  /** Optional frame drawn around part of the diagram, e.g. "on the device". */
  box?: { x: number; y: number; w: number; h: number; label: Record<Locale, string>; delay: number };
  nodes: FlowNode[];
  edges: FlowEdge[];
  /** Node ids the highlight dot travels through, in order. */
  travel: string[];
};

export const cases: Record<FeaturedSlug, CaseStudy> = {
  fuoco: {
    slug: "fuoco",
    area: { pt: "IA no dispositivo", en: "On-device AI", it: "IA sul dispositivo" },
    tagline: {
      pt: "Rotinas com IA, sem dados saindo do celular",
      en: "AI routines that never leave your phone",
      it: "Routine con IA, senza dati fuori dal telefono",
    },
    box: { x: 580, y: 420, w: 1240, h: 440, delay: 48, label: { pt: "No dispositivo", en: "On the device", it: "Sul dispositivo" } },
    nodes: [
      { id: "user", label: { pt: "Usuário", en: "User", it: "Utente" }, x: 260, y: 640, kind: "actor", delay: 54 },
      { id: "app", label: "App · Expo", x: 800, y: 530, delay: 60 },
      { id: "llama", label: "llama.rn", x: 1150, y: 530, delay: 66 },
      { id: "model", label: "Gemma 3 · local", x: 1630, y: 530, kind: "core", delay: 72 },
      { id: "routines", label: { pt: "Rotinas", en: "Routines", it: "Routine" }, x: 1000, y: 760, delay: 80 },
      { id: "server", label: { pt: "Servidor externo", en: "External server", it: "Server esterno" }, x: 1630, y: 250, kind: "blocked", delay: 94 },
    ],
    edges: [
      { from: "user", to: "app", label: { pt: "pede", en: "asks", it: "chiede" } },
      { from: "app", to: "llama" },
      { from: "llama", to: "model", label: { pt: "inferência", en: "inference", it: "inferenza" } },
      { from: "model", to: "routines", label: { pt: "sugere", en: "suggests", it: "suggerisce" } },
      { from: "app", to: "routines" },
      { from: "llama", to: "server", label: "× 0 bytes", blocked: true },
    ],
    travel: ["user", "app", "llama", "model", "routines"],
  },
  dargent: {
    slug: "dargent",
    area: { pt: "Finanças on-chain", en: "On-chain finance", it: "Finanza on-chain" },
    tagline: {
      pt: "Fundos on-chain com alocação por estratégia",
      en: "On-chain funds with strategy allocation",
      it: "Fondi on-chain con allocazione per strategia",
    },
    nodes: [
      { id: "factory", label: "ProductFactory", x: 960, y: 330, delay: 52 },
      { id: "fund", label: "Fund", x: 700, y: 560, kind: "core", delay: 60 },
      { id: "manager", label: "Manager", x: 1260, y: 560, delay: 66 },
      { id: "depositor", label: { pt: "Depositante", en: "Depositor", it: "Depositante" }, x: 230, y: 560, kind: "actor", delay: 74 },
      { id: "queue", label: "WithdrawalQueue", x: 420, y: 800, delay: 82 },
      { id: "fees", label: "FeeCollector", x: 760, y: 800, delay: 86 },
      { id: "a", label: { pt: "Estratégia A", en: "Strategy A", it: "Strategia A" }, x: 1100, y: 800, delay: 92 },
      { id: "b", label: { pt: "Estratégia B", en: "Strategy B", it: "Strategia B" }, x: 1390, y: 800, delay: 96 },
      { id: "c", label: { pt: "Estratégia C", en: "Strategy C", it: "Strategia C" }, x: 1680, y: 800, delay: 100 },
      { id: "risk", label: "RiskEngine", x: 1680, y: 330, delay: 106 },
    ],
    edges: [
      { from: "factory", to: "fund", label: { pt: "cria", en: "creates", it: "crea" } },
      { from: "factory", to: "manager", label: { pt: "cria", en: "creates", it: "crea" } },
      { from: "depositor", to: "fund", label: "ERC-20" },
      { from: "fund", to: "manager", label: { pt: "aloca", en: "allocates", it: "alloca" } },
      { from: "manager", to: "a" },
      { from: "manager", to: "b" },
      { from: "manager", to: "c" },
      { from: "manager", to: "risk", label: { pt: "risco", en: "risk", it: "rischio" } },
      { from: "fund", to: "queue", label: { pt: "saque", en: "withdraw", it: "prelievo" } },
      { from: "fund", to: "fees", label: { pt: "taxas", en: "fees", it: "commissioni" } },
    ],
    travel: ["depositor", "fund", "manager", "b"],
  },
  irsa: {
    slug: "irsa",
    area: { pt: "Site para cliente", en: "Client website", it: "Sito per cliente" },
    tagline: {
      pt: "O site de uma clínica de radiologia, rápido em qualquer tela",
      en: "A radiology clinic's website, fast on any screen",
      it: "Il sito di una clinica radiologica, veloce su ogni schermo",
    },
    box: { x: 1040, y: 330, w: 820, h: 560, delay: 70, label: { pt: "Interface", en: "Interface", it: "Interfaccia" } },
    nodes: [
      { id: "patient", label: { pt: "Paciente", en: "Patient", it: "Paziente" }, x: 260, y: 610, kind: "actor", delay: 52 },
      { id: "router", label: "Next.js · SPA", x: 700, y: 610, kind: "core", delay: 60 },
      { id: "components", label: { pt: "Componentes", en: "Components", it: "Componenti" }, x: 1300, y: 460, delay: 76 },
      { id: "layout", label: { pt: "Layout responsivo", en: "Responsive layout", it: "Layout responsive" }, x: 1300, y: 760, delay: 82 },
      { id: "tailwind", label: "Tailwind CSS", x: 1640, y: 610, delay: 90 },
    ],
    edges: [
      { from: "patient", to: "router", label: { pt: "navega", en: "browses", it: "naviga" } },
      { from: "router", to: "components" },
      { from: "router", to: "layout" },
      { from: "components", to: "tailwind" },
      { from: "layout", to: "tailwind" },
    ],
    travel: ["patient", "router", "components", "tailwind"],
  },
};
