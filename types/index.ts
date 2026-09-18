import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface ProblemSolutionItem {
  problem: string;
  solution: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stats?: string;
  tags: string[];
  link?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface StatItem {
  value: string;
  label: string;
  subtext: string;
}
