import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import type { CaseStudy } from "../../typescript";

interface CaseCardProps {
  item: CaseStudy;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export function CaseCard({ item, isHovered, onHoverStart, onHoverEnd }: CaseCardProps) {
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const hasVideo = Boolean(item.video);

  return (
    <article className="group border-0 bg-transparent p-0 shadow-none transition-all duration-300 sm:rounded-2xl sm:border sm:border-black/10 sm:bg-white sm:p-8 sm:shadow-sm sm:hover:-translate-y-1 sm:hover:border-primary/40 sm:hover:shadow-lg">
      <div className="relative left-1/2 mb-6 w-screen -translate-x-1/2 sm:hidden">
        <div className="relative overflow-hidden rounded-none">
          {isMobilePlaying && item.video ? (
            <video
              src={item.video}
              muted
              autoPlay
              loop
              playsInline
              className="h-80 w-full bg-white object-fill object-center"
            />
          ) : (
            <img
              src={item.image}
              alt={item.title}
              className="h-80 w-full bg-white object-fill object-center"
            />
          )}
          {hasVideo && (
            <button
              type="button"
              aria-label={isMobilePlaying ? "Pausar video" : "Reproducir video"}
              onClick={() => setIsMobilePlaying((prev) => !prev)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 text-white transition hover:bg-black/30"
            >
              {isMobilePlaying ? <PauseIcon className="h-12 w-12" /> : <PlayIcon className="h-12 w-12" />}
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 hidden sm:block" onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd}>
        {isHovered && item.video ? (
          <video
            key={`video-${item.title}`}
            src={item.video}
            muted
            autoPlay
            loop
            playsInline
            className="h-72 w-full rounded-xl bg-white object-fill object-center sm:h-80"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            className="h-72 w-full rounded-xl bg-white object-fill object-center transition-transform duration-300 group-hover:scale-[1.03] sm:h-80"
          />
        )}
      </div>
      <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>
      <p className="mb-3 text-sm font-semibold text-highlight sm:text-base">{item.result}</p>
      <p className="text-sm text-black/75">{item.detail}</p>
    </article>
  );
}
