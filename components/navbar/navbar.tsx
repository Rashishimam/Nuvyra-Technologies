"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NuvyraLogo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-2.5 bg-[#F7F7F2]/90 backdrop-blur-xl border-b border-[rgba(23,33,31,0.08)] shadow-[0_4px_20px_-4px_rgba(23,33,31,0.06)]"
          : "py-4 sm:py-5 bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168B72] rounded-xl p-1 -m-1"
          >
            <Image
              src="/images/nuvyra-logo-clean.png"
              alt="Nuvyra Technologies Logo"
              width={180}
              height={44}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation Links with Animated Underline */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-[#FFFFFF]/85 border border-[rgba(23,33,31,0.08)] backdrop-blur-md shadow-xs"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={cn(
                    "text-sm font-medium px-3.5 py-1.5 rounded-full transition-colors duration-200 relative focus:outline-none focus-visible:text-[#168B72] text-center",
                    isActive
                      ? "text-[#12372A] font-bold"
                      : "text-[#5A6966] hover:text-[#17211F]"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active/Hover Animated Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#168B72]/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {hoveredItem === item.href && !isActive && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 bg-black/[0.03] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Emerald CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href="#contact"
              size="sm"
              variant="primary"
              className="gap-2 font-semibold text-xs tracking-wide py-2 px-4 shadow-[0_4px_14px_rgba(22,139,114,0.25)] animate-shimmer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2.5 rounded-xl text-[#17211F] hover:text-[#168B72] bg-[#FFFFFF] border border-[rgba(23,33,31,0.1)] shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168B72] active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Mobile Navigation"
            className="md:hidden fixed inset-x-0 top-[60px] bg-[#FFFFFF]/98 backdrop-blur-2xl border-b border-[rgba(23,33,31,0.1)] px-6 py-6 flex flex-col gap-5 shadow-xl"
          >
            <nav className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-base font-medium text-[#17211F] hover:text-[#168B72] hover:bg-[#F7F7F2] rounded-xl transition-all flex items-center justify-between border border-transparent hover:border-[rgba(23,33,31,0.06)]"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-[#5A6966]" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="pt-2 border-t border-[rgba(23,33,31,0.08)]">
              <Button
                href="#contact"
                size="md"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full gap-2 font-semibold text-xs py-3"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
