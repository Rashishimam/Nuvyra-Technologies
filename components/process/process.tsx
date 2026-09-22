"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  MessageSquare,
  Target,
  Palette,
  Code2,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface ProcessStepItem {
  number: string;
  title: string;
  phase: string;
  description: string;
  deliverable: string;
  icon: React.ElementType;
  accent: string;
}

const PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: "01",
    title: "Discuss",
    phase: "Discovery & Alignment",
    description: "Understand your business, target customers, goals, and core requirements.",
    deliverable: "Project Scope & Strategy Blueprint",
    icon: MessageSquare,
    accent: "text-[#12372A] border-[#168B72]/30 bg-[#168B72]/10",
  },
  {
    number: "02",
    title: "Plan",
    phase: "Architecture & Sitemaps",
    description: "Define the structure, content hierarchy, features, and project direction.",
    deliverable: "Information Architecture & Wireframe Map",
    icon: Target,
    accent: "text-[#168B72] border-[#2AB7A9]/30 bg-[#2AB7A9]/10",
  },
  {
    number: "03",
    title: "Design",
    phase: "UI/UX & Interactive Prototypes",
    description: "Create a modern, conversion-focused user interface and mobile layout.",
    deliverable: "High-Fidelity Component System",
    icon: Palette,
    accent: "text-[#9A751F] border-[#D6A84B]/35 bg-[#D6A84B]/15",
  },
  {
    number: "04",
    title: "Develop",
    phase: "Next.js Engineering & QA",
    description: "Build, test, and optimize the website with clean code and sub-second speed.",
    deliverable: "Production Next.js & TS Codebase",
    icon: Code2,
    accent: "text-[#F26B4A] border-[#F26B4A]/30 bg-[#F26B4A]/10",
  },
  {
    number: "05",
    title: "Launch",
    phase: "Deployment & Verification",
    description: "Deploy the final product, configure analytics, and provide ongoing support.",
    deliverable: "Live Deployment & 100% Code Handover",
    icon: Rocket,
    accent: "text-[#168B72] border-[#168B72]/40 bg-[#168B72]/15",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="process"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 bg-[#F7F7F2] border-b border-[rgba(23,33,31,0.08)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Project Workflow"
          badgeVariant="emerald"
          title="How We"
          highlightText="Work"
          description="A clear, predictable 5-step roadmap that keeps your project on schedule from kickoff to launch."
        />

        {/* Clean Timeline with Progressively Animated Connecting Line */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated progressive gradient timeline line for desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="hidden lg:block absolute top-[44px] left-[6%] right-[6%] h-[2.5px] bg-gradient-to-r from-[#12372A] via-[#168B72] via-[#2AB7A9] via-[#D6A84B] via-[#F26B4A] to-[#168B72] z-0 pointer-events-none rounded-full shadow-xs"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "relative flex flex-col justify-between p-6 rounded-3xl bg-[#FFFFFF] border transition-all duration-300 cursor-pointer group select-none shadow-xs",
                    isSelected
                      ? "border-[#168B72] shadow-xl scale-[1.03] -translate-y-1"
                      : "border-[rgba(23,33,31,0.08)] hover:border-[rgba(23,33,31,0.22)] hover:shadow-md hover:-translate-y-0.5"
                  )}
                >
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold font-mono text-[#17211F] group-hover:text-[#12372A] transition-colors">
                          {step.number}
                        </span>
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full transition-all duration-300",
                            isSelected
                              ? "bg-[#168B72] scale-125 shadow-[0_0_8px_#168B72]"
                              : "bg-[rgba(23,33,31,0.15)] group-hover:bg-[#168B72]/60"
                          )}
                        />
                      </div>

                      <div className={cn("h-10 w-10 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110", step.accent)}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#168B72] block mb-1">
                      {step.phase}
                    </span>

                    <h3 className="text-base font-bold text-[#17211F] mb-2 tracking-tight group-hover:text-[#12372A] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#5A6966] leading-relaxed font-normal mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Output Milestone Tag */}
                  <div className="pt-3 border-t border-[rgba(23,33,31,0.06)]">
                    <div className="flex items-start gap-1.5 text-[11px] text-[#17211F]">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#168B72] shrink-0 mt-0.5" />
                      <span className="leading-snug">{step.deliverable}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
