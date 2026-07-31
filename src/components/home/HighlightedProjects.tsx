"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HighlightedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Increased to 400vh to give plenty of room for both the fly-through and the horizontal scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fly-through text scaling (completes by 0.45)
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45],
    [1, 5, 20, 500]
  );
  
  // Fade in the horizontal track (0.45 to 0.5)
  const trackOpacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  
  // Scroll the track horizontally (0.5 to 1)
  const trackX = useTransform(scrollYProgress, [0.5, 1], ["0%", "-65%"]);

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
            className="object-cover"
            priority
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
                Handling Bengaluru's largest commercial dismantling sites with unmatched precision.
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

// Subcomponent for the bright, contrasting project cards
function ProjectCard({ title, area, type, desc, image }: { title: string, area: string, type: string, desc: string, image: string }) {
  return (
    <div className="w-[450px] h-[550px] bg-white text-black shrink-0 flex flex-col justify-between p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
      <div className="z-10">
        <div className="inline-block px-4 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest mb-6">
          {type}
        </div>
        <h3 className="text-4xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-red-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed font-medium">
          {desc}
        </p>
      </div>

      <div className="z-10 flex flex-col border-t-2 border-black pt-6 mt-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Scale</span>
        <span className="text-3xl font-black">{area}</span>
      </div>

      {/* Subtle background industrial pattern or image to add texture without reducing contrast */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
        <Image src={image} alt="Background Texture" fill className="object-cover rounded-full grayscale" />
      </div>
    </div>
  );
}
