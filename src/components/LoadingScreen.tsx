import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { loadingData } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Drive the counter with requestAnimationFrame so it stays in sync with the
  // progress bar, then hand control back to the app once it reaches 100%.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const duration = prefersReducedMotion ? 700 : 2300;
    const start = performance.now();
    let frame = 0;
    let completeTimer = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);

      setProgress(Math.min(100, Math.round(eased * 100)));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        completeTimer = window.setTimeout(
          () => onCompleteRef.current(),
          prefersReducedMotion ? 180 : 620,
        );
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex(
        (current) => (current + 1) % loadingData.statusMessages.length,
      );
    }, 700);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <m.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
      className="fixed inset-0 z-[120] overflow-hidden bg-black"
      aria-label="Loading portfolio"
    >
      {/* Ambient light and a faint technical grid, matching the reference loader. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_35%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:3.5rem_3.5rem]"
        aria-hidden="true"
      />

      <div className="relative flex min-h-dvh flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.45em] text-white/40 sm:text-xs">
          <span>{loadingData.topLabel}</span>
          <span className="font-mono tabular-nums text-white/60">
            {progress}%
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          <m.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-[18vw] font-bold uppercase leading-none tracking-[-0.08em] text-white sm:text-[10rem] lg:text-[12rem]"
          >
            {loadingData.brand}
          </m.h1>

          <div className="mt-4 flex min-h-6 items-center justify-center text-[11px] uppercase tracking-[0.35em] text-white/45 sm:min-h-7 sm:text-sm">
            <AnimatePresence mode="wait">
              <m.p
                key={statusIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.24, ease: EASE }}
              >
                {loadingData.statusMessages[statusIndex]}
              </m.p>
            </AnimatePresence>
          </div>

          <div className="mt-12 w-full max-w-3xl sm:mt-16">
            <div className="mb-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.35em] text-white/45 sm:text-xs">
              <span>{loadingData.progressLabel}</span>
              <span className="font-mono tabular-nums">{progress}%</span>
            </div>
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-white/10 sm:h-3"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label={loadingData.progressLabel}
            >
              <div
                className="h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/30 sm:text-xs">
          <span>{loadingData.footerLeft}</span>
          <span className="hidden sm:inline">{loadingData.footerRight}</span>
        </div>
      </div>
    </m.div>
  );
}
