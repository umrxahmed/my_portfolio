import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { m } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { heroData, profileData } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const headlineLine: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const actionIcons: Record<string, ReactNode> = {
  primary: <ArrowDown size={16} aria-hidden="true" />,
  secondary: <ArrowUpRight size={16} aria-hidden="true" />,
};

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAction = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const el = document.querySelector<HTMLElement>(href);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", href);
  };

  const [firstLine, ...rest] = heroData.headline.split(" ");
  const secondLine = rest.join(" ");

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-[90rem] px-6 pb-24 pt-32 sm:px-12 md:py-28 lg:px-16"
      >
        {/* Full-width meta row */}
        <m.div
          variants={fadeUp}
          className="mb-14 flex items-center justify-between gap-6 border-b border-white/[0.08] pb-4 md:mb-20"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-white/20" aria-hidden="true" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-neutral-400 sm:text-xs">
              {profileData.name}
            </span>
          </div>
        </m.div>

        <div className="w-full md:w-1/2">
          <m.p
            variants={fadeUp}
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500 sm:text-xs"
          >
            {heroData.eyebrow}
          </m.p>

          <m.h1
            variants={headlineVariants}
            initial="hidden"
            animate={ready ? "visible" : "hidden"}
            className="font-display text-6xl font-black uppercase leading-[0.88] tracking-tighter text-white max-sm:text-[clamp(2.1rem,10.5vw,2.7rem)] md:w-[200%] md:text-[clamp(3.6rem,9vw,5.5rem)] lg:text-8xl"
          >
            <span className="block overflow-hidden py-[0.18em]">
              <m.span variants={headlineLine} className="block">
                {firstLine}
              </m.span>
            </span>
            <span className="block overflow-hidden py-[0.18em]">
              <m.span
                variants={headlineLine}
                className="block text-neutral-500"
              >
                {secondLine}
              </m.span>
            </span>
          </m.h1>

          <m.div
            variants={fadeUp}
            className="mt-12 flex flex-col gap-8 border-t border-white/[0.08] pt-8 md:mt-16 md:gap-10"
          >
            <p className="max-w-md text-base font-light leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
              {heroData.subHeadline}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              {heroData.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  onClick={(event) => handleAction(event, action.href)}
                  className={`group inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ${
                    action.variant === "primary"
                      ? "bg-white text-black hover:bg-neutral-200"
                      : "border border-white/20 text-white hover:bg-white hover:text-black"
                  }`}
                >
                  {actionIcons[action.variant]}
                  {action.label}
                </a>
              ))}
            </div>
          </m.div>
        </div>
      </m.div>

      {/* Blended portrait layer — shifted down so the subject sits flush with the bottom */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 h-full w-full overflow-hidden md:w-[50%]">
        <img
          src={profileData.profileImage}
          alt={profileData.shortName}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full translate-y-[10%] scale-105 object-cover object-center opacity-95 brightness-90 contrast-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/15 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_0%,rgba(0,0,0,0.35)_55%,#000_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 h-[10%] bg-black"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-[10%] h-[10%] bg-gradient-to-b from-black to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-black/45 md:hidden"
          aria-hidden="true"
        />
      </div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready && showScrollHint ? 1 : 0 }}
        transition={{
          delay: ready && showScrollHint ? 0.9 : 0,
          duration: 0.4,
        }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex h-8 w-5 justify-center rounded-full border border-white/20"
        >
          <m.div className="mt-1.5 h-2 w-1 rounded-full bg-white/40" />
        </m.div>
      </m.div>
    </section>
  );
}
