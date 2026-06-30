import type { Service } from "./services";

export const services: Service[] = [
  {
    title: "Desenvolvimento de App Mobile",
    category: "Full-Stack",
    description:
      "Desenvolvimento completo de app mobile com foco em performance, usabilidade e arquitetura escalável.",
    estimatedPrice: "R$ 3.000",
    deliveryTime: "1 mês",
    rating: 5,
    technologies: [
      "Expo (React Native)",
      "NativeWind",
      "SQLite",
      "React Navigation",
      "Ecossistema Mobile",
    ],
    featured: true,
  },
  {
    title: "Desenvolvimento de App Web Full-Stack",
    category: "Full-Stack",
    description:
      "Desenvolvimento completo de app web com frontend, backend e integração de banco de dados.",
    estimatedPrice: "R$ 3.000",
    deliveryTime: "3 semanas",
    rating: 4,
    technologies: [
      "Spring Boot",
      "React",
      "NestJS",
      "Next.js",
      "APIs REST",
    ],
    featured: true,
  },
  {
    title: "Desenvolvimento de dApp",
    category: "Web3",
    description:
      "Desenvolvimento de aplicações descentralizadas com integração de carteira e interações com smart contracts.",
    estimatedPrice: "R$ 4.000",
    deliveryTime: "1 mês",
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
    title: "Desenvolvimento de Landing Page",
    category: "Frontend",
    description:
      "Desenvolvimento de landing page de alta conversão com design limpo e comportamento responsivo.",
    estimatedPrice: "R$ 500",
    deliveryTime: "5-7 dias",
    rating: 4,
    technologies: [
      "Next.js",
      "React",
      "UI Responsiva",
      "SEO Básico",
    ],
  },
  {
    title: "Desenvolvimento de Smart Contract",
    category: "Web3",
    description:
      "Desenvolvimento seguro de smart contracts com regras de negócio claras e suporte a testes.",
    estimatedPrice: "Consultar",
    deliveryTime: "Prazo a combinar",
    rating: 5,
    technologies: [
      "Solidity",
      "Hardhat",
      "Foundry",
      "Testes de Smart Contract",
    ],
  },
];
