"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Sparkles,
  Layout,
  MousePointerClick,
  Compass,
  Layers,
  AlertCircle,
  Globe,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

export function BeforeAfter() {
  return (
    <section id="work" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-b border-[rgba(23,33,31,0.08)] bg-[#F7F7F2]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Website Redesign"
          badgeVariant="coral"
          title="See What a Better Website"
          highlightText="Can Look Like"
          description="From a confusing online presence to a cleaner, more authoritative client experience."
          className="mb-8 sm:mb-10"
        />

        {/* Side-by-Side Comparison Container */}
        <div className="max-w-6xl mx-auto mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* ================= LEFT: BEFORE (CLUTTERED / OUTDATED) ================= */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono font-bold text-[#5A6966] uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  BEFORE
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FFFFFF] text-[#5A6966] border border-[rgba(23,33,31,0.1)]">
                  DEMO — BEFORE
                </span>
              </div>

              {/* Outdated Browser Mockup Window */}
              <div className="rounded-2xl bg-[#E8ECE9] border border-[rgba(23,33,31,0.12)] p-4 sm:p-5 flex flex-col justify-between flex-1 shadow-sm opacity-90">
                {/* Outdated Chrome Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(23,33,31,0.1)] mb-4 text-[10px] font-mono text-[#5A6966]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                  </div>
                  <span className="truncate max-w-[150px] text-[#5A6966]">Business Website</span>
                  <span className="text-[9px] text-amber-700 font-sans">Outdated Structure</span>
                </div>

                {/* Cluttered Legacy Content */}
                <div className="space-y-3 font-sans text-xs">
                  {/* Cluttered Header */}
                  <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[rgba(23,33,31,0.08)] space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-700">
                      <span className="font-bold">Your Company Name</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[9px] text-slate-500 border-t border-[rgba(23,33,31,0.06)] pt-1.5">
                      <span>Home</span>
                      <span>About Us</span>
                      <span>Services List</span>
                      <span>History</span>
                      <span>Downloads</span>
                      <span>Links</span>
                    </div>
                  </div>

                  {/* Dense Text Hero */}
                  <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[rgba(23,33,31,0.08)] space-y-2">
                    <span className="text-[11px] font-bold text-slate-800 block">
                      Welcome to our business portal
                    </span>
                    <p className="text-[10px] text-slate-600 leading-relaxed">
                      We provide multiple offerings and general services. Please review our index of forms, documents, and options below to find what matches your current requirements.
                    </p>
                    <div className="pt-1">
                      <button className="px-3 py-1 rounded bg-slate-200 text-slate-700 text-[10px] border border-slate-300 cursor-default">
                        Click Here to Read More
                      </button>
                    </div>
                  </div>

                  {/* Cluttered Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-600">
                    <div className="p-2.5 bg-[#FFFFFF] rounded-xl border border-[rgba(23,33,31,0.08)] space-y-1">
                      <span className="font-bold text-slate-800 block">General Inquiries</span>
                      <p className="text-[9px] text-slate-500 leading-tight">Fill out multiple forms or email admin.</p>
                    </div>
                    <div className="p-2.5 bg-[#FFFFFF] rounded-xl border border-[rgba(23,33,31,0.08)] space-y-1">
                      <span className="font-bold text-slate-800 block">Download Catalog</span>
                      <p className="text-[9px] text-slate-500 leading-tight">Download static documents and lists.</p>
                    </div>
                  </div>
                </div>

                {/* Legacy Weaknesses Footer */}
                <div className="mt-4 pt-3 border-t border-[rgba(23,33,31,0.08)] flex items-center justify-between text-[10px] text-slate-600 font-mono">
                  <span className="flex items-center gap-1 text-slate-600">
                    <AlertCircle className="h-3 w-3 text-slate-500" />
                    Unclear Flow
                  </span>
                  <span>Cluttered UI</span>
                  <span>Low Inquiries</span>
                </div>
              </div>
            </motion.div>

            {/* ================= CENTER: TRANSITION INDICATOR ================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0"
            >
              <div className="flex flex-col items-center gap-2.5">
                <div className="h-12 w-12 rounded-2xl bg-[#12372A] border border-[#168B72]/30 flex items-center justify-center text-white shadow-md">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#12372A] block">
                    REDESIGN
                  </span>
                  <span className="text-[9px] text-[#5A6966] font-mono">
                    Nuvyra Transformation
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT: AFTER (CLEAN / HIGH-CONVERTING) ================= */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono font-bold text-[#168B72] uppercase tracking-wider flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#168B72] shadow-[0_0_6px_#168B72] animate-pulse" />
                  AFTER
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#168B72]/10 text-[#12372A] border border-[#168B72]/30 font-semibold">
                  DEMO — AFTER
                </span>
              </div>

              {/* Modern Browser Mockup Window */}
              <div className="rounded-2xl bg-[#FFFFFF] border border-[#168B72]/40 p-4 sm:p-5 flex flex-col justify-between flex-1 shadow-xl relative overflow-hidden group hover:border-[#168B72] transition-all duration-300">
                {/* Modern Chrome Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[rgba(23,33,31,0.08)] mb-4 text-[10px] font-mono text-[#5A6966]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-[#F26B4A]/80" />
                    <div className="h-2 w-2 rounded-full bg-[#D6A84B]/80" />
                    <div className="h-2 w-2 rounded-full bg-[#2AB7A9]/80" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F7F2] border border-[rgba(23,33,31,0.08)] text-[10px] text-[#17211F]">
                    <Globe className="h-3 w-3 text-[#168B72]" />
                    <span className="truncate max-w-[140px]">Modern Business Website</span>
                  </div>
                  <span className="text-[9px] text-[#168B72] font-mono font-medium">Fast &amp; High-Trust</span>
                </div>

                {/* Polished Modern Content */}
                <div className="space-y-3 font-sans text-xs">
                  {/* Clean Navigation */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(23,33,31,0.06)]">
                    <div className="flex items-center gap-2">
                      <div className="h-4.5 w-4.5 rounded-md bg-[#12372A] flex items-center justify-center text-white text-[9px] font-bold">
                        Y
                      </div>
                      <span className="text-[11px] font-bold text-[#17211F] tracking-tight">Your Business</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 text-[10px] text-[#5A6966]">
                      <span>Services</span>
                      <span>About</span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-[#168B72]/15 text-[#12372A] text-[9px] font-semibold border border-[#168B72]/30">
                      Contact
                    </span>
                  </div>

                  {/* Clean Hero Section */}
                  <div className="p-3.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)] space-y-2">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFFFFF] text-[#12372A] text-[9px] font-mono border border-[rgba(23,33,31,0.08)]">
                      <Sparkles className="h-2.5 w-2.5 text-[#D6A84B]" />
                      <span>HIGH-IMPACT DIGITAL PRESENCE</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-[#17211F] tracking-tight leading-snug">
                      Modern website built around <span className="text-gradient-emerald">your business.</span>
                    </h4>

                    <p className="text-[10px] text-[#5A6966] leading-relaxed font-normal">
                      Clear messaging, professional design and an easy path for visitors to get in touch.
                    </p>

                    <div className="flex items-center gap-2 pt-0.5">
                      <a
                        href="#contact"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById("contact");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#12372A] to-[#168B72] text-white font-semibold text-[10px] shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
                      >
                        Start a Project
                      </a>
                      <div className="px-3 py-1 rounded-lg bg-[#FFFFFF] text-[#17211F] font-medium text-[10px] border border-[rgba(23,33,31,0.1)]">
                        View Services
                      </div>
                    </div>
                  </div>

                  {/* 2 Clean Service Cards */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                      <span className="font-semibold text-[#17211F] block text-[10px]">Business Websites</span>
                      <span className="text-[9px] text-[#5A6966] block mt-0.5">Responsive &amp; fast</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                      <span className="font-semibold text-[#17211F] block text-[10px]">Web Applications</span>
                      <span className="text-[9px] text-[#5A6966] block mt-0.5">Custom workflows</span>
                    </div>
                  </div>
                </div>

                {/* Modern Advantages Footer */}
                <div className="mt-4 pt-3 border-t border-[rgba(23,33,31,0.06)] flex items-center justify-between text-[10px] text-[#168B72] font-mono">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-[#168B72]" />
                    Clear Messaging
                  </span>
                  <span>Responsive</span>
                  <span>High Inquiries</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= BOTTOM: TRANSFORMATION HIGHLIGHTS ================= */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="light" className="p-5 border-[rgba(23,33,31,0.08)] bg-[#FFFFFF] flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-8 w-8 rounded-xl bg-[#168B72]/10 border border-[#168B72]/20 flex items-center justify-center text-[#168B72] mb-3">
                  <Compass className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17211F] mb-1">Clearer User Journey</h4>
                <p className="text-xs sm:text-sm text-[#5A6966] leading-relaxed font-normal">
                  Make it easier for visitors to understand your business and take the next step.
                </p>
              </div>
            </Card>

            <Card variant="light" className="p-5 border-[rgba(23,33,31,0.08)] bg-[#FFFFFF] flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-8 w-8 rounded-xl bg-[#2AB7A9]/10 border border-[#2AB7A9]/20 flex items-center justify-center text-[#2AB7A9] mb-3">
                  <Layout className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17211F] mb-1">Cleaner Layout</h4>
                <p className="text-xs sm:text-sm text-[#5A6966] leading-relaxed font-normal">
                  Organized structure that removes clutter and guides focus naturally.
                </p>
              </div>
            </Card>

            <Card variant="light" className="p-5 border-[rgba(23,33,31,0.08)] bg-[#FFFFFF] flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-8 w-8 rounded-xl bg-[#D6A84B]/15 border border-[#D6A84B]/25 flex items-center justify-center text-[#9A751F] mb-3">
                  <Layers className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17211F] mb-1">Stronger Hierarchy</h4>
                <p className="text-xs sm:text-sm text-[#5A6966] leading-relaxed font-normal">
                  Editorial typography and spacing that emphasize key services immediately.
                </p>
              </div>
            </Card>

            <Card variant="light" className="p-5 border-[rgba(23,33,31,0.08)] bg-[#FFFFFF] flex flex-col justify-between shadow-sm">
              <div>
                <div className="h-8 w-8 rounded-xl bg-[#F26B4A]/10 border border-[#F26B4A]/20 flex items-center justify-center text-[#F26B4A] mb-3">
                  <MousePointerClick className="h-4 w-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#17211F] mb-1">Clear Calls-to-Action</h4>
                <p className="text-xs sm:text-sm text-[#5A6966] leading-relaxed font-normal">
                  Frictionless contact pathways designed to encourage genuine inquiries.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
