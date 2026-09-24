"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Target, MessageSquare, Zap } from "lucide-react";

const STRENGTHS = [
  {
    number: "01",
    title: "Business-Focused",
    description: "Solutions designed around practical goals.",
    icon: Target,
    accent: "text-[#168B72] bg-[#168B72]/10 border-[#168B72]/25",
  },
  {
    number: "02",
    title: "Direct Communication",
    description: "Clear communication without unnecessary agency layers.",
    icon: MessageSquare,
    accent: "text-[#2AB7A9] bg-[#2AB7A9]/10 border-[#2AB7A9]/25",
  },
  {
    number: "03",
    title: "Built for Performance",
    description: "Responsive, maintainable and production-ready development.",
    icon: Zap,
    accent: "text-[#9A751F] bg-[#D6A84B]/15 border-[#D6A84B]/30",
  },
];

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const easeCurve = [0.21, 0.47, 0.32, 0.98] as const;

  const headerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: easeCurve,
      },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: easeCurve,
      },
    },
  };

  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.5,
        ease: easeCurve,
      },
    },
  };

  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: easeCurve,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-b border-[rgba(23,33,31,0.08)] bg-[#F7F7F2]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Block with Staggered Entrance */}
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto gap-2.5 mb-8 sm:mb-10"
        >
          <motion.div variants={badgeVariants}>
            <Badge
              variant="emerald"
              className="text-[10px] sm:text-[11px] py-1 px-3.5 tracking-widest uppercase font-mono"
            >
              ABOUT NUVYRA
            </Badge>
          </motion.div>

          <motion.h2
            variants={headingVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#17211F] tracking-tight leading-[1.18]"
          >
            Digital Solutions Built Around{" "}
            <span className="text-gradient-emerald">Real Business Needs.</span>
          </motion.h2>

          <motion.p
            variants={descriptionVariants}
            className="text-sm sm:text-base text-[#5A6966] leading-relaxed font-normal max-w-2xl mt-1"
          >
            Nuvyra Technologies designs and develops modern websites, web applications, and custom digital solutions with a focus on clarity, performance, usability, and direct communication.
          </motion.p>
        </motion.div>

        {/* 3 Compact Strengths */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {STRENGTHS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                variants={cardItemVariants}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(23,33,31,0.09)] hover:border-[#168B72]/40 hover:shadow-[0_12px_28px_-6px_rgba(22,139,114,0.12)] transition-all duration-200 flex flex-col justify-between group shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#168B72] tracking-wider">
                      {item.number}
                    </span>
                    <div className={`h-8 w-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-105 ${item.accent}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#17211F] mb-1.5 group-hover:text-[#12372A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#5A6966] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
