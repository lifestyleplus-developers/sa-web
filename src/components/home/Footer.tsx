"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useSpring,
  useMotionValue,
} from "motion/react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ChevronUp,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const services = [
  { label: "Office Dismantling",         href: "/office-dismantling" },
  { label: "Commercial Scrap Buyers",     href: "/commercial-scrap-buyers" },
  { label: "IT Equipment Buyers",         href: "/it-equipment-buyers" },
  { label: "UPS & Battery Buyers",        href: "/ups-battery-buyers" },
  { label: "Hotel & Restaurant Equipment",href: "/hotel-equipment-buyers" },
  { label: "AC Scrap Buyers",             href: "/ac-scrap-buyers" },
  { label: "Lift Buyers",                 href: "/lift-buyers" },
  { label: "Electrical Panel Board Buyers",href: "/electrical-panel-board-buyers" },
  { label: "Heavy Equipment Scrap",       href: "/excavator-scrap-buyers" },
];

const quickLinks = [
  { label: "Home",               href: "/" },
  { label: "Completed Projects", href: "/completed-projects" },
  { label: "About Us",           href: "/about-us" },
  { label: "Gallery",            href: "/gallery" },
  { label: "Contact Us",         href: "/contact-us" },
];

/* ────────────────────── MAGNETIC BUTTON ────────────────────── */

