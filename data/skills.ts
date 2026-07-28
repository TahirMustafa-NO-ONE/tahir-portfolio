import {
  Code,
  Globe,
  Database,
  Cloud,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export const sectionLabel = "02. SKILLS";

export const heading = {
  prefix: "Technical ",
  highlight: "Expertise",
};

export const description =
  "A comprehensive toolkit spanning modern web development, " +
  "cross-platform mobile apps, and decentralized technologies.";

export type SkillColor = "primary" | "accent";

export interface SkillCategory {
  icon: LucideIcon;
  title: string;
  skills: string[];
  color: SkillColor;
}

export const skillCategories: SkillCategory[] = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: [
      "C++",
      "Java",
      "Python",
      "JavaScript (ES6+)",
      "TypeScript",
      "SQL",
      "Dart",
      "Solidity",
      "HTML5",
      "CSS3",
    ],
    color: "primary",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    skills: [
      "React.js",
      "Next.js (v15)",
      "Node.js",
      "Express.js",
      "Fastify.js",
      "Flutter",
      "Tailwind CSS",
      "Bootstrap",
      "EJS",
      "Strapi CMS",
    ],
    color: "accent",
  },
  {
    icon: Blocks,
    title: "Blockchain & Web3",
    skills: [
      "Solidity (0.8.28)",
      "Hardhat (3.0.6)",
      "Web3.js",
      "Viem",
      "MetaMask Integration",
      "Smart Contracts",
      "DApp Architecture",
      "Decentralized Identity",
    ],
    color: "primary",
  },
  {
    icon: Database,
    title: "Databases & Backend",
    skills: [
      "MongoDB",
      "SQL Server",
      "PostgreSQL",
      "Supabase",
      "RESTful APIs",
      "Mongoose ODM",
    ],
    color: "accent",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "Git & GitHub",
      "CI/CD (Basics)",
      "Microsoft Azure (Fundamentals)",
    ],
    color: "primary",
  },
];