import React from "react";
import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  position?: "top-left" | "top-right" | "center" | "bottom-center";
  color?: "emerald" | "teal" | "gold" | "coral";
}

export function Glow({
  className,
  position = "center",
  color = "emerald",
}: GlowProps) {
  const positionClasses = {
    "top-left": "top-0 left-1/4 -translate-y-1/2 -translate-x-1/2",
    "top-right": "top-0 right-1/4 -translate-y-1/2 translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  };

  const colorClasses = {
    emerald: "bg-[#168B72]/10",
    teal: "bg-[#2AB7A9]/10",
    gold: "bg-[#D6A84B]/10",
    coral: "bg-[#F26B4A]/10",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[380px] w-[550px] rounded-full blur-[140px]",
        positionClasses[position],
        colorClasses[color],
        className
      )}
    />
  );
}
