"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { PortfolioItem } from "@/types";

const PROJECTS: PortfolioItem[] = [
  {
    id: "apex-flow",
    title: "ApexFlow Analytics",
    category: "Fintech Platform",
    description:
      "Enterprise real-time analytics engine processing 10M+ daily events with sub-50ms latency and interactive charting.",
    stats: "+340% User Engagement",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
  },
  {
    id: "quantum-ai",
    title: "Nova Intelligence",
    category: "AI SaaS Application",
    description:
      "High-throughput AI workflow workspace with custom generative prompt pipelines and sleek cybernetic dashboard.",
    stats: "99.99% Uptime",
    tags: ["React", "FastAPI", "Design System", "Cloud Architecture"],
  },
  {
    id: "hyperscale",
    title: "HyperScale Retail",
    category: "Headless E-Commerce",
    description:
      "Sub-second page transitions, instant search, and headless Shopify checkout that tripled organic mobile conversion.",
    stats: "+58% Conversion Lift",
    tags: ["Next.js App Router", "Edge Middleware", "Shopify API"],
  },
  {
    id: "synapse-protocol",
    title: "Vortex Cloud Engine",
    category: "Cloud Infrastructure",
    description:
      "Serverless orchestration platform providing multi-region failover monitoring and automated developer deployments.",
    stats: "4.2x Faster Build Times",
    tags: ["TypeScript", "Microservices", "Telemetry", "CI/CD"],
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Featured Work"
          title="Engineered For"
          highlightText="Measurable Impact"
          description="A selection of recent digital systems and web applications engineered to accelerate business growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project) => (
            <Card
              key={project.id}
              className="group p-6 sm:p-8 flex flex-col justify-between border-white/10 hover:border-cyan-500/40 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                    {project.category}
                  </span>
                  {project.stats && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {project.stats}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cyan-400" />
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-slate-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
