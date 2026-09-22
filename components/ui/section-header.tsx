"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "emerald" | "teal" | "coral" | "gold" | "dark" | "light";
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeader({
  badge,
  badgeVariant = "emerald",
  title,
  highlightText,
  description,
  align = "center",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "flex flex-col gap-3 mb-12 sm:mb-16",
        align === "center"
          ? "items-center text-center max-w-3xl mx-auto"
          : "items-start text-left max-w-2xl",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Badge
            variant={isDark ? "teal" : badgeVariant}
            className="text-[10px] sm:text-[11px] py-1 px-3.5 tracking-widest"
          >
            {badge}
          </Badge>
        </motion.div>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]",
          isDark ? "text-[#F8FAF9]" : "text-[#17211F]"
        )}
      >
        {title}{" "}
        {highlightText && (
          <span className={isDark ? "text-gradient-light-emerald" : "text-gradient-emerald"}>
            {highlightText}
          </span>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed font-normal max-w-2xl",
            isDark ? "text-[#C2CEC9]" : "text-[#5A6966]"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
