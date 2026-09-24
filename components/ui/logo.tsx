"use client";

import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "full" | "icon";
  theme?: "color" | "dark" | "monochrome";
  concept?: 1 | 2 | 3;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Nuvyra Technologies Brand Logos
 * 
 * Concept 1: Geometric N Monogram (Precision interlocked diagonals & teal accent)
 * Concept 2: Negative-Space N Monogram (Solid geometric frame with precision negative cut)
 * Concept 3: Abstract Architectural N Symbol (Elevated dual-pillar angular structure)
 */
export function NuvyraLogo({
  variant = "full",
  theme = "color",
  concept = 1,
  size = "md",
  className = "",
  ...props
}: LogoProps) {
  const sizeMap = {
    sm: { height: 28, iconSize: 24 },
    md: { height: 36, iconSize: 32 },
    lg: { height: 48, iconSize: 44 },
    xl: { height: 64, iconSize: 60 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Colors based on theme
  const colors = {
    color: {
      primary: "#12372A", // Deep Forest Green
      accent: "#168B72",  // Subtle Teal Accent
      textMain: "#17211F", // Dark Charcoal
      textSub: "#5A6966",  // Muted Slate
    },
    dark: {
      primary: "#2AB7A9", // Bright Teal for Dark Mode
      accent: "#168B72",  // Deep Teal
      textMain: "#F8FAF9", // Off-White
      textSub: "#C2CEC9",  // Muted Light Green
    },
    monochrome: {
      primary: "#000000",
      accent: "#000000",
      textMain: "#000000",
      textSub: "#4A4A4A",
    },
  }[theme];

  // Concept 1: Geometric N Monogram Icon
  const Concept1Icon = (
    <svg
      width={currentSize.iconSize}
      height={currentSize.iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Left Vertical Pillar */}
      <path
        d="M6 6H13V34H6V6Z"
        fill={colors.primary}
      />
      {/* Right Vertical Pillar */}
      <path
        d="M27 6H34V34H27V6Z"
        fill={colors.primary}
      />
      {/* Interlocking Diagonal Bar 1 */}
      <path
        d="M11 6L31 30H24L6 8.5V6H11Z"
        fill={colors.accent}
      />
      {/* Interlocking Diagonal Bar 2 */}
      <path
        d="M16 10L34 31.5V34H29L9 14H16Z"
        fill={colors.primary}
      />
    </svg>
  );

  // Concept 2: Negative-Space N Monogram Icon
  const Concept2Icon = (
    <svg
      width={currentSize.iconSize}
      height={currentSize.iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Outer Hex-Geometric Frame */}
      <path
        d="M6 6H15L34 29V34H25L6 11V6Z"
        fill={colors.primary}
      />
      <path
        d="M6 34V20L18 34H6Z"
        fill={colors.accent}
      />
      <path
        d="M34 6V20L22 6H34Z"
        fill={colors.primary}
      />
    </svg>
  );

  // Concept 3: Abstract Architectural N Symbol
  const Concept3Icon = (
    <svg
      width={currentSize.iconSize}
      height={currentSize.iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Left Angular Wing */}
      <path
        d="M6 14L16 6V26L6 34V14Z"
        fill={colors.primary}
      />
      {/* Central Connecting Diagonal */}
      <path
        d="M16 6L34 26V34L16 14V6Z"
        fill={colors.accent}
      />
      {/* Right Angular Wing */}
      <path
        d="M24 14L34 6V26L24 34V14Z"
        fill={colors.primary}
      />
    </svg>
  );

  const selectedIcon =
    concept === 1 ? Concept1Icon : concept === 2 ? Concept2Icon : Concept3Icon;

  if (variant === "icon") {
    return selectedIcon;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {selectedIcon}
      <div className="flex flex-col justify-center leading-none">
        <span
          className="font-extrabold tracking-tight font-sans text-lg sm:text-xl"
          style={{ color: colors.textMain, letterSpacing: "0.03em" }}
        >
          NUVYRA
        </span>
        <span
          className="font-semibold tracking-[0.28em] text-[8px] sm:text-[9.5px] uppercase font-mono mt-0.5"
          style={{ color: colors.textSub }}
        >
          TECHNOLOGIES
        </span>
      </div>
    </div>
  );
}
