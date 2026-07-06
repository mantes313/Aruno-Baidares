"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export function ScrollRiverBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Animate river elements based on scroll
  const riverOpacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 0.5]);
  const wave1Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Main river SVG path running through the page */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ height: "100vh", width: "100%" }}
      >
        <defs>
          <linearGradient id="riverBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--river)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--river-light)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--river)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Subtle river path in background */}
        <motion.path
          d="M 45 0 
             C 60 10, 70 20, 55 30
             C 40 40, 35 50, 50 60
             C 65 70, 60 80, 45 90
             L 45 100"
          fill="none"
          stroke="url(#riverBgGradient)"
          strokeWidth="15"
          strokeLinecap="round"
          style={{ opacity: riverOpacity }}
        />
      </svg>

      {/* Floating elements that move with scroll */}
      <motion.div
        className="absolute left-[10%] w-2 h-2 rounded-full bg-river/20"
        style={{ y: wave1Y, top: "20%" }}
      />
      <motion.div
        className="absolute right-[15%] w-3 h-3 rounded-full bg-forest/15"
        style={{ y: wave2Y, top: "40%" }}
      />
      <motion.div
        className="absolute left-[20%] w-1.5 h-1.5 rounded-full bg-river-light/25"
        style={{ y: wave1Y, top: "60%" }}
      />
      <motion.div
        className="absolute right-[25%] w-2.5 h-2.5 rounded-full bg-forest/10"
        style={{ y: wave2Y, top: "75%" }}
      />
    </div>
  );
}
