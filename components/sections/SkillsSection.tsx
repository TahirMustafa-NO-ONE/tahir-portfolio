"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Globe,
  Database,
  Cloud,
  Blocks,
  Layers,
} from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Programming Languages",
    skills: ["C++", "Java", "Python", "JavaScript (ES6+)", "TypeScript", "SQL", "Dart", "Solidity", "HTML5", "CSS3"],
    color: "primary",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    skills: ["React.js", "Next.js (v15)", "Node.js", "Express.js", "Flutter", "Tailwind CSS", "Bootstrap", "EJS", "Strapi CMS"],
    color: "accent",
  },
  {
    icon: Blocks,
    title: "Blockchain & Web3",
    skills: ["Solidity (0.8.28)", "Hardhat (3.0.6)", "Web3.js", "Viem", "MetaMask Integration", "Smart Contracts", "DApp Architecture", "Decentralized Identity"],
    color: "primary",
  },
  {
    icon: Database,
    title: "Databases & Backend",
    skills: ["MongoDB", "SQL Server", "RESTful APIs", "Mongoose ODM"],
    color: "accent",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    skills: ["Docker", "Git & GitHub", "CI/CD (Basics)", "Microsoft Azure (Fundamentals)"],
    color: "primary",
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="container" ref={ref}>
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
              02. SKILLS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-4"
            >
              Technical <span className="gradient-text">Expertise</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mt-4 max-w-2xl mx-auto"
            >
              A comprehensive toolkit spanning modern web development,
              cross-platform mobile apps, and decentralized technologies.
            </motion.p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + categoryIndex * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="h-full p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm card-hover overflow-hidden">
                  {/* Background Glow */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                      category.color === "primary" ? "bg-primary" : "bg-accent"
                    }`}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        category.color === "primary"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.03,
                          duration: 0.3,
                        }}
                        className="skill-badge"
                      >
                        {skill}
                      </motion.span>
                    ))}
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

export default SkillsSection;
