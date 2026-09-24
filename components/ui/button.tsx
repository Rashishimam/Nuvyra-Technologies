"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "dark" | "outline" | "ghost" | "coral";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  href,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none tracking-wide active:scale-[0.97] hover:-translate-y-0.5";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5",
    md: "text-xs sm:text-sm px-5 py-2.5 gap-2",
    lg: "text-sm sm:text-base px-6 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#12372A] via-[#168B72] to-[#2AB7A9] text-white font-semibold shadow-[0_4px_16px_rgba(22,139,114,0.25)] hover:shadow-[0_8px_24px_rgba(22,139,114,0.4)] hover:brightness-105 border border-[#168B72]/30",
    secondary:
      "bg-[#FFFFFF] text-[#17211F] border border-[rgba(23,33,31,0.12)] hover:bg-[#F7F7F2] hover:border-[rgba(23,33,31,0.25)] shadow-xs hover:shadow-md",
    dark:
      "bg-[#18201F] text-[#F8FAF9] border border-white/10 hover:bg-[#12372A] hover:border-[#2AB7A9]/40 hover:shadow-lg hover:shadow-black/20",
    coral:
      "bg-gradient-to-r from-[#F26B4A] to-[#D6A84B] text-white font-semibold shadow-[0_4px_16px_rgba(242,107,74,0.25)] hover:shadow-[0_8px_24px_rgba(242,107,74,0.4)] hover:brightness-105",
    outline:
      "bg-transparent text-[#168B72] border border-[#168B72]/40 hover:bg-[#168B72]/10 hover:border-[#168B72] hover:shadow-xs",
    ghost:
      "bg-transparent text-[#5A6966] hover:text-[#17211F] hover:bg-black/[0.04]",
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={(e) => {
          if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
          if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", href);
            } else {
              window.location.hash = href;
            }
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
