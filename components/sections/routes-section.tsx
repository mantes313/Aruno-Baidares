"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Gauge, ArrowRight, X, ZoomIn } from "lucide-react";
import { useState } from "react";

const routes = [
  {
    name: "Jungėnai – Bukta",
    difficulty: "Vidutinis",
    difficultyColor: "bg-yellow-500/20 text-yellow-700",
    distance: "12,41 km",
    duration: "3-4 val.",
    description: "Vingiuotas maršrutas per Želsvos, Buktos ir Armoniškių apylinkes, pro Dūglės mišką.",
    highlights: ["Vingiuota trasa", "Miškų peizažai", "Gamtos takai"],
    image: "/marsrutas-1.jpg",
  },
  {
    name: "Bukta – Liudvinavas",
    difficulty: "Vidutinis",
    difficultyColor: "bg-yellow-500/20 text-yellow-700",
    distance: "12 km",
    duration: "3-4 val.",
    description: "Vingiuota upė per laukus ir miškus nuo Buktos iki Liudvinavo miestelio.",
    highlights: ["Vingiuota trasa", "Gamtos peizažai", "Rami atkarpa"],
    image: "/marsrutas-2.jpg",
  },
  {
    name: "Liudvinavas – Marijampolė",
    difficulty: "Lengvas",
    difficultyColor: "bg-green-500/20 text-green-700",
    distance: "11,2 km",
    duration: "2-3 val.",
    description: "Rami atkarpa nuo Liudvinavo iki Marijampolės su plačiu Šešupės vingiu miesto prieigose.",
    highlights: ["Rami tėkmė", "Miesto peizažas", "Didelis vingis"],
    image: "/marsrutas-3.jpg",
  },
];

export function RoutesSection() {
  const [modalRoute, setModalRoute] = useState<typeof routes[0] | null>(null);

  return (
    <section id="marsrutai" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-river/10 text-river rounded-full">
            Antra stotelė
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Baidarių maršrutai Šešupe
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pasirinkite baidarių maršrutą Suvalkijoje pagal savo patirtį ir laiką. Kiekvienas maršrutas – unikalus nuotykis.
          </p>
        </motion.div>

        {/* Routes grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={route.name}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-forest/30 transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Map area */}
              <div className="h-48 bg-gradient-to-br from-river/20 via-forest/10 to-river-light/20 relative overflow-hidden">
                {route.image ? (
                  <button
                    onClick={() => setModalRoute(route)}
                    className="w-full h-full relative block group/img"
                    aria-label="Padidinti žemėlapį"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={route.image}
                      alt={`${route.name} maršruto žemėlapis`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </button>
                ) : (
                  <RouteMapSVG routeName={route.name} />
                )}
                <div className="absolute top-4 right-4 pointer-events-none">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${route.difficultyColor}`}>
                    {route.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {route.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {route.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-forest" />
                    {route.distance}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-forest" />
                    {route.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Gauge className="w-4 h-4 text-forest" />
                    {route.difficulty}
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {route.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href="#rezervacija"
                  className="inline-flex items-center gap-2 text-forest font-medium group-hover:gap-3 transition-all"
                >
                  Rezervuoti šį maršrutą
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalRoute && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalRoute(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal content */}
            <motion.div
              className="relative z-10 w-full max-w-4xl bg-card rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setModalRoute(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalRoute.image!}
                alt={`${modalRoute.name} maršruto žemėlapis`}
                className="w-full object-contain max-h-[70vh]"
              />

              {/* Bottom bar */}
              <div className="p-6 flex items-center justify-between gap-4 border-t border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{modalRoute.name}</h3>
                  <p className="text-sm text-muted-foreground">{modalRoute.distance} · {modalRoute.duration}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function RouteMapSVG({ routeName }: { routeName: string }) {
  const paths: Record<string, string> = {
    "Jungėnai – Bukta":
      "M 60 10 Q 40 20 70 30 Q 110 38 90 50 Q 70 60 110 68 Q 150 74 130 84 Q 110 92 140 95",
    "Bukta – Liudvinavas": "M 180 8 Q 160 15 170 28 Q 185 40 165 50 Q 140 58 155 70 Q 170 80 150 90 Q 125 98 135 108 Q 150 118 130 125 Q 105 130 110 142 Q 118 155 95 158 Q 72 160 80 172 Q 90 184 68 188",
    "Liudvinavas – Marijampolė": "M 130 8 Q 110 18 120 32 Q 135 45 115 55 Q 90 62 105 75 Q 120 86 100 96 Q 80 104 90 118 Q 102 132 85 142 Q 65 150 75 162 Q 95 175 120 180 Q 150 183 160 170 Q 175 155 155 148 Q 135 142 140 158",
  };

  const startPoints: Record<string, { cx: number; cy: number }> = {
    "Jungėnai – Bukta": { cx: 60, cy: 10 },
    "Bukta – Liudvinavas": { cx: 180, cy: 8 },
    "Liudvinavas – Marijampolė": { cx: 130, cy: 8 },
  };

  const endPoints: Record<string, { cx: number; cy: number }> = {
    "Jungėnai – Bukta": { cx: 140, cy: 95 },
    "Bukta – Liudvinavas": { cx: 68, cy: 188 },
    "Liudvinavas – Marijampolė": { cx: 140, cy: 158 },
  };

  const start = startPoints[routeName] || startPoints["Jungėnai – Bukta"];
  const end = endPoints[routeName] || endPoints["Jungėnai – Bukta"];

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 240 200"
      preserveAspectRatio="xMidYMid meet"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + (i % 5) * 50}
          cy={20 + Math.floor(i / 5) * 25}
          r="1"
          fill="var(--forest)"
          opacity="0.2"
        />
      ))}
      <path
        d={paths[routeName] || paths["Jungėnai – Bukta"]}
        fill="none"
        stroke="var(--river)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="8 4"
      />
      <circle cx={start.cx} cy={start.cy} r="6" fill="var(--forest)" />
      <circle cx={end.cx} cy={end.cy} r="6" fill="var(--river)" />
    </svg>
  );
}
