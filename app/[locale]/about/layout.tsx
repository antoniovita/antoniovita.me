import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Antonio Vita — a Full Stack and Web3 engineer from Rio de Janeiro. From first lines of code in Python to smart contract development at Parfin.",
  openGraph: {
    title: "About | Antonio Vita",
    description:
      "From Scratch and Python to Solidity and DeFi — the personal journey of Antonio Vita, Full Stack and Web3 engineer from Rio de Janeiro.",
    url: "https://antoniovita.me/about",
  },
  twitter: {
    title: "About | Antonio Vita",
    description:
      "From Scratch and Python to Solidity and DeFi — the personal journey of Antonio Vita, Full Stack and Web3 engineer from Rio de Janeiro.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
