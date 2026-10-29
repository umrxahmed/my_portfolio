import { m } from "framer-motion";
import { Brain, Globe, Palette, Server } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { sectionIntros, services } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain size={24} strokeWidth={1.5} />,
  palette: <Palette size={24} strokeWidth={1.5} />,
  server: <Server size={24} strokeWidth={1.5} />,
  globe: <Globe size={24} strokeWidth={1.5} />,
};

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/[0.06] py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[90rem] px-6 sm:px-12 lg:px-16">
        <SectionHeader
          eyebrow={sectionIntros.services.eyebrow}
          title={sectionIntros.services.title}
          description={sectionIntros.services.description}
          meta={`(${String(services.length).padStart(2, "0")})`}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <m.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: EASE,
              }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/[0.15] hover:bg-white/[0.06] md:p-9"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-400 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white">
                  {iconMap[service.icon]}
                </div>
                <span
                  className="font-mono text-[10px] tracking-widest text-neutral-600"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
              </div>

              <h3 className="mb-3 font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                {service.title}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                {service.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
