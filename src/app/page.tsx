"use client";

import dynamic from "next/dynamic";

// R3F must be client-side only — dynamic import with ssr:false
const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
        Loading...
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="bg-[var(--color-background)]">
      {/* Hero — full viewport canvas */}
      <section className="w-full h-screen relative">
        <div className="absolute inset-0">
          <SceneCanvas />
        </div>
        {/* Overlay label — temp, to confirm render */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[var(--color-text-muted)] text-xs tracking-widest uppercase">
            Drag to inspect · scroll wiring comes next
          </p>
        </div>
      </section>
    </main>
  );
}
