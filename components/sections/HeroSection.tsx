"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/ui/TypewriterText";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { greeting, name, roles, description, ctaButtons, avatar, scrollIndicatorLabel } from "@/data/hero";

const HeroSection = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  return (
    // h-screen + overflow-hidden pins the whole hero to exactly one viewport.
    // If your Navbar is NOT fixed/overlaying, swap h-screen for
    // h-[calc(100vh-<navbar height>)] so this math still works.
    <section className="relative isolate flex h-screen max-h-screen flex-col overflow-hidden pt-24 sm:pt-28">
      <div className="container relative flex min-h-0 flex-1 flex-col px-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="mx-auto flex w-fit shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />{greeting}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.12 }} className="relative z-10 mx-auto mt-3 max-w-4xl shrink-0 text-center sm:mt-4">
          <h1 className="text-3xl font-bold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span>{name.prefix}</span><span className="text-primary">{name.highlight},</span>
            <span className="mt-1 block text-foreground sm:mt-1.5">Software Engineer</span>
          </h1>
        </motion.div>

        {/* Middle area is flex-1/min-h-0 so it soaks up whatever room is left
            under the heading, and the circle (h-full + aspect-square) scales
            itself down to fit — no matter the screen height, nothing overflows. */}
        <div className="relative mx-auto mt-2 flex w-full max-w-5xl flex-1 min-h-0 items-center justify-center sm:mt-4">
          {/* <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.45 }} className="absolute left-0 top-1/5 hidden w-40 -translate-y-1/2 text-left text-xs leading-relaxed text-muted-foreground lg:block">
            {description}
          </motion.p> */}

          {/* <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-right lg:block">
            <div className="mb-2 flex justify-end gap-0.5 text-primary" aria-label="Five stars">★★★★★</div>
            <p className="text-2xl font-bold leading-none tracking-tight">10 Years</p>
            <p className="mt-1 text-xs font-medium text-muted-foreground">Experience</p>
          </motion.div> */}

          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="relative aspect-square h-full max-h-[440px] w-auto">
            {/* Full circle sits behind the photo; the photo only covers the
                top arch, leaving the lower crescent free for the buttons. */}
            <div className="absolute inset-0 rounded-full bg-primary/65" />
            <span className="absolute left-2 top-[26%] h-px w-7 -rotate-[28deg] bg-primary sm:-left-7 sm:w-10" />
            <span className="absolute left-8 top-[18%] h-px w-5 rotate-[42deg] bg-primary sm:-left-1" />
            <span className="absolute right-6 top-[14%] h-px w-6 rotate-[62deg] bg-primary sm:right-0" />
            <button type="button" onClick={() => setIsAvatarOpen(true)} aria-label="Open profile photo" className="group absolute inset-x-[10%] top-0 block h-[78%] cursor-zoom-in overflow-hidden rounded-t-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background">
              <Image src={avatar.src} alt={avatar.alt} fill priority sizes="(min-width: 1024px) 440px, 300px" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
            </button>

            {/* Two-button pill row overlapping the exposed base of the circle */}
            <div className="absolute inset-x-0 bottom-[8%] flex items-center justify-center gap-2">
              <Button size="sm" className="rounded-full px-5 shadow-sm" asChild>
                <a href={ctaButtons.primary.href}>{ctaButtons.primary.label} ↗</a>
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-none bg-background/85 px-5 text-foreground backdrop-blur-sm hover:bg-background" asChild>
                <a href={ctaButtons.secondary.href} download={ctaButtons.secondary.download}>{ctaButtons.secondary.label}</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
        <DialogContent className="max-w-xs border-border bg-background p-0 shadow-lg lg:max-w-2xl">
          <DialogTitle className="sr-only">{avatar.dialogTitle}</DialogTitle>
          <div className="relative aspect-square w-full"><Image src={avatar.src} alt={avatar.fullAlt} fill className="rounded-md object-cover" /></div>
        </DialogContent>
      </Dialog>

      <a href="#about" className="absolute bottom-6 left-8 hidden items-center gap-2 font-mono text-xs tracking-wide text-muted-foreground transition-colors hover:text-primary xl:flex"><span>{scrollIndicatorLabel}</span><ArrowDown className="h-4 w-4" /></a>
    </section>
  );
};

export default HeroSection;