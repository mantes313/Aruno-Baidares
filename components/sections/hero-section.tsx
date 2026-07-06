"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with nature gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-river-light/30 to-background" />
      
      {/* Animated trees/nature elements */}
      <div className="absolute inset-0 overflow-hidden">
        <TreesBackground />
      </div>
      
      {/* River illustration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C 200 20, 400 80, 600 50 C 800 20, 1000 90, 1200 40 C 1300 20, 1400 60, 1440 50 L 1440 120 L 0 120 Z"
            fill="var(--river)"
            opacity="0.6"
          />
          <path
            d="M0 80 C 300 50, 500 100, 720 60 C 900 30, 1100 90, 1440 70 L 1440 120 L 0 120 Z"
            fill="var(--river-light)"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium bg-forest/10 text-forest rounded-full border border-forest/20">
            Lietuvos upės laukia
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Išsinuomok{" "}
          <span className="text-forest">baidarę</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Atraskite Lietuvos upių grožį. Įvairūs maršrutai laukia jūsų nuotykių.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#rezervacija"
            className="px-8 py-4 bg-forest text-primary-foreground rounded-full font-semibold hover:bg-forest-light transition-colors shadow-lg hover:shadow-xl"
          >
            Laisvos datos
          </a>
          <a
            href="#marsrutai"
            className="px-8 py-4 bg-card text-foreground rounded-full font-semibold border border-border hover:bg-muted transition-colors"
          >
            Peržiūrėti maršrutus
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Slinkite žemyn</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>
    </section>
  );
}

function TreesBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Left forest */}
      <g fill="var(--forest)">
        <path d="M-50 800 L50 400 L150 800 Z" opacity="0.6" />
        <path d="M50 800 L130 450 L210 800 Z" opacity="0.8" />
        <path d="M150 800 L220 500 L290 800 Z" opacity="0.5" />
        <path d="M-100 800 L0 350 L100 800 Z" opacity="0.4" />
      </g>
      {/* Right forest */}
      <g fill="var(--forest)">
        <path d="M1290 800 L1390 400 L1490 800 Z" opacity="0.6" />
        <path d="M1230 800 L1310 450 L1390 800 Z" opacity="0.8" />
        <path d="M1150 800 L1220 500 L1290 800 Z" opacity="0.5" />
        <path d="M1340 800 L1440 350 L1540 800 Z" opacity="0.4" />
      </g>
    </svg>
  );
}
