import { GraduationCap, Briefcase, type LucideIcon } from "lucide-react";

export const sectionLabel = "05. EXPERIENCE & EDUCATION";

export const heading = {
  prefix: "My ",
  highlight: "Journey",
};

export type TimelineItemType = "education" | "project";

export interface TimelineItem {
  type: TimelineItemType;
  title: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  icon: LucideIcon;
}

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "Bachelor of Science in Software Engineering",
    organization: "COMSATS University Islamabad, Lahore Campus",
    location: "Lahore, Punjab, Pakistan",
    date: "Graduated June 2026",
    description:
      "Pursuing a comprehensive education in software engineering with focus on modern development practices, algorithms, and emerging technologies like blockchain and Web3.",
    icon: GraduationCap,
  },
  {
    type: "project",
    title: "Libera - Decentralized Social Network",
    organization: "Team Project",
    location: "Remote",
    date: "2025-2026",
    description:
      "Led development of blockchain-powered social platform using Hardhat, Solidity, and Next.js. Implemented privacy-preserving features and gasless transactions.",
    icon: Briefcase,
  },
  {
    type: "project",
    title: "Full-Stack Development Projects",
    organization: "Independent & Academic",
    location: "Lahore, Pakistan",
    date: "2023 - Present",
    description:
      "Built multiple full-stack applications including food delivery platform, recipe mobile app, and various web applications using React, Node.js, and Flutter.",
    icon: Briefcase,
  },
];