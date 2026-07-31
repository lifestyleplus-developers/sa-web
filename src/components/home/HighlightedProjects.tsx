"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import Image from "next/image";

export default function HighlightedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Increased to 400vh to give plenty of room for both the fly-through and the horizontal scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fly-through text scaling (completes by 0.45)
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45],
    shouldReduceMotion ? [1, 1, 1, 1] : [1, 5, 20, 500]
  );
  
  // Fade in the horizontal track (0.45 to 0.5)
  const trackOpacity = useTransform(scrollYProgress, [0.45, 0.5], shouldReduceMotion ? [1, 1] : [0, 1]);
  
  // Scroll the track horizontally (0.5 to 0.9)
  // Stops at 0.9 to give the user a rest period to view the final cards before unpinning
  // Increased translation to -75% so the final Explore All button comes fully into view
  const trackX = useTransform(scrollYProgress, [0.5, 0.9], shouldReduceMotion ? ["0%", "0%"] : ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="relative z-30 bg-black h-[400vh] w-full">
      {/* Sticky container that stays pinned for the duration of the section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background Image that we reveal */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/highlighted-project.png"
            alt="Highlighted Project"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* 
          The Multiply Overlay 
          NOTE: We do NOT fade opacity to 0 here to prevent Safari mix-blend compositing bugs.
          The scale to 500 naturally pushes all black edges off-screen forever.
        */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex justify-center items-center z-10 pointer-events-none bg-black mix-blend-multiply"
        >
          <motion.div 
            style={{ 
              scale: textScale, 
              // 31.5% horizontal perfectly targets the exact center of the letter "O" in "PROJECTS"
              transformOrigin: "31.5% 50%",
            }}
            className="text-[18vw] font-black uppercase tracking-tighter leading-none text-white whitespace-nowrap"
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
            className="flex gap-8 items-center h-full w-max"
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
            <ProjectCard 
              title="Manyata Tech Park"
              area="1,20,000 Sq. Ft."
              type="Complete Office Dismantling"
              desc="Full strip-out and clearance of corporate IT workspace infrastructure, including workstations and partitions."
              image="/images/highlighted-project.png"
            />

            {/* High-Contrast Card 2 (Placeholder) */}
            <ProjectCard 
              title="Brigade Gateway"
              area="85,000 Sq. Ft."
              type="IT Infrastructure Clearance"
              desc="Safe removal and buyback of massive server rooms, UPS systems, and heavy AC equipment."
              image="/images/highlighted-project.png"
            />

            {/* High-Contrast Card 3 (Placeholder) */}
            <ProjectCard 
              title="Electronic City Park"
              area="50,000 Sq. Ft."
              type="Commercial Site Cleanup"
              desc="Complete clearance of industrial heavy machinery, electrical panels, and metal scrap."
              image="/images/highlighted-project.png"
            />

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

// Subcomponent for the premium cinematic project cards
function ProjectCard({ title, area, type, desc, image }: { title: string, area: string, type: string, desc: string, image: string }) {
  return (
    <div className="w-[400px] h-[550px] shrink-0 relative overflow-hidden rounded-2xl border border-white/10 group cursor-pointer bg-[#0a0a0a]">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <Image src={image} alt={title} fill sizes="400px" className="object-cover opacity-80" />
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          
          <div className="inline-block px-3 py-1 bg-[#FACC15] text-black text-[10px] font-black uppercase tracking-widest mb-4">
            {type}
          </div>
          
          <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-[1.1] mb-3">
            {title}
          </h3>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
            {desc}
          </p>
          
          <div className="flex items-center gap-4 border-t border-white/20 pt-5">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Scale</span>
              <span className="block text-xl font-black text-white">{area}</span>
            </div>
            <div className="ml-auto">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#FACC15] group-hover:border-[#FACC15] group-hover:text-black">
                <svg className="w-5 h-5 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-500 z-30 pointer-events-none group-hover:border-white/20" />
    </div>
  );
}
