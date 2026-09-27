"use client";

import React from "react";
import Link from "next/link";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { NuvyraLogo } from "@/components/ui/logo";

export function Footer() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "#top");
      return;
    }
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#12372A] text-[#F8FAF9] py-12 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#168B72]/15 rounded-full blur-[80px] sm:blur-[160px] animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 w-[300px] h-[300px] bg-[#2AB7A9]/10 rounded-full blur-[70px] sm:blur-[140px] animate-pulse-subtle"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10 pb-10 border-b border-white/10">
          {/* 1. NUVYRA TECHNOLOGIES Brand Block */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <Link
              href="#top"
              onClick={(e) => scrollToSection(e, "#top")}
              className="flex items-center gap-3 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2AB7A9] rounded-xl p-1 -m-1"
            >
              <NuvyraLogo
                theme="dark"
                size="md"
                className="transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-xs sm:text-sm text-[#C2CEC9] leading-relaxed max-w-sm font-normal">
              Modern websites, web applications, and digital solutions engineered for business growth.
            </p>
          </div>

          {/* 2. NAVIGATION Links */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-2.5 text-xs">
            <h4 className="font-mono font-semibold uppercase tracking-widest text-[#2AB7A9] mb-1.5 text-[11px]">
              Navigation
            </h4>
            <Link
              href="#top"
              onClick={(e) => scrollToSection(e, "#top")}
              className="text-[#C2CEC9] hover:text-[#F8FAF9] transition-colors w-fit"
            >
              Home
            </Link>
            <Link
              href="#about"
              onClick={(e) => scrollToSection(e, "#about")}
              className="text-[#C2CEC9] hover:text-[#F8FAF9] transition-colors w-fit"
            >
              About
            </Link>
            <Link
              href="#services"
              onClick={(e) => scrollToSection(e, "#services")}
              className="text-[#C2CEC9] hover:text-[#F8FAF9] transition-colors w-fit"
            >
              Services
            </Link>
            <Link
              href="#process"
              onClick={(e) => scrollToSection(e, "#process")}
              className="text-[#C2CEC9] hover:text-[#F8FAF9] transition-colors w-fit"
            >
              Process
            </Link>
            <Link
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="text-[#C2CEC9] hover:text-[#F8FAF9] transition-colors w-fit"
            >
              Contact
            </Link>
          </div>

          {/* 3. CONTACT Action Links */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col gap-3 text-xs">
            <h4 className="font-mono font-semibold uppercase tracking-widest text-[#2AB7A9] mb-1.5 text-[11px]">
              Contact Us
            </h4>
            <a
              href="mailto:sourav620kumar@gmail.com"
              className="text-[#C2CEC9] hover:text-white transition-colors inline-flex items-center gap-2 group w-fit"
            >
              <Mail className="h-3.5 w-3.5 text-[#2AB7A9] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Email Us &rarr;</span>
            </a>
            <a
              href="https://wa.me/919334559315?text=Hi%2C%20I%20found%20Nuvyra%20Technologies%20and%20would%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C2CEC9] hover:text-emerald-300 transition-colors inline-flex items-center gap-2 group w-fit"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span>Chat on WhatsApp &rarr;</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="mt-1 text-xs font-semibold text-[#2AB7A9] hover:text-white transition-colors inline-flex items-center gap-1.5 group cursor-pointer w-fit"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 4. BOTTOM Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#C2CEC9]">
          <p>&copy; 2026 Nuvyra Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
