"use client";

import React from "react";
import { CheckCircle2, Shield, Flame, TerminalSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { StatItem } from "@/types";

const STATS: StatItem[] = [
  { value: "99.8%", label: "On-Time Milestones", subtext: "Strict sprint adherence" },
  { value: "95+", label: "Lighthouse Performance", subtext: "Sub-second load times" },
  { value: "100%", label: "IP & Code Ownership", subtext: "Full repository rights" },
  { value: "< 24h", label: "Communication Response", subtext: "Dedicated direct support" },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Manifesto */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <SectionHeader
              badge="About Nuvyra"
              title="We Bridge The Gap Between"
              highlightText="Vision & Engineering"
              align="left"
              className="mb-8"
            />

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Nuvyra Technologies</strong> was founded with a singular purpose: to build digital products that combine surgical software engineering with memorable, high-converting visual design.
              </p>
              <p className="text-slate-400">
                We reject bloated templates, generic agency jargon, and unaccountable timelines. Instead, we act as an elite engineering partner for founders, startups, and growing enterprises who demand speed, reliability, and precision.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Shield className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">Production-Grade Security</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <Flame className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">High Velocity Execution</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <TerminalSquare className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">Modern TS/Next.js Stack</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-200">Direct Founder Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Matrix */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((stat, idx) => (
              <Card
                key={idx}
                className="p-6 sm:p-8 flex flex-col justify-center border-white/10 hover:border-cyan-500/40 relative overflow-hidden"
              >
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-gradient-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-base font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.subtext}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
