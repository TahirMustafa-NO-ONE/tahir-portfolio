import { Code2, Blocks, Smartphone, Rocket, type LucideIcon } from "lucide-react";

export interface AboutHighlight {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type TextSegmentVariant = "foreground" | "primary" | "accent";

export interface TextSegment {
  text: string;
  variant?: TextSegmentVariant;
}

export interface AboutParagraph {
  segments: TextSegment[];
}

export const sectionLabel = "01. ABOUT ME";

export const heading = {
  prefix: "Who I ",
  highlight: "Am",
};

export const aboutParagraphs: AboutParagraph[] = [
  {
    segments: [
      { text: "I'm a passionate " },
      { text: "Full-Stack Developer", variant: "foreground" },
      { text: " with a Bachelor's degree in Software Engineering from " },
      { text: "COMSATS University Islamabad", variant: "primary" },
      { text: ", Lahore Campus." },
    ],
  },
  {
    segments: [
      {
        text: "With a strong foundation in the JavaScript/TypeScript ecosystem, I specialize in building modern web applications using ",
      },
      { text: "React, Next.js, Node.js", variant: "foreground" },
      { text: ", and cross-platform mobile apps with " },
      { text: "Flutter", variant: "foreground" },
      { text: "." },
    ],
  },
  {
    segments: [
      {
        text: "What excites me most is the intersection of traditional development and emerging technologies. I'm deeply interested in ",
      },
      { text: "Web3 and blockchain", variant: "accent" },
      {
        text: ", working with Solidity, Hardhat, and decentralized application architecture.",
      },
    ],
  },
  {
    segments: [
      {
        text: "I believe in writing clean, maintainable code and creating experiences that leave a lasting impression.",
      },
    ],
  },
];

export const highlights: AboutHighlight[] = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building end-to-end solutions with modern frameworks",
  },
  {
    icon: Blocks,
    title: "Web3 & Blockchain",
    description: "Exploring decentralized technologies and smart contracts",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Apps",
    description: "Crafting beautiful mobile experiences with Flutter",
  },
  {
    icon: Rocket,
    title: "Modern Tech Stack",
    description: "Always learning and adopting cutting-edge tools",
  },
];