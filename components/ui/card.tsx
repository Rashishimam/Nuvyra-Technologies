import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
}

export function Card({
  className,
  glowOnHover = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-6 transition-all duration-300",
        glowOnHover && "glass-panel-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
