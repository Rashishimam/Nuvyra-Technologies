"use client";

import React, { useState } from "react";
import { Mail, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full-Stack Web App",
    budget: "$3k - $10k",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Get In Touch"
          title="Let's Build Something"
          highlightText="Extraordinary"
          description="Have a new product, web application, or digital upgrade in mind? Tell us about your goals and receive a detailed roadmap within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Info Card */}
          <Card className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between h-full border-cyan-500/20 bg-cyan-950/[0.04]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Direct Line</h3>
              </div>

              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                We work directly with founders and product owners. No middle management or sales bureaucracy.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Inquiries</p>
                    <p className="text-sm font-medium text-white">contact@nuvyratech.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Response Window</p>
                    <p className="text-sm font-medium text-white">Under 24 hours guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Currently booking Q3/Q4 development sprints</span>
              </div>
            </div>
          </Card>

          {/* Form Card */}
          <Card className="lg:col-span-7 p-6 sm:p-8 border-white/10">
            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="h-14 w-14 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Dispatched</h3>
                <p className="text-sm text-slate-300 max-w-sm">
                  Thank you for reaching out to Nuvyra Technologies. We will review your project brief and reply within 24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Work Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Service Scope
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c101a] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                    >
                      <option value="Full-Stack Web App">Full-Stack Web App</option>
                      <option value="SaaS MVP Engineering">SaaS MVP Engineering</option>
                      <option value="UI/UX & Design System">UI/UX & Design System</option>
                      <option value="Performance & SEO">Performance & SEO</option>
                      <option value="Architecture Consulting">Architecture Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Budget Estimate
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c101a] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                    >
                      <option value="$3k - $5k">$3,000 – $5,000</option>
                      <option value="$5k - $10k">$5,000 – $10,000</option>
                      <option value="$10k - $25k">$10,000 – $25,000</option>
                      <option value="$25k+">$25,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Details & Goals
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe your project requirements, target timeline, or current challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="md" variant="primary" className="w-full gap-2 mt-2">
                  <span>Send Project Brief</span>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
