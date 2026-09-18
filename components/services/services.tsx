"use client";

import React from "react";
import { 
  Code2, 
  Layers, 
  Sparkles, 
  Cpu, 
  Gauge, 
  GitMerge,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceItem } from "@/types";

const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Full-Stack Web Development",
    description:
      "Modern, responsive, and ultra-fast web platforms built with Next.js, React, and TypeScript engineered for performance and SEO.",
    icon: Code2,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST/GraphQL"],
  },
  {
    id: "saas-mvp",
    title: "SaaS & MVP Engineering",
    description:
      "Turn your product concept into a market-ready web application with scalable architecture, secure auth, and reliable infrastructure.",
    icon: Layers,
    tags: ["Full-Stack", "Architecture", "Rapid MVP", "Scalable Systems"],
  },
  {
    id: "ui-ux",
    title: "UI/UX & Design Engineering",
    description:
      "Futuristic, intuitive interfaces with micro-interactions, dark mode aesthetics, and design systems that elevate your brand.",
    icon: Sparkles,
    tags: ["Design Systems", "Framer Motion", "Prototyping", "Aesthetics"],
  },
  {
    id: "cloud-api",
    title: "Cloud & Backend Architecture",
    description:
      "Robust backends, database schema design, third-party integrations, and serverless architectures with high availability.",
    icon: Cpu,
    tags: ["Cloud Infrastructure", "Microservices", "API Integrations"],
  },
  {
    id: "performance",
    title: "Speed & Conversion Optimization",
    description:
      "Auditing and upgrading slow web apps to achieve 95+ Google Lighthouse scores, lower bounce rates, and boost conversion metrics.",
    icon: Gauge,
    tags: ["Core Web Vitals", "SEO Audit", "Caching", "Performance"],
  },
  {
    id: "tech-consulting",
    title: "Technical Advisory & Code Audits",
    description:
      "Strategic tech stack selection, codebase refactoring, security reviews, and ongoing developer mentorship for tech teams.",
    icon: GitMerge,
    tags: ["Code Quality", "Architecture Review", "Strategy"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Our Capabilities"
          title="Engineered For"
          highlightText="Growth & Scale"
          description="We deliver end-to-end digital solutions tailored to solve complex business problems with clean code and cutting-edge design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="group flex flex-col justify-between h-full hover:border-cyan-500/40 relative overflow-hidden"
              >
                {/* Subtle top corner gradient */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all duration-300" />

                <div>
                  <div className="h-12 w-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
