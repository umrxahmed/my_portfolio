import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
} from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import SelectedWorks from "./components/SelectedWorks";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isReady = !isLoading;

  const handleLoaded = useCallback(() => setIsLoading(false), []);

  // Prevent the page behind the loader from scrolling while it is visible.
  useEffect(() => {
    if (!isLoading) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  // Deep links such as /#contact wait until the loader has finished and the
  // sections are fully rendered before scrolling.
  useEffect(() => {
    if (isLoading) return;

    const { hash } = window.location;
    if (!hash) return;

    const frame = requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      target?.scrollIntoView({ behavior: "instant" });
    });

    return () => cancelAnimationFrame(frame);
  }, [isLoading]);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <div className="noise min-h-screen bg-black text-neutral-100">
          <AnimatePresence>
            {isLoading && <LoadingScreen onComplete={handleLoaded} />}
          </AnimatePresence>

          <div inert={isLoading}>
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <Navbar ready={isReady} />
            <main id="main" tabIndex={-1}>
              <Hero ready={isReady} />
              <About />
              <Skills />
              <Services />
              <SelectedWorks />
              <Process />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
