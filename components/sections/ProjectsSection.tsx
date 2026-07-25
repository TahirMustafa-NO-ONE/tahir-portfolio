"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { KeyboardEvent, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  sectionLabel,
  heading,
  description,
  projects,
  fallbackThumbnail,
  labels,
  ariaLabels,
  type Project,
} from "@/data/projects";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectPreview = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    project: Project
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectPreview(project);
    }
  };

  return (
    <section id="projects" className="relative overflow-x-clip py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="container relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-mono text-sm tracking-wider text-primary"
            >
              {sectionLabel}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-4 text-4xl font-bold md:text-5xl"
            >
              {heading.prefix}
              <span className="gradient-text">{heading.highlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-4 max-w-2xl text-muted-foreground"
            >
              {description}
            </motion.p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[2rem] border border-border/50 bg-card/30 backdrop-blur-sm card-hover"
                onClick={() => openProjectPreview(project)}
                onKeyDown={(event) => handleCardKeyDown(event, project)}
                role="button"
                tabIndex={0}
                aria-label={ariaLabels.cardPreview(project.title)}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_40%),radial-gradient(circle_at_bottom_right,hsl(var(--accent)/0.1),transparent_35%)] opacity-80" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="relative z-10 grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:p-7">
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-background/40 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.thumbnail ?? fallbackThumbnail}
                        alt={ariaLabels.thumbnailAlt(project.title)}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent sm:from-background/95 sm:via-background/20" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                      <div className="absolute left-4 right-4 top-4 flex min-w-0 items-start justify-between gap-3">
                        <span className="max-w-full rounded-full border border-white/15 bg-background/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-primary backdrop-blur-md">
                          {project.featured ? labels.featuredBadge : labels.selectedBadge}
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-background/70 text-primary shadow-[0_12px_28px_-16px_hsl(var(--primary)/0.8)] backdrop-blur-md">
                          <project.icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="absolute inset-x-4 bottom-4 hidden sm:block">
                        <div className="rounded-2xl border border-white/10 bg-background/72 p-4 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                          <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-primary/90">
                            {project.subtitle}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 bg-background/70 p-4 sm:hidden">
                      <p className="break-words text-[11px] font-mono uppercase tracking-[0.26em] text-primary/90">
                        {project.subtitle}
                      </p>
                      <h3 className="mt-2 break-words text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-6 px-1 py-2">
                    <div className="space-y-5">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                          <span>{labels.caseStudy}</span>
                          {project.comingSoon && (
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-primary">
                              {labels.launchingSoon}
                            </span>
                          )}
                        </div>

                        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                          {project.description}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-background/35 p-4 sm:p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                          {labels.techStack}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="max-w-full rounded-full border border-border/60 bg-secondary/45 px-3 py-1.5 text-center text-[11px] font-mono text-foreground/90 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/8 [overflow-wrap:anywhere]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 border-t border-white/10 pt-1 sm:pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-11 gap-2 rounded-full border-white/10 bg-background/40 px-5 text-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-foreground"
                        asChild
                      >
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={ariaLabels.sourceCode(project.title)}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <Github className="h-4 w-4" />
                          {labels.codeButton}
                        </a>
                      </Button>
                      {project.comingSoon ? (
                        <Button
                          size="sm"
                          className="h-11 gap-2 rounded-full px-5"
                          disabled
                        >
                          <ExternalLink className="h-4 w-4" />
                          {labels.comingSoonButton}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="h-11 gap-2 rounded-full px-5 glow-primary"
                          asChild
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={ariaLabels.liveDemo(project.title)}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            {labels.liveDemoButton}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <Dialog
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProject(null);
          }
        }}
      >
        <DialogContent className="max-w-[92vw] border-white/10 bg-background/95 p-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] sm:max-w-4xl">
          <DialogTitle className="sr-only">
            {selectedProject
              ? ariaLabels.dialogTitle(selectedProject.title)
              : labels.dialogFallbackTitle}
          </DialogTitle>
          {selectedProject && (
            <div className="overflow-hidden rounded-[1.25rem]">
              <div className="relative aspect-[16/10] w-full bg-background">
                <Image
                  src={selectedProject.thumbnail ?? fallbackThumbnail}
                  alt={ariaLabels.thumbnailAlt(selectedProject.title)}
                  fill
                  className="object-cover object-top"
                  sizes="92vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;