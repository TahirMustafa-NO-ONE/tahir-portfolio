"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/ui/TypewriterText";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";


const HeroSection = () => {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const avatarTiltRef = useRef<HTMLDivElement | null>(null);
  const tiltTargetRef = useRef({ x: 0, y: 0 });
  const tiltCurrentRef = useRef({ x: 0, y: 0 });
  const tiltFrameRef = useRef<number | null>(null);
  const roles = [
    "Full-Stack Developer",
    "Web3 Enthusiast",
    "Flutter Developer",
    "Blockchain Explorer",
  ];
  const sparkles = [
    { size: "h-2.5 w-2.5", orbit: "hero-sparkle-orbit-1", color: "from-cyan-300 to-blue-500", delay: "0s" },
    { size: "h-2 w-2", orbit: "hero-sparkle-orbit-2", color: "from-fuchsia-400 to-violet-500", delay: "-2s" },
    { size: "h-3 w-3", orbit: "hero-sparkle-orbit-3", color: "from-sky-300 to-cyan-400", delay: "-4.5s" },
    { size: "h-2 w-2", orbit: "hero-sparkle-orbit-4", color: "from-violet-300 to-blue-500", delay: "-1.5s" },
    { size: "h-2.5 w-2.5", orbit: "hero-sparkle-orbit-5", color: "from-cyan-200 to-fuchsia-400", delay: "-5.5s" },
  ];

  useEffect(() => {
    const animateTilt = () => {
      const avatarElement = avatarTiltRef.current;

      if (!avatarElement) {
        tiltFrameRef.current = null;
        return;
      }

      tiltCurrentRef.current.x += (tiltTargetRef.current.x - tiltCurrentRef.current.x) * 0.12;
      tiltCurrentRef.current.y += (tiltTargetRef.current.y - tiltCurrentRef.current.y) * 0.12;

      avatarElement.style.setProperty("--rotate-x", `${tiltCurrentRef.current.x.toFixed(2)}deg`);
      avatarElement.style.setProperty("--rotate-y", `${tiltCurrentRef.current.y.toFixed(2)}deg`);

      tiltFrameRef.current = window.requestAnimationFrame(animateTilt);
    };

    const handlePointerMove = (event: MouseEvent) => {
      const avatarElement = avatarTiltRef.current;

      if (!avatarElement) {
        return;
      }

      const rect = avatarElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const maxTilt = 22;
      const offsetX = (event.clientX - centerX) / (rect.width / 2);
      const offsetY = (event.clientY - centerY) / (rect.height / 2);

      tiltTargetRef.current = {
        x: Math.max(-1, Math.min(1, -offsetY)) * maxTilt,
        y: Math.max(-1, Math.min(1, offsetX)) * maxTilt,
      };
    };

    const resetAvatarTilt = () => {
      tiltTargetRef.current = { x: 0, y: 0 };
    };

    tiltFrameRef.current = window.requestAnimationFrame(animateTilt);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", resetAvatarTilt);

    return () => {
      if (tiltFrameRef.current !== null) {
        window.cancelAnimationFrame(tiltFrameRef.current);
      }
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", resetAvatarTilt);
    };
  }, []);

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
              className="text-muted-foreground mt-10 mb-6 font-mono text-sm tracking-wider"
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
              <div
                className="relative cursor-pointer"
                onClick={() => setIsAvatarOpen(true)}
              >
                <div
                  ref={avatarTiltRef}
                  className="hero-avatar-tilt relative"
                >
                  <div className="hero-avatar-float relative flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-10 rounded-full bg-[radial-gradient(circle,_rgba(116,79,255,0.28)_0%,_rgba(34,211,238,0.18)_40%,_transparent_72%)] blur-2xl" />
                    <div className="pointer-events-none absolute inset-8 rounded-full opacity-80 [box-shadow:0_0_45px_rgba(116,79,255,0.28),0_0_100px_rgba(34,211,238,0.18),0_0_150px_rgba(59,130,246,0.12)]" />

                    <div className="pointer-events-none absolute inset-[-10px] rounded-full hero-ring-spin bg-[conic-gradient(from_0deg,_rgba(168,85,247,0.9),_rgba(34,211,238,0.95),_rgba(59,130,246,0.9),_rgba(168,85,247,0.9))] p-[5px] shadow-[0_0_30px_rgba(116,79,255,0.2)]">
                      <div className="h-full w-full rounded-full bg-background/80" />
                    </div>

                    <div className="pointer-events-none absolute inset-[-20px] rounded-full hero-ring-reverse bg-[conic-gradient(from_180deg,_rgba(99,102,241,0.3),_rgba(34,211,238,0.7),_rgba(168,85,247,0.55),_rgba(99,102,241,0.3))] p-[2px] opacity-70 blur-[1px]">
                      <div className="h-full w-full rounded-full bg-transparent" />
                    </div>

                    {sparkles.map((sparkle, index) => (
                      <div
                        key={index}
                        className={`pointer-events-none absolute inset-[-22px] ${sparkle.orbit}`}
                        style={{ animationDelay: sparkle.delay }}
                      >
                        <div
                          className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gradient-to-br ${sparkle.color} ${sparkle.size} shadow-[0_0_12px_rgba(255,255,255,0.55),0_0_18px_rgba(34,211,238,0.45)]`}
                        />
                      </div>
                    ))}

                    <motion.div
                      className="relative z-10 h-[280px] w-[280px] overflow-hidden rounded-full bg-background/50 sm:h-[328px] sm:w-[328px] lg:h-[376px] lg:w-[376px] xl:h-[424px] xl:w-[424px]"
                    >
                      {/* Ripple Loading Animation */}
                      {!isImageLoaded && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
                          <div className="relative h-24 w-24">
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

                      <div className="pointer-events-none absolute inset-[5%] z-[1] rounded-full [box-shadow:inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-18px_28px_rgba(15,23,42,0.2)]" />

                      {/* Image */}
                      <Image
                        src="/profile-avatar4.png"
                        alt="Tahir Mustafa"
                        fill
                        className="relative z-0 object-cover"
                        onLoad={() => {
                          setIsImageLoaded(true);
                        }}
                        style={{ opacity: isImageLoaded ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
                        priority
                      />
                    </motion.div>

                    <div className="pointer-events-none absolute -bottom-12 left-1/2 h-10 w-[72%] -translate-x-1/2 rounded-full bg-black/45 blur-2xl hero-avatar-shadow" />
                  </div>
                </div>
                <style jsx>{`
                  .hero-avatar-tilt {
                    --rotate-x: 0deg;
                    --rotate-y: 0deg;
                    transform-style: preserve-3d;
                    transform: perspective(800px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
                    will-change: transform;
                  }

                  .hero-avatar-float {
                    animation: hero-float 3s ease-in-out infinite alternate;
                    transform-style: preserve-3d;
                  }

                  .hero-avatar-shadow {
                    animation: hero-shadow 3s ease-in-out infinite alternate;
                  }

                  .hero-ring-spin {
                    animation: hero-ring-spin 12s linear infinite;
                  }

                  .hero-ring-reverse {
                    animation: hero-ring-reverse 16s linear infinite;
                  }

                  .hero-sparkle-orbit-1,
                  .hero-sparkle-orbit-2,
                  .hero-sparkle-orbit-3,
                  .hero-sparkle-orbit-4,
                  .hero-sparkle-orbit-5 {
                    animation: hero-orbit 14s linear infinite;
                  }

                  .hero-sparkle-orbit-2 {
                    animation-duration: 18s;
                  }

                  .hero-sparkle-orbit-3 {
                    animation-duration: 16s;
                  }

                  .hero-sparkle-orbit-4 {
                    animation-duration: 20s;
                  }

                  .hero-sparkle-orbit-5 {
                    animation-duration: 22s;
                  }

                  @keyframes hero-float {
                    from {
                      transform: translateY(0px);
                    }
                    to {
                      transform: translateY(-15px);
                    }
                  }

                  @keyframes hero-shadow {
                    from {
                      transform: translateX(-50%) scale(1);
                      opacity: 0.35;
                    }
                    to {
                      transform: translateX(-50%) scale(0.85);
                      opacity: 0.22;
                    }
                  }

                  @keyframes hero-ring-spin {
                    from {
                      transform: rotate(0deg) translateZ(0);
                    }
                    to {
                      transform: rotate(360deg) translateZ(0);
                    }
                  }

                  @keyframes hero-ring-reverse {
                    from {
                      transform: rotate(360deg) scale(1.04) translateZ(-12px);
                    }
                    to {
                      transform: rotate(0deg) scale(1.04) translateZ(-12px);
                    }
                  }

                  @keyframes hero-orbit {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}</style>
              </div>
            </motion.div>

            {/* Avatar Dialog */}
            <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
              <DialogContent className="max-w-xs lg:max-w-2xl p-0 bg-transparent shadow-none">
                <DialogTitle className="sr-only">Profile Picture</DialogTitle>
                <div className="relative w-full aspect-square">
                  <Image
                    src="/profile-avatar4.png"
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
