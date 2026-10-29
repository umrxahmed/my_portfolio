import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { headerBadges, navLinks, profileData } from "../data/portfolioData";

const scrollToHref = (href: string) => {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth" });
  window.history.replaceState(null, "", href);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.replaceState(null, "", window.location.pathname);
};

interface NavbarProps {
  ready: boolean;
}

export default function Navbar({ ready }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pendingScroll = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .filter((link) => !link.external)
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveLink(`#${visible.target.id}`);
        } else {
          setActiveLink("");
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape and lock background scrolling.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  // Run a deferred scroll after the menu's scroll lock has been released.
  useEffect(() => {
    if (mobileOpen || !pendingScroll.current) return;

    const target = pendingScroll.current;
    pendingScroll.current = null;

    if (target === "top") {
      scrollToTop();
    } else {
      scrollToHref(target);
    }
  }, [mobileOpen]);

  // Close the mobile menu when switching to desktop.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setMobileOpen(false);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const handleLinkClick = (href: string) => {
    if (mobileOpen) {
      pendingScroll.current = href;
      setMobileOpen(false);
    } else {
      scrollToHref(href);
    }
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (mobileOpen) {
      pendingScroll.current = "top";
      setMobileOpen(false);
    } else {
      scrollToTop();
    }
  };

  return (
    <>
      <m.header
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[100] w-full bg-black/80 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.08] py-3"
            : "border-b border-transparent py-5"
        }`}
      >
      <div className="mx-auto grid w-full max-w-[90rem] grid-cols-[1fr_auto] items-center gap-4 px-6 sm:px-12 md:grid-cols-[1fr_auto_1fr] lg:px-16">
        {/* Logo */}
        <a
          href="#hero"
          onClick={handleLogoClick}
          className="justify-self-start font-display text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-70"
          aria-label={`${profileData.name} — back to top`}
        >
          {profileData.logo}
        </a>

        {/* Desktop nav pill */}
        <nav
          className="hidden items-center gap-1 justify-self-center rounded-full border border-white/[0.1] bg-black/50 p-1 shadow-lg shadow-black/20 backdrop-blur-xl md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition-colors duration-300 hover:bg-neutral-200"
                >
                  {link.label}
                  <ArrowUpRight size={11} aria-hidden="true" />
                </a>
              );
            }

            const isActive = activeLink === link.href;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleLinkClick(link.href);
                }}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop badges */}
        <div className="hidden items-center gap-2 justify-self-end lg:flex">
          {headerBadges.map((badge) => (
            <span
              key={badge.text}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/[0.1] bg-black/40 px-3 py-1.5 text-[10px] text-neutral-300 backdrop-blur-md"
            >
              {badge.icon === "status" && (
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
              )}
              {badge.icon === "location" && (
                <MapPin size={11} className="text-neutral-500" aria-hidden="true" />
              )}
              {badge.text}
            </span>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="cursor-pointer justify-self-end p-2 text-white md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </m.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              className="flex min-h-dvh flex-col px-6 pb-10 pt-28"
              aria-label="Mobile"
            >
              <div className="flex flex-col">
                {navLinks.map((link) => {
                  if (link.external) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-lg font-bold text-black"
                      >
                        {link.label}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </a>
                    );
                  }

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      aria-current={
                        activeLink === link.href ? "location" : undefined
                      }
                      className={`border-b border-white/[0.08] py-5 font-display text-4xl font-bold tracking-tight transition-colors ${
                        activeLink === link.href
                          ? "text-white"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto pt-10">
                <div className="flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                  {headerBadges.map((badge) => (
                    <span
                      key={badge.text}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] text-neutral-400"
                    >
                      {badge.icon === "status" && (
                        <span
                          className="relative flex h-2 w-2"
                          aria-hidden="true"
                        >
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                      )}
                      {badge.icon === "location" && (
                        <MapPin
                          size={12}
                          className="text-neutral-500"
                          aria-hidden="true"
                        />
                      )}
                      {badge.text}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:${profileData.email}`}
                  className="mt-4 inline-flex w-full items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm font-medium text-white"
                >
                  {profileData.email}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
