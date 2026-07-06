"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function AnimatedKayakJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate kayak position along a winding path
  // The path winds from left to right as you scroll down
  const kayakTop = useTransform(smoothProgress, [0, 1], ["10vh", "85vh"]);
  
  // Create a winding horizontal motion
  const kayakLeft = useTransform(
    smoothProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    ["50%", "70%", "40%", "65%", "35%", "60%", "45%", "55%"]
  );

  // Rotation based on direction
  const kayakRotation = useTransform(
    smoothProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
    [0, 15, -10, 12, -8, 10, -5, 0]
  );

  // Scale slightly as it "approaches" certain sections
  const kayakScale = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.1, 1, 1.1, 1]
  );

  // Hide kayak when near the end
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setIsVisible(value < 0.95);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-40 pointer-events-none"
      style={{
        top: kayakTop,
        left: kayakLeft,
        x: "-50%",
        rotate: kayakRotation,
        scale: kayakScale,
      }}
    >
      <AnimatedKayakSVG />
    </motion.div>
  );
}

function AnimatedKayakSVG() {
  return (
    <motion.svg
      width="80"
      height="35"
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-xl"
      animate={{
        y: [0, -3, 0, 3, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Water reflection/shadow */}
      <ellipse cx="50" cy="38" rx="40" ry="3" fill="var(--river)" opacity="0.3" />

      {/* Kayak hull bottom */}
      <ellipse cx="50" cy="26" rx="46" ry="11" fill="#B45309" />
      
      {/* Kayak hull main */}
      <ellipse cx="50" cy="24" rx="44" ry="9" fill="#D97706" />
      
      {/* Kayak deck */}
      <ellipse cx="50" cy="22" rx="40" ry="7" fill="#F59E0B" />
      
      {/* Deck details - ribs */}
      <line x1="20" y1="22" x2="20" y2="26" stroke="#D97706" strokeWidth="1" />
      <line x1="35" y1="21" x2="35" y2="27" stroke="#D97706" strokeWidth="1" />
      <line x1="65" y1="21" x2="65" y2="27" stroke="#D97706" strokeWidth="1" />
      <line x1="80" y1="22" x2="80" y2="26" stroke="#D97706" strokeWidth="1" />
      
      {/* Cockpit */}
      <ellipse cx="50" cy="21" rx="14" ry="6" fill="#1F2937" />
      <ellipse cx="50" cy="20" rx="12" ry="5" fill="#374151" />
      
      {/* Person */}
      <circle cx="50" cy="14" r="5" fill="#4B5563" />
      <ellipse cx="50" cy="18" rx="4" ry="3" fill="#4B5563" />
      
      {/* Paddle */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50px 14px" }}
      >
        <rect x="15" y="11" width="70" height="2.5" rx="1.25" fill="#78350F" />
        {/* Left blade */}
        <ellipse cx="12" cy="12" rx="9" ry="5" fill="#92400E" />
        <ellipse cx="12" cy="12" rx="7" ry="3.5" fill="#A3501D" />
        {/* Right blade */}
        <ellipse cx="88" cy="12" rx="9" ry="5" fill="#92400E" />
        <ellipse cx="88" cy="12" rx="7" ry="3.5" fill="#A3501D" />
      </motion.g>
      
      {/* Water splashes */}
      <motion.g
        animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <circle cx="8" cy="30" r="2.5" fill="var(--river-light)" opacity="0.6" />
        <circle cx="14" cy="33" r="1.5" fill="var(--river-light)" opacity="0.4" />
        <circle cx="92" cy="30" r="2.5" fill="var(--river-light)" opacity="0.6" />
        <circle cx="86" cy="33" r="1.5" fill="var(--river-light)" opacity="0.4" />
      </motion.g>
    </motion.svg>
  );
}
