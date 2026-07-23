import { useEffect, useMemo, useRef, useState } from "react";

export type CarouselImage = {
  src: string;
  alt?: string;
};

type CylinderCarouselProps = {
  images: CarouselImage[];
  className?: string;
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number;
  cardWidth?: number;
};

export function CylinderCarousel({
  images,
  className = "",
  containerClassName = "",
  cardClassName = "",
  animationDuration = 32,
  cardWidth = 290,
}: CylinderCarouselProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(Math.min(cardWidth, 174));

  useEffect(() => {
    const element = outerRef.current;
    if (!element) return;
    const update = () => {
      const available = element.clientWidth;
      setWidth(Math.round(Math.min(cardWidth, Math.max(158, available * 0.48))));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [cardWidth]);

  const geometry = useMemo(() => {
    const count = Math.max(images.length, 3);
    return {
      radius: Math.round((width / 2) / Math.tan(Math.PI / count)),
      step: 360 / count,
    };
  }, [images.length, width]);

  if (!images.length) return null;

  return (
    <div ref={outerRef} className={`cylinder-carousel ${className}`} aria-label="Tous nos parfums en images">
      <div
        className={`cylinder-carousel-track ${containerClassName}`}
        style={{
          width,
          transform: `translateZ(-${geometry.radius}px)`,
          animationDuration: `${animationDuration}s`,
          ["--cylinder-radius" as string]: `${geometry.radius}px`,
        }}
      >
        {images.map((image, index) => (
          <figure
            className={`cylinder-carousel-card ${cardClassName}`}
            key={`${image.src}-${index}`}
            style={{
              width,
              transform: `rotateY(${index * geometry.step}deg) translateZ(${geometry.radius}px)`,
            }}
          >
            <img
              src={image.src}
              alt={image.alt ?? "Parfum EAU TURQUOISE"}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              sizes="(max-width: 480px) 48vw, 290px"
            />
          </figure>
        ))}
      </div>
      <div className="cylinder-carousel-shadow" aria-hidden="true" />
    </div>
  );
}
