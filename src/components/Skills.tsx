import type { MouseEvent } from "react";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  marqueeItems,
  sectionIntros,
  skillCategories,
} from "../data/portfolioData";
import type { SkillCategory } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_TILT = 2;
const SPOTLIGHT_RADIUS = 600;

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCard({ category, index }: SkillCardProps) {
  const reduceMotion = useReducedMotion();

  // Normalized pointer position drives the constrained 3D tilt.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const rotateX = useTransform(pointerY, [0, 1], [MAX_TILT, -MAX_TILT]);
  const rotateY = useTransform(pointerX, [0, 1], [-MAX_TILT, MAX_TILT]);

  const springRotateX = useSpring(rotateX, {
    stiffness: 160,
    damping: 20,
    mass: 0.6,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: 160,
    damping: 20,
    mass: 0.6,
  });

  // Pixel position drives the monochrome spotlight.
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(${SPOTLIGHT_RADIUS}px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.03), transparent 40%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    spotlightX.set(x);
    spotlightY.set(y);

    if (reduceMotion) return;

    pointerX.set(x / rect.width);
    pointerY.set(y / rect.height);
  };

  const handleMouseLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      className="group h-full will-change-transform"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-7 backdrop-blur-md transition-colors duration-500 group-hover:border-white/15">
        {/* Monochrome mouse spotlight */}
        <m.div
          aria-hidden="true"
          style={{ backgroundImage: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="relative z-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-300">
              {category.title}
            </h3>
            <span
              className="font-mono text-[10px] tracking-widest text-neutral-600"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-neutral-800 bg-neutral-900/40 px-4 py-2 text-sm text-neutral-400 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <SectionHeader
          eyebrow={sectionIntros.skills.eyebrow}
          title={sectionIntros.skills.title}
          description={sectionIntros.skills.description}
          meta={`(${String(skillCategories.length).padStart(2, "0")})`}
        />

        <div
          className="grid gap-4 sm:grid-cols-2"
          style={{ perspective: "1000px" }}
        >
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Infinite marquee — decorative; the grid above is the accessible list */}
      <div className="relative mt-20 overflow-hidden border-y border-white/[0.08] py-6 md:mt-24">
        <div
          className="absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-black to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-black to-transparent"
          aria-hidden="true"
        />

        <div className="animate-marquee flex w-max" aria-hidden="true">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-10 pr-10">
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item.text}`}
                  className="inline-flex items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500"
                >
                  <span className="h-1 w-1 rounded-full bg-neutral-700" />
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
