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
      className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative scroll-mt-16 border-b border-white/10 bg-[#18201F] text-[#F8FAF9]"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          theme="dark"
          badge="Our Team"
          title="Meet the People Behind"
          highlightText="Nuvyra"
          description="A focused two-person digital studio combining development, design, and problem-solving to build practical digital products for businesses."
          className="gap-2 mb-6 sm:mb-8"
          titleClassName="text-xl sm:text-2xl lg:text-3xl font-extrabold"
          descriptionClassName="text-xs sm:text-sm max-w-xl text-[#C2CEC9]"
        />

        {/* 2-Person Team Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-3xl mx-auto"
        >
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div key={index} variants={cardVariants} className="h-full">
              <Card
                variant="dark"
                className="p-4 sm:p-5 border-white/12 bg-[#12372A]/80 hover:border-[#2AB7A9]/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-lg h-full animate-border-breathe"
                glowOnHover={false}
              >
                <div>
                  {/* Header Avatar Placeholder & Title */}
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#168B72]/30 to-[#2AB7A9]/20 border border-[#2AB7A9]/30 flex items-center justify-center text-[#2AB7A9] shrink-0 shadow-sm">
                      <User className="h-5 w-5 text-[#2AB7A9]" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#F8FAF9] tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-mono text-[#2AB7A9] font-medium tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#C2CEC9] leading-relaxed font-normal mb-4">
                    {member.description}
                  </p>
                </div>

                {/* Focus Badges */}
                <div className="pt-3.5 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase text-[#D6A84B] font-semibold mb-2">
                    <ShieldCheck className="h-3 w-3 text-[#D6A84B]" />
                    <span>Core Focus Areas:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.focus.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#18201F] text-[#F8FAF9] border border-white/15 hover:border-[#2AB7A9]/40 transition-colors"
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
