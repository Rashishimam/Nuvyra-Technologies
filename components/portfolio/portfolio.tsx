"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  ShoppingCart,
  Sparkles,
  BarChart3,
  Layers,
  Palette,
  Terminal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { PortfolioItem } from "@/types";

const CATEGORIES = ["All", "Websites", "Web Apps", "AI & Tools", "E-Commerce"] as const;

const PROJECTS: (PortfolioItem & {
  categoryFilter: "All" | "Websites" | "Web Apps" | "AI & Tools" | "E-Commerce";
  icon: React.ElementType;
  themeStyle: "light" | "dark";
  gradient: string;
})[] = [
  {
    id: "business-website-concept",
    title: "Business Website Concept",
    category: "Corporate Business Website",
    categoryFilter: "Websites",
    typeLabel: "Concept Project",
    tagline: "A professional web presence concept for a corporate services business.",
    problem:
      "Many business websites lack clear structure, readable content hierarchy and a defined path for visitors to take action.",
    solution:
      "A clean, multi-page Next.js website with clear service sections, mobile-first layout and a prominent contact flow.",
    whatWeBuilt:
      "Responsive multi-page website, clear service presentation, structured navigation, and contact form integration.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SEO"],
    icon: Globe,
    themeStyle: "light",
    gradient: "from-[#168B72]/15 via-[#2AB7A9]/08 to-transparent",
  },
  {
    id: "ecommerce-website-concept",
    title: "E-Commerce Website Concept",
    category: "Modern E-Commerce Store",
    categoryFilter: "E-Commerce",
    typeLabel: "Concept Project",
    tagline: "A fast, mobile-friendly online store concept with a streamlined checkout experience.",
    problem:
      "E-commerce stores often struggle with slow load times, cluttered product pages and poor mobile checkout flows.",
    solution:
      "A modern storefront concept built for speed, with clear product browsing and a simplified cart and checkout flow.",
    whatWeBuilt:
      "Custom e-commerce frontend, product listing pages, instant search filters, and cart architecture.",
    technologies: ["Next.js", "TypeScript", "Cart Engine", "Edge Cache"],
    icon: ShoppingCart,
    themeStyle: "dark",
    gradient: "from-[#2AB7A9]/20 via-[#12372A] to-transparent",
  },
  {
    id: "ai-web-app-concept",
    title: "AI Web App Concept",
    category: "AI Productivity Web App",
    categoryFilter: "AI & Tools",
    typeLabel: "Concept Project",
    tagline: "A concept web application demonstrating intelligent document processing capabilities.",
    problem:
      "Businesses handling large volumes of documents often face slow manual review processes that create operational bottlenecks.",
    solution:
      "A web dashboard concept integrating an automated text extraction pipeline with structured export and search.",
    whatWeBuilt:
      "Secure web dashboard, automated summarisation engine, file upload interface, and structured data parsers.",
    technologies: ["React", "FastAPI", "Vector Search", "TypeScript"],
    icon: Sparkles,
    themeStyle: "light",
    gradient: "from-[#D6A84B]/15 via-[#F26B4A]/08 to-transparent",
  },
  {
    id: "business-dashboard-concept",
    title: "Business Dashboard Concept",
    category: "Business Intelligence Tool",
    categoryFilter: "Web Apps",
    typeLabel: "Demo Project",
    tagline: "A demo analytics dashboard showing real-time metrics and team performance views.",
    problem:
      "Teams that track performance across multiple spreadsheets often lack a single, clear view of what is happening.",
    solution:
      "A centralised web dashboard concept with live charting, filterable metrics and role-based access design.",
    whatWeBuilt:
      "Custom analytics interface, interactive charts, date range filters, and user role management layout.",
    technologies: ["Next.js", "Tailwind CSS", "Data Visualisation", "Role Auth"],
    icon: BarChart3,
    themeStyle: "dark",
    gradient: "from-[#12372A] via-[#168B72]/25 to-transparent",
  },
  {
    id: "operations-web-app-concept",
    title: "Operations Web App Concept",
    category: "Custom Web Application",
    categoryFilter: "Web Apps",
    typeLabel: "Concept Project",
    tagline: "A concept project management web app for tracking tasks, milestones and team updates.",
    problem:
      "Teams managing projects across disconnected tools often face miscommunication and missed deadlines.",
    solution:
      "A custom web application concept with task boards, milestone tracking and a client-facing status portal.",
    whatWeBuilt:
      "Sprint tracking board, project milestone view, client status portals, and real-time update notifications.",
    technologies: ["TypeScript", "Full-Stack", "Modular DB", "Cloud APIs"],
    icon: Layers,
    themeStyle: "light",
    gradient: "from-[#168B72]/15 via-[#D6A84B]/10 to-transparent",
  },
  {
    id: "design-system-concept",
    title: "Design System Concept",
    category: "Digital Product Platform",
    categoryFilter: "AI & Tools",
    typeLabel: "Demo Project",
    tagline: "A demo component library and design system for consistent, scalable UI development.",
    problem:
      "Growing digital products often suffer from inconsistent UI patterns that weaken brand trust and slow development.",
    solution:
      "A reusable component design system concept with shared design tokens, documented patterns and live previews.",
    whatWeBuilt:
      "Interactive component showcase, design token library, accessibility patterns, and documentation site.",
    technologies: ["Design System", "Interactive Canvas", "Next.js"],
    icon: Palette,
    themeStyle: "dark",
    gradient: "from-[#F26B4A]/20 via-[#18201F] to-transparent",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categoryFilter === activeCategory);

  return (
    <section
      id="work"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 border-b border-[rgba(23,33,31,0.08)] bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Selected Work"
          badgeVariant="emerald"
          title="Concept &amp; Demo Projects"
          highlightText="What We Can Build"
          description="These are concept and demo projects that showcase our approach to design, development and problem solving. Each project is clearly labelled — none are presented as completed client work."
        />

        {/* Category Filters with smooth micro-hover transitions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer border tracking-wider active:scale-95",
                  isActive
                    ? "bg-[#168B72] text-white border-[#168B72] font-semibold shadow-xs"
                    : "bg-[#F7F7F2] text-[#5A6966] border-[rgba(23,33,31,0.08)] hover:text-[#17211F] hover:bg-[#FFFFFF] hover:border-[rgba(23,33,31,0.15)]"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Project Grid with Alternating Light and Dark Cards and Refined Micro-Physics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const Icon = project.icon;
              const isDarkCard = project.themeStyle === "dark";

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="h-full"
                >
                  <Card
                    variant={isDarkCard ? "dark" : "light"}
                    className={cn(
                      "group flex flex-col justify-between h-full p-6 sm:p-7 transition-all duration-300 overflow-hidden hover:-translate-y-1.5",
                      isDarkCard
                        ? "bg-[#18201F] text-[#F8FAF9] border-white/10 hover:border-[#2AB7A9]/50 hover:shadow-2xl"
                        : "bg-[#FFFFFF] text-[#17211F] border-[rgba(23,33,31,0.09)] hover:border-[#168B72]/40 hover:shadow-xl"
                    )}
                    glowOnHover={false}
                  >
                    <div>
                      {/* Visual Mockup Presentation Window with Smooth Hover Scaling */}
                      <div
                        className={cn(
                          "relative w-full h-48 rounded-2xl overflow-hidden mb-6 flex flex-col justify-between p-4 border transition-transform duration-500 group-hover:scale-[1.03]",
                          isDarkCard
                            ? "bg-[#12372A] border-white/10"
                            : "bg-[#F7F7F2] border-[rgba(23,33,31,0.08)]"
                        )}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br opacity-50 group-hover:opacity-90 transition-opacity duration-500",
                            project.gradient
                          )}
                        />

                        {/* Top Bar */}
                        <div className="relative z-10 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-[#F26B4A]/80" />
                            <div className="h-2 w-2 rounded-full bg-[#D6A84B]/80" />
                            <div className="h-2 w-2 rounded-full bg-[#2AB7A9]/80" />
                          </div>
                          <span
                            className={cn(
                              "text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm border",
                              isDarkCard
                                ? "bg-[#18201F]/80 text-[#2AB7A9] border-white/10"
                                : "bg-[#FFFFFF]/90 text-[#12372A] border-[rgba(23,33,31,0.1)] shadow-xs"
                            )}
                          >
                            {project.typeLabel}
                          </span>
                        </div>

                        {/* Central Presentation Icon + Title */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                          <div
                            className={cn(
                              "h-11 w-11 rounded-2xl border flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-all duration-300",
                              isDarkCard
                                ? "bg-[#18201F] text-[#2AB7A9] border-[#2AB7A9]/30"
                                : "bg-[#FFFFFF] text-[#168B72] border-[rgba(23,33,31,0.1)]"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <span
                            className={cn(
                              "text-sm font-bold tracking-tight text-center",
                              isDarkCard ? "text-[#F8FAF9]" : "text-[#17211F]"
                            )}
                          >
                            {project.title}
                          </span>
                          <span
                            className={cn(
                              "text-[11px] text-center font-mono",
                              isDarkCard ? "text-[#C2CEC9]" : "text-[#5A6966]"
                            )}
                          >
                            {project.category}
                          </span>
                        </div>

                        {/* Bottom preview line */}
                        <div
                          className={cn(
                            "relative z-10 flex items-center justify-between text-[9px] font-mono",
                            isDarkCard ? "text-[#C2CEC9]" : "text-[#5A6966]"
                          )}
                        >
                          <span className="flex items-center gap-1">
                            <Terminal className="h-2.5 w-2.5 text-[#168B72]" />
                            <span>Preview Mode</span>
                          </span>
                          <span className={isDarkCard ? "text-[#2AB7A9]" : "text-[#168B72]"}>
                            Validated
                          </span>
                        </div>
                      </div>

                      {/* Card Text & Tagline */}
                      <h3
                        className={cn(
                          "text-lg font-bold mb-1.5 tracking-tight transition-colors",
                          isDarkCard ? "text-[#F8FAF9] group-hover:text-white" : "text-[#17211F] group-hover:text-[#12372A]"
                        )}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={cn(
                          "text-xs sm:text-sm font-normal mb-5 leading-relaxed",
                          isDarkCard ? "text-[#C2CEC9]" : "text-[#5A6966]"
                        )}
                      >
                        {project.tagline}
                      </p>

                      {/* Case Study Structured Breakdown */}
                      <div
                        className={cn(
                          "p-4 rounded-2xl space-y-2.5 mb-5 text-xs border",
                          isDarkCard
                            ? "bg-[#12372A]/70 border-white/5"
                            : "bg-[#F7F7F2] border-[rgba(23,33,31,0.06)]"
                        )}
                      >
                        <div>
                          <span className="text-[#F26B4A] font-mono text-[10px] uppercase tracking-wider font-semibold block mb-0.5">
                            Challenge:
                          </span>
                          <p className={isDarkCard ? "text-[#C2CEC9]" : "text-[#5A6966]"}>{project.problem}</p>
                        </div>
                        <div>
                          <span className={cn("font-mono text-[10px] uppercase tracking-wider font-semibold block mb-0.5", isDarkCard ? "text-[#2AB7A9]" : "text-[#168B72]")}>
                            Approach:
                          </span>
                          <p className={isDarkCard ? "text-[#F8FAF9]" : "text-[#17211F]"}>{project.solution}</p>
                        </div>
                        <div>
                          <span className="text-[#D6A84B] font-mono text-[10px] uppercase tracking-wider font-semibold block mb-0.5">
                            What We Built:
                          </span>
                          <p className={isDarkCard ? "text-[#C2CEC9]" : "text-[#5A6966]"}>{project.whatWeBuilt}</p>
                        </div>
                      </div>
                    </div>

                    {/* Footer Tech Stack & Discuss Link */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.technologies.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors",
                              isDarkCard
                                ? "bg-[#18201F] text-[#F8FAF9] border-white/10"
                                : "bg-[#F7F7F2] text-[#17211F] border-[rgba(23,33,31,0.08)]"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={cn("pt-4 border-t", isDarkCard ? "border-white/10" : "border-[rgba(23,33,31,0.06)]")}>
                        <Link
                          href="#contact"
                          className={cn(
                            "text-xs font-semibold flex items-center justify-between transition-colors focus:outline-none focus-visible:underline group/link",
                            isDarkCard
                              ? "text-[#F8FAF9] hover:text-[#2AB7A9]"
                              : "text-[#17211F] hover:text-[#168B72]"
                          )}
                        >
                          <span>Discuss Project Approach &rarr;</span>
                          <ArrowUpRight className={cn("h-4 w-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200", isDarkCard ? "text-[#2AB7A9]" : "text-[#168B72]")} />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
