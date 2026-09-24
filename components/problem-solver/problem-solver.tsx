"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  RefreshCw,
  ShoppingCart,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface SolutionOption {
  id: string;
  problem: string;
  icon: React.ElementType;
  recommendedService: string;
  explanation: string;
  deliverables: string[];
}

const SOLUTION_OPTIONS: SolutionOption[] = [
  {
    id: "new-website",
    problem: "I need a new website",
    icon: Globe,
    recommendedService: "Bespoke Business Website",
    explanation:
      "We design and build a modern, high-speed website from the ground up tailored to establish credibility, showcase your work, and convert visitors into client inquiries.",
    deliverables: [
      "Custom responsive design for desktop & mobile",
      "Sub-second load speed with 95+ Core Web Vitals",
      "Built-in SEO structure and easy inquiry forms",
    ],
  },
  {
    id: "website-redesign",
    problem: "My website needs a redesign",
    icon: RefreshCw,
    recommendedService: "Complete Website Redesign",
    explanation:
      "We overhaul your existing outdated layout into a sleek, high-converting digital experience with modern typography, improved mobile navigation, and faster performance.",
    deliverables: [
      "Modern visual makeover matching your brand identity",
      "Streamlined UX and intuitive navigation paths",
      "Zero downtime migration and performance upgrade",
    ],
  },
  {
    id: "online-store",
    problem: "I need an online store",
    icon: ShoppingCart,
    recommendedService: "Modern E-Commerce Solution",
    explanation:
      "We build high-converting e-commerce websites with smooth product catalogs, instant search, and secure checkout flows designed to minimize cart abandonment.",
    deliverables: [
      "Fast product browsing and category filtering",
      "Secure payment and automated order notifications",
      "Mobile-optimized checkout and inventory structure",
    ],
  },
  {
    id: "web-application",
    problem: "I need a web application",
    icon: Layers,
    recommendedService: "Custom Web App & SaaS MVP",
    explanation:
      "From client portals to operational dashboards, we architect full-stack web applications with interactive workflows, secure authentication, and scalable databases.",
    deliverables: [
      "Interactive multi-user dashboard interfaces",
      "Modular database, auth, and API architecture",
      "Engineered to scale as your active users grow",
    ],
  },
  {
    id: "custom-idea",
    problem: "I have a custom idea",
    icon: Sparkles,
    recommendedService: "Custom Digital Solution & Strategy",
    explanation:
      "Have a unique business concept or specialized workflow? We collaborate directly with you to scope the requirements and build a tailor-made digital solution.",
    deliverables: [
      "Direct technical consultation & scope blueprint",
      "Modular architecture tailored to your specific logic",
      "Full code ownership with zero developer lock-in",
    ],
  },
];

export function ProblemSolver() {
  const [selectedId, setSelectedId] = useState<string>(SOLUTION_OPTIONS[0].id);

  const selectedOption =
    SOLUTION_OPTIONS.find((opt) => opt.id === selectedId) || SOLUTION_OPTIONS[0];

  return (
    <section
      id="solutions"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-b border-[rgba(23,33,31,0.08)] bg-[#F7F7F2]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Interactive Guidance"
          badgeVariant="teal"
          title="What Does Your"
          highlightText="Business Need?"
          description="Select your project objective below to see our recommended development approach and concrete deliverables."
          className="mb-8 sm:mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {/* Options Column (Left) */}
          <div
            role="radiogroup"
            aria-label="Select what your business needs"
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3"
          >
            {SOLUTION_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isSelected = selectedId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedId(option.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(option.id);
                    }
                  }}
                  className={cn(
                    "w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center justify-between group cursor-pointer border text-xs sm:text-sm font-medium",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168B72]",
                    isSelected
                      ? "bg-[#FFFFFF] border-[#168B72] text-[#12372A] shadow-md scale-[1.01]"
                      : "bg-[#FFFFFF]/70 border-[rgba(23,33,31,0.08)] text-[#5A6966] hover:bg-[#FFFFFF] hover:text-[#17211F] hover:border-[rgba(23,33,31,0.15)] shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300",
                        isSelected
                          ? "bg-[#168B72] text-white shadow-xs"
                          : "bg-[#F7F7F2] text-[#5A6966] border border-[rgba(23,33,31,0.08)] group-hover:text-[#17211F]"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold">{option.problem}</span>
                  </div>

                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border flex items-center justify-center transition-all",
                      isSelected
                        ? "border-[#168B72] bg-[#168B72]"
                        : "border-[rgba(23,33,31,0.2)] group-hover:border-[rgba(23,33,31,0.4)]"
                    )}
                  >
                    {isSelected && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recommendation Output Column (Right) */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedOption.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <Card variant="light" className="p-7 sm:p-9 border-[rgba(23,33,31,0.1)] bg-[#FFFFFF] flex flex-col justify-between h-full relative overflow-hidden shadow-xl">
                  {/* Subtle Ambient Accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#2AB7A9]/06 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header Tag */}
                    <div className="flex items-center justify-between pb-4 border-b border-[rgba(23,33,31,0.08)] mb-6">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#168B72] uppercase tracking-wider">
                        <Cpu className="h-3.5 w-3.5 text-[#168B72]" />
                        <span>Recommended Solution</span>
                      </div>
                      <span className="text-xs text-[#5A6966] font-mono">
                        Nuvyra Direct Delivery
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17211F] mb-3 tracking-tight">
                      {selectedOption.recommendedService}
                    </h3>

                    <p className="text-sm sm:text-base text-[#5A6966] leading-relaxed mb-6 font-normal">
                      {selectedOption.explanation}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2.5 mb-8 p-4 rounded-2xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.06)]">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-[#12372A] font-semibold mb-2">
                        What We Deliver:
                      </p>
                      {selectedOption.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-[#168B72] shrink-0" />
                          <span className="text-xs sm:text-sm text-[#17211F] font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 pt-5 border-t border-[rgba(23,33,31,0.08)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <Button
                      href="#contact"
                      size="md"
                      variant="primary"
                      className="w-full sm:w-auto gap-2 text-xs py-3 px-5 font-semibold shadow-md shadow-[#168B72]/20 animate-shimmer"
                    >
                      <span>Start a Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>

                    <p className="text-[11px] text-[#5A6966] text-center sm:text-left font-mono">
                      Fast response &bull; Direct consultation
                    </p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
