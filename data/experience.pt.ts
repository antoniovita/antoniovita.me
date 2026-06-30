import type { Experience, Education, Certification } from "./experience";

export const experiences: Experience[] = [
  {
    position: "Estagiário de Engenharia de Software",
    company: "Parfin",
    location: "Remoto",
    period: "Março 2026 – Presente",
    type: "Estágio • Meio período",
    description:
      "Trabalhando em soluções blockchain, contribuindo para o desenvolvimento e manutenção de aplicações descentralizadas (dApps) e smart contracts para redes compatíveis com EVM.",
    achievements: [
      "Desenvolvendo e mantendo smart contracts compatíveis com EVM em produção",
      "Contribuindo com o stack de produtos Web3 com foco em segurança e confiabilidade",
      "Colaborando na arquitetura de dApps e integração on-chain com a equipe de engenharia",
    ],
    technologies: ["Solidity", "Hardhat", "React", "TypeScript"],
  },
  {
    position: "Estagiário de Automação",
    company: "BTG Pactual",
    location: "Remoto",
    period: "Agosto 2025 – Novembro 2025",
    type: "Estágio • Meio período",
    description:
      "Automação de processos internos com Python, AWS, React e integrações de API. Trabalhando na melhoria de eficiência e confiabilidade dos sistemas bancários.",
    achievements: [
      "Automatizou fluxos bancários críticos reduzindo esforço manual em 60%",
      "Desenvolveu dashboards internos com React para monitoramento de processos",
      "Implementou funções AWS Lambda para automação serverless",
    ],
    technologies: ["Python", "AWS", "React", "Integração de API", "Lambda", "CronJob", "UiPath"],
  },
  {
    position: "Desenvolvedor Full-Stack",
    company: "Freelancer / Projetos Pessoais",
    location: "Remoto",
    period: "2023 – 2024",
    type: "Freelance",
    description:
      "Desenvolvimento de aplicações full-stack com Next.js, Node.js e bancos de dados relacionais e NoSQL. Foco em arquitetura web moderna e experiência do usuário.",
    achievements: [
      "Criou mais de 10 aplicações web prontas para produção",
      "Implementou sistemas de autenticação com JWT e OAuth",
      "Criou APIs RESTful com Node.js e Express",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
  },
];

export const education: Education[] = [
  {
    name: "PUC-Rio",
    degree: "Bacharelado em Ciência da Computação",
    location: "Rio de Janeiro, Brasil",
    period: "2025 – Presente",
    inProgress: true,
    description:
      "Cursando com bolsa de mérito acadêmico. Foco em desenvolvimento full-stack, estruturas de dados, algoritmos e inteligência artificial.",
    highlights: [
      "Bolsa de Mérito Acadêmico",
      "Foco em Engenharia de Software",
      "Participação ativa e GPA 8.2",
    ],
  },
  {
    name: "Duke University",
    degree: "Especialização em Finanças Descentralizadas (DeFi)",
    location: "Remoto",
    period: "Jan 2026 – Fev 2026",
    inProgress: false,
    description:
      "Especialização ministrada por Campbell Harvey sobre como os sistemas financeiros baseados em blockchain estão reformulando as finanças tradicionais.",
    highlights: [
      "Primitivos DeFi: DEXs, AMMs, protocolos de empréstimo e stablecoins",
      "Riscos de smart contracts, oráculos, governança e custódia",
      "Layer 1 vs Layer 2: rollups, sharding e sidechains",
      "Tokenomics, incentivos e design de protocolo",
      "Marcos regulatórios, legislação de valores mobiliários e compliance",
      "Trade-offs de segurança entre CeFi e DeFi",
      "Implicações ambientais e de sustentabilidade dos sistemas blockchain",
      "Habilidades: DeFi, Blockchain, Smart Contracts, Crypto Economics, Análise de Risco, Regulação Financeira, Ethereum, Ativos Digitais",
    ],
  },
  {
    name: "Duke University",
    degree: "Especialização em Gestão Financeira",
    location: "Remoto",
    period: "Fev 2026 – Março 2026",
    inProgress: false,
    description:
      "Especialização com foco em gestão financeira e fundamentos de finanças corporativas. O programa abordou conceitos essenciais para avaliar desempenho empresarial, analisar demonstrações financeiras e apoiar decisões estratégicas.",
    highlights: [
      "Análise e interpretação de demonstrações financeiras",
      "Valor do dinheiro no tempo e fluxo de caixa descontado",
      "Avaliação de investimentos com VPL e TIR",
      "Retorno sobre capital investido (ROIC) e métricas de desempenho",
      "Estrutura do balanço patrimonial e análise de índices financeiros",
      "Compreensão de EBITDA, EBIT e métricas de rentabilidade",
      "Uso de dados financeiros para decisões de negócios e investimentos",
      "Habilidades: Análise de Demonstrações Financeiras, VPL, TIR, Valor do Dinheiro no Tempo, EBITDA, EBIT, ROIC, Análise de Balanço, Tomada de Decisão Financeira",
    ],
  },
  {
    name: "Instituto Gaylussac",
    degree: "Ensino Médio e Fundamental",
    location: "Niterói, Brasil",
    period: "2015 – 2024",
    inProgress: false,
    description:
      "Concluiu o ensino médio com foco em ciências exatas. Participou de projetos de programação e olimpíadas de matemática.",
    highlights: [
      "Medalha de bronze na Olimpíada de Matemática Canguru",
      "Ouro na OBLI (Olimpíada Brasileira de Informática)",
      "Bronze na OBA (Olimpíada Brasileira de Astronomia)",
    ],
  },
  {
    name: "Cultura Inglesa",
    degree: "Curso de Inglês",
    location: "Niterói, Brasil",
    period: "2021 – 2023",
    inProgress: false,
    description:
      "Curso de inglês com foco em comunicação oral e escrita, fluência no cotidiano e preparação para certificações internacionais.",
    highlights: [
      "Proficiência avançada alcançada",
      "Foco em comunicação empresarial",
      "Preparação para certificação Cambridge",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Curso de LLM",
    issuer: "Hugging Face",
    date: "2025",
    description: "Curso avançado sobre Large Language Models e suas aplicações",
  },
  {
    name: "Modelagem de Dados",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Design de banco de dados e boas práticas de modelagem",
  },
  {
    name: "Programação Python",
    issuer: "Fundação Bradesco",
    date: "2024",
    description: "Fundamentos abrangentes de programação Python",
  },
  {
    name: "C1 Cambridge Advanced",
    issuer: "Cambridge Assessment English",
    date: "2023",
    description: "Certificação de proficiência avançada em inglês",
  },
  {
    name: "B2 DELE Espanhol",
    issuer: "Instituto Cervantes",
    date: "2023",
    description: "Certificação de espanhol nível intermediário-superior",
  },
];
