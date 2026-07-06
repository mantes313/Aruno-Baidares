"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function Kayak() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight - window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollY } = useScroll();

  // Calculate kayak position based on scroll
  const kayakY = useTransform(scrollY, [0, documentHeight], [100, documentHeight + 200]);
  const kayakX = useTransform(scrollY, [0, documentHeight], [0, 100]);
  const kayakRotate = useTransform(scrollY, [0, documentHeight], [-5, 15]);

  // Wave animation for the kayak
  const waveX = useTransform(
    scrollY,
    (value) => Math.sin(value * 0.01) * 15
  );

  return (
    <motion.div
      ref={containerRef}
      className="fixed z-50 pointer-events-none"
      style={{
        y: kayakY,
        x: useTransform(
          [kayakX, waveX],
          ([baseX, wave]) => `calc(${baseX}% - 50px + ${wave}px)`
        ),
        rotate: kayakRotate,
      }}
    >
      <KayakSVG />
    </motion.div>
  );
}

function KayakSVG() {
  return (
    <svg
      width="100"
      height="40"
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Kayak body */}
      <ellipse cx="50" cy="25" rx="45" ry="10" fill="#D97706" />
      <ellipse cx="50" cy="23" rx="42" ry="8" fill="#F59E0B" />
      <ellipse cx="50" cy="22" rx="38" ry="6" fill="#FBBF24" />
      
      {/* Kayak cockpit */}
      <ellipse cx="50" cy="22" rx="12" ry="5" fill="#1F2937" />
      <ellipse cx="50" cy="21" rx="10" ry="4" fill="#374151" />
      
      {/* Person silhouette */}
      <circle cx="50" cy="15" r="5" fill="#4B5563" />
      <rect x="47" y="17" width="6" height="8" rx="2" fill="#4B5563" />
      
      {/* Paddle */}
      <rect x="20" y="12" width="60" height="2" rx="1" fill="#78350F" />
      <ellipse cx="15" cy="13" rx="8" ry="4" fill="#92400E" />
      <ellipse cx="85" cy="13" rx="8" ry="4" fill="#92400E" />
      
      {/* Water splash effect */}
      <motion.g
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <circle cx="10" cy="30" r="2" fill="#60A5FA" opacity="0.5" />
        <circle cx="15" cy="32" r="1.5" fill="#60A5FA" opacity="0.4" />
        <circle cx="90" cy="30" r="2" fill="#60A5FA" opacity="0.5" />
        <circle cx="85" cy="32" r="1.5" fill="#60A5FA" opacity="0.4" />
      </motion.g>
    </svg>
  );
}

export function SmallKayak({ className = "" }: { className?: string }) {
  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 100 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="50" cy="25" rx="45" ry="10" fill="#D97706" />
      <ellipse cx="50" cy="23" rx="42" ry="8" fill="#F59E0B" />
      <ellipse cx="50" cy="22" rx="38" ry="6" fill="#FBBF24" />
      <ellipse cx="50" cy="22" rx="12" ry="5" fill="#1F2937" />
    </svg>
  );
}
