"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { greeting, name, ctaButtons, avatar, scrollIndicatorLabel } from "@/data/hero";

const HeroSection = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  return (
    <section className="relative isolate flex h-[100svh] min-h-[680px] overflow-hidden pt-24 sm:pt-28">
      <div className="container relative z-10 flex flex-1 flex-col px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />{greeting}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }}
          className="relative mx-auto mt-3 max-w-4xl text-center sm:mt-4"
        >
          <h1 className="text-3xl font-bold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span>{name.prefix}</span><span className="text-primary">{name.highlight},</span>
            <span className="mt-1 block text-foreground sm:mt-1.5">Software Engineer</span>
          </h1>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[68svh] min-h-[430px] sm:h-[70svh] lg:h-[74svh]"
      >
        {/* Smaller, bottom-anchored semicircle behind the portrait. */}
        <div className="absolute bottom-0 left-1/2 z-10 h-[clamp(230px,30vw,380px)] w-[clamp(460px,60vw,760px)] -translate-x-1/2 rounded-t-[999px] bg-primary/65" />

        {/* The portrait is taller than the semicircle so its head breaks the arch. */}
        <button
          type="button"
          onClick={() => setIsAvatarOpen(true)}
          aria-label="Open profile photo"
          className="group pointer-events-auto absolute bottom-0 left-1/2 z-20 h-[min(69svh,680px)] w-[clamp(270px,32vw,480px)] -translate-x-1/2 cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <Image
            src={avatar.src}
            alt={avatar.alt}
            fill
            priority
            sizes="(min-width: 1024px) 480px, 80vw"
            className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-nowrap justify-center gap-3 sm:bottom-10"
      >
        <Button size="sm" className="rounded-full px-5 shadow-sm" asChild>
          <a href={ctaButtons.primary.href}>{ctaButtons.primary.label} ↗</a>
        </Button>
        <Button size="sm" variant="outline" className="rounded-full border-border bg-background/95 px-5 text-foreground shadow-sm hover:border-primary/50 hover:bg-background" asChild>
          <a href={ctaButtons.secondary.href} download={ctaButtons.secondary.download}>{ctaButtons.secondary.label}</a>
        </Button>
      </motion.div>

      <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
        <DialogContent className="max-w-xs border-border bg-background p-0 shadow-lg lg:max-w-2xl">
          <DialogTitle className="sr-only">{avatar.dialogTitle}</DialogTitle>
          <div className="relative aspect-square w-full"><Image src={avatar.src} alt={avatar.fullAlt} fill className="rounded-md object-cover" /></div>
        </DialogContent>
      </Dialog>

      <a href="#about" className="absolute bottom-6 left-8 z-30 hidden items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary xl:flex"><span>{scrollIndicatorLabel}</span><ArrowDown className="h-4 w-4" /></a>
    </section>
  );
};

export default HeroSection;