"use client";

import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useBreakpoint(breakpoint: Breakpoint) {
  const [isMatched, setIsMatched] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to true after mount
    setIsClient(true);

    const checkBreakpoint = () => {
      if (typeof window !== "undefined") {
        setIsMatched(window.innerWidth >= breakpoints[breakpoint]);
      }
    };

    // Check initial value
    checkBreakpoint();

    // Add event listener
    window.addEventListener("resize", checkBreakpoint);

    // Cleanup
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, [breakpoint]);

  // Return false during SSR to avoid hydration mismatch
  return isClient ? isMatched : false;
}

export function useCurrentBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("sm");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to true after mount
    setIsClient(true);

    const updateBreakpoint = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;

        if (width >= breakpoints["2xl"]) {
          setCurrentBreakpoint("2xl");
        } else if (width >= breakpoints.xl) {
          setCurrentBreakpoint("xl");
        } else if (width >= breakpoints.lg) {
          setCurrentBreakpoint("lg");
        } else if (width >= breakpoints.md) {
          setCurrentBreakpoint("md");
        } else {
          setCurrentBreakpoint("sm");
        }
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  // Return 'sm' during SSR to avoid hydration mismatch
  return isClient ? currentBreakpoint : "sm";
}
