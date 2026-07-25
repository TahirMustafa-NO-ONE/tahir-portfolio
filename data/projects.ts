import {
  Blocks,
  Utensils,
  BookOpen,
  Tv,
  Hotel,
  MessageCircle,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export const sectionLabel = "03. PROJECTS";

export const heading = {
  prefix: "Featured ",
  highlight: "Work",
};

export const description =
  "A selection of projects that showcase my skills in full-stack " +
  "development, cross-platform apps, and blockchain technology.";

export interface ProjectLinks {
  github: string;
  live: string;
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  featured: boolean;
  comingSoon: boolean;
  links: ProjectLinks;
  thumbnail: string;
}

export const fallbackThumbnail = "/projectsthumbnails/comingsoon.png";

export const projects: Project[] = [
  {
    title: "Meshlix",
    subtitle: "Decentralized XMTP Chat App (Flutter + Web3)",
    description:
      "A production-grade decentralized chat application built with Flutter and XMTP. Features Web3Auth onboarding, secure private key handling, per-wallet local data isolation, offline-first messaging, and real-time sync via a Node.js backend bridge using WebSocket and REST APIs.",
    tech: [
      "Flutter",
      "Dart",
      "XMTP",
      "Web3Auth",
      "Node.js",
      "Hive",
      "WebSocket",
      "Secure Storage",
    ],
    icon: MessageCircle,
    featured: true,
    comingSoon: true,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/meshlix_app",
      live: "#",
    },
    thumbnail: "/projectsthumbnails/meshlix.png",
  },
  {
    title: "Smith CRM",
    subtitle: "Enterprise Marketing CRM System",
    description:
      "A full-featured enterprise CRM built with Next.js and MongoDB, featuring client management, project tracking, analytics dashboards, email automation with Resend, role-based authentication via NextAuth, and production-ready deployment with Vercel.",
    tech: [
      "Next.js 14",
      "React",
      "MongoDB",
      "Mongoose",
      "NextAuth",
      "Tailwind CSS",
      "Resend",
      "pnpm",
    ],
    icon: Briefcase,
    featured: true,
    comingSoon: false,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/smiths-crm",
      live: "https://smiths-crm.vercel.app/",
    },
    thumbnail: "/projectsthumbnails/crm.png",
  },
  {
    title: "Libera",
    subtitle: "Decentralized Social Network Platform",
    description:
      "A blockchain-powered social platform with privacy-preserving relayer services, a paymaster for gasless interactions and community driven moderation system. Built as a team project showcasing Web3 best practices.",
    tech: [
      "Solidity",
      "Hardhat",
      "Next.js 15",
      "Fastify.js",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Viem/Web3",
    ],
    icon: Blocks,
    featured: true,
    comingSoon: true,
    links: {
      github: "https://github.com/fa22-bse-044/libera",
      live: "#",
    },
    thumbnail: "/projectsthumbnails/comingsoon.png",
  },
  {
    title: "The Hill Hotel",
    subtitle: "Luxury Hotel Management System",
    description:
      "An internal hotel management web app enabling staff to manage cabins, bookings, and guests in real-time. Features include secure authentication, analytics dashboards, and modern UI with dark mode.",
    tech: [
      "React",
      "Supabase",
      "React Query",
      "React Router",
      "Recharts",
      "Styled Components",
      "Vite",
    ],
    icon: Hotel,
    featured: true,
    comingSoon: false,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/The-Hill-Hotel",
      live: "https://the-hill-hotel.vercel.app",
    },
    thumbnail: "/projectsthumbnails/the-hill-hotel.png",
  },
  {
    title: "Pizza Max-Style Food Delivery",
    subtitle: "Full-Stack Food Ordering Platform",
    description:
      "A complete food ordering and delivery platform featuring a TypeScript frontend with cart and checkout, powered by a Strapi CMS backend for menu and order management.",
    tech: ["TypeScript", "React", "Node.js", "Express", "Strapi", "Tailwind CSS"],
    icon: Utensils,
    featured: true,
    comingSoon: false,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/semester-project-176-v2",
      live: "https://semester-project-176-v2.vercel.app/",
    },
    thumbnail: "/projectsthumbnails/pizzamax.png",
  },
  {
    title: "PlayOn",
    subtitle: "Movie & TV Show Discovery Platform",
    description:
      "A streaming discovery platform powered by TMDb API with search, filtering, trending content, and responsive UI with animated components.",
    tech: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Axios",
      "TMDb API",
      "React Router",
    ],
    icon: Tv,
    featured: true,
    comingSoon: false,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/playon-streaming",
      live: "https://playon-streaming.vercel.app/",
    },
    thumbnail: "/projectsthumbnails/playon.png",
  },
  {
    title: "Moreat",
    subtitle: "Recipe Book Mobile App",
    description:
      "A cross-platform Flutter recipe app with search, filtering, favorites, custom lists, and recommendation features using REST APIs.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    icon: BookOpen,
    featured: false,
    comingSoon: true,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/recipe-app",
      live: "#",
    },
    thumbnail: "/projectsthumbnails/moreat.png",
  },
];

export const labels = {
  featuredBadge: "Featured",
  selectedBadge: "Selected",
  caseStudy: "Portfolio Case Study",
  launchingSoon: "Launching Soon",
  techStack: "Tech Stack",
  codeButton: "Code",
  comingSoonButton: "Coming Soon",
  liveDemoButton: "Live Demo",
  dialogFallbackTitle: "Project preview",
};

export const ariaLabels = {
  cardPreview: (title: string) => `Open preview for ${title}`,
  sourceCode: (title: string) => `Open ${title} source code`,
  liveDemo: (title: string) => `Open live demo for ${title}`,
  dialogTitle: (title: string) => `${title} preview`,
  thumbnailAlt: (title: string) => `${title} project preview`,
};