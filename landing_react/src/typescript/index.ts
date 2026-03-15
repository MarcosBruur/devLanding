import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface CaseStudy {
  title: string;
  result: string;
  detail: string;
  image: string;
  video?: string;
}

export interface ServiceItem {
  icon: IconComponent;
  label: string;
  position: string;
  hiddenClass: string;
  delayClass: string;
  iconSize: string;
}

export interface AboutMeData {
  name: string;
  role: string;
  years: string;
  intro: string;
  highlights: string[];
}

export interface SocialLink {
  href: string;
  label: string;
  icon: "linkedin" | "github" | "instagram" | "whatsapp";
}
