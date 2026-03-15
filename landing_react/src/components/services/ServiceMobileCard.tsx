import type { ServiceItem } from "../../typescript";

interface ServiceMobileCardProps {
  service: ServiceItem;
  isVisible: boolean;
}

export function ServiceMobileCard({ service, isVisible }: ServiceMobileCardProps) {
  const Icon = service.icon;

  return (
    <div
      className={`rounded-2xl p-4 text-center transition-all duration-700 ease-out ${service.delayClass} ${
        isVisible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : "translate-y-5 scale-90 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-4 text-gray-600 shadow-lg shadow-black/10">
          <Icon className="h-9 w-9" />
        </div>
        <p className="text-center text-lg font-bold sm:text-sm">{service.label}</p>
      </div>
    </div>
  );
}
