"use client";

import { useState, useEffect } from 'react';
import LogoLoop from '@/components/ui/LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiMongodb,
  SiGit,
  SiFlutter,
  SiFirebase,
  SiExpress,
  SiSolidity,
  SiJavascript
} from 'react-icons/si';

const TechStackSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev", color: '#61DAFB' },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", color: '#000000' },
    { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org", color: '#3178C6' },
    { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: '#F7DF1E' },
    { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org", color: '#339933' },
    { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com", color: '#000000' },
    { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", color: '#06B6D4' },
    { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev", color: '#02569B' },
    { node: <SiPython />, title: "Python", href: "https://www.python.org", color: '#3776AB' },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com", color: '#47A248' },
    { node: <SiSolidity />, title: "Solidity", href: "https://soliditylang.org", color: '#363636' },
    { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com", color: '#FFCA28' },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com", color: '#2496ED' },
    { node: <SiGit />, title: "Git", href: "https://git-scm.com", color: '#F05032' },
  ];

  return (
    <section className="pt-20 bg-background/50 backdrop-blur-sm w-full">
      <div 
        className="relative w-full" 
        style={{ height: isMobile ? '80px' : '140px' }}
      >
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={isMobile ? 50 : 80}
          gap={isMobile ? 60 : 100}
          hoverSpeed={20}
          scaleOnHover
          fadeOut
          fadeOutColor="hsl(var(--background))"
          ariaLabel="Technology stack"
        />
      </div>
    </section>
  );
};

export default TechStackSection;
