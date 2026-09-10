"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Fragment, useRef } from "react";
import {
  sectionLabel,
  heading,
  aboutParagraphs,
  highlights,
  type TextSegmentVariant,
} from "@/data/about";

const segmentVariantClass: Record<TextSegmentVariant, string> = {
  foreground: "text-foreground font-medium",
  primary: "text-primary",
  accent: "text-primary font-medium",
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
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
              {sectionLabel}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-4"
            >
              {heading.prefix}
              <span className="text-primary">{heading.highlight}</span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              {aboutParagraphs.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph.segments.map((segment, sIndex) =>
                    segment.variant ? (
                      <span
                        key={sIndex}
                        className={segmentVariantClass[segment.variant]}
                      >
                        {segment.text}
                      </span>
                    ) : (
                      <Fragment key={sIndex}>{segment.text}</Fragment>
                    )
                  )}
                </p>
              ))}
            </motion.div>

            {/* Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group rounded-lg border border-border bg-card p-6 card-hover"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
