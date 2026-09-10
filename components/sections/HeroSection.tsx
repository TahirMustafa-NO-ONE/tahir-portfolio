"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/ui/TypewriterText";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { greeting, name, roles, description, ctaButtons, socialLinks, avatar, scrollIndicatorLabel } from "@/data/hero";

const framePaths = [
  "M 42 78 L 42 42 L 78 42",
  "M 222 42 L 258 42 L 258 78",
  "M 258 222 L 258 258 L 222 258",
  "M 78 258 L 42 258 L 42 222",
];

const HeroSection = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="container relative px-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.15 }}
            className="order-2 mt-0 flex max-w-2xl flex-1 flex-col justify-center text-center lg:order-1 lg:mt-20 lg:text-left"
          >
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.25 }} className="mb-6 mt-10 font-mono text-sm tracking-wider text-muted-foreground">
              {greeting}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35 }} className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
              <span>{name.prefix}</span><span className="text-primary">{name.highlight}</span>
            </motion.h1>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.42 }} className="mb-5 h-12 text-xl text-muted-foreground md:text-2xl lg:text-3xl">
              <TypewriterText texts={roles} speed={80} deleteSpeed={40} pauseDuration={2500} className="font-medium" />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.52 }} className="mb-12 text-base leading-relaxed text-muted-foreground lg:text-lg">
              {description}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.62 }} className="mb-12 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Button size="lg" className="group shadow-sm transition-all hover:-translate-y-px hover:shadow-md" asChild>
                <a href={ctaButtons.primary.href}>{ctaButtons.primary.label}<span className="ml-2 transition-transform group-hover:translate-x-1">{ctaButtons.primary.arrow}</span></a>
              </Button>
              <Button size="lg" variant="outline" className="hover:border-primary/50" asChild>
                <a href={ctaButtons.secondary.href} download={ctaButtons.secondary.download}>{ctaButtons.secondary.label}</a>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.72 }} className="flex justify-center gap-3 pb-10 lg:justify-start">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-md border border-border p-3 text-muted-foreground transition-all hover:-translate-y-px hover:border-primary/50 hover:text-primary">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.15 }} className="order-1 flex flex-1 items-center justify-center pt-20 lg:order-2 lg:pt-0">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="relative">
              <button type="button" onClick={() => setIsAvatarOpen(true)} aria-label="Open profile photo" className="group relative block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border border-border bg-card shadow-[0_20px_40px_rgba(0,0,0,0.12)] sm:h-[328px] sm:w-[328px] lg:h-[376px] lg:w-[376px] xl:h-[424px] xl:w-[424px]">
                  <Image src={avatar.src} alt={avatar.alt} fill priority className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <svg viewBox="0 0 300 300" className="pointer-events-none absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] overflow-visible" aria-hidden="true">
                  {framePaths.map((d, index) => (
                    <motion.path key={d} d={d} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.35 + index * 0.1, ease: "easeOut" }} />
                  ))}
                </svg>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs tracking-wide text-muted-foreground">// tahir.dev</span>
              </button>
            </motion.div>
            <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
              <DialogContent className="max-w-xs border-border bg-background p-0 shadow-lg lg:max-w-2xl">
                <DialogTitle className="sr-only">{avatar.dialogTitle}</DialogTitle>
                <div className="relative aspect-square w-full"><Image src={avatar.src} alt={avatar.fullAlt} fill className="rounded-md object-cover" /></div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
      <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} href="#about" className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary lg:flex">
        <span className="font-mono text-xs tracking-wider">{scrollIndicatorLabel}</span><ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
