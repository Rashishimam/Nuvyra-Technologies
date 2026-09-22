"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { User, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { TeamMember } from "@/types";

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "[TEAM MEMBER 1]",
    role: "[ROLE / SPECIALIZATION]",
    description:
      "[TEAM MEMBER DETAILS WILL BE ADDED — Bio, experience, and background will be filled with verified information.]",
    focus: ["[TECHNICAL FOCUS 1]", "[TECHNICAL FOCUS 2]", "[TECHNICAL FOCUS 3]"],
  },
  {
    name: "[TEAM MEMBER 2]",
    role: "[ROLE / SPECIALIZATION]",
    description:
      "[TEAM MEMBER DETAILS WILL BE ADDED — Bio, experience, and background will be filled with verified information.]",
    focus: ["[TECHNICAL FOCUS 1]", "[TECHNICAL FOCUS 2]", "[TECHNICAL FOCUS 3]"],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export function Team() {
  return (
    <section
      id="team"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 border-b border-white/10 bg-[#18201F] text-[#F8FAF9]"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          theme="dark"
          badge="Our Team"
          title="Meet the People Behind"
          highlightText="Nuvyra"
          description="A focused two-person digital studio combining development, design, and problem-solving to build practical digital products for businesses."
        />

        {/* 2-Person Team Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto"
        >
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Card
                variant="dark"
                className="p-7 sm:p-9 border-white/12 bg-[#12372A]/80 hover:border-[#2AB7A9]/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between shadow-xl h-full animate-border-breathe"
                glowOnHover={false}
              >
                <div>
                  {/* Header Avatar Placeholder & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#168B72]/30 to-[#2AB7A9]/20 border border-[#2AB7A9]/30 flex items-center justify-center text-[#2AB7A9] shrink-0 shadow-md">
                      <User className="h-7 w-7 text-[#2AB7A9]" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#F8FAF9] tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-[#2AB7A9] font-medium tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C2CEC9] leading-relaxed font-normal mb-6">
                    {member.description}
                  </p>
                </div>

                {/* Focus Badges */}
                <div className="pt-5 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#D6A84B] font-semibold mb-3">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#D6A84B]" />
                    <span>Core Focus Areas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {member.focus.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#18201F] text-[#F8FAF9] border border-white/15 hover:border-[#2AB7A9]/40 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
