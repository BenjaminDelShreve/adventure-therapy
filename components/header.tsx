"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="text-xl sm:text-2xl font-bold text-at-dark-green">Adventure Therapy</div>
          <Image
            src="/images/AT_Logo_Black.svg"
            alt="Adventure Therapy Logo"
            width={40}
            height={33}
            className="h-6 w-auto sm:h-8"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition-all duration-200 ease-in-out hover:text-foreground hover:translate-y-[-1px] focus-visible:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-sm ${
              isHome ? "text-foreground font-semibold" : "text-foreground/80"
            }`}
            aria-current={isHome ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href="/#what"
            className={`text-sm font-medium transition-all duration-200 ease-in-out hover:text-foreground hover:translate-y-[-1px] focus-visible:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-sm ${
              isHome ? "text-foreground/80" : "text-foreground/80"
            }`}
          >
            What We Do
          </Link>
          <Link
            href="/#who"
            className={`text-sm font-medium transition-all duration-200 ease-in-out hover:text-foreground hover:translate-y-[-1px] focus-visible:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-sm ${
              isHome ? "text-foreground/80" : "text-foreground/80"
            }`}
          >
            Who We Help
          </Link>
          <Link
            href="/#programs"
            className={`text-sm font-medium transition-all duration-200 ease-in-out hover:text-foreground hover:translate-y-[-1px] focus-visible:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-sm ${
              isHome ? "text-foreground/80" : "text-foreground/80"
            }`}
          >
            Programs
          </Link>
          <Link
            href="/#about"
            className={`text-sm font-medium transition-all duration-200 ease-in-out hover:text-foreground hover:translate-y-[-1px] focus-visible:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 rounded-sm ${
              isHome ? "text-foreground/80" : "text-foreground/80"
            }`}
          >
            About Us
          </Link>
        </nav>
        <Link href="/apply">
          <Button
            className={`bg-at-orange text-at-dark-green hover:bg-at-orange/90 shadow-md hover:shadow-lg border-2 border-at-orange font-semibold transition-shadow duration-200 ${
              pathname === "/apply" ? "ring-2 ring-at-dark-green ring-offset-2" : ""
            }`}
            aria-current={pathname === "/apply" ? "page" : undefined}
          >
            Apply
          </Button>
        </Link>
      </div>
    </header>
  )
}
