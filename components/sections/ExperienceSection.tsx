"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";

const timeline = [
  {
    type: "education",
    title: "Bachelor of Science in Software Engineering",
    organization: "COMSATS University Islamabad, Lahore Campus",
    location: "Lahore, Punjab, Pakistan",
    date: "Expected June 2026",
    description:
      "Pursuing a comprehensive education in software engineering with focus on modern development practices, algorithms, and emerging technologies like blockchain and Web3.",
    icon: GraduationCap,
  },
  {
    type: "project",
    title: "Libera - Decentralized Social Network",
    organization: "Team Project",
    location: "Remote",
    date: "2024",
    description:
      "Led development of blockchain-powered social platform using Hardhat, Solidity, and Next.js. Implemented privacy-preserving features and gasless transactions.",
    icon: Briefcase,
  },
  {
    type: "project",
    title: "Full-Stack Development Projects",
    organization: "Independent & Academic",
    location: "Lahore, Pakistan",
    date: "2023 - Present",
    description:
      "Built multiple full-stack applications including food delivery platform, recipe mobile app, and various web applications using React, Node.js, and Flutter.",
    icon: Briefcase,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm tracking-wider"
            >
              04. EXPERIENCE & EDUCATION
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-4"
            >
              My <span className="gradient-text">Journey</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px timeline-line md:-translate-x-px" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary glow-primary -translate-x-1/2 z-10" />

                  {/* Content Card */}
                  <div
                    className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                    }`}
                  >
                    <div className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm card-hover">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            item.type === "education"
                              ? "bg-accent/10 text-accent"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className={`flex items-center gap-2 text-xs text-muted-foreground font-mono ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <Calendar className="w-3 h-3" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-primary font-medium text-sm mb-1">
                        {item.organization}
                      </p>
                      <p className="text-muted-foreground text-xs mb-3">
                        {item.location}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
