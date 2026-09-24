"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Terminal,
  Activity,
  Users,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Floating Particles Component ─── */
function FloatingParticles() {
  const particles = [
    { left: "15%", top: "20%", size: 3, delay: 0, duration: 14 },
    { left: "75%", top: "60%", size: 2, delay: 2, duration: 16 },
    { left: "40%", top: "70%", size: 4, delay: 4, duration: 12 },
    { left: "85%", top: "30%", size: 2.5, delay: 6, duration: 18 },
    { left: "25%", top: "85%", size: 3, delay: 8, duration: 15 },
    { left: "60%", top: "15%", size: 2, delay: 3, duration: 13 },
    { left: "90%", top: "80%", size: 3, delay: 5, duration: 17 },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#2AB7A9]/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animation: `${i % 2 === 0 ? "particle-float" : "particle-float-alt"} ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  /* ─── Mouse Parallax for Hero Visual ─── */
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const springConfig = { stiffness: 80, damping: 25 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Very subtle offset for the visual panel
  const panelX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const panelY = useTransform(smoothY, [-1, 1], [-4, 4]);

  // Slightly more offset for decorative glow (depth)
  const glowX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const glowY = useTransform(smoothY, [-1, 1], [-8, 8]);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 2;  // -1 to 1
      const ny = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(nx);
      mouseY.set(ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isDesktop, mouseX, mouseY]);

  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[rgba(23,33,31,0.08)] overflow-hidden bg-[#F7F7F2]">
      {/* Continuous Ambient Floating Background Shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/3 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[500px] bg-gradient-to-b from-[#168B72]/12 via-[#2AB7A9]/06 to-transparent rounded-full blur-[140px] animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#D6A84B]/08 rounded-full blur-[150px] animate-float-reverse"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 left-10 w-[300px] h-[300px] bg-[#F26B4A]/06 rounded-full blur-[130px] animate-pulse-subtle"
      />

      {/* Floating Light Particles */}
      <FloatingParticles />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Staggered Entrance Sequence */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 1. Hero Badge (Fades in first) */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[rgba(23,33,31,0.1)] text-[#12372A] text-xs font-mono font-medium tracking-wider uppercase mb-6 shadow-xs hover:border-[#168B72]/40 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-[#168B72] shadow-[0_0_6px_#168B72] animate-pulse" />
              <span className="font-semibold">NUVYRA TECHNOLOGIES &bull; DIGITAL STUDIO</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F26B4A]/15 text-[#F26B4A] text-[9px] font-bold">PRO</span>
            </motion.div>

            {/* 2. Main Headline (Reveals smoothly bottom to top) */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#17211F] leading-[1.08]"
            >
              Websites &amp; Digital Solutions Built to{" "}
              <span className="text-gradient-emerald">Grow Your Business.</span>
            </motion.h1>

            {/* 3. Supporting Description (Appears after heading) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-base sm:text-lg text-[#5A6966] max-w-xl leading-relaxed font-normal"
            >
              We design and develop modern websites, web apps, and digital experiences that help businesses build credibility, reach customers, and generate more opportunities.
            </motion.p>

            {/* 4. CTA Buttons (Slight stagger entrance) with Shimmer */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Button
                href="#contact"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto gap-2.5 font-semibold text-sm py-3.5 px-7 animate-shimmer"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              <Button
                href="#work"
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto font-medium text-sm py-3.5 px-7"
              >
                <span>View Our Work</span>
              </Button>
            </motion.div>

            {/* 5. Trust-Oriented Line & Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 pt-7 border-t border-[rgba(23,33,31,0.1)] flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-[#5A6966] font-medium w-full"
            >
              <div className="flex items-center gap-2 text-[#12372A] font-semibold">
                <Users className="h-4 w-4 text-[#168B72]" />
                <span>Built by a focused two-person development team.</span>
              </div>

              <div className="hidden sm:inline-block text-[#5A6966]/40">&bull;</div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2AB7A9]" />
                  <span>Direct Communication</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2AB7A9]" />
                  <span>No Agency Bloat</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual with Mouse Parallax */}
          <motion.div
            ref={heroVisualRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
            style={isDesktop ? { x: panelX, y: panelY } : undefined}
          >
            {/* Ambient backing glow — follows mouse with deeper parallax */}
            <motion.div
              className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#168B72]/20 via-[#2AB7A9]/15 to-[#D6A84B]/15 blur-xl opacity-50 animate-pulse-subtle"
              style={isDesktop ? { x: glowX, y: glowY } : undefined}
            />

            <div className="relative rounded-3xl bg-[#18201F] border border-white/10 p-5 sm:p-7 shadow-[0_20px_50px_-10px_rgba(18,55,42,0.35)] overflow-hidden text-[#F8FAF9] transition-transform duration-300 hover:scale-[1.01] animate-border-breathe">
              {/* Window Chrome */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#F26B4A]/80 hover:scale-110 transition-transform" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#D6A84B]/80 hover:scale-110 transition-transform" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#2AB7A9]/80 hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#12372A] border border-white/10 text-[11px] font-mono text-[#2AB7A9]">
                  <Terminal className="h-3 w-3 text-[#2AB7A9]" />
                  <span>nuvyra.architecture.core</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#2AB7A9] font-mono font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2AB7A9] animate-pulse" />
                  <span>READY</span>
                </div>
              </div>

              {/* Status / Metric Cards with subtle hover feedback */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-4 rounded-2xl bg-[#12372A]/80 border border-white/5 flex flex-col justify-between hover:bg-[#12372A] transition-colors duration-200 group/card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C2CEC9]">
                      Client Focus
                    </span>
                    <Activity className="h-3.5 w-3.5 text-[#2AB7A9] group-hover/card:animate-orbit" />
                  </div>
                  <div className="text-base sm:text-lg font-bold font-mono text-[#F8FAFC]">
                    Lead Generation
                  </div>
                  <span className="text-[10px] text-[#2AB7A9] mt-1 font-medium">
                    Conversion Architecture
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#12372A]/80 border border-white/5 flex flex-col justify-between hover:bg-[#12372A] transition-colors duration-200 group/card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C2CEC9]">
                      Tech Stack
                    </span>
                    <Cpu className="h-3.5 w-3.5 text-[#D6A84B] group-hover/card:animate-orbit" />
                  </div>
                  <div className="text-base sm:text-lg font-bold font-mono text-[#F8FAFC]">
                    Next.js &amp; TS
                  </div>
                  <span className="text-[10px] text-[#D6A84B] mt-1 font-medium">
                    Speed, SEO &amp; Security
                  </span>
                </div>
              </div>

              {/* Production Pipeline Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#12372A]/40 border border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-[#F8FAFC] font-medium">
                    <Layers className="h-4 w-4 text-[#2AB7A9]" />
                    <span>Deliverable Standards</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#D6A84B]">
                    Production Tier
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18201F] border border-white/5 text-[#F8FAFC] hover:border-[#168B72]/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Code2 className="h-3.5 w-3.5 text-[#168B72]" />
                      <span>Custom Website / Web App</span>
                    </div>
                    <span className="text-[#2AB7A9] text-[10px] font-semibold">
                      Sub-Second
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18201F] border border-white/5 text-[#F8FAFC] hover:border-[#D6A84B]/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="h-3.5 w-3.5 text-[#D6A84B]" />
                      <span>Inquiry / Conversion Funnel</span>
                    </div>
                    <span className="text-[#D6A84B] text-[10px] font-semibold">
                      Optimized
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#18201F] border border-white/5 text-[#F8FAFC] hover:border-[#F26B4A]/40 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#F26B4A]" />
                      <span>Direct Developer Communication</span>
                    </div>
                    <span className="text-[#F26B4A] text-[10px] font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Signals */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#C2CEC9] font-mono">
                <span className="tracking-wider">NUVYRA TECHNOLOGIES</span>
                <span className="flex items-center gap-1 text-[#2AB7A9]">
                  <Zap className="h-3 w-3" /> DIRECT CLIENT PARTNER
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
