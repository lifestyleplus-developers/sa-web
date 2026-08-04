"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    title: "Manyata Tech Park",
    area: "1,20,000 Sq. Ft.",
    type: "Complete Office Dismantling",
    desc: "Full strip-out and clearance of corporate IT workspace infrastructure, including workstations and partitions.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "Brigade Gateway",
    area: "85,000 Sq. Ft.",
    type: "IT Infrastructure Clearance",
    desc: "Safe removal and buyback of massive server rooms, UPS systems, and heavy AC equipment.",
    image: "/images/highlighted-project.png",
  },
  {
    title: "Electronic City Park",
    area: "50,000 Sq. Ft.",
    type: "Commercial Site Cleanup",
    desc: "Complete clearance of industrial heavy machinery, electrical panels, and metal scrap.",
    image: "/images/highlighted-project.png",
  },
];

export default function HighlightedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // The long scroll range is used only by the desktop cinematic sequence.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fly-through text scaling (completes by 0.35)
  // Capped at 80 to prevent iOS Safari GPU compositing crashes (rendering as solid black)
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.35],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 5, 20, 80]
  );
  
  // Fade in the horizontal track (0.35 to 0.4)
  const trackOpacity = useTransform(scrollYProgress, [0.35, 0.4], shouldReduceMotion ? [1, 1] : [0, 1]);
  
  // PAUSE from 0.4 to 0.45 so the "Featured Projects" text is completely visible before it moves!
  // Scroll the track horizontally using a direct percentage to guarantee standard right-to-left flow regardless of screen width
  const trackX = useTransform(scrollYProgress, [0.45, 1.0], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-85%"]);

  return (
    <section id="highlighted-projects" ref={containerRef} className="relative z-30 -mt-px w-full bg-black rounded-t-[2rem] shadow-[0_-20px_40px_rgba(0,0,0,0.5)] md:h-[800vh] md:rounded-none md:shadow-none">
      {/* Mobile uses regular document flow. This avoids Safari dropping the composited
          sticky layer to black while the second card enters the viewport. */}
      <div className="px-5 pb-20 pt-20 md:hidden">
        <div className="h-20" aria-hidden="true" />
        <motion.div
          className="text-center"
          style={{ marginBottom: "64px" }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-5xl font-black leading-[0.9] tracking-tighter text-white uppercase">
            Featured <span className="text-[#FACC15]">Projects</span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="flex w-full justify-center"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index === 0 ? 0.05 : 0, ease: "easeOut" }}
            >
              <ProjectCard {...project} mobile />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          style={{ marginTop: "56px" }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Link
            href="/projects"
            className="inline-flex min-h-14 w-80 items-center justify-center rounded-full bg-[#FACC15] px-6 text-center text-sm font-black uppercase tracking-widest text-black transition-transform duration-300 active:scale-[0.98]"
          >
            Explore all projects
          </Link>
        </motion.div>
      </div>

      {/* Sticky container that stays pinned for the duration of the section */}
      <div className="sticky top-0 hidden h-screen w-full flex-col items-center justify-center overflow-hidden will-change-transform md:flex">
        
        {/* 
          The Fly-Through Text
          Zooms up massively. The hole in the "O" eventually surrounds the entire screen, leaving a pure black background for the project cards.
        */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex justify-center items-center z-10 pointer-events-none will-change-transform"
        >
          <motion.div 
            style={{ 
              scale: textScale, 
              // 31.5% horizontal perfectly targets the exact center of the letter "O" in "PROJECTS"
              transformOrigin: "31.5% 50%",
              backgroundImage: "url('/images/highlighted-project.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
              WebkitBackfaceVisibility: "hidden",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
              WebkitTransform: "translateZ(0)"
            }}
            className="text-[18vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap"
          >
            PROJECTS
          </motion.div>
        </motion.div>

        {/* Horizontal Scrolling Project Track */}
        <motion.div 
          className="absolute inset-0 z-20 flex items-center pointer-events-auto pl-[10vw] pt-20"
          style={{ opacity: trackOpacity }}
        >
          <motion.div 
            className="flex gap-8 items-center h-full w-max will-change-transform"
            style={{ x: trackX }}
          >
            
            {/* Intro Text Block */}
            <div className="flex flex-col pr-12 w-[450px] shrink-0">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter drop-shadow-2xl">
                Featured <br/>
                <span className="text-[#FACC15]">Projects</span>
              </h2>
              <p className="text-gray-200 mt-6 text-xl font-medium drop-shadow-md border-l-4 border-[#FACC15] pl-4">
                Handling Bengaluru&apos;s largest commercial dismantling sites with unmatched precision.
              </p>
            </div>

            {/* High-Contrast Card 1 (From Requirements) */}
            <ProjectCard {...projects[0]} />

            {/* High-Contrast Card 2 (Placeholder) */}
            <ProjectCard {...projects[1]} />

            {/* High-Contrast Card 3 (Placeholder) */}
            <ProjectCard {...projects[2]} />

            {/* CTA Block */}
            <div className="flex flex-col items-center justify-center w-[350px] h-[500px] ml-12 shrink-0">
              <Link 
                href="/projects" 
                className="group relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-[#FACC15] font-black text-black text-xl uppercase tracking-widest text-center transition-transform duration-500 hover:scale-110 hover:shadow-[0_0_50px_rgba(250,204,21,0.5)]"
              >
                Explore <br/>All
                <svg className="absolute w-8 h-8 bottom-8 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
