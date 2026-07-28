"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { useLenis } from "@/components/scroll/useLenis";

const VideoScrubber = dynamic(
  () => import("@/components/scroll/VideoScrubber"),
  { ssr: false }
);

export default function Home() {
  useLenis();
  const [progress, setProgress] = useState(0);

  const handleProgress = useCallback((p: number) => {
    setProgress(p);
  }, []);

  return (
    <main style={{ backgroundColor: "#d4cfc9" }}>
      {/* Debug overlay — remove after Step 7 */}
      <div className="fixed top-4 right-4 z-50 bg-black/20 text-[var(--color-text-primary)] font-mono text-xs px-3 py-2 rounded backdrop-blur-sm">
        scroll: {(progress * 100).toFixed(1)}% &nbsp;|&nbsp; frame: {Math.round(progress * 240)}
      </div>

      <VideoScrubber onProgress={handleProgress} />

      {/* Placeholder footer */}
      <section className="h-screen flex items-center justify-center"
        style={{ backgroundColor: "#d4cfc9" }}
      >
        <p className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
          Contact section — coming in Step 11
        </p>
      </section>
    </main>
  );
}
