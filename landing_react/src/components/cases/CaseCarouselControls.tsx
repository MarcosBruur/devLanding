import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CaseCarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function CaseCarouselControls({ onPrev, onNext }: CaseCarouselControlsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Casos anteriores"
        className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 rounded-full border border-black/20 bg-white p-2 text-primary shadow-sm transition hover:bg-primary/5 sm:-translate-x-5"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Siguientes casos"
        className="absolute right-0 top-1/2 translate-x-3 -translate-y-1/2 rounded-full border border-black/20 bg-white p-2 text-primary shadow-sm transition hover:bg-primary/5 sm:translate-x-5"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </>
  );
}
