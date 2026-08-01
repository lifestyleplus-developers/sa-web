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
    <main style={{ backgroundColor: "white" }}>

      <VideoScrubber />

      <div className="-mt-[100vh] relative z-20">
        <Services />
      </div>

      <HighlightedProjects />

      <Footer />
    </main>
  );
}
