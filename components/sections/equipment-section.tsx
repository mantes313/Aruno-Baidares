"use client";

import { motion } from "framer-motion";
import { Waves, Shield, Package } from "lucide-react";

const equipment = [
  {
    name: "Baidarės",
    description: "Stabilios ir patogios baidarės pradedantiesiems ir patyrusiems irkluotojams.",
    icon: Waves,
    features: ["2 vietų", "Stabilios"],
  },
  {
    name: "Irklai",
    description: "Lengvi ir patvarūs aliumininiai irklai su ergonomiška rankena.",
    icon: Package,
    features: ["Lengvi", "Patvarūs"],
  },
  {
    name: "Gelbėjimosi liemenės",
    description: "Sertifikuotos gelbėjimosi liemenės visiems dalyviams.",
    icon: Shield,
    features: ["CE sertifikuotos", "Įvairūs dydžiai"],
  },
];

export function EquipmentSection() {
  return (
    <section id="iranga" className="relative py-24 md:py-32">
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
            Pirma stotelė
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Įranga
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Viską, ko reikia saugiai ir maloniai kelionei, rasite pas mus.
          </p>
        </motion.div>

        {/* Equipment grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {equipment.map((item, index) => (
            <motion.div
              key={item.name}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-forest/30 transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-forest/10 flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                <item.icon className="w-7 h-7 text-forest" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {item.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {item.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional equipment note */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
        </motion.div>
      </div>
    </section>
  );
}
