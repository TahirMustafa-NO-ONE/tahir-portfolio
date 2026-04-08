"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ClickSpark from "@/components/ClickSpark";
import CursorFollower from "@/components/CursorFollower";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CursorFollower />
      <ClickSpark
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
      >
        {children}
      </ClickSpark>
    </TooltipProvider>
  );
}
