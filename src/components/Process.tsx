import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { processSteps, sectionIntros } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <SectionHeader
          eyebrow={sectionIntros.process.eyebrow}
          title={sectionIntros.process.title}
          description={sectionIntros.process.description}
          meta={`(${String(processSteps.length).padStart(2, "0")})`}
        />

        <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
            aria-hidden="true"
          />

          {processSteps.map((step, index) => (
            <m.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: EASE,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/[0.15] hover:bg-white/[0.06]"
            >
              <span
                className="pointer-events-none absolute -bottom-6 -right-2 z-0 select-none font-display text-[120px] font-black leading-none tracking-tighter text-white/[0.03] transition-colors duration-500 group-hover:text-white/[0.05]"
                aria-hidden="true"
              >
                {step.number}
              </span>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/40 font-mono text-[10px] text-neutral-400">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Step
                  </span>
                </div>

                <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
