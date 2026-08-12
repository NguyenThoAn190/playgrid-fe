"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@workspace/ui/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center transition-opacity hover:opacity-90 shrink-0",
        className
      )}
    >
      {/* Light Mode Logo */}
      <img
        src="/logo/logo-nav-playgrid-black.avif"
        alt="PlayGrid Logo"
        width={115}
        height={28}
        className="h-6 sm:h-7 md:h-7.5 w-auto object-contain dark:hidden"
        fetchPriority="high"
      />
      {/* Dark Mode Logo */}
      <img
        src="/logo/logo-nav-playgrid-white.avif"
        alt="PlayGrid Logo"
        width={115}
        height={28}
        className="hidden h-6 sm:h-7 md:h-7.5 w-auto object-contain dark:block"
        fetchPriority="high"
      />
    </Link>
  );
}

