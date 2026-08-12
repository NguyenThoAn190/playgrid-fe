"use client";

import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function Navbar() {
  return (
    <>
      {/* PC / Laptop Navbar (Visible on lg screens and up) */}
      <div className="hidden lg:block">
        <DesktopNavbar />
      </div>

      {/* Mobile Top Header (Visible on smaller screens < lg) */}
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav />
    </>
  );
}
