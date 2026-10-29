import { m } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { projects, sectionIntros } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SelectedWorks() {
  return (
    <section
      id="work"
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <SectionHeader
          eyebrow={sectionIntros.work.eyebrow}
          title={sectionIntros.work.title}
          description={sectionIntros.work.description}
          meta={`(${String(projects.length).padStart(2, "0")})`}
        />

        <div className="flex flex-col gap-4">
          {projects.map((project, index) => (
            <m.article
              key={project.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: EASE,
              }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/[0.15] hover:bg-white/[0.06] md:p-10"
            >
              {/* Massive muted project number */}
              <span
                className="pointer-events-none absolute -right-3 -top-12 select-none font-display text-[10rem] font-black leading-none tracking-tighter text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.06] md:-right-8 md:-top-20 md:text-[16rem]"
                aria-hidden="true"
              >
                {project.index}
              </span>

              <div className="relative z-10 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500">
                    {project.index}
                  </span>
                  <span
                    className="h-px w-8 bg-white/15"
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                  {project.title}
                </h3>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400 md:text-base">
                  {project.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
