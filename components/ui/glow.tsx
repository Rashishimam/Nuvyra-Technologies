import React from "react";
import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  position?: "top-left" | "top-right" | "center" | "bottom-center";
}

export function Glow({ className, position = "center" }: GlowProps) {
  const positionClasses = {
    "top-left": "top-0 left-1/4 -translate-y-1/2 -translate-x-1/2",
    "top-right": "top-0 right-1/4 -translate-y-1/2 translate-x-1/2",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 h-[350px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]",
        positionClasses[position],
        className
      )}
    />
  );
}
