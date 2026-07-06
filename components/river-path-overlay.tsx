"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export function RiverPathOverlay() {
  const { scrollYProgress } = useScroll();
  
  // River path animation - grows as you scroll
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="riverPathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--river)" stopOpacity="0.25" />
            <stop offset="30%" stopColor="var(--river-light)" stopOpacity="0.35" />
            <stop offset="70%" stopColor="var(--river)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--river-light)" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Water texture pattern */}
          <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="2" cy="2" r="0.5" fill="var(--river-light)" opacity="0.3" />
            <circle cx="7" cy="7" r="0.3" fill="var(--river)" opacity="0.2" />
          </pattern>
        </defs>

        {/* Main winding river path */}
        <motion.path
          d="M 50 0 
             C 65 5, 75 10, 65 15
             C 55 20, 45 25, 55 30
             C 65 35, 70 40, 55 45
             C 40 50, 35 55, 50 60
             C 65 65, 60 70, 45 75
             C 30 80, 40 85, 55 90
             C 70 95, 55 98, 50 100"
          fill="none"
          stroke="url(#riverPathGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        
        {/* River highlight/shimmer effect */}
        <motion.path
          d="M 50 0 
             C 65 5, 75 10, 65 15
             C 55 20, 45 25, 55 30
             C 65 35, 70 40, 55 45
             C 40 50, 35 55, 50 60
             C 65 65, 60 70, 45 75
             C 30 80, 40 85, 55 90
             C 70 95, 55 98, 50 100"
          fill="none"
          stroke="var(--river-light)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
          style={{ pathLength }}
        />
      </svg>

      {/* Section markers along the river */}
      <SectionMarkers />
    </div>
  );
}

function SectionMarkers() {
  const { scrollYProgress } = useScroll();
  
  const markers = [
    { top: "23%", left: "60%", label: "Įranga", active: [0.15, 0.35] },
    { top: "43%", left: "45%", label: "Maršrutai", active: [0.35, 0.55] },
    { top: "63%", left: "55%", label: "Kainos", active: [0.55, 0.75] },
    { top: "83%", left: "48%", label: "Rezervacija", active: [0.75, 1] },
  ];

  return (
    <>
      {markers.map((marker, index) => (
        <MarkerDot
          key={marker.label}
          top={marker.top}
          left={marker.left}
          active={marker.active}
          scrollProgress={scrollYProgress}
          index={index}
        />
      ))}
    </>
  );
}

function MarkerDot({
  top,
  left,
  active,
  scrollProgress,
  index,
}: {
  top: string;
  left: string;
  active: [number, number];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  // Clamp values to [0, 1] range to avoid animation errors
  const clamp = (val: number) => Math.max(0, Math.min(1, val));
  
  const opacityRange = [
    clamp(active[0] - 0.1),
    clamp(active[0]),
    clamp(active[1]),
    clamp(active[1] + 0.1)
  ];
  
  const scaleRange = [
    clamp(active[0] - 0.05),
    clamp(active[0]),
    clamp(active[1]),
    clamp(active[1] + 0.05)
  ];

  const opacity = useTransform(
    scrollProgress,
    opacityRange,
    [0.3, 1, 1, 0.3]
  );
  
  const scale = useTransform(
    scrollProgress,
    scaleRange,
    [0.8, 1.2, 1.2, 0.8]
  );

  return (
    <motion.div
      className="absolute hidden lg:flex items-center justify-center"
      style={{ top, left, opacity, scale }}
    >
      <div className="w-4 h-4 rounded-full bg-forest border-2 border-background shadow-lg" />
      <motion.div
        className="absolute w-8 h-8 rounded-full bg-forest/20"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
    </motion.div>
  );
}
