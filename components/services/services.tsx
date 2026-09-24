"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Globe,
  LayoutTemplate,
  ShoppingCart,
  Layers,
  Palette,
  RefreshCw,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface ServiceItemData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag?: string;
  gridSpan: string;
  accentBg: string;
  iconColor: string;
  badgeAccent?: string;
}

const SERVICES: ServiceItemData[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    description:
      "Professional, bespoke websites designed to help businesses establish authority, communicate their unique value, and turn first-time visitors into high-value inquiries.",
    icon: Globe,
    tag: "Core Offering",
    gridSpan: "md:col-span-2 lg:col-span-8",
    accentBg: "from-[#168B72]/10 via-[#2AB7A9]/05 to-transparent",
    iconColor: "text-[#168B72] bg-[#168B72]/10 border-[#168B72]/25",
    badgeAccent: "bg-[#168B72]/10 text-[#12372A] border-[#168B72]/30",
  },
  {
    id: "landing-pages",
    title: "High-Converting Landing Pages",
    description:
      "Fast, focused single-page funnels engineered to convert campaign and ad traffic into qualified leads.",
    icon: LayoutTemplate,
    gridSpan: "md:col-span-1 lg:col-span-4",
    accentBg: "from-[#F26B4A]/08 to-transparent",
    iconColor: "text-[#F26B4A] bg-[#F26B4A]/10 border-[#F26B4A]/25",
  },
  {
    id: "ecommerce-websites",
    title: "E-Commerce Stores",
    description:
      "Modern, fast online stores with fluid catalog browsing, instant search, and streamlined zero-friction checkout experiences.",
    icon: ShoppingCart,
    gridSpan: "md:col-span-1 lg:col-span-4",
    accentBg: "from-[#D6A84B]/08 to-transparent",
    iconColor: "text-[#9A751F] bg-[#D6A84B]/15 border-[#D6A84B]/30",
  },
  {
    id: "web-applications",
    title: "Custom Web Applications",
    description:
      "Client portals, internal dashboards, and full-stack software built to automate operations and handle complex user workflows.",
    icon: Layers,
    tag: "Scalable Architecture",
    gridSpan: "md:col-span-2 lg:col-span-8",
    accentBg: "from-[#2AB7A9]/10 via-[#168B72]/05 to-transparent",
    iconColor: "text-[#2AB7A9] bg-[#2AB7A9]/15 border-[#2AB7A9]/30",
    badgeAccent: "bg-[#2AB7A9]/15 text-[#12372A] border-[#2AB7A9]/35",
  },
  {
    id: "portfolio-websites",
    title: "Portfolio & Agency Sites",
    description:
      "Clean, editorial platforms crafted for agencies, consultants, and professionals to showcase their work with impact.",
    icon: Palette,
    gridSpan: "md:col-span-1 lg:col-span-4",
    accentBg: "from-[#12372A]/05 to-transparent",
    iconColor: "text-[#12372A] bg-[#12372A]/10 border-[#12372A]/20",
  },
  {
    id: "website-redesign",
    title: "Website Redesign & Modernization",
    description:
      "Overhaul outdated layouts with contemporary typography, sub-second performance, and conversion-first user journeys.",
    icon: RefreshCw,
    gridSpan: "md:col-span-1 lg:col-span-4",
    accentBg: "from-[#F26B4A]/08 to-transparent",
    iconColor: "text-[#F26B4A] bg-[#F26B4A]/10 border-[#F26B4A]/25",
  },
  {
    id: "custom-digital-solutions",
    title: "Custom Digital Solutions",
    description:
      "Tailor-made digital tools, API integrations, and specialized software systems engineered around your exact workflow.",
    icon: Code2,
    gridSpan: "md:col-span-2 lg:col-span-4",
    accentBg: "from-[#D6A84B]/08 to-transparent",
    iconColor: "text-[#9A751F] bg-[#D6A84B]/15 border-[#D6A84B]/30",
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

/* ─── Interactive Card Tilt Hook ─── */
function useTiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 4, rotateY: x * 4 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { ref, tilt, handleMouseMove, handleMouseLeave };
}

function ServiceCard({ service }: { service: ServiceItemData }) {
  const Icon = service.icon;
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTiltCard();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#contact");
    } else {
      window.location.hash = "#contact";
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className={service.gridSpan}
    >
      <Link
        href="#contact"
        onClick={handleScrollToContact}
        className="block h-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168B72] rounded-2xl cursor-pointer"
      >
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            transition: "transform 0.2s ease-out",
          }}
          className="h-full"
        >
          <Card
            variant="light"
            className="relative flex flex-col justify-between h-full p-5 sm:p-6 bg-[#FFFFFF] border-[rgba(23,33,31,0.09)] group-hover:border-[#168B72]/50 group-hover:shadow-[0_16px_36px_-8px_rgba(22,139,114,0.15)] group-hover:-translate-y-1.5 transition-all duration-300 overflow-hidden cursor-pointer"
            glowOnHover={false}
          >
            {/* Subtle Ambient Hover Gradient Mesh */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 bg-gradient-to-br ${service.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs ${service.iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>

                {service.tag && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border transition-transform duration-200 group-hover:scale-105 ${service.badgeAccent}`}>
                    <Sparkles className="h-2.5 w-2.5" />
                    {service.tag}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#17211F] mb-2 tracking-tight group-hover:text-[#12372A] transition-colors">
                {service.title}
              </h3>

              <p className="text-[13px] sm:text-sm text-[#5A6966] leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            {/* Bottom Indicator */}
            <div className="relative z-10 mt-4 pt-3.5 border-t border-[rgba(23,33,31,0.06)] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#5A6966]">Production-Ready</span>
              <span className="text-[#168B72] font-semibold group-hover:text-[#12372A] flex items-center gap-1 transition-all duration-200 cursor-pointer">
                <span>Discuss</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </div>
          </Card>
        </div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-20 border-b border-[rgba(23,33,31,0.08)] bg-[#F7F7F2]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Our Services"
          badgeVariant="emerald"
          title="What We Can"
          highlightText="Build For You"
          description="Client-focused digital engineering tailored to solve real business needs, win customer trust, and generate continuous inquiries."
          className="mb-8 sm:mb-10"
        />

        {/* Bento Grid with Tilt Hover and Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
