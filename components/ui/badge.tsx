import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "teal" | "coral" | "gold" | "dark" | "light" | "accent";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "emerald",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    emerald: "bg-[#168B72]/10 text-[#12372A] border-[#168B72]/30",
    teal: "bg-[#2AB7A9]/15 text-[#12372A] border-[#2AB7A9]/35",
    coral: "bg-[#F26B4A]/10 text-[#F26B4A] border-[#F26B4A]/30",
    gold: "bg-[#D6A84B]/15 text-[#9A751F] border-[#D6A84B]/35",
    dark: "bg-[#18201F] text-[#F8FAF9] border-white/10",
    light: "bg-[#FFFFFF] text-[#17211F] border-[rgba(23,33,31,0.12)] shadow-sm",
    accent: "bg-[#168B72]/10 text-[#168B72] border-[#168B72]/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
