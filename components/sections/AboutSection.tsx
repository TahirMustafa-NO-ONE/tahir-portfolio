"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Blocks, Smartphone, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building end-to-end solutions with modern frameworks",
  },
  {
    icon: Blocks,
    title: "Web3 & Blockchain",
    description: "Exploring decentralized technologies and smart contracts",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform Apps",
    description: "Crafting beautiful mobile experiences with Flutter",
  },
  {
    icon: Rocket,
    title: "Modern Tech Stack",
    description: "Always learning and adopting cutting-edge tools",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

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
              01. ABOUT ME
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold mt-4"
            >
              Who I <span className="gradient-text">Am</span>
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate{" "}
                <span className="text-foreground font-medium">Full-Stack Developer</span>{" "}
                currently pursuing my Bachelor's degree in Software Engineering at{" "}
                <span className="text-primary">COMSATS University Islamabad</span>,
                Lahore Campus.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a strong foundation in the JavaScript/TypeScript ecosystem, I specialize
                in building modern web applications using{" "}
                <span className="text-foreground font-medium">React, Next.js, Node.js</span>,
                and cross-platform mobile apps with{" "}
                <span className="text-foreground font-medium">Flutter</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                What excites me most is the intersection of traditional development and
                emerging technologies. I'm deeply interested in{" "}
                <span className="text-accent font-medium">Web3 and blockchain</span>,
                working with Solidity, Hardhat, and decentralized application architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code and creating experiences
                that leave a lasting impression.
              </p>
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
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm card-hover group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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
