import { m } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  meta,
}: SectionHeaderProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-16 border-b border-white/[0.08] pb-8 md:mb-20"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-neutral-400 md:text-lg">
            {description}
          </p>
        </div>
        {meta && (
          <span className="font-mono text-xs tracking-[0.2em] text-neutral-600">
            {meta}
          </span>
        )}
      </div>
    </m.div>
  );
}
