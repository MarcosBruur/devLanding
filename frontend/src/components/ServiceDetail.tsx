import {
  CloudIcon,
  CodeBracketIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import type { Service, ServiceIcon } from "../types/service";

const icons: Record<ServiceIcon, typeof CloudIcon> = {
  cloud: CloudIcon,
  tools: WrenchScrewdriverIcon,
  code: CodeBracketIcon,
};

interface Props {
  service: Service;
}

export function ServiceDetail({ service }: Props) {
  const Icon = icons[service.icon];

  return (
    <article className="service-card" aria-labelledby={`service-${service.id}`}>
      <span className="service-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 id={`service-${service.id}`}>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}
