"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/ui/TypewriterText";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";


const HeroSection = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const roles = [
    "Full-Stack Developer",
    "Web3 Enthusiast",
    "Flutter Developer",
    "Blockchain Explorer",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="gradient-orb w-[600px] h-[600px] bg-primary/30 -top-48 -left-48"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb w-[500px] h-[500px] bg-accent/20 top-1/3 -right-32"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="gradient-orb w-[400px] h-[400px] bg-primary/20 bottom-0 left-1/4"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center mt-0 md:mt-20 lg:mt-20 text-center lg:text-left order-2 lg:order-1 max-w-2xl"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground mb-6 font-mono text-sm tracking-wider"
            >
              {'<Hello World />'}
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8"
            >
              <span className="text-foreground">I'm </span>
              <span className="gradient-text text-glow">Tahir Mustafa</span>
            </motion.h1>

            {/* Animated Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-5 h-12"
            >
              <TypewriterText
                texts={roles}
                speed={80}
                deleteSpeed={40}
                pauseDuration={2500}
                className="font-medium"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground mb-12 text-base lg:text-lg leading-relaxed"
            >
              Bringing visions to life through code and creativity. I design and develop
              cutting-edge web and mobile applications that prioritize user experience
              and technical excellence. Whether it's exploring new technologies or refining
              the details, every line of code is written with purpose and passion.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                className="glow-primary group"
                asChild
              >
                <a href="#projects">
                  View Projects
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <a href="/Tahir-Software-Engineer-CV.pdf" download="Tahir_Mustafa_Resume.pdf">
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-4 justify-center lg:justify-start pb-10"
            >
              {[
                { icon: Github, href: "https://github.com/TahirMustafa-NO-ONE", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/tahir-mustafa-2b385b2b9", label: "LinkedIn" },
                { icon: Mail, href: "mailto:tahirmustafa161123@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center items-center order-1 lg:order-2 pt-20 lg:pt-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex justify-center"
            >
              <div className="relative cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-accent to-primary animate-pulse-glow blur-xl opacity-50" />
                <motion.div
                  className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden border-4 border-primary/50 glow-primary bg-background/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Ripple Loading Animation */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-primary/50"
                          animate={{
                            scale: [0.5, 2, 0.5],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-accent/50"
                          animate={{
                            scale: [0.5, 2, 0.5],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.4,
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-primary/30"
                          animate={{
                            scale: [0.5, 2, 0.5],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Image */}
                  <Image
                    src="/profile-avatar2.png"
                    alt="Tahir Mustafa"
                    fill
                    className="object-cover relative z-0"
                    onLoad={() => {
                      setIsImageLoaded(true);
                    }}
                    style={{ opacity: isImageLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Avatar Dialog */}
            <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
              <DialogContent className="max-w-2xl">
                <DialogTitle className="sr-only">Profile Picture</DialogTitle>
                <div className="relative w-full aspect-square">
                  <Image
                    src="/profile-avatar2.png"
                    alt="Tahir Mustafa - Full Size"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block z-50"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <ArrowDown className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
