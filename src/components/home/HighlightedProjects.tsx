"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HighlightedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 300vh container means 200vh of actual scrolling while sticky
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 0 to 0.6: expand the clip path
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["inset(30% 30% 30% 30% round 40px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // 0.6 to 0.9: fade and slide in text
  const textOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);
  const textScale = useTransform(scrollYProgress, [0.6, 0.9], [0.9, 1]);

  return (
    <section ref={containerRef} className="relative z-30 bg-black h-[300vh] w-full">
      {/* Sticky container that stays pinned for the duration of the section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Expanding Background Image */}
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ clipPath }}
        >
          <Image
            src="/images/highlighted-project.png"
            alt="Highlighted Project"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>

        {/* Revealing Content */}
        <motion.div 
          className="flex flex-col items-center z-10 px-4 text-center"
          style={{ 
            opacity: textOpacity, 
            y: textY,
            scale: textScale
          }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-12 tracking-tighter uppercase leading-none drop-shadow-2xl">
            Highlighted <br/> <span className="text-red-600">Project</span>
          </h1>
          <Link 
            href="/projects" 
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-black bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2 text-lg">
              Explore Project
              <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gray-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
