"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Check,
  ArrowRight,
  Globe,
  Sparkles,
  Layers,
  Smartphone,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

const CHECKLIST_ITEMS = [
  {
    title: "Look professional?",
    detail: "Builds instant credibility with a modern, high-standard digital presence.",
    accent: "text-[#168B72] bg-[#168B72]/10 border-[#168B72]/30",
  },
  {
    title: "Work smoothly on mobile?",
    detail: "Fluid responsive experience across phones, tablets, and desktops.",
    accent: "text-[#2AB7A9] bg-[#2AB7A9]/10 border-[#2AB7A9]/30",
  },
  {
    title: "Clearly explain what you offer?",
    detail: "Concise value proposition so visitors understand your business in seconds.",
    accent: "text-[#D6A84B] bg-[#D6A84B]/10 border-[#D6A84B]/30",
  },
  {
    title: "Make it easy for customers to contact you?",
    detail: "Frictionless inquiry forms, WhatsApp integration, and clear direct channels.",
    accent: "text-[#F26B4A] bg-[#F26B4A]/10 border-[#F26B4A]/30",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export function ProblemCallout() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative border-b border-[rgba(23,33,31,0.08)] bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="YOUR WEBSITE MATTERS"
          badgeVariant="emerald"
          title="Your Website Is Your"
          highlightText="First Impression."
          description="Give your customers a reason to trust your business from the moment they find you online."
          className="mb-12 sm:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left Column: Demo Website Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group"
          >
            <div className="relative rounded-3xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.12)] p-5 sm:p-6 shadow-xl transition-all duration-300 group-hover:border-[#168B72]/40 group-hover:shadow-2xl overflow-hidden">
              {/* Browser Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(23,33,31,0.08)] mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#F26B4A]/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#D6A84B]/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#2AB7A9]/80" />
                </div>

                {/* Simulated URL Bar */}
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(23,33,31,0.1)] text-[11px] font-mono text-[#5A6966] max-w-[220px] sm:max-w-xs truncate shadow-xs">
                  <Globe className="h-3 w-3 text-[#168B72] shrink-0" />
                  <span className="truncate">https://modern-business-demo.com</span>
                </div>

                {/* Explicit Honest Label */}
                <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#168B72]/10 text-[#12372A] border border-[#168B72]/30 uppercase tracking-wide">
                  DEMO WEBSITE
                </span>
              </div>

              {/* Simulated Website Content Area */}
              <div className="rounded-2xl bg-[#FFFFFF] border border-[rgba(23,33,31,0.08)] p-5 sm:p-7 relative overflow-hidden shadow-sm">
                {/* Background Accent Mesh */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#2AB7A9]/08 rounded-full blur-2xl pointer-events-none" />

                {/* Mini Website Navbar */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(23,33,31,0.06)] mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="h-6 w-6 rounded-lg bg-[#12372A] flex items-center justify-center text-white text-xs font-bold font-mono">
                      N
                    </div>
                    <span className="text-xs font-bold text-[#17211F] tracking-tight">Apex Solutions</span>
                  </div>

                  <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#5A6966]">
                    <span>Services</span>
                    <span>About</span>
                    <span>Case Studies</span>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#168B72]/10 border border-[#168B72]/30 text-[#12372A] text-[10px] font-semibold">
                    Get in Touch
                  </span>
                </div>

                {/* Mini Website Hero */}
                <div className="text-left mb-6">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F7F2] border border-[rgba(23,33,31,0.08)] text-[10px] font-mono text-[#12372A] mb-2.5">
                    <Sparkles className="h-3 w-3 text-[#D6A84B]" />
                    <span>BESPOKE DIGITAL PRESENCE</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[#17211F] tracking-tight leading-snug mb-2">
                    Engineered For <span className="text-gradient-emerald">Business Clarity.</span>
                  </h4>

                  <p className="text-xs text-[#5A6966] max-w-sm leading-relaxed mb-4">
                    High-performance websites designed to turn first-time visitors into paying inquiries.
                  </p>

                  <div className="flex items-center gap-2.5">
                    <div className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#12372A] to-[#168B72] text-white font-semibold text-[11px] shadow-xs">
                      Start Project
                    </div>
                    <div className="px-3.5 py-1.5 rounded-lg bg-[#F7F7F2] text-[#17211F] font-medium text-[11px] border border-[rgba(23,33,31,0.1)]">
                      Learn More
                    </div>
                  </div>
                </div>

                {/* Mini 3-Column Feature Cards */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[rgba(23,33,31,0.06)]">
                  <div className="p-2.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                    <Smartphone className="h-3.5 w-3.5 text-[#168B72] mb-1.5" />
                    <p className="text-[11px] font-semibold text-[#17211F]">Mobile Ready</p>
                    <p className="text-[9px] text-[#5A6966] hidden sm:block">Pixel-perfect flow</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#2AB7A9] mb-1.5" />
                    <p className="text-[11px] font-semibold text-[#17211F]">High Trust</p>
                    <p className="text-[9px] text-[#5A6966] hidden sm:block">Clear value props</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                    <Layers className="h-3.5 w-3.5 text-[#D6A84B] mb-1.5" />
                    <p className="text-[11px] font-semibold text-[#17211F]">Fast Speeds</p>
                    <p className="text-[9px] text-[#5A6966] hidden sm:block">Clean Next.js code</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Checklist & Action */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono font-medium text-[#168B72] uppercase tracking-widest block mb-2">
                  Website Health Check
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] tracking-tight">
                  Does your website...
                </h3>
              </div>

              {/* Animated Checklist Items */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="space-y-3.5 mb-8"
              >
                {CHECKLIST_ITEMS.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="p-4 rounded-2xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.08)] hover:border-[#168B72]/40 hover:bg-[#FFFFFF] hover:shadow-md transition-all duration-200 flex items-start gap-3.5 group/item"
                  >
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${item.accent}`}>
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#17211F] group-hover/item:text-[#12372A] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#5A6966] leading-relaxed font-normal mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA Container */}
            <div className="pt-6 border-t border-[rgba(23,33,31,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#5A6966] font-medium">
                  Need a better online presence?
                </p>
                <Link
                  href="#work"
                  className="text-xs font-semibold text-[#168B72] hover:text-[#12372A] inline-flex items-center gap-1.5 transition-colors mt-0.5"
                >
                  <span>See Our Work</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              <Link href="#contact" className="w-full sm:w-auto">
                <Button size="md" variant="primary" className="w-full sm:w-auto gap-2 text-xs font-semibold py-2.5 px-5 shadow-md shadow-[#168B72]/20 animate-shimmer">
                  <span>Build My Website</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