function MagneticCTA({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (shouldReduceMotion) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.3);
      y.set((e.clientY - centerY) * 0.3);
    },
    [shouldReduceMotion, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-3 bg-[#DC2626] text-white px-10 py-5 rounded-full font-bold text-lg uppercase tracking-widest cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(220,38,38,0.5)]"
    >
      {children}
      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
}

/* ───────────────────── INFINITE MARQUEE ───────────────────── */

function InfiniteMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const marqueeText = services.map((s) => s.label).join(" • ") + " • ";

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-white/10">
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={
          shouldReduceMotion ? {} : { x: ["0%", "-50%"] }
        }
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {/* Double up the text for a seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[5vw] md:text-[3vw] font-black uppercase tracking-tight text-white/[0.07] select-none pr-4"
          >
            {marqueeText}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────── BACK TO TOP BUTTON ─────────────────── */

function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer hover:bg-[#DC2626] hover:border-[#DC2626] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </motion.button>
  );
}

/* ──────────────── STAGGERED REVEAL WRAPPER ──────────────── */

function RevealGroup({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 30 }
              }
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.6,
                      delay: i * staggerDelay,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }
              }
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN FOOTER COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  /* Parallax on the giant background text */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgTextY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["10%", "-10%"]
  );

  const year = new Date().getFullYear();

  return (
    <>
      <footer
        ref={containerRef}
        id="footer"
        className="relative z-30 bg-black text-white overflow-hidden w-full"
      >
        {/* ─────────── Giant CTA Banner ─────────── */}
        <section
          ref={ctaRef}
          className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden"
        >
          {/* Parallax background word */}
          <motion.span
            style={{ y: bgTextY }}
            className="absolute select-none text-[20vw] md:text-[15vw] font-black uppercase tracking-tighter text-white/[0.03] leading-none pointer-events-none"
          >
            S.A.TRADERS
          </motion.span>

          {/* Radial glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#DC2626]/10 blur-[120px] pointer-events-none" />

          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={
              ctaInView
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
            }
            className="relative text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mb-6"
          >
            Call Us Today for a
            <br />
            <span className="text-[#DC2626]">Free Site Visit</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={
              ctaInView
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }
            }
            className="relative text-white/50 text-lg md:text-xl max-w-2xl mb-12 font-medium"
          >
            Get a free site visit and quick quotation. We buy used equipment &amp; scrap — we do not sell.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={
              ctaInView
                ? { opacity: 1, scale: 1 }
                : shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.6,
                    delay: 0.3,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }
            }
            className="relative"
          >
            <MagneticCTA href="tel:+919164941338">Call Now</MagneticCTA>
          </motion.div>
        </section>

        {/* ─────────── Marquee Divider ─────────── */}
        <InfiniteMarquee />

        {/* ─────────── Footer Grid ─────────── */}
        <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:justify-items-center">
            {/* Col 1 — Brand */}
            <RevealGroup className="flex flex-col gap-5 lg:col-span-1 w-fit">
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                S.A. <span className="text-[#DC2626]">Traders</span>
              </h3>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">
                Office Dismantling
              </p>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Complete commercial dismantling, office clearance, scrap and
                used-equipment buyback in Bengaluru. We buy — we do not sell.
              </p>
              {/* Contact quick-action buttons */}
              <div className="flex gap-3 mt-2">
                <a
                  href="tel:+919164941338"
                  aria-label="Call S.A. Traders"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 cursor-pointer transition-all duration-300 hover:border-[#DC2626] hover:bg-[#DC2626]/10 hover:text-[#DC2626]"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/919164941338"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp S.A. Traders"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 cursor-pointer transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a
                  href="mailto:satraders78611@gmail.com"
                  aria-label="Email S.A. Traders"
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/40 cursor-pointer transition-all duration-300 hover:border-white/60 hover:bg-white/5 hover:text-white"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </RevealGroup>

            {/* Col 2 — Quick Links */}
            <RevealGroup
              className="flex flex-col gap-6 w-fit"
              staggerDelay={0.06}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Quick Links
              </h4>
              <div className="flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-white/60 text-sm font-medium transition-colors duration-200 hover:text-white cursor-pointer w-fit"
                  >
                    <span className="w-0 h-px bg-[#DC2626] transition-all duration-300 group-hover:w-4 shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </RevealGroup>

            {/* Col 3 — Services */}
            <RevealGroup
              className="flex flex-col gap-6 w-fit"
              staggerDelay={0.05}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                Services
              </h4>
              <div className="flex flex-col gap-4">
                {services.slice(0, 6).map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-white/60 text-sm font-medium transition-colors duration-200 hover:text-white cursor-pointer w-fit"
                  >
                    <span className="w-0 h-px bg-[#FACC15] transition-all duration-300 group-hover:w-4 shrink-0" />
                    {s.label}
                  </Link>
                ))}
              </div>
            </RevealGroup>

            {/* Col 4 — Contact */}
            <RevealGroup
              className="flex flex-col gap-6 w-fit"
              staggerDelay={0.1}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-3">
                Get in Touch
              </h4>

              <a
                href="tel:+919164941338"
                className="group flex items-start gap-3 text-white/60 text-sm font-medium transition-colors duration-200 hover:text-white cursor-pointer"
              >
                <Phone className="w-4 h-4 mt-0.5 text-[#DC2626] shrink-0" />
                <span>+91 91649 41338</span>
              </a>

              <a
                href="mailto:satraders78611@gmail.com"
                className="group flex items-start gap-3 text-white/60 text-sm font-medium transition-colors duration-200 hover:text-white cursor-pointer"
              >
                <Mail className="w-4 h-4 mt-0.5 text-[#DC2626] shrink-0" />
                <span>satraders78611@gmail.com</span>
              </a>

              <a
                href="https://maps.app.goo.gl/o3c1mK3Jcaq43shq7"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-white/60 text-sm font-medium transition-colors duration-200 hover:text-white cursor-pointer"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-[#DC2626] shrink-0" />
                <span>
                  Bengaluru, Karnataka
                  <br />
                  <span className="text-white/30 text-xs">View on Google Maps ↗</span>
                </span>
              </a>
            </RevealGroup>
          </div>
        </div>

        {/* ─────────── Bottom Bar ─────────── */}
        <div className="border-t border-white/10">
          <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-xs">
            <p>
              &copy; {year} S.A. Traders Office Dismantling. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-200 cursor-pointer"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
