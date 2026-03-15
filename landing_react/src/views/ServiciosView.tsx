import { useEffect, useRef, useState } from "react";
import { services } from "../data/content";
import { ServiceDesktopItem } from "../components/services/ServiceDesktopItem";
import { ServiceMobileCard } from "../components/services/ServiceMobileCard";

export function ServiciosView() {
  const servicesRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = servicesRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="servicios"
      ref={servicesRef}
      className="scroll-mt-24 border-y border-black/10 bg-secondary/80"
    >
      <div className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:hidden">
          {services.map((service) => (
            <ServiceMobileCard key={`service-mobile-${service.label}`} service={service} isVisible={isVisible} />
          ))}
        </div>

        <div className="relative hidden min-h-[430px] overflow-hidden rounded-3xl sm:block sm:min-h-[520px]">
          {services.map((service) => (
            <ServiceDesktopItem key={`service-${service.label}`} service={service} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
