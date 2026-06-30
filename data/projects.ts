export type Project = {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  github: string;
  stars: number;
  forks: number;
  date: string;
  achievements: string[];
};

export const projects: Project[] = [
  {
    title: "Dargent — On-Chain Fund Platform with Strategy Allocation",
    category: "Web3",
    description:
      "DeFi framework to build on-chain funds with strategy allocation, async withdrawals, fees, and a risk engine.",
    longDescription:
      "Dargent is a suite of smart contracts for creating on-chain funds: users deposit ERC20s and receive proportional shares, the Manager allocates capital across strategies by weights, withdrawals are asynchronous through a WithdrawalQueue, fees are handled by FeeCollector, and RiskEngine computes fund risk based on approved strategies. Everything is orchestrated by ProductFactory and governed registries (assets/strategies/products).",
    image: "/projects/dargent.png",
    technologies: ["Solidity", "Foundry", "EVM", "DeFi", "ERC-20", "EIP-1167", "Clones"],
    github: "https://github.com/antoniovita/dargent",
    stars: 1,
    forks: 0,
    date: "2026",
    achievements: [
      "Factory creates Fund + Manager with weighted strategy allocation",
      "WithdrawalQueue enables asynchronous withdrawals",
      "Governance registries for assets and strategies",
      "Risk engine based on strategy composition",
    ],
  },
  {
    title: "Legis — Freelance Escrow Protocol",
    category: "Web3",
    description:
      "Smart-contract system for freelance work with escrowed payments and milestone-based releases.",
    longDescription:
      "Legis is a modular on-chain escrow protocol designed for freelance agreements. A central EscrowFactory deploys lightweight JobEscrow instances using clones, validates job parameters, wires fee modules, registers escrows globally, and assigns a default arbiter. Each JobEscrow manages funds and job state, including milestones, funding, submissions, approvals, disputes, and refunds. An EscrowRegistry indexes all escrows by client and freelancer to enable efficient discovery and pagination. Fees are handled through pluggable modules: IFeeManager for pricing and tier logic, IFeeSplitter for fee distribution between parties, and IFeeCollector for receiving and accounting collected fees.",
    image: "/projects/legis.png",
    technologies: ["Solidity", "Foundry", "EVM", "Smart Contracts", "EIP-1167", "Clones"],
    github: "https://github.com/antoniovita/legis",
    stars: 1,
    forks: 0,
    date: "2026",
    achievements: [
      "Factory deploys lightweight JobEscrow instances via clones",
      "Milestone-based escrow with approvals, disputes, and refunds",
      "Global registry indexing escrows by client and freelancer",
      "Modular fee system with pluggable pricing and distribution logic",
      "Built-in arbiter support for dispute resolution",
    ],
  },
  {
    title: "IRSA: Medical Imaging Radiology",
    category: "Full-Stack",
    description: "SPA built with Next.js and TailwindCSS for a radiology and medical imaging clinic.",
    longDescription:
      "Single-page application focused on performance and UX, built with Next.js and TailwindCSS. Structured for smooth navigation, reusable components, and a fully responsive layout.",
    image: "/projects/irsa-site.png",
    technologies: ["Typescript", "Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/antoniovita/irsa",
    stars: 1,
    forks: 0,
    date: "2025",
    achievements: [
      "Fast and responsive SPA navigation",
      "Modern UI built with TailwindCSS",
      "Reusable component architecture",
      "Clean routing and layout organization following best practices",
    ],
  },
  {
    title: "MyOrder – Digital Menu for Restaurants",
    category: "Frontend",
    description: "Interactive digital menu with a responsive interface for contactless ordering.",
    longDescription:
      "A mobile-first digital menu application enabling fast category navigation, item browsing, and a frictionless order and contact flow — designed for a seamless contactless experience.",
    image: "/projects/myorder.png",
    technologies: ["Typescript", "PostgreSQL", "NeonDB", "Vercel", "React", "Next.js", "Responsive UI"],
    github: "https://github.com/antoniovita/myorder",
    stars: 0,
    forks: 0,
    date: "2025",
    achievements: [
      "Mobile-first and fully responsive interface",
      "Category navigation with a UX-focused design",
      "Contactless order and contact flow",
      "Component structure built for rapid iteration",
    ],
  },
  {
    title: "Gymtracker - Workout Management App",
    category: "Mobile",
    description: "Mobile app to log, organize, and track gym workouts.",
    longDescription:
      "A productivity-focused workout app for logging exercises, organizing routines by day, and tracking progress over time to support consistent progressive overload.",
    image: "/projects/gymtracker.jpg",
    technologies: ["Expo", "React Native", "Typescript", "Mobile", "App Design", "Workout Tracking"],
    github: "https://github.com/antoniovita/gymtracker",
    stars: 0,
    forks: 0,
    date: "2025",
    achievements: [
      "Routine and exercise organization by day",
      "Progress history to track performance over time",
      "Simple and fast UX optimized for daily gym use",
      "Extensible structure ready for metrics like load, reps, and PRs",
    ],
  },
  {
    title: "Space Portfolio",
    category: "Frontend",
    description: "Portfolio website built entirely with Next.js and TailwindCSS.",
    longDescription:
      "A portfolio with a modern aesthetic focused on performance, SEO, and responsiveness. Structured to showcase projects, tech stack, and links in a clear and elegant layout.",
    image: "/projects/portfolio.png",
    technologies: ["Typescript", "Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/antoniovita/portfolio",
    stars: 1,
    forks: 0,
    date: "2025",
    achievements: [
      "Responsive layout with TailwindCSS",
      "Good structure for SEO and performance",
      "Well-organized project and stack sections",
      "Easy to maintain and extend",
    ],
  },
  {
    title: "Fuoco - AI-powered routine management",
    category: "AI/ML",
    description: "Expo app using llama.rn with the TinyLLM (encoding) model for AI-assisted routines.",
    longDescription:
      "A mobile application focused on AI-assisted routine management. Implements on-device inference via llama.rn with a TinyLLM encoding model to deliver intelligent experiences without sending data to external servers.",
    image: "/projects/fuoco.png",
    technologies: ["Typescript", "Expo", "React Native", "llama.rn", "Gemma3"],
    github: "https://github.com/antoniovita/fuoco",
    stars: 1,
    forks: 0,
    date: "2025",
    achievements: [
      "On-device inference via llama.rn",
      "TinyLLM encoding model integration",
      "Privacy-first: no data sent to external servers",
      "Foundation ready for habit templates and automations",
    ],
  },
  {
    title: "ERC20 From Scratch",
    category: "Web3",
    description:
      "Full ERC-20 implementation from scratch without OpenZeppelin, focused on mastering the specification.",
    longDescription:
      "A smart contract project that implements the ERC-20 standard from the ground up, deliberately avoiding external libraries to reinforce deep understanding of the spec, events, storage layout, and edge cases.",
    image: "/projects/erc20.jpeg",
    technologies: ["Solidity", "EVM", "ERC-20", "Hardhat"],
    github: "#",
    stars: 1,
    forks: 0,
    date: "2026",
    achievements: [
      "ERC-20 implemented without OpenZeppelin",
      "Focus on spec correctness, events, and storage layout",
      "Ideal base for auditing and deep study",
      "Testable and extensible structure",
    ],
  },
  {
    title: "Velt",
    category: "Web3",
    description:
      "On-chain infrastructure for tokenized vaults (ERC-4626), enabling non-custodial yield-bearing balances.",
    longDescription:
      "A modular infrastructure for building ERC-4626-based vaults, allowing apps such as wallets, dApps, payroll, and escrow systems to offer yield-bearing balances automatically — non-custodial by design and built for extensibility.",
    image: "/projects/velt.webp",
    technologies: ["Solidity", "OpenZeppelin", "Hardhat", "EVM", "ERC-4626", "DeFi"],
    github: "#",
    stars: 1,
    forks: 0,
    date: "2026",
    achievements: [
      "ERC-4626 tokenized vault standard",
      "Modular and extensible architecture",
      "Non-custodial by design",
      "Built for integration across multiple app types",
    ],
  },
  {
    title: "Close Friends Token",
    category: "Web3",
    description: "ERC-20 token with tiered staking and a staking-based access gate.",
    longDescription:
      "A set of smart contracts implementing an ERC-20 token with tiered staking levels and an access gate mechanism, useful for building token-gated communities and exclusive experiences.",
    image: "/projects/close-friends.png",
    technologies: ["Solidity", "Hardhat", "EVM", "ERC-20", "Staking"],
    github: "#",
    stars: 1,
    forks: 0,
    date: "2026",
    achievements: [
      "ERC-20 token with tiered staking",
      "Staking-based access gate mechanism",
      "Clear structure for evolving access rules",
      "Applicable pattern for token-gated products",
    ],
  },
  {
    title: "Minimal DeFi Vault (ERC4626-inspired)",
    category: "Web3",
    description:
      "Minimal DeFi vault inspired by ERC-4626: deposits mint shares and withdrawals burn shares with precise math — built from scratch.",
    longDescription:
      "A vault where users deposit an ERC-20 asset and receive proportional shares. Withdrawals burn shares and return the corresponding assets, preserving fair value through precise DeFi math and careful storage management — implemented without OpenZeppelin.",
    image: "/projects/defivault.jpg",
    technologies: ["Solidity", "Foundry", "EVM", "DeFi Math", "ERC-20"],
    github: "#",
    stars: 0,
    forks: 0,
    date: "2026",
    achievements: [
      "Proportional share accounting",
      "Precise math to preserve fair value on deposits and withdrawals",
      "Implemented without OpenZeppelin",
      "Solid foundation for evolving toward a full ERC-4626 implementation",
    ],
  },
  {
    title: "FundMe (Hardhat + Chainlink)",
    category: "Web3",
    description:
      "Crowdfunding contract with Hardhat: FundMe contract and a PriceConverter library using Chainlink Price Feeds.",
    longDescription:
      "A Hardhat project with a crowdfunding contract (FundMe) and a reusable PriceConverter library integrated with Chainlink Price Feeds, enabling USD-denominated validations and business logic on-chain.",
    image: "/projects/fundme.jpg",
    technologies: ["Solidity", "Hardhat", "Chainlink", "EVM"],
    github: "#",
    stars: 0,
    forks: 0,
    date: "2026",
    achievements: [
      "Chainlink Price Feed integration",
      "Hardhat project structure for deploy and testing",
      "Reusable PriceConverter library",
      "Clean and didactic crowdfunding contract",
    ],
  },
  {
    title: "SAU PUC-Rio 2.0",
    category: "Full-Stack",
    description: "Next.js project recreating the SAU academic system from PUC-Rio.",
    longDescription:
      "A recreation of the SAU university portal built with Next.js, focused on UX and organized screen/flow structure. Prepared for authentication, protected routes, and frontend scalability.",
    image: "/projects/imagesau.png",
    technologies: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Prisma Database"],
    github: "#",
    stars: 0,
    forks: 3,
    date: "2025",
    achievements: [
      "Recreation of core SAU system flows",
      "Organized page and component structure",
      "Foundation ready for authentication and permissions",
      "Focus on UX and visual consistency",
    ],
  },
  {
    title: "CondominiumAPI",
    category: "Backend",
    description: "REST API for a condominium management system built with Java and Spring Boot.",
    longDescription:
      "A Spring Boot backend for condominium management, with a solid foundation for modules such as residents, units, announcements, payments, and permissions. Structured for security and long-term maintainability.",
    image: "/projects/api.jpeg",
    technologies: ["Java", "Spring Boot", "REST API", "PostgreSQL"],
    github: "#",
    stars: 0,
    forks: 0,
    date: "2025",
    achievements: [
      "Structured REST API with Spring Boot",
      "Scalable foundation for condominium modules",
      "Clear layer separation (controller / service / repository)",
      "Ready for authentication and access control",
    ],
  },
];

export const projectCategories = ["All", "Full-Stack", "AI/ML", "Web3", "Frontend", "Backend", "Mobile"];
