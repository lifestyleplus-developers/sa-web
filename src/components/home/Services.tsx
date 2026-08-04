"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TiltCard } from "@/components/unlumen-ui/primitives/tilt-card";

gsap.registerPlugin(ScrollTrigger);

type ServicesTransitionVariant = "first" | "second" | "third" | "kora";

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

export default function Services({
  transitionVariant = "kora",
}: {
  transitionVariant?: ServicesTransitionVariant;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  const transitionLineScale = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    shouldReduceMotion ? [1, 1, 1] : [0, 1, 1]
  );
  const cutLineScale = useTransform(
    scrollYProgress,
    [0, 0.45, 0.78, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const cutLineOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.82, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );
  const flatClipPath = "inset(0 0% 0 0% round 0px 0px 0px 0px)";
  const revealClipPath = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    shouldReduceMotion
      ? [flatClipPath, flatClipPath, flatClipPath, flatClipPath]
      : [
          "inset(0 48% 0 48% round 28px 28px 0px 0px)",
          "inset(0 42% 0 42% round 28px 28px 0px 0px)",
          "inset(0 4% 0 4% round 12px 12px 0px 0px)",
          flatClipPath,
        ]
  );
  const apertureLeft = useTransform(scrollYProgress, [0, 0.82, 1], ["48%", "4%", "0%"]);
  const apertureRight = useTransform(scrollYProgress, [0, 0.82, 1], ["48%", "4%", "0%"]);
  const apertureEdgeOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.82, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [0, 1, 1, 0]
  );

  useEffect(() => {
    if (transitionVariant !== "kora") return;

    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add("(max-width: 767px)", () => {
      const pin = ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: () => `+=${window.innerHeight * 2}`,
        pin: section,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      return () => pin.kill();
    });

    return () => media.revert();
  }, [transitionVariant]);

  return (
    <motion.section
      ref={sectionRef}
      className={`relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 pb-24 pt-32 md:px-12 ${
        transitionVariant === "first" ? "w-full rounded-t-[2rem] md:rounded-t-[3rem]" : ""
      } ${
        transitionVariant === "kora"
          ? "w-full"
          : "md:sticky md:top-0"
      } ${transitionVariant === "second" || transitionVariant === "third" ? "w-full" : ""}`}
      style={transitionVariant === "third" ? { clipPath: revealClipPath } : undefined}
      data-transition={transitionVariant}
    >
      {transitionVariant === "first" ? (
        <motion.div
          className="absolute left-1/2 top-0 z-30 h-1 w-2/3 origin-center -translate-x-1/2 bg-[#FACC15] md:w-1/2"
          style={{ scaleX: transitionLineScale }}
          aria-hidden="true"
        />
      ) : transitionVariant === "second" ? (
        <motion.div
          className="absolute left-1/2 top-0 z-30 h-24 w-0.5 origin-top -translate-x-1/2 bg-[#FACC15] shadow-[0_0_16px_rgba(250,204,21,0.55)]"
          style={{ scaleY: cutLineScale, opacity: cutLineOpacity }}
          aria-hidden="true"
        >
          <span className="absolute -bottom-1 -left-[3px] h-2 w-2 rotate-45 bg-[#FACC15]" />
        </motion.div>
      ) : transitionVariant === "third" ? (
        <>
          <motion.div
            className="absolute inset-y-0 z-30 w-0.5 bg-[#FACC15] shadow-[0_0_14px_rgba(250,204,21,0.45)]"
            style={{ left: apertureLeft, opacity: apertureEdgeOpacity }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-y-0 z-30 w-0.5 bg-[#FACC15] shadow-[0_0_14px_rgba(250,204,21,0.45)]"
            style={{ right: apertureRight, opacity: apertureEdgeOpacity }}
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full relative z-10">
        <div className="h-20 md:hidden" aria-hidden="true" />

        <motion.div
          className="flex flex-col items-center gap-2 text-center md:mb-12"
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                ease: "circInOut",
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          <h2 className="flex justify-center gap-x-2 text-4xl font-black uppercase tracking-tighter md:text-5xl">
            <span className="overflow-hidden inline-flex pb-1">
              <motion.span
                className="text-white inline-block origin-bottom"
                variants={{
                  hidden: { y: "100%", rotate: 2 },
                  visible: { 
                    y: 0, 
                    rotate: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                Services
              </motion.span>
            </span>
            <span className="overflow-hidden inline-flex pb-1">
              <motion.span
                className="text-[#FACC15] inline-block origin-bottom"
                variants={{
                  hidden: { y: "100%", rotate: 2 },
                  visible: { 
                    y: 0, 
                    rotate: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                Provided
              </motion.span>
            </span>
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
                className="bg-black"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
