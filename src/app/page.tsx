"use client";

import dynamic from "next/dynamic";
import Services from "@/components/home/Services";
import HighlightedProjects from "@/components/home/HighlightedProjects";
import Footer from "@/components/home/Footer";

const VideoScrubber = dynamic(
  () => import("@/components/scroll/VideoScrubber"),
  { 
    ssr: false,
    loading: () => (
      <section className="relative w-full bg-white">
        <div className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden" style={{ backgroundColor: "white" }}>
          <div className="w-[92vw] h-[92vh] md:w-[96vw] md:h-[94vh] rounded-[32px] md:rounded-[40px] relative overflow-hidden bg-black flex flex-col justify-between">
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30" style={{ backgroundColor: "white" }}>
              <p className="text-[var(--color-text-secondary)] text-sm tracking-widest uppercase mb-4">
                Loading
              </p>
              <div className="w-48 h-0.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-accent)] w-0" />
              </div>
              <p className="text-[var(--color-text-muted)] text-xs mt-2 font-mono">
                0%
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
);

export default function Home() {
  return (
    <main style={{ backgroundColor: "black" }}>

      <VideoScrubber>
        <Services transitionVariant="kora" />
      </VideoScrubber>

      <HighlightedProjects />

      <Footer />
    </main>
  );
}
