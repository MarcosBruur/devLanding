import {
  BuildingOffice2Icon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  CloudArrowUpIcon,
  CpuChipIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import type {
  AboutMeData,
  CaseStudy,
  ServiceItem,
  SocialLink,
} from "../typescript";

export const cases: CaseStudy[] = [
  {
    title: "Sitio web para grafica",
    result:
      "Al conseguir presencia en la red se consiguio mayor retencion de clientes.",
    detail:
      "Se creo un sitio web para una grafica local, mostrando sus servicios, trabajos anteriores y facilitando el contacto directo con potenciales clientes. Ademas se agrego una funcion para comprar impresiones directamente desde el sitio web.",
    image: "/copycom.png",
    video: "/copycom4.mp4",
  },
  {
    title:
      "Sistema de venta, control de stock y administración para empresa gráfica",
    result:
      "Se consiguio un aumento de eficiencia operativa, una mejora en la toma de decisiones y reducción de costos.",
    detail:
      "Se integraron ventas, control de stock, métricas, administración de sucursales, horarios de entrada/salida y mucho más en un único sistema.",
    image: "/copycom2.jpeg",
    video: "/copycom3.mp4",
  },
];

export const services: ServiceItem[] = [
  {
    icon: BuildingOffice2Icon,
    label: "Tu negocio con presencia digital",
    position: "left-[3%] top-[3%] sm:left-[5%] sm:top-[5%]",
    hiddenClass: "-translate-x-10 -translate-y-8",
    delayClass: "delay-100",
    iconSize: "size-30 sm:size-24",
  },
  {
    icon: ChartBarSquareIcon,
    label: "Control con metricas claras",
    position: "sm:left-[33%] sm:top-[12%]",
    hiddenClass: "translate-y-10",
    delayClass: "delay-200",
    iconSize: "size-30 sm:size-24",
  },
  {
    icon: Cog6ToothIcon,
    label: "Procesos automatizados",
    position: "sm:right-[27%] sm:top-[5%]",
    hiddenClass: "translate-x-10 -translate-y-6",
    delayClass: "delay-300",
    iconSize: "h-14 w-14 sm:h-20 sm:w-20",
  },
  {
    icon: CloudArrowUpIcon,
    label: "Integracion entre sistemas",
    position: "sm:left-[18%] sm:top-[56%]",
    hiddenClass: "-translate-x-8 translate-y-8",
    delayClass: "delay-500",
    iconSize: "h-16 w-16 sm:h-24 sm:w-24",
  },
  {
    icon: CpuChipIcon,
    label: "Negocios escalables",
    position: "sm:left-[52%] sm:top-[70%]",
    hiddenClass: "translate-y-12",
    delayClass: "delay-700",
    iconSize: "h-14 w-14 sm:h-20 sm:w-20",
  },
  {
    icon: CircleStackIcon,
    label: "Control de datos unificados",
    position: "sm:right-[8%] sm:bottom-[14%]",
    hiddenClass: "translate-x-8 translate-y-8",
    delayClass: "delay-1000",
    iconSize: "h-16 w-16 sm:h-24 sm:w-24",
  },
];

export const aboutMe: AboutMeData = {
  name: "Marcos Bruno",
  role: "Desarrollador de software independiente",
  years: "3+ años de experiencia",
  intro:
    "Me especializo en transformar ideas en productos digitales utiles, simples de usar y enfocados en resultados.",
  highlights: [
    "Especializacion en aplicaciones web a medida",
    "Enfoque en automatizacion y mejora de procesos",
    "Trabajo cercano, con comunicacion clara y entregas iterativas",
  ],
};

export const aboutSocialLinks: SocialLink[] = [
  {
    href: "https://www.linkedin.com/in/marcos-alexis-bruno-urquiza-71202826b/",
    label: "LinkedIn",
    icon: "linkedin",
  },
  { href: "https://github.com/MarcosBruur", label: "GitHub", icon: "github" },
  {
    href: "https://www.instagram.com/marcos_bruno_ur/",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://wa.me/543865452354",
    label: "WhatsApp",
    icon: "whatsapp",
  },
];

export const contactSocialLinks: SocialLink[] = [
  {
    href: "https://wa.me/543865452354",
    label: "WhatsApp",
    icon: "whatsapp",
  },
];
