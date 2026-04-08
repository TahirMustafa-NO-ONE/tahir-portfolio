"use client";

import * as React from "react";

import { useCursorPosition } from "@/hooks/use-cursor-position";
import { useIsMobile } from "@/hooks/use-mobile";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, summary, [role='button'], [data-cursor='interactive']";

export default function CursorFollower() {
  const { x, y } = useCursorPosition();
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = React.useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = React.useState(false);
  const followerRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef({ x: 0, y: 0 });
  const currentRef = React.useRef({ x: 0, y: 0 });
  const hoverInteractiveRef = React.useRef(false);
  const lastMoveAtRef = React.useRef(0);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updatePointerType = () => setIsCoarsePointer(mediaQuery.matches);

    updatePointerType();
    mediaQuery.addEventListener("change", updatePointerType);

    return () => mediaQuery.removeEventListener("change", updatePointerType);
  }, []);

  React.useEffect(() => {
    if (!isReady && (x !== 0 || y !== 0)) {
      currentRef.current = { x, y };
      setIsReady(true);
    }

    targetRef.current = { x, y };
    lastMoveAtRef.current = performance.now();
  }, [isReady, x, y]);

  React.useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;
      hoverInteractiveRef.current =
        target instanceof Element && !!target.closest(INTERACTIVE_SELECTOR);
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  React.useEffect(() => {
    if (isMobile || isCoarsePointer) {
      return;
    }

    let frameId = 0;

    const animate = () => {
      const follower = followerRef.current;

      if (follower && isReady) {
        const now = performance.now();
        const idleTime = now - lastMoveAtRef.current;
        const isIdle = idleTime > 80;
        const activeScale = hoverInteractiveRef.current ? 1.2 : 1;
        const idleScale = isIdle ? 0.96 : 1.04;
        const scale = activeScale * idleScale;
        const hue = hoverInteractiveRef.current
          ? "hsl(var(--accent))"
          : "hsl(var(--primary))";

        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18;

        follower.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        follower.style.background = hue;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isCoarsePointer, isMobile, isReady]);

  if (isMobile || isCoarsePointer) {
    return null;
  }

  return (
    <div
      ref={followerRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-10 h-7 w-7 rounded-full border border-white/10"
    />
  );
}
