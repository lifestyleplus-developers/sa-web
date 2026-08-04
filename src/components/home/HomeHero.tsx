"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const VideoScrubber = dynamic(
  () => import("@/components/scroll/VideoScrubber"),
  {
    ssr: false,
    loading: () => (
      <section className="relative w-full bg-white">
        <div
          className="sticky top-0 z-0 flex h-screen w-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div className="relative flex h-[92vh] w-[92vw] flex-col justify-between overflow-hidden rounded-[32px] bg-black md:h-[94vh] md:w-[96vw] md:rounded-[40px]">
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center"
              style={{ backgroundColor: "white" }}
            >
              <p className="mb-4 text-sm uppercase tracking-widest text-[var(--color-text-secondary)]">
                Loading
              </p>
              <div className="h-0.5 w-48 overflow-hidden rounded-full bg-[var(--color-border)]">
                <div className="h-full w-0 bg-[var(--color-accent)]" />
              </div>
              <p className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
                0%
              </p>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

export default function HomeHero({ children }: { children: ReactNode }) {
  return <VideoScrubber>{children}</VideoScrubber>;
}
