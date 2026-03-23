"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Blocks, Utensils, BookOpen, Tv, Hotel, MessageCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
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
  },

  {
    title: "Libera",
    subtitle: "Decentralized Social Network Platform",
    description:
      "A blockchain-powered social platform with privacy-preserving relayer services and a paymaster for gasless interactions. Built as a team project showcasing Web3 best practices.",
    tech: [
      "Solidity",
      "Hardhat",
      "Next.js 15",
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
  },

  {
    title: "Pizza Max–Style Food Delivery",
    subtitle: "Full-Stack Food Ordering Platform",
    description:
      "A complete food ordering and delivery platform featuring a TypeScript frontend with cart and checkout, powered by a Strapi CMS backend for menu and order management.",
    tech: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "Strapi",
      "Tailwind CSS",
    ],
    icon: Utensils,
    featured: true,
    comingSoon: false,
    links: {
      github:
        "https://github.com/TahirMustafa-NO-ONE/semester-project-176-v2",
      live: "https://semester-project-176-v2.vercel.app/",
    },
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
      github:
        "https://github.com/TahirMustafa-NO-ONE/playon-streaming",
      live: "https://playon-streaming.vercel.app/",
    },
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
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm tracking-wider"
            >
              03. PROJECTS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-4"
            >
              Featured <span className="gradient-text">Work</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              A selection of projects that showcase my skills in full-stack development,
              cross-platform apps, and blockchain technology.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                className="group"
              >
                <div className="relative p-8 md:p-10 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden card-hover">
                  {/* Background Gradient */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <project.icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-xs font-mono text-primary tracking-wider uppercase">
                          {project.featured ? "Featured Project" : "Project"}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold mt-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">{project.subtitle}</p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono rounded-full bg-secondary/50 text-foreground border border-border/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          asChild
                        >
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                        {project.comingSoon ? (
                          <Button
                            size="sm"
                            className="gap-2"
                            disabled
                          >
                            <ExternalLink className="w-4 h-4" />
                            Coming Soon
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="gap-2"
                            asChild
                          >
                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;