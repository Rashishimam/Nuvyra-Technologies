"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  MessageSquareCheck,
  Cpu,
  Palette,
  Layers,
  Smartphone,
  ShieldCheck,
  Headphones,
  Globe,
  Sparkles,
  Code2,
  Workflow,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface WhyReason {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const CAPABILITIES = [
  { name: "Web Development", icon: Globe },
  { name: "Custom Software", icon: Code2 },
  { name: "Practical AI", icon: Sparkles },
  { name: "UI/UX Design", icon: Palette },
  { name: "Automation", icon: Workflow },
];

const WHY_REASONS: WhyReason[] = [
  {
    id: "direct-comm",
    title: "Direct Communication",
    description: "You work directly with the developers building your product. No middle managers or communication delays.",
    icon: MessageSquareCheck,
  },
  {
    id: "custom-solutions",
    title: "Custom-Built Solutions",
    description: "Every website and application is engineered specifically around your business goals, never generic templates.",
    icon: Cpu,
  },
  {
    id: "modern-responsive",
    title: "Modern Responsive Design",
    description: "Polished user interfaces tested across mobile phones, tablets, laptops, and ultra-wide desktop monitors.",
    icon: Smartphone,
  },
  {
    id: "clear-process",
    title: "Clear Project Process",
    description: "Structured 5-step roadmap with transparent milestones, staging previews, and predictable delivery dates.",
    icon: Layers,
  },
  {
    id: "business-focused",
    title: "Business-Focused Development",
    description: "We focus on solving operational roadblocks, building brand trust, and maximizing client inquiry conversions.",
    icon: ShieldCheck,
  },
  {
    id: "post-launch",
    title: "Post-Launch Support",
    description: "Clean code documentation, handover walk-throughs, and technical support after your product goes live.",
    icon: Headphones,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 border-b border-white/10 bg-[#12372A] text-[#F8FAF9] overflow-hidden"
    >
      {/* Subtle Dark Grid & Continuous Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-10 w-[500px] h-[500px] bg-[#2AB7A9]/10 rounded-full blur-[140px] animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#D6A84B]/08 rounded-full blur-[150px] animate-float-reverse"
      />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* ================= EDITORIAL ABOUT (DARK) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <span className="text-xs font-mono font-semibold text-[#2AB7A9] uppercase tracking-widest mb-4">
            About Nuvyra Technologies
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F8FAF9] tracking-tight leading-[1.12] mb-6">
            Technology should solve problems,{" "}
            <span className="text-gradient-light-emerald block sm:inline">
              not create more of them.
            </span>
          </h2>

          <p className="text-sm sm:text-lg text-[#C2CEC9] leading-relaxed max-w-2xl font-normal mb-10">
            Nuvyra is a focused digital studio combining modern software engineering, clean interface design, and practical business problem-solving. We partner with founders, businesses, and creators who need high-performance digital products without agency bloat.
          </p>

          {/* Capabilities Row with Staggered Entrance */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {CAPABILITIES.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18201F]/80 border border-white/15 text-xs text-[#F8FAF9] font-medium shadow-sm hover:border-[#2AB7A9]/60 hover:scale-105 transition-all duration-200"
                >
                  <Icon className="h-4 w-4 text-[#2AB7A9]" />
                  <span>{cap.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ================= WHY BUSINESSES CHOOSE NUVYRA ================= */}
        <div className="pt-16 border-t border-white/10">
          <SectionHeader
            theme="dark"
            badge="Why Us"
            title="Why Businesses"
            highlightText="Choose Nuvyra"
            description="We build digital products with technical rigor, direct accountability, and practical business focus."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHY_REASONS.map((reason) => {
              const Icon = reason.icon;
              return (
                <motion.div key={reason.id} variants={itemVariants} className="h-full">
                  <Card
                    variant="dark"
                    className="flex items-start gap-4 p-6 border-white/12 bg-[#18201F]/90 hover:border-[#2AB7A9]/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full shadow-md animate-border-breathe"
                    glowOnHover={false}
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#12372A] to-[#168B72] border border-[#2AB7A9]/30 flex items-center justify-center text-[#2AB7A9] shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#F8FAFC] mb-1.5 tracking-tight">
                        {reason.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#C2CEC9] leading-relaxed font-normal">
                        {reason.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
