import React from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlightText,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-12 sm:mb-16",
        align === "center" ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-xl",
        className
      )}
    >
      {badge && <Badge variant="cyan">{badge}</Badge>}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
        {title}{" "}
        {highlightText && (
          <span className="text-gradient-cyan">{highlightText}</span>
        )}
      </h2>
      {description && (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
