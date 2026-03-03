"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ExternalLink, Blocks, Utensils, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Libera",
    subtitle: "Decentralized Social Network Platform",
    description:
      "A blockchain-powered social platform with privacy-preserving relayer services and a paymaster for gasless interactions. Built as a team project showcasing Web3 best practices.",
    tech: ["Solidity", "Hardhat", "Next.js 15", "React 19", "TypeScript", "Tailwind", "Viem/Web3"],
    icon: Blocks,
    featured: true,
    comingSoon: true,
    links: {
      github: "https://github.com/fa22-bse-044/libera",
      live: "#",
    },
  },
  {
    title: "Pizza Max–Style Food Delivery",
    subtitle: "Full-Stack Food Ordering Platform",
    description:
      "A complete food ordering and delivery platform featuring a modern TypeScript frontend with product catalog, cart system, and checkout flow. Strapi CMS backend manages menus, categories, and order workflows.",
    tech: ["TypeScript", "React", "Node.js", "Express", "Strapi", "Tailwind CSS"],
    icon: Utensils,
    featured: true,
    comingSoon: false,
    links: {
      github: "https://github.com/TahirMustafa-NO-ONE/semester-project-176-v2",
      live: "https://semester-project-176-v2.vercel.app/",
    },
  },
  {
    title: "Moreat",
    subtitle: "Recipe Book Mobile App",
    description:
      "A feature-rich cross-platform recipe application built with Flutter. Users can search recipes by type, ingredients, or dish category, save favorites, create custom lists, and view similar recipe recommendations.",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs"],
    icon: BookOpen,
    featured: true,
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
