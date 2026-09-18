"use client";

import React from "react";
import { XCircle, CheckCircle2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ProblemSolutionItem } from "@/types";

const COMPARISONS: ProblemSolutionItem[] = [
  {
    problem: "Unpredictable delivery timelines, missed deadlines, and sudden agency ghosting.",
    solution: "Structured 2-week agile sprints, milestone deliverables, and transparent communication.",
  },
  {
    problem: "Bloated template sites with slow loading speeds and messy unmaintainable code.",
    solution: "Hand-crafted Next.js & TypeScript codebases optimized for 95+ Core Web Vitals and long-term scale.",
  },
  {
    problem: "Outdated generic designs that blend in and fail to convert visitors into clients.",
    solution: "High-impact futuristic UI/UX with smooth micro-interactions that establish immediate market authority.",
  },
  {
    problem: "Complex handovers with no documentation leaving you stuck with developer lock-in.",
    solution: "Comprehensive codebase documentation, clean architecture, and 100% intellectual property ownership.",
  },
];

export function ProblemSolver() {
  return (
    <section id="problem-solver" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-b from-transparent via-cyan-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Why Nuvyra"
          title="Eliminating Friction,"
          highlightText="Delivering Certainty"
          description="Traditional development agencies often leave founders frustrated. Here is how we bridge the gap from concept to execution."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Traditional Agency Column */}
          <Card className="border-red-500/20 bg-red-950/[0.04] p-6 sm:p-8" glowOnHover={false}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-red-500/20">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">The Traditional Experience</h3>
                <p className="text-xs text-slate-400">How typical freelance & agency projects struggle</p>
              </div>
            </div>

            <div className="space-y-5">
              {COMPARISONS.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.problem}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Nuvyra Technologies Column */}
          <Card className="border-cyan-500/30 bg-cyan-950/[0.08] p-6 sm:p-8 relative overflow-hidden" glowOnHover={true}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/20">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>The Nuvyra Standard</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    Premium
                  </span>
                </h3>
                <p className="text-xs text-cyan-300/70">Engineered for velocity, quality, and real business results</p>
              </div>
            </div>

            <div className="space-y-5">
              {COMPARISONS.map((item, index) => (
                <div key={index} className="flex items-start gap-3.5">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
