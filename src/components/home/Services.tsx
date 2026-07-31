"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiltCard } from "@/components/unlumen-ui/primitives/tilt-card";
import { 
  Building2, 
  Factory, 
  Monitor, 
  BatteryCharging, 
  ChefHat, 
  Snowflake, 
  ArrowUpDown, 
  Zap, 
  Tractor 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Office Dismantling",
    description: "Complete corporate office dismantling, workstations, partitions, and site cleanup.",
    badge: "Priority Service",
    icon: Building2,
    variant: "warning" as const,
  },
  {
    title: "Commercial Scrap",
    description: "Bulk buying of industrial and commercial scrap materials at the best market rates.",
    badge: "Bulk Buy",
    icon: Factory,
    variant: "success" as const,
  },
  {
    title: "IT Equipment",
    description: "Laptops, servers, networking gear, and e-waste buyback and recycling.",
    badge: "High Value",
    icon: Monitor,
    variant: "success" as const,
  },
  {
    title: "UPS & Batteries",
    description: "Safe disposal and buyback of commercial UPS systems and old battery banks.",
    badge: "Recycling",
    icon: BatteryCharging,
    variant: "success" as const,
  },
  {
    title: "Hotel Equipment",
    description: "Commercial kitchen equipment, restaurant furniture, and appliance clearance.",
    badge: "Specialized",
    icon: ChefHat,
    variant: "success" as const,
  },
  {
    title: "AC Scrap Buyers",
    description: "Central ACs, split units, HVAC systems, and chilling plant dismantling.",
    badge: "Fast Clearance",
    icon: Snowflake,
    variant: "success" as const,
  },
  {
    title: "Lift Dismantling",
    description: "Old passenger and freight lifts, lift cabins, motors, and heavy steel parts.",
    badge: "Heavy Duty",
    icon: ArrowUpDown,
    variant: "warning" as const,
  },
  {
    title: "Electrical Panels",
    description: "LT/HT panels, control boards, distribution panels, and heavy copper/aluminum wiring.",
    badge: "Industrial",
    icon: Zap,
    variant: "success" as const,
  },
  {
    title: "Heavy Equipment",
    description: "Excavators, damaged machinery, generators, and heavy industrial equipment scrap.",
    badge: "Machinery",
    icon: Tractor,
    variant: "warning" as const,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all cards inside the container
    const cards = container.querySelectorAll(".service-card");

    // Create a ScrollTrigger that animates cards in from the right as they enter the viewport
    gsap.fromTo(
      cards,
      { 
        x: 200, 
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 75%", // Starts when the top of container hits 75% of viewport
          end: "bottom 80%",
          // scrub: 1, // Optional: if we want it tied exactly to scroll, otherwise it just plays once triggered
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 bg-background min-h-screen py-24 md:py-32 px-4 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center gap-4">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
            Services <span className="text-[#a5fe00]">Provided</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl">
            We buy used equipment and scrap. We do not sell. Discover our comprehensive range of commercial dismantling and buyback services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="service-card w-full">
              <TiltCard
                title={service.title}
                description={service.description}
                badgeLabel={service.badge}
                badgeVariant={service.variant}
                href="#"
                className="bg-[#0f172a] border-white/10 dark:hover:border-[#a5fe00]/50"
              >
                <div className="mt-4 flex items-center justify-end opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  <service.icon className="w-12 h-12 text-[#a5fe00]" />
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
