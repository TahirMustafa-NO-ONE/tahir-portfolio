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
              <span className="text-primary">{heading.highlight}</span>
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
                className="group relative min-w-0 cursor-pointer overflow-hidden rounded-lg border border-border bg-card card-hover"
                onClick={() => openProjectPreview(project)}
                onKeyDown={(event) => handleCardKeyDown(event, project)}
                role="button"
                tabIndex={0}
                aria-label={ariaLabels.cardPreview(project.title)}
              >
                <div className="relative z-10 grid gap-6 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:p-7">
                  <div className="relative overflow-hidden rounded-md border border-border bg-background">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.thumbnail ?? fallbackThumbnail}
                        alt={ariaLabels.thumbnailAlt(project.title)}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent sm:from-background/95" />

                      <div className="absolute left-4 right-4 top-4 flex min-w-0 items-start justify-between gap-3">
                        <span className="max-w-full rounded-md border border-border bg-background px-3 py-1 text-[11px] font-mono uppercase tracking-[0.24em] text-primary">
                          {project.featured ? labels.featuredBadge : labels.selectedBadge}
                        </span>
                        <div className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background text-primary">
                          <project.icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="absolute inset-x-4 bottom-4 hidden sm:block">
                        <div className="rounded-md border border-border bg-background p-4">
                          <p className="text-[11px] font-mono uppercase tracking-[0.26em] text-primary/90">
                            {project.subtitle}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-2xl">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border bg-background p-4 sm:hidden">
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

                      <div className="rounded-md border border-border bg-secondary/25 p-4 sm:p-5">
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

                    <div className="flex flex-wrap gap-3 border-t border-border pt-1 sm:pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-11 gap-2 rounded-md border-border bg-background px-5 text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground"
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
                          className="h-11 gap-2 rounded-md px-5"
                          disabled
                        >
                          <ExternalLink className="h-4 w-4" />
                          {labels.comingSoonButton}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="h-11 gap-2 rounded-md px-5 shadow-sm"
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
        <DialogContent className="max-w-[92vw] border-border bg-background p-0 shadow-lg sm:max-w-4xl">
          <DialogTitle className="sr-only">
            {selectedProject
              ? ariaLabels.dialogTitle(selectedProject.title)
              : labels.dialogFallbackTitle}
          </DialogTitle>
          {selectedProject && (
            <div className="overflow-hidden rounded-md">
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
