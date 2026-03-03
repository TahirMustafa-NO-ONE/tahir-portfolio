"use client";

import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface Logo {
  node?: ReactNode;
  src?: string;
  alt?: string;
  title?: string;
  href?: string;
  color?: string;
}

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
  useCustomRender?: boolean;
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  logos,
  speed = 100,
  direction = 'left',
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo loop',
  useCustomRender = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationIdRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const animate = () => {
      const currentSpeed = isHovered ? hoverSpeed : speed;
      
      if (currentSpeed === 0) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      const directionMultiplier = direction === 'left' ? -1 : 1;
      positionRef.current += (currentSpeed / 60) * directionMultiplier;

      const totalWidth = logos.length * (logoHeight + gap);
      
      if (direction === 'left' && positionRef.current <= -totalWidth) {
        positionRef.current = 0;
      } else if (direction === 'right' && positionRef.current >= totalWidth) {
        positionRef.current = 0;
      }

      if (containerRef.current) {
        const track = containerRef.current.querySelector('.logo-track') as HTMLElement;
        if (track) {
          track.style.transform = `translateX(${positionRef.current}px)`;
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [speed, direction, logos.length, logoHeight, gap, isHovered, hoverSpeed]);

  const renderLogo = (logo: Logo, index: number) => {
    // Calculate icon size based on logoHeight
    const iconSizeClass = logoHeight <= 50 ? 'text-4xl' : 'text-6xl';
    
    const content = (
      <div
        className={`flex items-center justify-center transition-transform duration-200 ${
          scaleOnHover ? 'hover:scale-110' : ''
        } logo-item group`}
        style={{
          height: `${logoHeight}px`,
          minWidth: `${logoHeight}px`,
        }}
        title={logo.title || logo.alt}
        data-hover-color={logo.color}
      >
        {logo.node ? (
          <div 
            className={`${iconSizeClass} transition-all duration-300`}
            style={{ color: '#999999' }}
          >
            {logo.node}
          </div>
        ) : logo.src ? (
          <img
            src={logo.src}
            alt={logo.alt || `Logo ${index + 1}`}
            className="h-full w-auto object-contain transition-all duration-300"
            style={{ filter: 'grayscale(100%) brightness(0.6)' }}
          />
        ) : null}
      </div>
    );

    if (logo.href) {
      return (
        <a
          key={index}
          href={logo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          style={{ marginRight: `${gap}px` }}
        >
          {content}
        </a>
      );
    }

    return (
      <div key={index} className="inline-block" style={{ marginRight: `${gap}px` }}>
        {content}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      style={{ height: `${logoHeight}px` }}
    >
      <style>
        {`
          .logo-item:hover > div {
            color: var(--hover-color) !important;
          }
          .logo-item:hover img {
            filter: grayscale(0%) brightness(1) !important;
          }
          ${logos.map((logo) => 
            logo.color ? `.logo-item[data-hover-color="${logo.color}"]:hover > div { color: ${logo.color} !important; }` : ''
          ).join('\n')}
        `}
      </style>
      <div className="logo-track flex items-center absolute left-0 top-0">
        {/* Render logos multiple times for seamless loop */}
        {Array.from({ length: 3 }).map((_, setIndex) => (
          <React.Fragment key={setIndex}>
            {logos.map((logo, logoIndex) => renderLogo(logo, logoIndex))}
          </React.Fragment>
        ))}
      </div>
      
      {/* Fade out effect */}
      {fadeOut && (
        <>
          <div
            className="absolute left-0 top-0 w-32 h-full pointer-events-none z-10"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute right-0 top-0 w-32 h-full pointer-events-none z-10"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default LogoLoop;
