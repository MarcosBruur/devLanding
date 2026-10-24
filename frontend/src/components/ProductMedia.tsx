import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal, flushSync } from "react-dom";
import type { Product } from "../types/catalog";

interface Props {
  product: Product;
  index: number;
}

export function ProductMedia({ product, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const orientationLockedRef = useRef(false);
  const hoveredRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const videoOnly = Boolean(product.video && !product.img);

  useEffect(() => {
    if (!demoOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    backButtonRef.current?.focus();

    function handleFullscreenChange() {
      if (!document.fullscreenElement) closeDemo();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !document.fullscreenElement) closeDemo();
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
      if (orientationLockedRef.current) {
        screen.orientation.unlock();
        orientationLockedRef.current = false;
      }
      openButtonRef.current?.focus();
    };
  }, [demoOpen]);

  function closeDemo() {
    demoVideoRef.current?.pause();
    if (document.fullscreenElement === demoRef.current) {
      void document.exitFullscreen().catch(() => {});
    }
    setDemoOpen(false);
    setDemoPlaying(false);
  }

  function openDemo() {
    stopPreview();
    // Render the player before requesting fullscreen, while the click still has user activation.
    flushSync(() => setDemoOpen(true));
    const video = demoVideoRef.current;
    if (video) {
      video.currentTime = 0;
      void video.play().catch(() => setDemoPlaying(false));
    }
    const fullscreen = demoRef.current?.requestFullscreen?.();
    if (fullscreen) {
      void fullscreen.then(() => {
        if (document.fullscreenElement !== demoRef.current) return;
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (value: "landscape") => Promise<void>;
        };
        void orientation?.lock?.("landscape").then(() => {
          if (document.fullscreenElement === demoRef.current) orientationLockedRef.current = true;
          else orientation.unlock();
        }).catch(() => {});
      }).catch(() => {});
    }
  }

  function toggleDemo() {
    const video = demoVideoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setDemoPlaying(false));
    else video.pause();
  }

  function startPreview() {
    if (
      !product.video ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    hoveredRef.current = true;
    videoRef.current
      ?.play()
      .then(() => {
        if (hoveredRef.current) setPlaying(true);
      })
      .catch(() => setPlaying(false));
  }

  function stopPreview() {
    hoveredRef.current = false;
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setPlaying(false);
  }

  return (
    <>
    <div
      className={`product-media product-media--${index % 2}${product.video ? " has-video" : ""}${product.videoPreviewAspectRatio ? " has-cropped-video" : ""}${videoOnly ? " video-only" : ""}${playing ? " is-playing" : ""}`}
      style={product.videoPreviewAspectRatio ? { "--preview-ratio": product.videoPreviewAspectRatio } as CSSProperties : undefined}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
    >
      {product.img ? (
        <img
          src={product.img}
          alt={`Ilustración de ejemplo de ${product.name}`}
          loading="lazy"
          width="900"
          height="600"
        />
      ) : !product.video ? (
        <div
          className="media-empty"
          aria-label={`Vista previa de ${product.name} no disponible`}
        >
          Vista previa próximamente
        </div>
      ) : null}
      {product.video && (
        <div className="product-video-frame">
          <video
            ref={videoRef}
            src={product.video}
            poster={product.img}
            muted
            playsInline
            loop
            preload={videoOnly ? "auto" : "none"}
            aria-label={`Vista previa en vídeo de ${product.name}`}
            className={playing ? "is-playing" : ""}
          />
        </div>
      )}
    </div>
    {product.video && (
      <button ref={openButtonRef} className="demo-open-button" type="button" onClick={openDemo}>
        Ver demostración <span aria-hidden="true">↗</span>
      </button>
    )}
    {product.video && demoOpen && createPortal(
      <div ref={demoRef} className="demo-overlay" role="dialog" aria-modal="true" aria-label={`Demostración de ${product.name}`}>
        <div className="demo-stage">
          <video
            ref={demoVideoRef}
            src={product.video}
            poster={product.img}
            playsInline
            preload="none"
            onClick={toggleDemo}
            onPlay={() => setDemoPlaying(true)}
            onPause={() => setDemoPlaying(false)}
            onEnded={() => setDemoPlaying(false)}
            aria-label={`Demostración de ${product.name}`}
          />
          <button
            className={`demo-toggle${demoPlaying ? " is-playing" : ""}`}
            type="button"
            onClick={toggleDemo}
            aria-label={demoPlaying ? "Pausar demostración" : "Reproducir demostración"}
          >
            {demoPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="5" y="4" width="5" height="16" rx="1" /><rect x="14" y="4" width="5" height="16" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 3.8a1 1 0 0 1 1.5-.86l12 8.2a1 1 0 0 1 0 1.72l-12 8.2A1 1 0 0 1 7 20.2Z" /></svg>
            )}
          </button>
          <div className="demo-controls">
            <button ref={backButtonRef} type="button" onClick={closeDemo}>← Volver</button>
          </div>
        </div>
      </div>,
      document.body,
    )}
    </>
  );
}
