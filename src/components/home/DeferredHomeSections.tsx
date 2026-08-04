"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Services = dynamic(() => import("@/components/home/Services"), {
  loading: () => <SectionPlaceholder className="min-h-[2400px] md:min-h-[1100px]" />,
});

const HighlightedProjects = dynamic(
  () => import("@/components/home/HighlightedProjects"),
  {
    loading: () => <SectionPlaceholder className="min-h-[1700px] md:min-h-[800vh]" />,
  }
);

const Footer = dynamic(() => import("@/components/home/Footer"), {
  loading: () => <SectionPlaceholder className="min-h-screen" />,
});

function SectionPlaceholder({ className }: { className: string }) {
  return <div className={`w-full bg-black ${className}`} aria-hidden="true" />;
}

function useNearViewport(rootMargin = "1200px 0px") {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldRender) return;

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = setTimeout(() => setShouldRender(true), 0);
      return () => clearTimeout(fallbackTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return { ref, shouldRender };
}

export function DeferredServices() {
  const { ref, shouldRender } = useNearViewport();

  return (
    <div ref={ref}>
      {shouldRender ? (
        <Services transitionVariant="kora" />
      ) : (
        <SectionPlaceholder className="min-h-[2400px] md:min-h-[1100px]" />
      )}
    </div>
  );
}

export function DeferredHighlightedProjects() {
  const { ref, shouldRender } = useNearViewport();

  return (
    <div ref={ref}>
      {shouldRender ? (
        <HighlightedProjects />
      ) : (
        <SectionPlaceholder className="min-h-[1700px] md:min-h-[800vh]" />
      )}
    </div>
  );
}

export function DeferredFooter() {
  const { ref, shouldRender } = useNearViewport("800px 0px");

  return (
    <div ref={ref}>
      {shouldRender ? (
        <Footer />
      ) : (
        <SectionPlaceholder className="min-h-screen" />
      )}
    </div>
  );
}
