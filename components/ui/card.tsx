import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  variant?: "light" | "dark" | "elevated";
}

export function Card({
  className,
  glowOnHover = true,
  variant = "light",
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    light:
      "bg-[#FFFFFF] text-[#17211F] border border-[rgba(23,33,31,0.08)] shadow-[0_4px_20px_-4px_rgba(23,33,31,0.05)]",
    dark:
      "bg-[#18201F] text-[#F8FAF9] border border-white/10 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)]",
    elevated:
      "bg-[#F7F7F2] text-[#17211F] border border-[rgba(23,33,31,0.1)] shadow-md",
  };

  const hoverStyles = {
    light:
      "hover:border-[#168B72]/40 hover:shadow-[0_12px_30px_-6px_rgba(22,139,114,0.12)] hover:-translate-y-0.5",
    dark:
      "hover:border-[#2AB7A9]/40 hover:bg-[#12372A]/70 hover:shadow-[0_12px_30px_-6px_rgba(42,183,169,0.15)] hover:-translate-y-0.5",
    elevated:
      "hover:border-[#168B72]/40 hover:bg-[#FFFFFF] hover:shadow-lg hover:-translate-y-0.5",
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variantStyles[variant],
        glowOnHover && hoverStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
