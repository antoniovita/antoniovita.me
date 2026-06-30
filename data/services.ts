export type Service = {
  title: string;
  category: "Web3" | "Full-Stack" | "Frontend" | "Consulting";
  description: string;
  estimatedPrice: string;
  deliveryTime: string;
  rating: number;
  technologies: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "Mobile App Development",
    category: "Full-Stack",
    description:
      "Complete mobile app development focused on performance, usability, and scalable architecture.",
    estimatedPrice: "$600",
    deliveryTime: "1 month",
    rating: 5,
    technologies: [
      "Expo (React Native)",
      "NativeWind",
      "SQLite",
      "React Navigation",
      "Mobile App Ecosystem",
    ],
    featured: true,
  },
  {
    title: "Full-Stack Web App Development",
    category: "Full-Stack",
    description:
      "End-to-end web app development with frontend, backend, and database integration.",
    estimatedPrice: "$600",
    deliveryTime: "3 weeks",
    rating: 4,
    technologies: [
      "Spring Boot",
      "React",
      "NestJS",
      "Next.js",
      "REST APIs",
    ],
    featured: true,
  },
  {
    title: "dApp Development",
    category: "Web3",
    description:
      "Development of decentralized applications with wallet integration and smart contract interactions.",
    estimatedPrice: "$800",
    deliveryTime: "1 month",
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
    title: "Landing Page Development",
    category: "Frontend",
    description:
      "High-converting landing page development with clean design and responsive behavior.",
    estimatedPrice: "$100",
    deliveryTime: "5-7 days",
    rating: 4,
    technologies: [
      "Next.js",
      "React",
      "Responsive UI",
      "SEO Basics",
    ],
  },
  {
    title: "Smart Contract Development",
    category: "Web3",
    description:
      "Secure smart contract development with clear business rules and testing support.",
    estimatedPrice: "Custom quote",
    deliveryTime: "Custom timeline",
    rating: 5,
    technologies: [
      "Solidity",
      "Hardhat",
      "Foundry",
      "Smart Contract Testing",
    ],
  },
];
