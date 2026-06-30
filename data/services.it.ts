import type { Service } from "./services";

export const services: Service[] = [
  {
    title: "Sviluppo App Mobile",
    category: "Full-Stack",
    description:
      "Sviluppo completo di app mobile con focus su performance, usabilità e architettura scalabile.",
    estimatedPrice: "€600",
    deliveryTime: "1 mese",
    rating: 5,
    technologies: [
      "Expo (React Native)",
      "NativeWind",
      "SQLite",
      "React Navigation",
      "Ecosistema Mobile",
    ],
    featured: true,
  },
  {
    title: "Sviluppo App Web Full-Stack",
    category: "Full-Stack",
    description:
      "Sviluppo completo di app web con frontend, backend e integrazione database.",
    estimatedPrice: "€600",
    deliveryTime: "3 settimane",
    rating: 4,
    technologies: [
      "Spring Boot",
      "React",
      "NestJS",
      "Next.js",
      "REST API",
    ],
    featured: true,
  },
  {
    title: "Sviluppo dApp",
    category: "Web3",
    description:
      "Sviluppo di applicazioni decentralizzate con integrazione wallet e interazioni con smart contract.",
    estimatedPrice: "€800",
    deliveryTime: "1 mese",
    rating: 5,
    technologies: [
      "Wagmi",
      "Hardhat",
      "Solidity",
      "Foundry",
      "Next.js / React",
    ],
  },
  {
    title: "Sviluppo Landing Page",
    category: "Frontend",
    description:
      "Sviluppo di landing page ad alta conversione con design pulito e comportamento responsive.",
    estimatedPrice: "€100",
    deliveryTime: "5-7 giorni",
    rating: 4,
    technologies: [
      "Next.js",
      "React",
      "UI Responsive",
      "SEO Base",
    ],
  },
  {
    title: "Sviluppo Smart Contract",
    category: "Web3",
    description:
      "Sviluppo sicuro di smart contract con regole di business chiare e supporto ai test.",
    estimatedPrice: "Da concordare",
    deliveryTime: "Tempi da definire",
    rating: 5,
    technologies: [
      "Solidity",
      "Hardhat",
      "Foundry",
      "Test Smart Contract",
    ],
  },
];
