"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Mail, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#18201F] text-[#F8FAF9] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-10 w-[400px] h-[400px] bg-[#168B72]/08 rounded-full blur-[160px] animate-float-slow"
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168B72] rounded-xl p-1 -m-1"
            >
              <Image
                src="/images/nuvyra-logo-clean.png"
                alt="Nuvyra Technologies Logo"
                width={180}
                height={44}
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-xs text-[#C2CEC9] leading-relaxed max-w-sm mb-4 font-normal">
              High-performance websites, web applications, and bespoke digital platforms engineered for businesses that demand technical rigor and aesthetic distinction.
            </p>

            <p className="text-[11px] text-[#C2CEC9]/70 font-mono">
              Direct development &bull; Production-ready Next.js &bull; 100% IP ownership
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 text-xs">
            <h4 className="font-mono font-semibold uppercase tracking-widest text-[#F8FAF9] mb-2 text-[11px]">
              Navigation
            </h4>
            <Link href="/" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              About Nuvyra
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Services
            </Link>
            <Link href="#process" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Our Process
            </Link>
            <Link href="#team" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Our Team
            </Link>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 text-xs">
            <h4 className="font-mono font-semibold uppercase tracking-widest text-[#F8FAF9] mb-2 text-[11px]">
              What We Build
            </h4>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Business Websites
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Landing Pages
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              E-Commerce Stores
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Web Applications
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Website Redesigns
            </Link>
            <Link href="#services" className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors">
              Custom Digital Solutions
            </Link>
          </div>

          {/* Direct Line */}
          <div className="lg:col-span-2 flex flex-col gap-3 text-xs">
            <h4 className="font-mono font-semibold uppercase tracking-widest text-[#F8FAF9] mb-2 text-[11px]">
              Direct Inquiries
            </h4>
            <a
              href="mailto:withdaniel912@gmail.com"
              className="text-[#C2CEC9] hover:text-[#2AB7A9] transition-colors flex items-center gap-2 truncate"
            >
              <Mail className="h-3.5 w-3.5 text-[#168B72] shrink-0" />
              <span className="truncate">withdaniel912@gmail.com</span>
            </a>
            <a
              href="https://wa.me/919334559315?text=Hi%20Joy%2C%20I%20found%20Nuvyra%20Technologies%20and%20would%20like%20to%20discuss%20a%20website%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C2CEC9] hover:text-emerald-400 transition-colors flex items-center gap-2"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Chat on WhatsApp &rarr;</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="mt-2 text-xs font-semibold text-[#2AB7A9] hover:text-white transition-colors inline-block cursor-pointer"
            >
              Start a Project &rarr;
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C2CEC9]">
          <p>&copy; {new Date().getFullYear()} Nuvyra Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
