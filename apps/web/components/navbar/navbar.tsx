"use client";

import React, { useState, useEffect } from "react";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling DOWN -> Hide Header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> Reveal Header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Smart Scroll Sticky Header Container */}
      <header
        className={`sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* PC / Laptop Navbar (Visible on lg screens and up) */}
        <div className="hidden lg:block">
          <DesktopNavbar />
        </div>

        {/* Mobile Top Header (Visible on smaller screens < lg) */}
        <div className="block lg:hidden">
          <MobileNavbar />
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav />
    </>
  );
}
