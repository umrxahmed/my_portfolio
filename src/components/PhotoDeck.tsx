import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { m } from "framer-motion";
import type { DeckPhoto } from "../data/portfolioData";

// Apple-style spring used for both transforms and layout shifts.
const SPRING = {
  type: "spring",
  stiffness: 200,
  damping: 20,
  layout: { type: "spring", stiffness: 200, damping: 20 },
} as const;

const SHUFFLE_INTERVAL = 2000;

// Deterministic messy angles/offsets. Using presets instead of Math.random()
// keeps the scatter stable across renders and avoids hydration-style jumps.
const MESSY_POSITIONS = [
  { rotate: 0, x: 0, y: 0 },
  { rotate: -11, x: -14, y: 10 },
  { rotate: 8, x: 16, y: -12 },
  { rotate: -6, x: -8, y: -16 },
  { rotate: 13, x: 12, y: 16 },
  { rotate: -14, x: -18, y: 6 },
  { rotate: 5, x: 18, y: -8 },
];

interface PhotoDeckProps {
  photos: DeckPhoto[];
  fallbackSrc?: string;
}

export default function PhotoDeck({ photos, fallbackSrc }: PhotoDeckProps) {
  const [order, setOrder] = useState(() => photos.map((_, index) => index));

  // Deal the top card to the back every two seconds.
  useEffect(() => {
    if (photos.length < 2) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setOrder((current) => {
        if (current.length < 2) return current;
        const [first, ...rest] = current;
        return [...rest, first];
      });
    }, SHUFFLE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [photos.length]);

  // Use the existing portrait until profile1–7.jpg are added to /public.
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (!fallbackSrc || image.dataset.fallback === "true") return;

    image.dataset.fallback = "true";
    image.src = fallbackSrc;
  };

  return (
    <div className="relative aspect-[4/5] w-full max-w-sm">
      {order.map((photoIndex, stackIndex) => {
        const photo = photos[photoIndex];
        const isTop = stackIndex === 0;
        const messy = MESSY_POSITIONS[stackIndex % MESSY_POSITIONS.length];

        return (
          <m.div
            key={photo.src}
            layout
            initial={false}
            animate={{
              x: isTop ? 0 : messy.x,
              y: isTop ? 0 : messy.y,
              rotate: isTop ? 0 : messy.rotate,
              scale: isTop ? 1 : 1 - stackIndex * 0.05,
              opacity: isTop ? 1 : 1 - stackIndex * 0.08,
              filter: isTop
                ? "blur(0px)"
                : `blur(${Math.min(stackIndex * 2, 10)}px)`,
            }}
            transition={SPRING}
            style={{ zIndex: 50 - stackIndex }}
            aria-hidden={!isTop}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)]"
          >
            <img
              src={photo.src}
              alt={isTop ? photo.alt : ""}
              loading="lazy"
              draggable={false}
              onError={handleImageError}
              className="h-full w-full select-none object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.04]"
              aria-hidden="true"
            />
          </m.div>
        );
      })}
    </div>
  );
}
