import { m } from "framer-motion";
import { Heart } from "lucide-react";
import { footerData, profileData, socialLinks } from "../data/portfolioData";

const EASE = [0.16, 1, 0.3, 1] as const;

// Inline SVGs for brand icons (lucide-react removed brand icons)
const socialIconMap: Record<string, React.ReactNode> = {
  linkedin: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  github: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  instagram: (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:px-12 lg:px-16">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-10 border-b border-white/[0.08] pb-12 md:flex-row md:items-end md:justify-between">
            {/* Brand */}
            <div>
              <a
                href="#hero"
                onClick={(event) => {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-display text-6xl font-black tracking-tighter text-white transition-opacity hover:opacity-70 md:text-8xl"
              >
                {footerData.brand}
              </a>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
                {footerData.tagline}
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-neutral-400 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  >
                    {socialIconMap[link.icon]}
                  </a>
                ))}
              </div>
              <a
                href={`mailto:${profileData.email}`}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {profileData.email}
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-500">{footerData.copyright}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-neutral-600">
                {footerData.credit} with
                <Heart
                  size={12}
                  className="fill-neutral-600 text-neutral-600"
                  aria-hidden="true"
                />
                passion.
              </span>

              <button
                type="button"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="cursor-pointer text-xs text-neutral-500 transition-colors duration-200 hover:text-white"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </m.div>
      </div>
    </footer>
  );
}
