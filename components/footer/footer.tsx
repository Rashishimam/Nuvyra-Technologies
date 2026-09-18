import React from "react";
import Link from "next/link";
import { Sparkles, Globe, Mail, MessageCircle, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070B] py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-6 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="h-8 w-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  NUVYRA
                </span>
                <span className="text-[9px] tracking-widest text-slate-400 uppercase -mt-1 font-semibold">
                  Technologies
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm mb-4 leading-relaxed">
              &quot;Turning Ideas Into Digital Reality.&quot;
            </p>
            <p className="text-xs text-slate-500 max-w-md">
              High-velocity software engineering, modern web applications, and digital systems built for scale.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Navigation
            </h4>
            <Link href="#services" className="text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              Services & Stack
            </Link>
            <Link href="#problem-solver" className="text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              Why Nuvyra
            </Link>
            <Link href="#portfolio" className="text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              Featured Case Studies
            </Link>
            <Link href="#process" className="text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              Engineering Process
            </Link>
            <Link href="#about" className="text-xs text-slate-400 hover:text-cyan-300 transition-colors">
              About & Manifesto
            </Link>
          </div>

          {/* Connect */}
          <div className="md:col-span-3 flex flex-col gap-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Connect
            </h4>
            <a
              href="mailto:contact@nuvyratech.com"
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              contact@nuvyratech.com
            </a>
            <div className="flex items-center gap-3 mt-3">
              <a
                href="#contact"
                aria-label="Direct Email"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/5 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#services"
                aria-label="Developer Architecture"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/5 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-colors"
              >
                <Terminal className="h-4 w-4" />
              </a>
              <a
                href="#portfolio"
                aria-label="Global Web Showcase"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/5 text-slate-400 hover:text-white hover:border-cyan-400/40 transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Nuvyra Technologies. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
