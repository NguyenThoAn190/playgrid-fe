"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Hook to handle smart navbar hiding on scroll down and revealing on scroll up.
 * Uses `useRef` for immediate, synchronous tracking of last scroll position to avoid state staleness.
 *
 * @param threshold Minimum scroll delta in pixels required to trigger state change (prevents micro-jitter).
 * @param topOffset Distance from page top (in px) where header is guaranteed to stay visible.
 */
export function useHeaderVisible(threshold = 10, topOffset = 20) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollY.current;
      const diff = currentScrollY - prevScrollY;

      // Always show header when near the top of the page
      if (currentScrollY <= topOffset) {
        setIsVisible(true);
      }
      // Hide header when scrolling DOWN beyond threshold
      else if (diff > threshold) {
        setIsVisible(false);
      }
      // Show header when scrolling UP beyond threshold
      else if (diff < -threshold) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, topOffset]);

  return isVisible;
}
