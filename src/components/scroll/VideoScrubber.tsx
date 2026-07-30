"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const SCROLL_MULTIPLIER = 6; // 600vh total scroll distance

// Zero-pad helper: 1 → "001"
function framePath(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/ezgif-frame-${padded}.png`;
}

interface VideoScrubberProps {
  onProgress?: (progress: number) => void;
}

export default function VideoScrubber({ onProgress }: VideoScrubberProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
          // Draw first frame immediately
          drawFrame(0);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Cover-fit the image on the canvas
    let scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    

    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }

  // Smooth easing RAF loop with 60 FPS throttle
  useEffect(() => {
    if (!loaded) return;

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
  }, [loaded]);

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
    if (!loaded) return;
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${SCROLL_MULTIPLIER * 100}%`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        targetFrameRef.current = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(progress * TOTAL_FRAMES)
        );
        onProgress?.(progress);
      },
    });

    return () => trigger.kill();
  }, [loaded, onProgress]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      className="relative w-full"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ backgroundColor: "#d4cfc9" }}
      >
        {/* Loading screen */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ backgroundColor: "#d4cfc9" }}
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
          className="absolute inset-0 w-full h-full"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s" }}
        />
      </div>
    </div>
  );
}
