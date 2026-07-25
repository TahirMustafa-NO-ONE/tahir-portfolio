"use client";

import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { Award, BadgeCheck, Calendar, ChevronDown, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certifications, type Certification } from "@/data/certifications";

const COLLAPSED_SKILLS_COUNT = 4;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4 + index * 0.12,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

interface CertificationCardProps {
  certification: Certification;
  index: number;
  isInView: boolean;
}

const CertificationCard = ({
  certification,
  index,
  isInView,
}: CertificationCardProps) => {
  const hasCredentialUrl = Boolean(certification.credentialUrl);
  const [expanded, setExpanded] = useState(false);

  const hiddenSkillsCount = Math.max(
    certification.skills.length - COLLAPSED_SKILLS_COUNT,
    0
  );
  const visibleSkills = expanded
    ? certification.skills
    : certification.skills.slice(0, COLLAPSED_SKILLS_COUNT);

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="group relative flex h-full min-w-0 flex-col gap-6 overflow-hidden rounded-2xl p-6 card-hover"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative z-10 flex h-full min-w-0 flex-col gap-6">
        <div className="flex min-w-0 items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Image
              src={certification.badge}
              alt={`${certification.issuer} badge`}
              width={112}
              height={112}
              className="h-28 w-28 shrink-0 rounded-xl object-contain drop-shadow-[0_14px_32px_-12px_hsl(var(--primary)/0.75)]"
              loading="lazy"
            />

            <div className="min-w-0">
              <p className="break-words text-xs font-mono uppercase tracking-[0.22em] text-primary">
                {certification.issuer}
              </p>
              <h3 className="mt-2 break-words text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary">
                {certification.title}
              </h3>
            </div>
          </div>

          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
            <Award className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-white/10 bg-background/35 p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>
              Issued {certification.issueDate}
              {certification.expirationDate ? ` - Expires ${certification.expirationDate}` : ""}
            </span>
          </div>

          {certification.credentialId && (
            <div className="flex min-w-0 items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="min-w-0 break-words font-mono text-xs">
                Credential ID: {certification.credentialId}
              </span>
            </div>
          )}
        </div>

        <p
          className={`text-sm leading-7 text-muted-foreground ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {certification.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {visibleSkills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.52 + index * 0.1 + skillIndex * 0.04,
                duration: 0.28,
              }}
              className="skill-badge text-xs"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {skill}
            </motion.span>
          ))}
          {!expanded && hiddenSkillsCount > 0 && (
            <span className="skill-badge text-xs text-muted-foreground">
              +{hiddenSkillsCount} more
            </span>
          )}
        </div>

        {(certification.description.length > 140 ||
          certification.skills.length > COLLAPSED_SKILLS_COUNT) && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
            aria-expanded={expanded}
          >
            {expanded ? "See less" : "See more"}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        )}

        <div className="mt-auto border-t border-white/10 pt-5">
          {hasCredentialUrl ? (
            <Button
              asChild
              size="sm"
              className="h-11 w-full gap-2 rounded-full px-5 glow-primary sm:w-auto"
            >
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify credential for ${certification.title}`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Verify Credential
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-11 w-full gap-2 rounded-full px-5 sm:w-auto"
              disabled
              aria-label={`Credential verification is unavailable for ${certification.title}`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Verification Unavailable
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="relative overflow-x-clip py-32">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

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
              04. CERTIFICATIONS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-4 text-4xl font-bold md:text-5xl"
            >
              Verified <span className="gradient-text">Credentials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-4 max-w-2xl text-muted-foreground"
            >
              Certifications that validate my foundation across cloud platforms,
              frontend engineering, and modern software delivery practices.
            </motion.p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
            {certifications.map((certification, index) => (
              <CertificationCard
                key={certification.id}
                certification={certification}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;