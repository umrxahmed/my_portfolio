import { m, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import PhotoDeck from "./PhotoDeck";
import { aboutData, photoDeck, profileData } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

const typewriterContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.01 },
  },
};

const typewriterWord: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function TypewriterWords({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <m.span
          key={`${word}-${index}`}
          variants={typewriterWord}
          className="inline"
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </m.span>
      ))}
    </>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-x-clip border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14 flex items-center gap-4 border-b border-white/[0.08] pb-4 md:mb-20"
        >
          <span className="h-px w-8 bg-neutral-700" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            {aboutData.eyebrow}
          </span>
          <span
            className="ml-auto font-mono text-[10px] tracking-[0.2em] text-neutral-600"
            aria-hidden="true"
          >
            (01)
          </span>
        </m.div>

        <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          {/* Interactive photo deck — replaces the static portrait */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            viewport={{ once: true }}
            className="w-full"
          >
            <PhotoDeck
              photos={photoDeck}
              fallbackSrc={profileData.profileImage}
            />
          </m.div>

          {/* Bio */}
          <div>
            <m.div
              variants={typewriterContainer}
              initial={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <m.h2
                variants={typewriterContainer}
                className="mb-8 font-display text-4xl font-bold leading-none tracking-tighter text-white md:text-5xl lg:text-6xl"
              >
                <TypewriterWords text={aboutData.title} />
              </m.h2>

              <m.div
                variants={typewriterContainer}
                className="space-y-5 text-base leading-relaxed text-neutral-400"
              >
                {aboutData.paragraphs.map((paragraph) => (
                  <m.p key={paragraph} variants={typewriterContainer}>
                    <TypewriterWords text={paragraph} />
                  </m.p>
                ))}
              </m.div>
            </m.div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              {aboutData.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    {stat.label}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
