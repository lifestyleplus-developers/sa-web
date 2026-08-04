"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 300;
const SCROLL_MULTIPLIER = 10; // 1000vh total scroll distance
const PRELOAD_CONCURRENCY = 6;

// Zero-pad helper: 1 → "001"
function framePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${padded}.png`;
}

export default function VideoScrubber({ children }: { children?: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroViewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [altWord, setAltWord] = useState("Office");
  const shouldReduceMotion = useReducedMotion();

  // Alternate the text
  useEffect(() => {
    const interval = setInterval(() => {
      setAltWord((prev) => (prev === "Office" ? "Warehouse" : "Office"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    const framesToLoad = shouldReduceMotion ? 1 : TOTAL_FRAMES;
    let completedCount = 0;
    let nextFrame = 0;
    let cancelled = false;

    const completeFrame = () => {
      completedCount++;
      setLoadProgress(Math.round((completedCount / framesToLoad) * 100));

      if (nextFrame < framesToLoad) {
        loadNextFrame();
      } else if (completedCount === framesToLoad && !cancelled) {
        setLoaded(true);
      }
    };

    const loadNextFrame = () => {
      const index = nextFrame++;
      const img = new Image();
      images[index] = img;
      img.onload = completeFrame;
      img.onerror = completeFrame;
      img.src = framePath(index + 1);
    };

    for (let i = 0; i < Math.min(PRELOAD_CONCURRENCY, framesToLoad); i++) {
      loadNextFrame();
    }

    imagesRef.current = images;

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      imagesRef.current = [];
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!loaded) return;
    drawFrame(0);
  }, [loaded]);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.naturalWidth || !img.naturalHeight) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Cover-fit the image on the canvas
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    

    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }

  // Smooth easing RAF loop with 60 FPS throttle
  useEffect(() => {
    if (!loaded || shouldReduceMotion) return;

    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    function animate(time: number) {
      rafRef.current = requestAnimationFrame(animate);

      if (!lastTime) {
        lastTime = time;
      }

      const deltaTime = time - lastTime;
      if (deltaTime < interval) return;

      // Adjust lastTime to maintain consistent 60fps cadence
      lastTime = time - (deltaTime % interval);

      // Lerp for smoother animation on phones (where Lenis might be disabled)
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.15;

      const frameToDraw = Math.round(currentFrameRef.current);
      
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, shouldReduceMotion]);

  // Resize canvas to match window
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(Math.round(currentFrameRef.current));
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ScrollTrigger wiring
  useEffect(() => {
    if (!loaded || shouldReduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    // Refresh other scroll triggers on the page after our timeline initializes
    const refreshTimeout = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Map 0-0.7 scroll progress to 0-1 video progress
          const videoProgress = Math.min(1, Math.max(0, progress / 0.7));
          targetFrameRef.current = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(videoProgress * TOTAL_FRAMES)
          );
        },
      },
    });

    // Expand the card in the first 10% of the timeline
    tl.to(cardRef.current, {
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
      ease: "none",
      duration: 0.1,
    }, 0);

    // Make intro text go up and disappear in the very first scroll
    tl.to(introTextRef.current, {
      y: "-150%",
      opacity: 0,
      duration: 0.05,
      ease: "power2.inOut"
    }, 0);

    // Dim the video starting at 70% to make text pop
    tl.to(canvasRef.current, { opacity: 0.4, duration: 0.1, ease: "power1.inOut" }, 0.7);

    // Texts cascade down between 70% and 85%
    tl.fromTo(text1Ref.current, { y: "-150vh" }, { y: 0, duration: 0.05, ease: "power2.out" }, 0.7);
    tl.fromTo(text2Ref.current, { y: "-150vh" }, { y: 0, duration: 0.05, ease: "power2.out" }, 0.75);
    tl.fromTo(text3Ref.current, { y: "-150vh" }, { y: 0, duration: 0.05, ease: "power2.out" }, 0.8);

    // Kora: both the final frame and completed text stack remain fixed while
    // the Services section travels over them during the final viewport.

    return () => {
      window.clearTimeout(refreshTimeout);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [loaded, shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="relative w-full bg-white">
        <div
          ref={heroViewportRef}
          className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div 
            ref={cardRef} 
          className="w-[92vw] h-[92vh] md:w-[96vw] md:h-[94vh] rounded-[32px] md:rounded-[40px] relative overflow-hidden bg-black flex flex-col justify-between"
        >
          {/* Loading screen */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30"
              style={{ backgroundColor: "white" }}
            >
              <p className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4">
                Loading
              </p>
              <div className="w-48 h-0.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--color-accent)] transition-all duration-100"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <p className="text-[var(--color-text-muted)] text-xs mt-2 font-mono">
                {loadProgress}%
              </p>
            </div>
          )}

          {/* Canvas — same bg as frames so office floats */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 object-cover"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}
          />

          {/* Intro Text overlay */}
          {loaded && (
            <div className="absolute inset-y-0 left-6 md:left-10 flex flex-col justify-center pointer-events-none z-40 mix-blend-difference">
              <div
                ref={introTextRef}
                className="text-white font-black uppercase tracking-tighter leading-[0.85]"
              >
                <div className="flex flex-col text-left">
                  <div className="text-xl md:text-3xl text-[#FACC15] h-[0.85em] overflow-hidden relative mb-1">
                    <div
                      className="flex flex-col transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateY(${altWord === "Office" ? "0%" : "-50%"})` }}
                    >
                      <span className="h-[0.85em] block leading-[0.85]">Office</span>
                      <span className="h-[0.85em] block leading-[0.85]">Warehouse</span>
                    </div>
                  </div>
                  <div className="text-4xl md:text-6xl">Demolition.</div>
                  <div className="text-4xl md:text-6xl">Dismantling.</div>
                  <div className="text-4xl md:text-6xl">Done.</div>
                </div>
              </div>
            </div>
          )}

          {/* Cascading Texts overlay */}
          <div
            className={`absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none overflow-hidden ${shouldReduceMotion ? "hidden" : ""}`}
          >
            <h2 ref={text1Ref} className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none will-change-transform">
              Call Us
            </h2>
            <h2 ref={text2Ref} className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none will-change-transform">
              Get Packing
            </h2>
            <h2 ref={text3Ref} className="text-[#FACC15] text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none will-change-transform">
              Get Paid
            </h2>
          </div>
          </div>
        </div>

        <div
          className="relative z-0"
          style={{ height: shouldReduceMotion ? 0 : `${SCROLL_MULTIPLIER * 100}vh` }}
          aria-hidden="true"
        />

        {children ? <div className="relative z-20 bg-black">{children}</div> : null}
    </section>
  );
}
