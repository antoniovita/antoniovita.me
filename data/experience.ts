export type Experience = {
  position: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export type Education = {
  name: string;
  degree: string;
  location: string;
  period: string;
  inProgress: boolean;
  description: string;
  highlights: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    position: "Software Engineer Intern",
    company: "Parfin",
    location: "Remote",
    period: "March 2026 – Present",
    type: "Internship • Part-time",
    description:
      "Working on blockchain solutions, contributing to the development and maintenance of decentralized applications (dApps) and smart contracts for EVM-compatible chains.",
    achievements: [
      "Developing and maintaining EVM-compatible smart contracts in production",
      "Contributing to the Web3 product stack with a focus on security and reliability",
      "Collaborating on dApp architecture and on-chain integration with the engineering team",
    ],
    technologies: ["Solidity", "Hardhat", "React", "TypeScript"],
  },
  {
    position: "Automation Intern",
    company: "BTG Pactual",
    location: "Remote",
    period: "August 2025 – November 2025",
    type: "Internship • Part-time",
    description:
      "Automation of internal processes using Python, AWS, React and API integrations. Working on improving efficiency and reliability across banking systems.",
    achievements: [
      "Automated critical banking workflows reducing manual effort by 60%",
      "Developed internal dashboards using React for process monitoring",
      "Implemented AWS Lambda functions for serverless automation",
    ],
    technologies: ["Python", "AWS", "React", "API Integration", "Lambda", "CronJob", "UiPath"],
  },
  {
    position: "Full-Stack Developer",
    company: "Freelancer / Personal Projects",
    location: "Remote",
    period: "2023 – 2024",
    type: "Freelance",
    description:
      "Development of full-stack applications with Next.js, Node.js and relational and NoSQL databases. Focus on modern web architecture and user experience.",
    achievements: [
      "Built 10+ production-ready web applications",
      "Implemented authentication systems with JWT and OAuth",
      "Created RESTful APIs with Node.js and Express",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
  },
];

export const education: Education[] = [
  {
    name: "PUC-Rio",
    degree: "Bachelor's in Computer Science",
    location: "Rio de Janeiro, Brazil",
    period: "2025 – Present",
    inProgress: true,
    description:
      "Pursuing degree with academic merit scholarship. Focus on full-stack development, data structures, algorithms and artificial intelligence.",
    highlights: [
      "Academic Merit Scholarship",
      "Focus on Software Engineering",
      "Active participation and 8.2 GPA",
    ],
  },
  {
    name: "Duke University",
    degree: "Specialization in Decentralized Finance (DeFi)",
    location: "Remote",
    period: "Jan 2026 – Feb 2026",
    inProgress: false,
    description:
      "Completed a specialization led by Campbell Harvey on how blockchain-based financial systems are reshaping traditional finance.",
    highlights: [
      "Core DeFi primitives: DEXs, AMMs, lending protocols, and stablecoins",
      "Smart contract, oracle, governance, and custody risks",
      "Layer 1 vs Layer 2 scaling: rollups, sharding, and sidechains",
      "Token economics, incentives, and protocol design",
      "Regulatory frameworks, securities law, and compliance",
      "Security trade-offs between CeFi and DeFi",
      "Environmental and sustainability implications of blockchain systems",
      "Skills: DeFi, Blockchain, Smart Contracts, Crypto Economics, Risk Analysis, Financial Regulation, Ethereum, Digital Assets",
    ],
  },
  {
    name: "Duke University",
    degree: "Specialization in Financial Management",
    location: "Remote",
    period: "Feb 2026 – March 2026",
    inProgress: false,
    description:
      "Completed a specialization focused on financial management and corporate finance fundamentals. The program covered key concepts used to evaluate business performance, analyze financial statements, and support strategic financial decision-making.",
    highlights: [
      "Financial statement analysis and interpretation",
      "Time value of money and discounted cash flow concepts",
      "Investment evaluation using NPV and IRR",
      "Return on invested capital (ROIC) and performance measurement",
      "Balance sheet structure and financial ratio analysis",
      "Understanding EBITDA, EBIT, and profitability metrics",
      "Using financial data to support business and investment decisions",
      "Skills: Financial Statement Analysis, Net Present Value (NPV), Internal Rate of Return (IRR), Time Value of Money, EBITDA, EBIT, Return on Invested Capital (ROIC), Balance Sheet Analysis, Financial Decision-Making",
    ],
  },
  {
    name: "Instituto Gaylussac",
    degree: "High School and Elementary Education",
    location: "Niterói, Brazil",
    period: "2015 – 2024",
    inProgress: false,
    description:
      "Completed high school with focus on exact sciences. Participated in programming projects and mathematics olympiads.",
    highlights: [
      "Bronze medal in Kangaroo Math Competition",
      "Gold in OBLI (Brazilian Informatics Olympiad)",
      "Bronze in OBA (Brazilian Astronomy Olympiad)",
    ],
  },
  {
    name: "Cultura Inglesa",
    degree: "English Language Course",
    location: "Niterói, Brazil",
    period: "2021 – 2023",
    inProgress: false,
    description:
      "English course focused on oral and written communication, everyday fluency and preparation for international certifications.",
    highlights: [
      "Advanced proficiency achieved",
      "Focus on business communication",
      "Preparation for Cambridge certification",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "LLM Course",
    issuer: "Hugging Face",
    date: "2025",
    description: "Advanced course on Large Language Models and their applications",
  },
  {
    name: "Data Modeling",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Database design and data modeling best practices",
  },
  {
    name: "Python Programming",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Comprehensive Python programming fundamentals",
  },
  {
    name: "C1 Cambridge Advanced",
    issuer: "Cambridge Assessment English",
    date: "2023",
    description: "Advanced English language proficiency certification",
  },
  {
    name: "B2 DELE Spanish",
    issuer: "Instituto Cervantes",
    date: "2023",
    description: "Upper-intermediate Spanish language certification",
  },
];
