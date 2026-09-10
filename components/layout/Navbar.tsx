"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

// Split around the centered logo, same as the reference: 3 links | logo | 3 links
const leftLinks = navLinks.slice(0, 3);
const rightLinks = navLinks.slice(3);

// bg-foreground / text-background are the shadcn theme tokens that invert
// with the ThemeToggle: black pill on white page in light mode, white pill
// on black page in dark mode. bg-primary (orange) stays fixed either way.
const NavPill = ({
  link,
  isActive,
  onNavClick,
  indicatorId,
}: {
  link: (typeof navLinks)[number];
  isActive: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  indicatorId: string;
}) => (
  <motion.a
    href={link.href}
    onClick={(e) => onNavClick(e, link.href)}
    whileHover={{ y: -1 }}
    className={`relative whitespace-nowrap rounded-full px-10 py-3 text-base font-medium transition-colors duration-300 ${
      isActive
        ? "text-primary-foreground"
        : "text-background/70 hover:bg-background/10 hover:text-background"
    }`}
  >
    {isActive && (
      <motion.span
        layoutId={indicatorId}
        className="absolute inset-0 rounded-full bg-primary"
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />
    )}
    <span className="relative z-10">{link.name}</span>
  </motion.a>
);

const Logo = ({ className = "", markSize = "h-5 w-5 text-lg", textSize = "text-base" }) => (
  <span className={`flex items-center gap-2 ${className}`}>
    <span className={`flex items-center justify-center rounded-full bg-primary font-bold text-primary-foreground h-12 w-12 text-2xl`}>T</span>
    {/* <span className={`font-extrabold tracking-tight ${textSize}`}>TM</span> */}
  </span>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: lights up whichever section is centered in the viewport,
  // the way "Home" is lit up in the reference screenshot.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible?.target.id) {
          setActiveHref(`#${mostVisible.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setActiveHref(href);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 py-6"
    >
      {/* Desktop: one floating pill, exactly like the reference */}
      <nav className="container relative hidden items-center justify-center lg:flex">
        <LayoutGroup id="desktop-navigation">
        <div
          className={`flex min-h-[76px] items-center gap-1.5 rounded-full bg-foreground px-3 py-3 text-background transition-shadow ${
            scrolled ? "shadow-lg shadow-black/10" : "shadow-md shadow-black/5"
          }`}
        >
          <ul className="flex items-center gap-1">
            {leftLinks.map((link) => (
              <li key={link.name}>
                <NavPill link={link} isActive={activeHref === link.href} onNavClick={handleNavClick} indicatorId="desktop-active-link" />
              </li>
            ))}
          </ul>

          <a href="#" onClick={handleLogoClick} className="mx-3 px-3" aria-label="Back to top">
            <Logo markSize="h-9 w-9 text-sm" textSize="text-lg" />
          </a>

          <ul className="flex items-center gap-1">
            {rightLinks.map((link) => (
              <li key={link.name}>
                <NavPill link={link} isActive={activeHref === link.href} onNavClick={handleNavClick} indicatorId="desktop-active-link" />
              </li>
            ))}
          </ul>
        </div>
        </LayoutGroup>

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile: compact bar with the same black-on-light / white-on-dark pill treatment */}
      <nav className="container flex items-center justify-between lg:hidden">
        <a
          href="#"
          onClick={handleLogoClick}
          aria-label="Back to top"
          className="flex items-center rounded-full bg-foreground px-3 py-2 text-background"
        >
          <Logo markSize="h-6 w-6 text-[10px]" textSize="text-sm" />
        </a>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            variant="outline"
            className="h-10 w-10 rounded-full border-none bg-foreground p-0 text-background hover:bg-foreground/90"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="!h-5 !w-5" /> : <Menu className="!h-5 !w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container mt-2 overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 rounded-3xl bg-foreground p-3 text-background">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                <NavPill link={link} isActive={activeHref === link.href} onNavClick={handleNavClick} indicatorId="mobile-active-link" />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
