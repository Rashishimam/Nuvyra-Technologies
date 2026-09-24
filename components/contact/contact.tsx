"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  User,
  ChevronDown,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "Business Website",
  "Landing Page",
  "E-commerce Website",
  "Web Application",
  "Portfolio Website",
  "Website Redesign",
  "Custom Digital Solution",
  "Not Sure — Let's Discuss",
];

const BUDGET_OPTIONS = [
  "₹2,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹15,000",
  "₹15,000+",
  "Not sure — Let's Discuss",
];

const CONTACT_EMAILS = [
  "sourav620kumar@gmail.com",
  "rashishimam@gmail.com",
];

const WHATSAPP_NUMBERS = [
  { display: "+91 9334559315", raw: "919334559315" },
  { display: "+91 6203361649", raw: "916203361649" },
];

const COMPANY_NAME = "Nuvyra Technologies";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I found Nuvyra Technologies and would like to discuss a website project."
);

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  description: string;
  honeypot?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  description?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    description: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasServerError, setHasServerError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"email" | "whatsapp" | null>(null);

  const contactCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactCardRef.current && !contactCardRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service.";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select an estimated budget.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Please describe your project details or goals.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Please provide at least 10 characters describing your project.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasServerError(false);
    setServerErrorMessage(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          description: "",
          honeypot: "",
        });
        setErrors({});
        setHasServerError(false);
        setServerErrorMessage(null);
      } else {
        if (data.fieldErrors) {
          const mappedErrors: FormErrors = {};
          for (const [key, msgs] of Object.entries(data.fieldErrors)) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              const fieldKey = key === "message" ? "description" : key;
              (mappedErrors as Record<string, string>)[fieldKey] = msgs[0];
            }
          }
          setErrors((prev) => ({ ...prev, ...mappedErrors }));
        }
        setServerErrorMessage(
          data.error || "Your request could not be sent right now. Please try again or contact us directly."
        );
        setHasServerError(true);
      }
    } catch (err) {
      console.error("[Nuvyra Client Notice] Form submission network error:", err);
      setServerErrorMessage("Network error. Please check your connection and try again.");
      setHasServerError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "",
      budget: "",
      description: "",
      honeypot: "",
    });
    setErrors({});
    setHasServerError(false);
    setIsSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 bg-[#12372A] text-[#F8FAF9] border-b border-white/10 overflow-hidden"
    >
      {/* Subtle Atmospheric Gradient & Continuous Floating Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[650px] h-[450px] bg-gradient-to-t from-[#168B72]/20 via-[#2AB7A9]/10 to-transparent rounded-full blur-[150px] animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-10 w-[400px] h-[400px] bg-[#D6A84B]/10 rounded-full blur-[160px] animate-float-reverse"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Details & Actions with Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="text-xs font-mono font-semibold text-[#2AB7A9] uppercase tracking-widest mb-3">
              LET&apos;S WORK TOGETHER
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F8FAF9] tracking-tight leading-[1.12] mb-4">
              Have a Project{" "}
              <span className="text-gradient-light-emerald">in Mind?</span>
            </h2>

            <p className="text-sm sm:text-base text-[#C2CEC9] leading-relaxed font-normal mb-8 max-w-md">
              Tell us what you&apos;re building, what you need, or what you&apos;d like to improve. Let&apos;s discuss your project and architect the right digital solution.
            </p>

            {/* Direct Contact Profile Card */}
            <div
              ref={contactCardRef}
              className="w-full p-6 sm:p-7 rounded-3xl bg-[#18201F] border border-white/10 space-y-4 mb-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#168B72]/30 to-[#2AB7A9]/20 border border-[#2AB7A9]/30 flex items-center justify-center text-[#2AB7A9] shrink-0 shadow-sm">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F8FAFC] tracking-tight">
                    Direct Contact
                  </h3>
                  <p className="text-xs font-mono text-[#2AB7A9]">
                    {COMPANY_NAME}
                  </p>
                </div>
              </div>

              {/* Action 1: Email Us Button + Dropdown Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "email" ? null : "email")}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#12372A]/80 border border-white/10 hover:border-[#2AB7A9]/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-[#F8FAFC] text-xs font-semibold group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-[#2AB7A9] shrink-0" />
                    <span>Email Us</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#2AB7A9]">
                    <span className="text-[11px] font-mono text-[#C2CEC9]">Direct</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openDropdown === "email" ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "email" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl bg-[#12372A] border border-[#2AB7A9]/40 shadow-2xl space-y-1 z-30"
                    >
                      <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#2AB7A9] font-semibold">
                        Select Email Address:
                      </p>
                      {CONTACT_EMAILS.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 text-xs text-[#F8FAF9] transition-colors group/item cursor-pointer truncate"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Mail className="h-3.5 w-3.5 text-[#2AB7A9] shrink-0" />
                            <span className="truncate">{email}</span>
                          </div>
                          <ArrowRight className="h-3 w-3 text-[#2AB7A9] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action 2: Chat on WhatsApp Button + Dropdown Popover */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "whatsapp" ? null : "whatsapp")}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all text-emerald-300 text-xs font-semibold shadow-sm group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Chat on WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="text-[11px] font-mono text-emerald-200/70">Chat</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openDropdown === "whatsapp" ? "rotate-180" : ""
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {openDropdown === "whatsapp" && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-0 right-0 top-full mt-2 p-2 rounded-2xl bg-[#12372A] border border-emerald-500/40 shadow-2xl space-y-1 z-30"
                    >
                      <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                        Select WhatsApp Number:
                      </p>
                      {WHATSAPP_NUMBERS.map((phone) => (
                        <a
                          key={phone.raw}
                          href={`https://wa.me/${phone.raw}?text=${WHATSAPP_MESSAGE}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-500/20 text-xs text-emerald-300 transition-colors group/item cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <MessageCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span>{phone.display}</span>
                          </div>
                          <ArrowRight className="h-3 w-3 text-emerald-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all shrink-0" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column: LIGHT Project Inquiry Form inside Deep Green Section with Motion Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full"
          >
            <Card variant="light" className="p-7 sm:p-9 border-white/20 bg-[#FFFFFF] text-[#17211F] shadow-2xl relative overflow-hidden">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center justify-center text-center"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[#168B72]/15 border border-[#168B72]/30 flex items-center justify-center text-[#168B72] mb-5 shadow-md">
                    <CheckCircle2 className="h-7 w-7 text-[#168B72]" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#17211F] mb-2 tracking-tight">
                    Project request sent successfully.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A6966] max-w-md leading-relaxed mb-8 font-normal">
                    We'll get back to you soon.
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="gap-2 text-xs py-2.5 px-5"
                  >
                    <span>Send Another Request</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Hidden Honeypot Field for Spam Prevention */}
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Clean Error State Fallback */}
                  {hasServerError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex flex-col gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">
                          {serverErrorMessage || "Your request could not be sent right now. Please try again or contact us directly."}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-rose-200 text-xs">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBERS[0].raw}?text=${WHATSAPP_MESSAGE}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-700 font-semibold hover:underline flex items-center gap-1.5"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Chat on WhatsApp &rarr;</span>
                        </a>
                        <span className="text-rose-400">&bull;</span>
                        <a
                          href={`mailto:${CONTACT_EMAILS[0]}`}
                          className="text-[#168B72] font-semibold hover:underline flex items-center gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email: {CONTACT_EMAILS[0]}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Row 1: Name & Business */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs sm:text-sm font-semibold text-[#17211F] mb-1.5"
                      >
                        Name <span className="text-[#168B72]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border text-[#17211F] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#168B72]/40",
                          errors.name
                            ? "border-rose-400 bg-rose-50"
                            : "border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] focus:border-[#168B72] focus:bg-white"
                        )}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-semibold text-[#17211F] mb-1.5"
                      >
                        Business / Company <span className="text-[#5A6966] text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-company"
                        name="company"
                        type="text"
                        placeholder="Your Business / Brand"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] text-[#17211F] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-[#168B72] focus:ring-2 focus:ring-[#168B72]/40 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone/WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#17211F] mb-1.5"
                      >
                        Email Address <span className="text-[#168B72]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border text-[#17211F] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#168B72]/40",
                          errors.email
                            ? "border-rose-400 bg-rose-50"
                            : "border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] focus:border-[#168B72] focus:bg-white"
                        )}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#17211F] mb-1.5"
                      >
                        WhatsApp / Phone <span className="text-[#5A6966] text-[10px] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone or WhatsApp number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] text-[#17211F] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:border-[#168B72] focus:ring-2 focus:ring-[#168B72]/40 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Needed & Estimated Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-semibold text-[#17211F] mb-1.5"
                      >
                        Service Needed <span className="text-[#168B72]">*</span>
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (errors.service) setErrors({ ...errors, service: undefined });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border text-[#17211F] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#168B72]/40 cursor-pointer transition-colors duration-200",
                          errors.service
                            ? "border-rose-400 bg-rose-50"
                            : "border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] focus:border-[#168B72] focus:bg-white"
                        )}
                      >
                        <option value="" disabled className="text-slate-500">
                          Select a service...
                        </option>
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service} className="bg-white text-[#17211F]">
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-xs font-semibold text-[#17211F] mb-1.5"
                      >
                        Estimated Budget <span className="text-[#168B72]">*</span>
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => {
                          setFormData({ ...formData, budget: e.target.value });
                          if (errors.budget) setErrors({ ...errors, budget: undefined });
                        }}
                        className={cn(
                          "w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border text-[#17211F] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#168B72]/40 cursor-pointer transition-colors duration-200",
                          errors.budget
                            ? "border-rose-400 bg-rose-50"
                            : "border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] focus:border-[#168B72] focus:bg-white"
                        )}
                      >
                        <option value="" disabled className="text-slate-500">
                          Select estimated budget...
                        </option>
                        {BUDGET_OPTIONS.map((budget) => (
                          <option key={budget} value={budget} className="bg-white text-[#17211F]">
                            {budget}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.budget}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 4: Project Details / Goals */}
                  <div>
                    <label
                      htmlFor="contact-description"
                      className="block text-xs font-semibold text-[#17211F] mb-1.5"
                    >
                      Project Details / Goals <span className="text-[#168B72]">*</span>
                    </label>
                    <textarea
                      id="contact-description"
                      name="description"
                      required
                      rows={3}
                      aria-required="true"
                      aria-invalid={!!errors.description}
                      aria-describedby={errors.description ? "description-error" : undefined}
                      placeholder="Tell us what you're building, key features, or what you would like to improve..."
                      value={formData.description}
                      onChange={(e) => {
                        setFormData({ ...formData, description: e.target.value });
                        if (errors.description) setErrors({ ...errors, description: undefined });
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-[#F7F7F2] border text-[#17211F] text-xs sm:text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#168B72]/40 resize-none",
                        errors.description
                          ? "border-rose-400 bg-rose-50"
                          : "border-[rgba(23,33,31,0.12)] hover:border-[rgba(23,33,31,0.25)] focus:border-[#168B72] focus:bg-white"
                      )}
                    />
                    {errors.description && (
                      <p id="description-error" className="mt-1.5 text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      variant="primary"
                      disabled={isLoading}
                      className="w-full gap-2.5 font-bold text-xs sm:text-sm py-3.5 shadow-md shadow-[#168B72]/30 animate-shimmer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending Project Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Request</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
