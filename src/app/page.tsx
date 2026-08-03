"use client";

import dynamic from "next/dynamic";
import Services from "@/components/home/Services";
import HighlightedProjects from "@/components/home/HighlightedProjects";
import Footer from "@/components/home/Footer";

const VideoScrubber = dynamic(
  () => import("@/components/scroll/VideoScrubber"),
  { ssr: false }
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
