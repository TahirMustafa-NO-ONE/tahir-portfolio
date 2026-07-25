export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  logo: string;
  skills: string[];
  description: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "2025",
    expirationDate: "2028",
    credentialId: "ABC123XYZ",
    credentialUrl: "https://aws.amazon.com/certification/",
    logo: "/certifications/aws.svg",
    skills: ["Cloud Computing", "AWS", "Networking"],
    description:
      "Foundational certification covering AWS cloud concepts, core services, security, billing, and architectural best practices.",
  },
  {
    id: 2,
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    issueDate: "2025",
    credentialId: "AZF-2025-MOCK",
    credentialUrl: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
    logo: "/certifications/azure.svg",
    skills: ["Azure", "Cloud Services", "Identity"],
    description:
      "Entry-level validation of Azure cloud concepts, governance, pricing, identity, and platform services.",
  },
  {
    id: 3,
    title: "Meta Front-End Developer Certificate",
    issuer: "Meta",
    issueDate: "2024",
    credentialUrl: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    logo: "/certifications/meta.svg",
    skills: ["React", "JavaScript", "UI Engineering"],
    description:
      "Professional certificate focused on accessible interfaces, modern React patterns, responsive layouts, and production-ready frontend workflows.",
  },
];
