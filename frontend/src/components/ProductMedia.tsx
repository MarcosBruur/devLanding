import { useRef, useState } from "react";
import type { Product } from "../types/catalog";

interface Props {
  product: Product;
  index: number;
}

export function ProductMedia({ product, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoveredRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const videoOnly = Boolean(product.video && !product.img);

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
    <div
      className={`product-media product-media--${index % 2}${product.video ? " has-video" : ""}${product.videoPreviewAspectRatio ? " has-cropped-video" : ""}${videoOnly ? " video-only" : ""}${playing ? " is-playing" : ""}`}
      style={product.videoPreviewAspectRatio ? { aspectRatio: product.videoPreviewAspectRatio } : undefined}
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
  );
}
