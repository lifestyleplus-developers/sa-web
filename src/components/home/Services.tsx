"use client";

import { motion, useReducedMotion } from "motion/react";
import { TiltCard } from "@/components/unlumen-ui/primitives/tilt-card";

// GSAP removed

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      className="relative md:sticky md:top-0 z-10 bg-black min-h-screen w-full flex flex-col justify-center items-center px-4 md:px-12 pt-32 pb-24"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full relative z-10">
        <div className="h-20 md:hidden" aria-hidden="true" />

        <motion.div
          className="flex flex-col items-center gap-2 text-center md:mb-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Services <span className="text-[#FACC15]">Provided</span>
          </h2>
          <p className="hidden max-w-2xl text-base text-white/60 md:block md:text-lg">
            We buy used equipment and scrap. We do not sell. Discover our comprehensive range of commercial dismantling and buyback services.
          </p>
        </motion.div>

        <div className="h-16 md:hidden" aria-hidden="true" />

        <div className="grid w-full grid-cols-1 justify-items-center gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div 
              key={service.title}
              className="service-card w-80 max-w-full md:w-full"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
            >
              <TiltCard
                title={service.title}
                description={service.description}
                badgeLabel={service.badge}
                badgeVariant={service.variant}
                imageSrc={service.image}
                imageAlt={service.title}
                href="#"
                className="bg-black"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
