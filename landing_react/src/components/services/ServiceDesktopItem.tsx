import type { ServiceItem } from "../../typescript";

interface ServiceDesktopItemProps {
  service: ServiceItem;
  isVisible: boolean;
}

export function ServiceDesktopItem({ service, isVisible }: ServiceDesktopItemProps) {
  const Icon = service.icon;

  return (
    <div
      className={`absolute ${service.position} transition-all duration-1000 ease-out ${service.delayClass} ${
        isVisible
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `${service.hiddenClass} scale-75 opacity-0`
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="rounded-full bg-white/90 p-5 text-gray-600 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-6">
          <Icon className={service.iconSize} />
        </div>
        <p className="text-center text-xs font-bold sm:text-sm">{service.label}</p>
      </div>
    </div>
  );
}
