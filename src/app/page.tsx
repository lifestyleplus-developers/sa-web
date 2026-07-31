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
    <main style={{ backgroundColor: "white" }}>

      <VideoScrubber onProgress={handleProgress} />

      {/* Placeholder footer */}
      <section className="h-screen flex items-center justify-center"
        style={{ backgroundColor: "white" }}
      >
        <p className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
          Contact section — coming in Step 11
        </p>
      </section>
    </main>
  );
}
