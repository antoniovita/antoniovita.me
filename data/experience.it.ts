import type { Experience, Education, Certification } from "./experience";

export const experiences: Experience[] = [
  {
    position: "Tirocinante Ingegnere del Software",
    company: "Parfin",
    location: "Remoto",
    period: "Marzo 2026 – Presente",
    type: "Tirocinio • Part-time",
    description:
      "Lavoro su soluzioni blockchain, contribuendo allo sviluppo e alla manutenzione di applicazioni decentralizzate (dApp) e smart contract per reti compatibili con EVM.",
    achievements: [
      "Sviluppo e manutenzione di smart contract EVM-compatibili in produzione",
      "Contributo allo stack prodotto Web3 con focus su sicurezza e affidabilità",
      "Collaborazione nell'architettura di dApp e integrazione on-chain con il team di ingegneria",
    ],
    technologies: ["Solidity", "Hardhat", "React", "TypeScript"],
  },
  {
    position: "Tirocinante Automazione",
    company: "BTG Pactual",
    location: "Remoto",
    period: "Agosto 2025 – Novembre 2025",
    type: "Tirocinio • Part-time",
    description:
      "Automazione di processi interni con Python, AWS, React e integrazioni API. Miglioramento dell'efficienza e affidabilità dei sistemi bancari.",
    achievements: [
      "Automatizzato flussi bancari critici riducendo il lavoro manuale del 60%",
      "Sviluppato dashboard interni con React per il monitoraggio dei processi",
      "Implementato funzioni AWS Lambda per l'automazione serverless",
    ],
    technologies: ["Python", "AWS", "React", "Integrazione API", "Lambda", "CronJob", "UiPath"],
  },
  {
    position: "Sviluppatore Full-Stack",
    company: "Freelancer / Progetti Personali",
    location: "Remoto",
    period: "2023 – 2024",
    type: "Freelance",
    description:
      "Sviluppo di applicazioni full-stack con Next.js, Node.js e database relazionali e NoSQL. Focus su architettura web moderna ed esperienza utente.",
    achievements: [
      "Creato oltre 10 applicazioni web pronte per la produzione",
      "Implementato sistemi di autenticazione con JWT e OAuth",
      "Creato API RESTful con Node.js ed Express",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
  },
];

export const education: Education[] = [
  {
    name: "PUC-Rio",
    degree: "Laurea Triennale in Informatica",
    location: "Rio de Janeiro, Brasile",
    period: "2025 – Presente",
    inProgress: true,
    description:
      "In corso con borsa di merito accademico. Focus su sviluppo full-stack, strutture dati, algoritmi e intelligenza artificiale.",
    highlights: [
      "Borsa di Merito Accademico",
      "Focus su Ingegneria del Software",
      "Partecipazione attiva e GPA 8.2",
    ],
  },
  {
    name: "Duke University",
    degree: "Specializzazione in Finanza Decentralizzata (DeFi)",
    location: "Remoto",
    period: "Gen 2026 – Feb 2026",
    inProgress: false,
    description:
      "Specializzazione tenuta da Campbell Harvey su come i sistemi finanziari basati su blockchain stiano ridisegnando la finanza tradizionale.",
    highlights: [
      "Primitivi DeFi: DEX, AMM, protocolli di prestito e stablecoin",
      "Rischi degli smart contract, oracoli, governance e custodia",
      "Layer 1 vs Layer 2: rollup, sharding e sidechain",
      "Tokenomics, incentivi e design di protocollo",
      "Quadri normativi, legislazione sui titoli e compliance",
      "Trade-off di sicurezza tra CeFi e DeFi",
      "Implicazioni ambientali e di sostenibilità dei sistemi blockchain",
      "Competenze: DeFi, Blockchain, Smart Contract, Crypto Economics, Analisi del Rischio, Regolamentazione Finanziaria, Ethereum, Asset Digitali",
    ],
  },
  {
    name: "Duke University",
    degree: "Specializzazione in Gestione Finanziaria",
    location: "Remoto",
    period: "Feb 2026 – Marzo 2026",
    inProgress: false,
    description:
      "Specializzazione incentrata sulla gestione finanziaria e sui fondamenti della finanza aziendale. Il programma ha trattato concetti essenziali per valutare le performance aziendali, analizzare i bilanci e supportare le decisioni strategiche.",
    highlights: [
      "Analisi e interpretazione dei bilanci finanziari",
      "Valore temporale del denaro e flusso di cassa scontato",
      "Valutazione degli investimenti con VAN e TIR",
      "Ritorno sul capitale investito (ROIC) e metriche di performance",
      "Struttura dello stato patrimoniale e analisi degli indici finanziari",
      "Comprensione di EBITDA, EBIT e metriche di redditività",
      "Utilizzo di dati finanziari per decisioni aziendali e di investimento",
      "Competenze: Analisi dei Bilanci, VAN, TIR, Valore Temporale del Denaro, EBITDA, EBIT, ROIC, Analisi Patrimoniale, Decisioni Finanziarie",
    ],
  },
  {
    name: "Instituto Gaylussac",
    degree: "Scuola Media e Superiore",
    location: "Niterói, Brasile",
    period: "2015 – 2024",
    inProgress: false,
    description:
      "Completato il ciclo scolastico con focus sulle scienze esatte. Partecipazione a progetti di programmazione e olimpiadi di matematica.",
    highlights: [
      "Medaglia di bronzo all'Olimpiade di Matematica Canguru",
      "Oro all'OBLI (Olimpiade Brasiliana di Informatica)",
      "Bronzo all'OBA (Olimpiade Brasiliana di Astronomia)",
    ],
  },
  {
    name: "Cultura Inglesa",
    degree: "Corso di Inglese",
    location: "Niterói, Brasile",
    period: "2021 – 2023",
    inProgress: false,
    description:
      "Corso di inglese con focus sulla comunicazione orale e scritta, fluenza quotidiana e preparazione alle certificazioni internazionali.",
    highlights: [
      "Raggiunta la competenza avanzata",
      "Focus sulla comunicazione professionale",
      "Preparazione alla certificazione Cambridge",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Corso LLM",
    issuer: "Hugging Face",
    date: "2025",
    description: "Corso avanzato sui Large Language Model e le loro applicazioni",
  },
  {
    name: "Modellazione dei Dati",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Progettazione di database e best practice di modellazione",
  },
  {
    name: "Programmazione Python",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Fondamenti completi di programmazione Python",
  },
  {
    name: "C1 Cambridge Advanced",
    issuer: "Cambridge Assessment English",
    date: "2023",
    description: "Certificazione di competenza avanzata in inglese",
  },
  {
    name: "B2 DELE Spagnolo",
    issuer: "Instituto Cervantes",
    date: "2023",
    description: "Certificazione di spagnolo livello intermedio-superiore",
  },
];
