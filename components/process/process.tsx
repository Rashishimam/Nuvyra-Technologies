"use client";

import React from "react";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ProcessStep } from "@/types";

const STEPS: (ProcessStep & { icon: React.ElementType })[] = [
  {
    step: "01",
    title: "Discovery & Blueprint",
    description:
      "We dive into your business goals, target audience, technical constraints, and roadmap to craft a rock-solid technical specification.",
    deliverable: "Architecture Blueprint & Scope Plan",
    icon: Search,
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description:
      "We design modern, responsive UI mockups and interaction flows that match your brand identity with precision and polish.",
    deliverable: "Interactive Design System",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Agile Sprint Build",
    description:
      "Production-grade development using Next.js and TypeScript with regular milestone demos and clean, modular code commits.",
    deliverable: "Staging Preview Environment",
    icon: Code2,
  },
  {
    step: "04",
    title: "QA, Polish & Launch",
    description:
      "Rigorous cross-browser testing, SEO audits, Lighthouse performance optimization, and seamless cloud deployment.",
    deliverable: "Live Production Release & Handover",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="How We Work"
          title="A Predictable, High-Velocity"
          highlightText="Engineering Process"
          description="From initial strategy to live production deployment, here is our battle-tested development lifecycle."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.step}
                className="group relative flex flex-col justify-between p-6 border-white/10 hover:border-cyan-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-white/20 group-hover:text-cyan-400/50 transition-colors">
                      {step.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <p className="text-[11px] font-mono text-cyan-300/80">
                    <span className="text-slate-500 mr-1">Deliverable:</span>
                    {step.deliverable}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
