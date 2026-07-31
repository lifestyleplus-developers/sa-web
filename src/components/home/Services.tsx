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
    image: "/services/office_dismantling.png",
    variant: "warning" as const,
  },
  {
    title: "Commercial Scrap",
    description: "Bulk buying of industrial and commercial scrap materials at the best market rates.",
    badge: "Bulk Buy",
    image: "/services/commercial_scrap.png",
    variant: "success" as const,
  },
  {
    title: "IT Equipment",
    description: "Laptops, servers, networking gear, and e-waste buyback and recycling.",
    badge: "High Value",
    image: "/services/it_equipment.png",
    variant: "success" as const,
  },
  {
    title: "UPS & Batteries",
    description: "Safe disposal and buyback of commercial UPS systems and old battery banks.",
    badge: "Recycling",
    image: "/services/warehouse_clearance.png",
    variant: "success" as const,
  },
  {
    title: "Hotel Equipment",
    description: "Commercial kitchen equipment, restaurant furniture, and appliance clearance.",
    badge: "Specialized",
    image: "/services/furniture_liquidation.png",
    variant: "success" as const,
  },
  {
    title: "AC Scrap Buyers",
    description: "Central ACs, split units, HVAC systems, and chilling plant dismantling.",
    badge: "Fast Clearance",
    image: "/services/hvac_system.png",
    variant: "success" as const,
  },
  {
    title: "Lift Dismantling",
    description: "Old passenger and freight lifts, lift cabins, motors, and heavy steel parts.",
    badge: "Heavy Duty",
    image: "/services/metal_recycling.png",
    variant: "warning" as const,
  },
  {
    title: "Electrical Panels",
    description: "LT/HT panels, control boards, distribution panels, and heavy copper/aluminum wiring.",
    badge: "Industrial",
    image: "/services/electrical_scrap.png",
    variant: "success" as const,
  },
  {
    title: "Heavy Equipment",
    description: "Excavators, damaged machinery, generators, and heavy industrial equipment scrap.",
    badge: "Machinery",
    image: "/services/industrial_machinery.png",
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
      className="relative z-10 bg-white h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 md:px-12"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
        <div className="mb-8 md:mb-12 flex flex-col items-center text-center gap-2">
          <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase">
            Services <span className="text-red-600">Provided</span>
          </h2>
          <p className="text-black/60 text-base md:text-lg max-w-2xl">
            We buy used equipment and scrap. We do not sell. Discover our comprehensive range of commercial dismantling and buyback services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-h-[70vh] overflow-visible">
          {services.map((service, index) => (
            <div key={index} className="service-card w-full">
              <TiltCard
                title={service.title}
                description={service.description}
                badgeLabel={service.badge}
                badgeVariant={service.variant}
                imageSrc={service.image}
                imageAlt={service.title}
                href="#"
                className="bg-white border-gray-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
