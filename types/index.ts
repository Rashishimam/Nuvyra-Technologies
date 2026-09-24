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
  tags?: string[];
  cta?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  solution: string;
  whatWeBuilt: string;
  technologies: string[];
  typeLabel: "Concept Project" | "Demo Project";
  gradient: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  focus: string[];
}

// ─── Backend / Inquiry Types ─────────────────────────────────

export type InquiryStatus =
  | "new"
  | "contacted"
  | "in_progress"
  | "completed"
  | "rejected";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}
