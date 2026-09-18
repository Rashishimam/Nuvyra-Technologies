"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Glow } from "@/components/ui/glow";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <Glow position="top-right" className="opacity-70" />
      <Glow position="bottom-center" className="opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Animated Pill Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="cyan" className="mb-6 py-1.5 px-4 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping mr-1" />
            <span>NUVYRA TECHNOLOGIES &bull; ACCEPTING NEW CLIENTS</span>
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          Turning Ideas Into{" "}
          <span className="text-gradient-cyan block sm:inline">
            Digital Reality.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed"
        >
          We engineer bespoke digital solutions, high-converting web applications, and
          scalable cloud architectures for forward-thinking businesses and visionary founders.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="#contact" className="w-full sm:w-auto">
            <Button size="lg" variant="primary" className="w-full sm:w-auto gap-2">
              <span>Book Strategy Call</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="#portfolio" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <span>Explore Our Work</span>
            </Button>
          </Link>
        </motion.div>

        {/* Micro Value Proposition Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
        >
          <div className="glass-panel p-4 rounded-xl flex items-center justify-center sm:justify-start gap-3 border border-white/5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Rapid Engineering</p>
              <p className="text-[11px] text-slate-400">Iterative high-velocity delivery</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl flex items-center justify-center sm:justify-start gap-3 border border-white/5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Enterprise Scalability</p>
              <p className="text-[11px] text-slate-400">Robust, tested & secure code</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl flex items-center justify-center sm:justify-start gap-3 border border-white/5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Terminal className="h-4 w-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-white">Modern Tech Stack</p>
              <p className="text-[11px] text-slate-400">Next.js, TypeScript & Cloud</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
